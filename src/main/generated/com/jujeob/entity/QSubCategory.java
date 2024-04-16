package com.jujeob.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QSubCategory is a Querydsl query type for SubCategory
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSubCategory extends EntityPathBase<SubCategory> {

    private static final long serialVersionUID = 1589714811L;

    public static final QSubCategory subCategory = new QSubCategory("subCategory");

    public final NumberPath<Integer> categoryNo = createNumber("categoryNo", Integer.class);

    public final StringPath subCategoryName = createString("subCategoryName");

    public final NumberPath<Integer> subCategoryNo = createNumber("subCategoryNo", Integer.class);

    public QSubCategory(String variable) {
        super(SubCategory.class, forVariable(variable));
    }

    public QSubCategory(Path<? extends SubCategory> path) {
        super(path.getType(), path.getMetadata());
    }

    public QSubCategory(PathMetadata metadata) {
        super(SubCategory.class, metadata);
    }

}

