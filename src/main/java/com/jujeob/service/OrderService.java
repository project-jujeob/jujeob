package com.jujeob.service;

import com.jujeob.dto.CheckOrderItemDto;
import com.jujeob.dto.CheckOrderListDto;
import com.jujeob.dto.OrderDeliveriesDto;
import com.jujeob.dto.OrderItemDto;
import com.jujeob.entity.CustomerOrder;
import com.jujeob.entity.Member;
import com.jujeob.entity.OrderItem;
import com.jujeob.entity.Product;
import com.jujeob.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    MemberRepository memberRepository;

    @Transactional
    public void processOrder(CustomerOrder customerOrder) {
        // CustomerOrder 저장
        CustomerOrder savedOrder = orderRepository.save(customerOrder);

        // OrderItem 저장
        List<OrderItem> orderItems = savedOrder.getOrderItems();
        for (OrderItem orderItem : orderItems) {
            orderItem.setCustomerOrder(savedOrder);
            orderItemRepository.save(orderItem);
        }
    }

    public List<OrderDeliveriesDto> getAllOrderDeliveriesWithItems(Long memberNo) {
        List<CustomerOrder> customerOrders = orderRepository.findCustomerOrdersByMemberNoOrderByCreatedAt(memberNo);
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
        dto.setMemberName(customerOrder.getMemberName());
        dto.setMemberPhone(customerOrder.getMemberPhone());
        dto.setMemberEmail(customerOrder.getMemberEmail());
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

            Optional<Member> member = memberRepository.findMemIdByNameAndPhone(co.getMemberName(), co.getMemberPhone());
            String memId = member.map(Member::getMemId).orElse(null);

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
                    memId,
                    co.getMemberName(),
                    co.getMemberPhone(),
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
                        (dto.getMemId() != null && dto.getMemId().contains(keyword)) ||
                        (dto.getMemberName() != null && dto.getMemberName().toLowerCase().contains(keyword)) ||
                        (dto.getMemberPhone() != null && dto.getMemberPhone().contains(keyword)) ||
                        (dto.getAddress() != null && dto.getAddress().toLowerCase().contains(keyword)) ||
                        (dto.getOrderStatus() != null && dto.getOrderStatus().toLowerCase().contains(keyword)) ||
                        (dto.getPaymentMethod() != null && dto.getPaymentMethod().toLowerCase().contains(keyword)) ||
                        (dto.getProducts().stream().anyMatch(p -> p.getProductName().toLowerCase().contains(finalKeyword)));
            case "orderId":
                return dto.getOrderId() != null && dto.getOrderId().toString().contains(keyword);
            case "memberId":
                return dto.getMemId() != null && dto.getMemId().contains(keyword);
            case "memberName":
                return dto.getMemberName() != null && dto.getMemberName().toLowerCase().contains(keyword);
            default:
                return false;
        }
    }

}
