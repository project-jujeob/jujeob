package com.jujeob.repository;

import com.jujeob.dto.ProductAdminDto;
import com.jujeob.dto.ProductEditDto;
import com.jujeob.entity.Product;

import java.util.List;

public interface ProductRepositoryCustom {
    List<Product> findProductListByCategoryNameAndKeyword(String subCategoryName);

    List<Product> findProductListByCategory(List<String> subCategories);

    List<String> findProductId();

    List<String> findType(String mainType);

    List<Product> findProductListByMainType(String productId);

    List<Product> findProductListByType(String type);

    List<Product> findProductListByAlcohol(String alcohol);

    List<Product> findProductListByPrice(String price);

    List<Product> findProductListByFilterOptions(List<String> searchResult, List<String> categoryNo, List<String> subCategoryName, List<String> orderOption,List<String> mainTypes, List<String> types, List<String> alcoholLevels, List<String> prices);

    List<Product> findProductListBySearchKeyword(String searchKeyword);

//    List<Product> findProductListByOrderByOrderType(String orderType);

    //   List<Product> findProductListByOrderByOrderType(String orderByBtnType, Integer categoryNo, String subCategoryName);

    List<Product> findProductListByOrderByOrderType(String orderByBtnType, Integer categoryNo, String subCategoryName, List<String> mainTypes, List<String> types, List<String> alcoholLevels, List<String> prices);

    List<ProductAdminDto> findProductListAndStock();

    ProductEditDto findAllAndStockByProductNo(Integer productNo);

    List<ProductAdminDto> findProductListAndStockForAdminByKeyword(String keyword);
}
