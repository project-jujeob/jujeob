package com.jujeob.service;

import com.jujeob.dto.CheckOrderItemDto;
import com.jujeob.dto.CheckOrderListDto;
import com.jujeob.dto.OrderDeliveriesDto;
import com.jujeob.dto.OrderItemDto;
import com.jujeob.entity.CustomerOrder;
import com.jujeob.entity.OrderItem;
import com.jujeob.entity.Product;
import com.jujeob.entity.User;
import com.jujeob.entity.Stock;
import com.jujeob.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderItemRepository orderItemRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CustomerOrderRepository customerOrderRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    StockRepository stockRepository;

    @Autowired
    CartRepository cartRepository;

    @Transactional
    public ResponseEntity<String> createOrder(CustomerOrder customerOrder) {
        try {
            // 주문 상품 정보
            List<OrderItem> orderItems = customerOrder.getOrderItems();

            // 재고 확인 및 주문 처리
            for (OrderItem orderItem : orderItems) {
                // 재고 조회
                Stock stock = stockRepository.findByProductNo(orderItem.getProductNo());
                if (stock == null || stock.getQuantity() < orderItem.getQuantity()) {
                    // 재고 부족한 경우 예외 처리
                    int remainingQuantity = stock != null ? stock.getQuantity() : 0;
                    throw new RuntimeException("재고가 부족합니다.(남은 수량:"+remainingQuantity+")");
                }
            }

            // 모든 상품의 재고가 충분한 경우 주문 생성 및 재고 감소
            CustomerOrder savedCustomerOrder = orderRepository.save(customerOrder);
            for (OrderItem orderItem : orderItems) {
                orderItem.setCustomerOrder(savedCustomerOrder);
                orderItemRepository.save(orderItem);

                // 재고 감소
                Stock stock = stockRepository.findByProductNo(orderItem.getProductNo());
                stock.decreaseStock(orderItem.getQuantity());
            }

            // 장바구니에서 해당 상품 삭제
            Long userNo = customerOrder.getUserNo();
            List<Integer> productNos = orderItems.stream()
                    .map(OrderItem::getProductNo)
                    .collect(Collectors.toList());
            cartRepository.deleteAllByUserNoAndProductNoIn(userNo, productNos);

            return ResponseEntity.ok("주문이 완료되었습니다.");
        } catch (RuntimeException e) {
            // 예외 발생 시 주문 롤백 및 오류 반환
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            // 그 외의 예외 발생 시 오류 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("주문 처리 중 오류가 발생했습니다.");
        }
    }

    public List<OrderDeliveriesDto> getAllOrderDeliveriesWithItems(Long userNo) {
        List<CustomerOrder> customerOrders = orderRepository.findCustomerOrdersByUserNoOrderByCreatedAtDesc(userNo);

        List<OrderDeliveriesDto> orderDeliveriesDtos = new ArrayList<>();

        for(CustomerOrder customerOrder : customerOrders){
            //List<OrderItem> items = orderItemRepository.findByOrderId(customerOrder.getOrderId());
            List<OrderItem> orderItems = orderItemRepository.findByCustomerOrder(customerOrder);
            OrderDeliveriesDto orderDeliveriesDto = convertToDto(customerOrder, orderItems);
            orderDeliveriesDtos.add(orderDeliveriesDto);
        }
        return orderDeliveriesDtos;
    }

    private OrderDeliveriesDto convertToDto(CustomerOrder customerOrder, List<OrderItem> orderItems) {
        OrderDeliveriesDto dto = new OrderDeliveriesDto();
        dto.setOrderId(customerOrder.getOrderId());
        dto.setAddress(customerOrder.getAddress());

        dto.setName(customerOrder.getName());
        dto.setPhone(customerOrder.getPhone());
        dto.setEmail(customerOrder.getEmail());

        dto.setOrderStatus(customerOrder.getOrderStatus());
        dto.setPaymentMethod(customerOrder.getPaymentMethod());
        dto.setTotalPrice(customerOrder.getTotalPrice());
        dto.setDeliveryRequest(customerOrder.getDeliveryRequest());
        dto.setCreatedAt(customerOrder.getCreatedAt());

        List<OrderItemDto> orderItemDtos = new ArrayList<>();
        for (OrderItem orderItem : orderItems) {
            OrderItemDto itemDto = new OrderItemDto();
            itemDto.setProductNo(orderItem.getProductNo());
            itemDto.setQuantity(orderItem.getQuantity());
            itemDto.setPrice(orderItem.getPrice());
            String img = productRepository.findImgByProductNo(orderItem.getProductNo());
            itemDto.setImg(img);
            String productName = productRepository.findNameByProductNo(orderItem.getProductNo());
            itemDto.setProductName(productName);
            double alcohol = productRepository.findAlcoholByProductNo(orderItem.getProductNo());
            itemDto.setAlcohol(alcohol);
            String volume = productRepository.findVolumeByProductNo(orderItem.getProductNo());
            itemDto.setVolume(volume);
            orderItemDtos.add(itemDto);
        }
        dto.setOrderItems(orderItemDtos);

        return dto;
    }

    public List<CheckOrderListDto> getGroupedOrderItems() {
        List<OrderItem> orderItems = orderItemRepository.findAll();
        Map<Long, List<OrderItem>> groupedItems = orderItems.stream()
                .collect(Collectors.groupingBy(item -> item.getCustomerOrder().getOrderId()));

        Map<Long, CustomerOrder> customerOrderMap = customerOrderRepository.findAll()
                .stream()
                .collect(Collectors.toMap(CustomerOrder::getOrderId, order -> order));

        return groupedItems.entrySet().stream().map(entry -> {
            Long orderId = entry.getKey();
            List<OrderItem> items = entry.getValue();
            CustomerOrder co = customerOrderMap.get(orderId);

            Optional<User> user = userRepository.findMemIdByNameAndPhone(co.getName(), co.getPhone());
            String userId = user.map(User::getUserId).orElse(null);

            List<CheckOrderItemDto> productInfos = items.stream().map(item -> {
                Optional<Product> product = productRepository.findById(item.getProductNo());
                return new CheckOrderItemDto(
                        item.getProductNo(),
                        product.map(Product::getName).orElse("Unknown"),
                        item.getQuantity()
                );
            }).collect(Collectors.toList());

            return new CheckOrderListDto(
                    orderId,
                    userId,
                    co.getName(),
                    co.getPhone(),
                    co.getAddress(),
                    co.getTotalPrice(),
                    co.getOrderStatus(),
                    co.getPaymentMethod(),
                    items.stream().mapToInt(OrderItem::getQuantity).sum(),
                    productInfos,
                    co.getCreatedAt()
            );
        }).collect(Collectors.toList());
    }

    public List<CheckOrderListDto> getOrderListByAdmin() {
        return getGroupedOrderItems();
    }

    public List<CheckOrderListDto> getOrderListBySearchOption(String searchType, String keyword) {
        return getGroupedOrderItems().stream()
                .filter(dto -> matchesSearchCriteria(dto, searchType, keyword))
                .collect(Collectors.toList());
    }

    private boolean matchesSearchCriteria(CheckOrderListDto dto, String searchType, String keyword) {
        if (keyword == null || keyword.isEmpty()) {
            return true;
        }
        keyword = keyword.toLowerCase();
        switch (searchType) {
            case "all":
                String finalKeyword = keyword;
                return (dto.getOrderId() != null && dto.getOrderId().toString().contains(keyword)) ||
                        (dto.getUserId() != null && dto.getUserId().contains(keyword)) ||
                        (dto.getName() != null && dto.getName().toLowerCase().contains(keyword)) ||
                        (dto.getPhone() != null && dto.getPhone().contains(keyword)) ||
                        (dto.getAddress() != null && dto.getAddress().toLowerCase().contains(keyword)) ||
                        (dto.getOrderStatus() != null && dto.getOrderStatus().toLowerCase().contains(keyword)) ||
                        (dto.getPaymentMethod() != null && dto.getPaymentMethod().toLowerCase().contains(keyword)) ||
                        (dto.getProducts().stream().anyMatch(p -> p.getProductName().toLowerCase().contains(finalKeyword)));
            case "orderId":
                return dto.getOrderId() != null && dto.getOrderId().toString().contains(keyword);
            case "memberId":
                return dto.getUserId() != null && dto.getUserId().contains(keyword);
            case "memberName":
                return dto.getName() != null && dto.getName().toLowerCase().contains(keyword);
            default:
                return false;
        }
    }

}
