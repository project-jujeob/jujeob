package com.jujeob.repository;

import com.jujeob.entity.Product;
import com.jujeob.entity.SubCategory;

import java.util.List;

public interface ProductRepositoryCustom {
    List<Product> findProductListByCategoryNameAndKeyword(String subCategoryName);

    List<Product> findProductListByCategory(List<String> subCategories);

    List<String> findProductId();

    List<String> findType(String productId);
}
