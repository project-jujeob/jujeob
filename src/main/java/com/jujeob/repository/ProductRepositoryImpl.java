package com.jujeob.repository;

import com.jujeob.entity.Product;
import com.jujeob.entity.QProduct;
import com.jujeob.entity.QSubCategory;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ProductRepositoryImpl implements ProductRepositoryCustom{
    private final JPAQueryFactory factory;

    @Override
    public List<Product> findProductListByCategoryNameAndKeyword(String subCategoryName) {
        QProduct qProduct = QProduct.product;

        List<Product> products = factory.select(qProduct)
                .from(qProduct)
                .where(qProduct.keyword.like("%" + subCategoryName + "%"))
                .fetch();

        return products;
    }

    @Override
    public List<Product> findProductListByCategory(List<String> subCategories) {
        QProduct qProduct = QProduct.product;

        List<Product> products = new ArrayList<>();

        for (String subCategory : subCategories) {
            List<Product> productList = factory.select(qProduct)
                    .from(qProduct)
                    .where(qProduct.keyword.like("%" + subCategory + "%"))
                    .fetch();

            products.addAll(productList);
        }

        List<Product> uniqueProducts = new ArrayList<>(new HashSet<>(products));

        return uniqueProducts;
    }
}
