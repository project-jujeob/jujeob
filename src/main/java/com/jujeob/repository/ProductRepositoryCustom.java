package com.jujeob.repository;

import com.jujeob.entity.Product;
import com.jujeob.entity.SubCategory;

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

    List<Product> findProductListByFilterOptions(List<String> categoryNo, List<String> subCategoryName, List<String> mainTypes, List<String> types, List<String> alcoholLevels, List<String> prices);
}
