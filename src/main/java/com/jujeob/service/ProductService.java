package com.jujeob.service;

import com.jujeob.dto.ProductListDto;
import com.jujeob.dto.ProductRegisterDto;
import com.jujeob.entity.LikeProduct;
import com.jujeob.entity.Product;
import com.jujeob.repository.LikeProductRepository;
import com.jujeob.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    LikeProductRepository likeProductRepository;

    // 기본 생성자
    public ProductService() {
        this.productRepository = null;
    }

    // 다른 생성자
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    private ProductListDto mapProductToDto(Product entity) {
        ProductListDto dto = new ProductListDto();
        dto.setImg(entity.getImg());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setAlcohol(entity.getAlcohol());
        dto.setPrice(entity.getPrice());
        dto.setProductNo(entity.getProductNo());
        return dto;
    }

    public List<ProductListDto> showAllProductList( ) {
        List<Product> products = productRepository.findAll();
        List<ProductListDto> productListDtos = new ArrayList<>();

        for (Product entity : products) {
            productListDtos.add(mapProductToDto(entity));
        }
        return productListDtos;
    }

    public List<ProductListDto> showTodayRecommend() {
        List<Product> products = productRepository.findRandom5();
        List<ProductListDto> recommendListDtos = new ArrayList<>();

        for (Product entity : products) {
            recommendListDtos.add(mapProductToDto(entity));
        }
        return recommendListDtos;
    }

    public List<ProductListDto> showProductListByCategoryNameAndKeyword(String subCategoryName) {
        List<Product> products = productRepository.findProductListByCategoryNameAndKeyword(subCategoryName);
        List<ProductListDto> productListByCategoryNameAndKeywordDtos = new ArrayList<>();

        for (Product entity : products) {
            productListByCategoryNameAndKeywordDtos.add(mapProductToDto(entity));
        }
        return productListByCategoryNameAndKeywordDtos;
    }

    public List<ProductListDto> findProductListBySubCategories(List<String> subCategories) {
        List<Product> products = productRepository.findProductListByCategory(subCategories);
        List<ProductListDto> productListByCategoryDtos = new ArrayList<>();

        for (Product entity : products) {
            productListByCategoryDtos.add(mapProductToDto(entity));
        }
        return productListByCategoryDtos;
    }

    public Optional<Product> getProductByProductNo(Integer productNo) {
        return productRepository.findById(productNo);
    }


    public List<String> getProductId() {
        return productRepository.findProductId();
    }


    private List<String> getProductType(String mainType) {
        return productRepository.findType(mainType);
    }

    public Map<String, List<String>> getProductTypesByMainTypes(List<String> mainTypes) {
        Map<String, List<String>> mainTypeToTypes = new HashMap<>();
        for (String mainType : mainTypes) {
            List<String> types = getProductType(mainType);
            mainTypeToTypes.put(mainType, types);
        }
        return mainTypeToTypes;
    }

    public List<ProductListDto> getProductListByMainType(List<String> mainTypes) {
        List<ProductListDto> productListByProductIdDtos = new ArrayList<>();

        for (String productId : mainTypes) {
            List<Product> products = productRepository.findProductListByMainType(productId);
            products.forEach(product -> productListByProductIdDtos.add(mapProductToDto(product)));
        }
        return productListByProductIdDtos;
    }

    public List<ProductListDto> getProductListByType(List<String> types) {
        List<ProductListDto> productListByTypeDtos = new ArrayList<>();

        for(String type : types) {
            List<Product> products = productRepository.findProductListByType(type);
            products.forEach(product -> productListByTypeDtos.add(mapProductToDto(product)));
        }
        return productListByTypeDtos;
    }

    public List<ProductListDto> getProductListByAlcohol(List<String> alcoholLevels) {
        List<ProductListDto> productListByAlcoholDtos = new ArrayList<>();

        for(String alcohol : alcoholLevels) {
            List<Product> products = productRepository.findProductListByAlcohol(alcohol);
            products.forEach(product -> productListByAlcoholDtos.add(mapProductToDto(product)));
        }
        return productListByAlcoholDtos;
    }

    public List<ProductListDto> getProductListByPrice(List<String> prices) {
        List<ProductListDto> productListByPriceDtos = new ArrayList<>();

        for(String price : prices) {
            List<Product> products = productRepository.findProductListByPrice(price);
            products.forEach(product -> productListByPriceDtos.add(mapProductToDto(product)));
        }
        return productListByPriceDtos;
    }

    public List<ProductListDto> getProductListByFilterOption(Map<String, List<String>> filters) {

        List<String> searchKeyword = filters.get("keyword");
        List<String> categoryNo = filters.get("category");
        List<String> subCategoryName = filters.get("subCategory");
        List<String> orderOption = filters.get("orderOption");
        List<String> mainTypes = filters.get("mainType");
        List<String> types = filters.get("types");
        List<String> alcoholLevels = filters.get("alcoholLevels");
        List<String> prices = filters.get("prices");

        List<Product> productsListByFilterOption = productRepository.findProductListByFilterOptions(searchKeyword, categoryNo, subCategoryName, orderOption, mainTypes, types, alcoholLevels, prices);

        return productsListByFilterOption.stream().map(this::mapProductToDto).collect(Collectors.toList());
    }

    public List<ProductListDto> getProductListBySearchKeyword(String searchKeyword) {
        List<Product> products = productRepository.findProductListBySearchKeyword(searchKeyword);
        List<ProductListDto> productListBySearchKeywordDtos = new ArrayList<>();

        for (Product entity : products) {
            productListBySearchKeywordDtos.add(mapProductToDto(entity));
        }
        return productListBySearchKeywordDtos;
    }

    public List<ProductListDto> getProductListByOrderByOrderType(Map<String, Object> orderOptions) {
        String orderByBtnType = (String) orderOptions.get("orderByBtnType");
        Integer categoryNo = (Integer) orderOptions.get("selectedCategoryNo");
        String subCategoryName = (String) orderOptions.get("selectedSubCategoryName");
        List<String> mainTypes = (List<String>) orderOptions.get("mainType");
        List<String> types = (List<String>) orderOptions.get("types");
        List<String> alcoholLevels = (List<String>) orderOptions.get("alcoholLevels");
        List<String> prices = (List<String>) orderOptions.get("prices");

        List<Product> products = productRepository.findProductListByOrderByOrderType(orderByBtnType, categoryNo, subCategoryName,
                                                                                     mainTypes, types, alcoholLevels, prices);
        List<ProductListDto> productListByOrderByDtos = new ArrayList<>();

        for (Product entity : products) {
            productListByOrderByDtos.add(mapProductToDto(entity));
        }
        return productListByOrderByDtos;
    }

    public Product registerProduct(ProductRegisterDto productRegisterDto) {
        MultipartFile img = productRegisterDto.getImg();
        Product product = new Product();
        product.setProductId(productRegisterDto.getProductId());
        product.setName(productRegisterDto.getName());
        uploadAndSetImage(productRegisterDto.getImg(), product, "img");
        product.setProductNo(productRegisterDto.getPrice());
        product.setAlcohol(productRegisterDto.getAlcohol());
        product.setVolume(productRegisterDto.getVolume());
        product.setType(productRegisterDto.getType());
        product.setDescription(productRegisterDto.getDescription());
        product.setKeyword(productRegisterDto.getKeyword());
        product.setCompany(productRegisterDto.getCompany());
        product.setPackageType(productRegisterDto.getPackageType());
        product.setUnit(productRegisterDto.getUnit());
        uploadAndSetImage(productRegisterDto.getDetailImg(), product, "detailImg");
        uploadAndSetImage(productRegisterDto.getTastingImg(), product, "tastingImg");
        product.setColorAndHomogeneity(productRegisterDto.getColorAndHomogeneity());
        product.setIncense(productRegisterDto.getIncense());
        product.setTasting(productRegisterDto.getTasting());
        product.setMouthfeel(productRegisterDto.getMouthfeel());
        uploadAndSetImage(productRegisterDto.getBrandImg(), product, "brandImg");
        product.setWinery(productRegisterDto.getWinery());
        product.setKind(productRegisterDto.getKind());
        product.setColor(productRegisterDto.getColor());
        product.setOpenType(productRegisterDto.getOpenType());
        product.setAroma(productRegisterDto.getAroma());
        product.setFoodPairing(productRegisterDto.getFoodPairing());
        product.setBreeding(productRegisterDto.getBreeding());
        product.setRecommendGlass(productRegisterDto.getRecommendGlass());
        product.setCountry(productRegisterDto.getCountry());
        product.setCountryDescription(productRegisterDto.getCountryDescription());
        product.setBrand(productRegisterDto.getBrand());
        product.setCrate(productRegisterDto.getCrate());
        product.setHowToDrink(product.getHowToDrink());
        product.setFlavor(product.getFlavor());
        product.setFinish(product.getFinish());

        return productRepository.save(product);
    }

    private void uploadAndSetImage(MultipartFile imgFile, Product product, String imageType) {
        if (imgFile != null && !imgFile.isEmpty()) {
            String fileName = StringUtils.cleanPath(Objects.requireNonNull(imgFile.getOriginalFilename()));
            Path path = Paths.get("src", "main", "resources", "static", "productImg", fileName);
            try {
                Files.copy(imgFile.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
                switch (imageType) {
                    case "img" :
                        product.setImg(path.toString());
                        break;
                    case "detailImg":
                        product.setDetailImg(path.toString());
                        break;
                    case "tastingImg":
                        product.setTastingImg(path.toString());
                        break;
                    case "brandImg":
                        product.setBrandImg(path.toString());
                        break;
                }
            } catch (IOException e) {
                e.printStackTrace();  // 더 나은 예외 처리 로직 필요
            }
        }
    }
}