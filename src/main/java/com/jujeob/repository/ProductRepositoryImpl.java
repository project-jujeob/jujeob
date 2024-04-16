package com.jujeob.repository;

import com.jujeob.entity.Product;
import com.jujeob.entity.QProduct;
import com.jujeob.entity.QSubCategory;
import com.jujeob.entity.SubCategory;
import com.jujeob.service.SubCategoryService;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Log4j2
@Repository
@RequiredArgsConstructor
public class ProductRepositoryImpl implements ProductRepositoryCustom{
    private final JPAQueryFactory factory;

    @Autowired
    SubCategoryService subCategoryService;

    @Override
    public List<Product> findProductListByCategoryNameAndKeyword(String subCategoryName) {
        QProduct qProduct = QProduct.product;

        List<Product> products = factory.select(qProduct)
                .from(qProduct)
                .where(qProduct.keyword.like("%" + subCategoryName + "%"))
                .fetch();

        return new ArrayList<>(new HashSet<>(products));
    }

    @Override
    public List<Product> findProductListByCategory(List<String> subCategories) {
        QProduct qProduct = QProduct.product;

        List<Product> products = new ArrayList<>();

        for (String  subCategory : subCategories) {
            List<Product> productList = factory.select(qProduct)
                    .from(qProduct)
                    .where(qProduct.keyword.like("%" + subCategory + "%"))
                    .fetch();

            products.addAll(productList);
        }

        return new ArrayList<>(new HashSet<>(products));
    }

    @Override
    public List<String> findProductId() {
        QProduct qProduct = QProduct.product;

        return factory
                .select(qProduct.productId)
                .from(qProduct)
                .distinct()
                .fetch();
    }

    @Override
    public List<String> findType(String mainType) {
        QProduct qProduct = QProduct.product;
        return factory
                .select(qProduct.type)
                .from(qProduct)
                .where(qProduct.productId.eq(mainType))
                .orderBy(qProduct.type.asc())
                .distinct().fetch();
    }

    @Override
    public List<Product> findProductListByMainType(String productId) {
        QProduct qProduct = QProduct.product;
        List<Product> products =  factory.select(qProduct)
                .from(qProduct)
                .where(qProduct.productId.eq(productId))
                .fetch();

        return new ArrayList<>(new HashSet<>(products));
    }

    @Override
    public List<Product> findProductListByType(String type) {
        QProduct qProduct = QProduct.product;
        List<Product> products= factory.select(qProduct)
                .from(qProduct)
                .where(qProduct.type.eq(type))
                .fetch();

        return new ArrayList<>(new HashSet<>(products));
    }

    private BooleanExpression createAlcoholFilter(String alcoholLevel) {
        QProduct qProduct = QProduct.product;
        return switch (alcoholLevel) {
            case "level1" -> qProduct.alcohol.goe(0).and(qProduct.alcohol.loe(5));
            case "level2" -> qProduct.alcohol.goe(6).and(qProduct.alcohol.loe(15));
            case "level3" -> qProduct.alcohol.goe(16).and(qProduct.alcohol.loe(30));
            case "level4" -> qProduct.alcohol.goe(31).and(qProduct.alcohol.loe(50));
            case "level5" -> qProduct.alcohol.gt(50);
            default -> null;
        };
    }

    private BooleanExpression createPriceFilter(String priceRange) {
        QProduct qProduct = QProduct.product;
        return switch (priceRange) {
            case "price1" -> qProduct.price.goe(0).and(qProduct.price.lt(7000));
            case "price2" -> qProduct.price.goe(7000).and(qProduct.price.loe(30000));
            case "price3" -> qProduct.price.goe(30001).and(qProduct.price.loe(70000));
            case "price4" -> qProduct.price.goe(70001).and(qProduct.price.loe(100000));
            case "price5" -> qProduct.price.goe(100001).and(qProduct.price.loe(200000));
            case "price6" -> qProduct.price.gt(200000);
            default -> null;
        };
    }

    @Override
    public List<Product> findProductListByAlcohol(String alcohol) {
        BooleanExpression alcoholFilter = createAlcoholFilter(alcohol);
        if (alcoholFilter != null) {
            return factory.select(QProduct.product)
                    .from(QProduct.product)
                    .where(alcoholFilter)
                    .fetch();
        } else {
            return Collections.emptyList();
        }
    }

    @Override
    public List<Product> findProductListByPrice(String price) {
        BooleanExpression priceFilter = createPriceFilter(price);
        if (priceFilter != null) {
            return factory.select(QProduct.product)
                    .from(QProduct.product)
                    .where(priceFilter)
                    .fetch();
        } else {
            return Collections.emptyList();
        }
    }

    @Override
    public List<Product> findProductListByFilterOptions(List<String> categoryNo,
                                                        List<String> subCategoryName,
                                                        List<String> mainTypes,
                                                        List<String> types,
                                                        List<String> alcoholLevels,
                                                        List<String> prices) {

        QProduct qProduct = QProduct.product;
        BooleanBuilder finalBuilder = new BooleanBuilder();


        // 카테고리 번호 필터
        if (categoryNo != null && !categoryNo.isEmpty()) {
            BooleanBuilder categoryBuilder = new BooleanBuilder();
            try {
                // categoryNo.get(0)이 null이 아닐 경우에만 Integer로 변환
                Integer categoryNumber = categoryNo.get(0) != null ? Integer.valueOf(categoryNo.get(0)) : null;
                if (categoryNumber != null) {
                    List<String> subCategories = subCategoryService.findCategoryNameByCategoryNo(categoryNumber);
                    if (subCategories != null && !subCategories.isEmpty()) {
                        subCategories.forEach(subCategory -> {
                            if (subCategory != null) {  // null 체크 추가
                                categoryBuilder.or(qProduct.keyword.contains(subCategory));
                            }
                        });
                        finalBuilder.and(categoryBuilder);  // 카테고리 조건을 최종 빌더에 추가
                    }
                }
            } catch (NumberFormatException e) {
                // 잘못된 형식의 카테고리 번호 입력 처리 (예외 로깅 또는 사용자에게 피드백)
                log.error("Invalid category number format", e);
            }
        }


        // 하위 카테고리 이름 필터
        if (subCategoryName != null && !subCategoryName.isEmpty()) {
            BooleanBuilder subCategoryBuilder = new BooleanBuilder();
            subCategoryName.forEach(keyword -> {
                if (keyword != null) {  // keyword가 null이 아닐 때만 contains 메소드 호출
                    subCategoryBuilder.or(qProduct.keyword.contains(keyword));
                }
            });
            finalBuilder.and(subCategoryBuilder);  // 하위 카테고리 조건을 최종 빌더에 추가
        }


        // 주종 필터
        if (mainTypes != null && !mainTypes.isEmpty()) {
            finalBuilder.and(qProduct.productId.in(mainTypes));
        }

        // 유형 필터
        if (types != null && !types.isEmpty()) {
            finalBuilder.and(qProduct.type.in(types));
        }


        // 알코올 도수 필터
        if (alcoholLevels != null && !alcoholLevels.isEmpty()) {
            BooleanBuilder alcoholLevelBuilder = new BooleanBuilder();
            alcoholLevels.forEach(alcoholLevel -> alcoholLevelBuilder.or(createAlcoholFilter(alcoholLevel)));
            finalBuilder.and(alcoholLevelBuilder);
        }

        // 가격 필터
        if (prices != null && !prices.isEmpty()) {
            BooleanBuilder priceRangeBuilder = new BooleanBuilder();
            prices.forEach(priceRange -> priceRangeBuilder.or(createPriceFilter(priceRange)));
            finalBuilder.and(priceRangeBuilder);
        }

        List<Product> productList = factory.select(qProduct)
                .from(qProduct)
                .where(finalBuilder)
                .fetch();

        return new ArrayList<>(productList);

    }
}
