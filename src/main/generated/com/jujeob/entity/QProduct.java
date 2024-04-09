package com.jujeob.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QProduct is a Querydsl query type for Product
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QProduct extends EntityPathBase<Product> {

    private static final long serialVersionUID = 1372119948L;

    public static final QProduct product = new QProduct("product");

    public final StringPath alcohol = createString("alcohol");

    public final StringPath aroma = createString("aroma");

    public final StringPath brand = createString("brand");

    public final StringPath brandImg = createString("brandImg");

    public final StringPath breeding = createString("breeding");

    public final StringPath color = createString("color");

    public final StringPath colorAndHomogeneity = createString("colorAndHomogeneity");

    public final StringPath company = createString("company");

    public final StringPath country = createString("country");

    public final StringPath countryDescription = createString("countryDescription");

    public final StringPath crate = createString("crate");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final StringPath description = createString("description");

    public final StringPath detailImg = createString("detailImg");

    public final StringPath expDate = createString("expDate");

    public final StringPath finish = createString("finish");

    public final StringPath flavor = createString("flavor");

    public final StringPath foodPairing = createString("foodPairing");

    public final StringPath howToDrink = createString("howToDrink");

    public final StringPath img = createString("img");

    public final StringPath incense = createString("incense");

    public final StringPath keyword = createString("keyword");

    public final StringPath kind = createString("kind");

    public final DateTimePath<java.time.LocalDateTime> modifiedAt = createDateTime("modifiedAt", java.time.LocalDateTime.class);

    public final StringPath mouthfeel = createString("mouthfeel");

    public final StringPath name = createString("name");

    public final StringPath openType = createString("openType");

    public final StringPath packageType = createString("packageType");

    public final StringPath price = createString("price");

    public final StringPath productId = createString("productId");

    public final NumberPath<Integer> productNo = createNumber("productNo", Integer.class);

    public final StringPath recommendGlass = createString("recommendGlass");

    public final StringPath tasting = createString("tasting");

    public final StringPath tastingImg = createString("tastingImg");

    public final StringPath type = createString("type");

    public final StringPath unit = createString("unit");

    public final StringPath volume = createString("volume");

    public final StringPath winery = createString("winery");

    public QProduct(String variable) {
        super(Product.class, forVariable(variable));
    }

    public QProduct(Path<? extends Product> path) {
        super(path.getType(), path.getMetadata());
    }

    public QProduct(PathMetadata metadata) {
        super(Product.class, metadata);
    }

}

