package com.jujeob.repository;

import com.jujeob.dto.ProductAdminDto;
import com.jujeob.dto.ProductEditDto;
import com.jujeob.entity.*;
import com.jujeob.service.SubCategoryService;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.*;

@Log4j2
@Repository
@RequiredArgsConstructor
public class ProductRepositoryImpl implements ProductRepositoryCustom {
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

        for (String subCategory : subCategories) {
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
        List<Product> products = factory.select(qProduct)
                .from(qProduct)
                .where(qProduct.productId.eq(productId))
                .fetch();

        return new ArrayList<>(new HashSet<>(products));
    }

    @Override
    public List<Product> findProductListByType(String type) {
        QProduct qProduct = QProduct.product;
        List<Product> products = factory.select(qProduct)
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
    public List<Product> findProductListByFilterOptions
            (List<String> searchKeyword, List<String> categoryNo, List<String> subCategoryName,
             List<String> orderOption, List<String> mainTypes, List<String> types,
             List<String> alcoholLevels, List<String> prices) {

        QProduct qProduct = QProduct.product;
        QLikeProduct qLikeProduct = QLikeProduct.likeProduct;
        QReview qReview = QReview.review;
        BooleanBuilder finalBuilder = new BooleanBuilder();

        JPAQuery<Product> query = factory.selectFrom(qProduct);
        String option = orderOption.get(0);

        // 검색어 필터
        if (searchKeyword != null && !searchKeyword.isEmpty()) {
            BooleanBuilder keywordBuilder = new BooleanBuilder();
            searchKeyword.forEach(keyword -> {
                if (keyword != null) {
                    keywordBuilder.or(qProduct.name.containsIgnoreCase(keyword));
                }
            });
            finalBuilder.and(keywordBuilder);
        }

        // 카테고리 번호 필터
        if (categoryNo != null && !categoryNo.isEmpty()) {
            BooleanBuilder categoryBuilder = new BooleanBuilder();
            try {
                Integer categoryNumber = categoryNo.get(0) != null ? Integer.valueOf(categoryNo.get(0)) : null;
                if (categoryNumber != null) {
                    List<String> subCategories = subCategoryService.findCategoryNameByCategoryNo(categoryNumber);
                    if (subCategories != null && !subCategories.isEmpty()) {
                        subCategories.forEach(subCategory -> {
                            if (subCategory != null) {
                                categoryBuilder.or(qProduct.keyword.contains(subCategory));
                            }
                        });
                    } else {
                        // 서브 카테고리가 비어있는 경우, 주 카테고리만으로 검색 진행
                        categoryBuilder.or(qProduct.productId.eq(String.valueOf(categoryNumber)));
                    }
                    finalBuilder.and(categoryBuilder);
                }
            } catch (NumberFormatException e) {
                log.error("Invalid category number format", e);
            }
        }

        // 하위 카테고리 이름 필터
        if (subCategoryName != null && !subCategoryName.isEmpty()) {
            BooleanBuilder subCategoryBuilder = new BooleanBuilder();
            subCategoryName.forEach(keyword -> {
                if (keyword != null) {
                    subCategoryBuilder.or(qProduct.keyword.contains(keyword));
                }
            });
            finalBuilder.and(subCategoryBuilder);
        }

        // 정렬 필터
        if (option != null && !option.isEmpty()) {
            switch (option) {
                case "orderLike":
                    query.leftJoin(qLikeProduct)
                            .on(qProduct.productNo.eq(qLikeProduct.productId)
                                    .and(qLikeProduct.likeStatus.eq("Y")))
                            .groupBy(qProduct.productNo)
                            .orderBy(qLikeProduct.count().desc().nullsLast());
                    break;
                case "orderReview":
                    query.leftJoin(qReview)
                            .on(qProduct.productNo.eq(qReview.product.productNo))
                            .groupBy(qProduct.productNo)
                            .orderBy(qReview.count().desc().nullsLast());
                    break;
                case "orderLowPrice":
                    query.orderBy(qProduct.price.asc(), qProduct.name.asc());
                    break;
                case "orderHighPrice":
                    query.orderBy(qProduct.price.desc(), qProduct.name.asc());
                    break;
            }
        }

        // 주종 필터
        if (mainTypes != null && !mainTypes.isEmpty()) {
            BooleanBuilder mainTypeBuilder = new BooleanBuilder();
            mainTypes.forEach(mainType -> mainTypeBuilder.or(qProduct.productId.eq(mainType)));
            finalBuilder.and(mainTypeBuilder);
        }

        // 유형 필터
        if (types != null && !types.isEmpty()) {
            BooleanBuilder typeBuilder = new BooleanBuilder();
            types.forEach(type -> typeBuilder.or(qProduct.type.eq(type)));
            finalBuilder.and(typeBuilder);
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

        List<Product> productList = query
                .from(qProduct)
                .where(finalBuilder)
                .fetch();

        return new ArrayList<>(productList);
    }


    @Override
    public List<Product> findProductListBySearchKeyword(String searchKeyword) {
        QProduct qProduct = QProduct.product;

        List<Product> productList = factory.select(qProduct)
                .from(qProduct)
                .where(qProduct.name.like("%" + searchKeyword + "%"))
                .fetch();

        return new ArrayList<>(new HashSet<>(productList));
    }

    private void orderByLike(JPAQuery<Product> query, QProduct qProduct, QLikeProduct qLikeProduct) {
        query.from(qProduct)
                .leftJoin(qLikeProduct)
                .on(qProduct.productNo.eq(qLikeProduct.productId)
                        .and(qLikeProduct.likeStatus.eq("Y")))
                .groupBy(qProduct.productNo)
                .orderBy(qLikeProduct.count().desc().nullsLast());
    }

    private void orderByReview(JPAQuery<Product> query, QProduct qProduct, QReview qReview) {
        query.from(qProduct)
                .leftJoin(qReview)
                .on(qProduct.productNo.eq(qReview.product.productNo))
                .groupBy(qProduct.productNo)
                .orderBy(qReview.count().desc().nullsLast());
    }

    private void orderByLowPrice(JPAQuery<Product> query, QProduct qProduct) {
        query.orderBy(qProduct.price.asc(), qProduct.name.asc());
    }

    private void orderByHighPrice(JPAQuery<Product> query, QProduct qProduct) {
        query.orderBy(qProduct.price.desc(), qProduct.name.asc());
    }

    @Override
    public List<Product> findProductListByOrderByOrderType(String orderByBtnType, Integer categoryNo, String subCategoryName,
                                                           List<String> mainTypes, List<String> types, List<String> alcoholLevels, List<String> prices) {
        QProduct qProduct = QProduct.product;
        QSubCategory qSubCategory = QSubCategory.subCategory;
        QLikeProduct qLikeProduct = QLikeProduct.likeProduct;
        QReview qReview = QReview.review;

        JPAQuery<Product> query = factory.selectFrom(qProduct);

        // 카테고리와 하위 카테고리에 따른 필터링
        if (categoryNo != null) {
            // 하위 카테고리 이름 조회
            List<String> findSubCategoryNames = factory.select(qSubCategory.subCategoryName)
                    .from(qSubCategory)
                    .where(qSubCategory.categoryNo.eq(categoryNo))
                    .fetch();

            // 상품 테이블에서 카테고리 이름에 해당하는 keyword 조회
            if (findSubCategoryNames != null && !findSubCategoryNames.isEmpty()) {
                BooleanExpression orCondition = null;
                for (String findSubCategoryName : findSubCategoryNames) {
                    BooleanExpression condition = qProduct.keyword.like("%" + findSubCategoryName + "%");
                    orCondition = orCondition == null ? condition : orCondition.or(condition);
                }
                query.where(orCondition);
            }
        }

        if (subCategoryName != null && !subCategoryName.isEmpty()) {
            query.where(qProduct.keyword.like("%" + subCategoryName + "%"));
        }

        if (mainTypes != null && !mainTypes.isEmpty()) {
            BooleanBuilder mainTypeBuilder = new BooleanBuilder();
            mainTypes.forEach(mainType -> mainTypeBuilder.or(qProduct.productId.eq(mainType)));
            query.where(mainTypeBuilder);
        }

        // 유형(type)에 따른 필터링
        if (types != null && !types.isEmpty()) {
            BooleanBuilder typeBuilder = new BooleanBuilder();
            types.forEach(type -> typeBuilder.or(qProduct.type.eq(type)));
            query.where(typeBuilder);
        }

        if (alcoholLevels != null && !alcoholLevels.isEmpty()) {
            BooleanBuilder alcoholFilterBuilder = new BooleanBuilder();
            alcoholLevels.forEach(alcoholLevel -> {
                BooleanExpression filter = createAlcoholFilter(alcoholLevel);
                if (filter != null) {
                    alcoholFilterBuilder.or(filter);
                }
            });
            query.where(alcoholFilterBuilder);
        }

        // 가격 필터링
        if (prices != null && !prices.isEmpty()) {
            BooleanBuilder priceFilterBuilder = new BooleanBuilder();
            prices.forEach(price -> {
                BooleanExpression filter = createPriceFilter(price);
                if (filter != null) {
                    priceFilterBuilder.or(filter);
                }
            });
            query.where(priceFilterBuilder);
        }

        if (orderByBtnType != null && !orderByBtnType.isEmpty()) {
            switch (orderByBtnType) {
                case "orderLike":
                    orderByLike(query, qProduct, qLikeProduct);
                    break;
                case "orderReview":
                    orderByReview(query, qProduct, qReview);
                    break;
                case "orderLowPrice":
                    orderByLowPrice(query, qProduct);
                    break;
                case "orderHighPrice":
                    orderByHighPrice(query, qProduct);
                    break;
            }
        }
        return query.fetch();
    }

    @Override
    public List<ProductAdminDto> findProductListAndStock() {
        QProduct qProduct = QProduct.product;
        QStock qStock = QStock.stock;

        return factory.select(Projections.constructor(
                        ProductAdminDto.class,
                        qProduct.productNo,
                        qProduct.name,
                        qProduct.img,
                        qProduct.price,
                        qStock.quantity
                ))
                .from(qProduct)
                .leftJoin(qStock).on(qProduct.productNo.eq(qStock.productNo))
                .fetch();
    }

    @Override
    public List<ProductAdminDto> findProductListAndStockForAdminByKeyword(String keyword) {
        QProduct qProduct = QProduct.product;
        QStock qStock = QStock.stock;

        return factory.select(Projections.constructor(
                        ProductAdminDto.class,
                        qProduct.productNo,
                        qProduct.name,
                        qProduct.img,
                        qProduct.price,
                        qStock.quantity
                ))
                .from(qProduct)
                .leftJoin(qStock).on(qProduct.productNo.eq(qStock.productNo))
                .where(qProduct.name.contains(keyword))
                .fetch();
    }

    @Override
    public ProductEditDto findAllAndStockByProductNo(Integer productNo) {
        QProduct qProduct = QProduct.product;
        QStock qStock = QStock.stock;

        return factory.select(Projections.bean(
                        ProductEditDto.class,
                        qProduct.productNo,
                        qProduct.productId,
                        qProduct.name,
                        qProduct.img,
                        qProduct.price,
                        qProduct.alcohol,
                        qProduct.volume,
                        qProduct.type,
                        qProduct.description,
                        qProduct.company,
                        qProduct.packageType,
                        qProduct.unit,
                        qProduct.expDate,
                        qProduct.detailImg,
                        qProduct.tastingImg,
                        qProduct.colorAndHomogeneity,
                        qProduct.incense,
                        qProduct.tasting,
                        qProduct.mouthfeel,
                        qProduct.brandImg,
                        qProduct.winery,
                        qProduct.kind,
                        qProduct.color,
                        qProduct.openType,
                        qProduct.aroma,
                        qProduct.foodPairing,
                        qProduct.breeding,
                        qProduct.recommendGlass,
                        qProduct.country,
                        qProduct.countryDescription,
                        qProduct.brand,
                        qProduct.crate,
                        qProduct.howToDrink,
                        qProduct.flavor,
                        qProduct.finish,
                        qProduct.keyword,
                        qStock.quantity.as("quantity")
                ))
                .from(qProduct)
                .leftJoin(qStock).on(qProduct.productNo.eq(qStock.productNo))
                .where(qProduct.productNo.eq(productNo))
                .fetchOne();
    }
}