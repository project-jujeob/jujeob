package com.jujeob.repository;

import com.jujeob.entity.QCategory;
import com.jujeob.entity.QSubCategory;
import com.jujeob.entity.SubCategory;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class SubCategoryRepositoryImpl implements SubCategoryRepositoryCustom{
    private final JPAQueryFactory factory;


    @Override
    public List<String> getCategoryNameByCategoryNoUsingQuerydsl(Integer categoryNo) {
        QCategory qCategory = QCategory.category;
        QSubCategory qSubCategory = QSubCategory.subCategory;

        return factory.select(qSubCategory.subCategoryName)
                .from(qSubCategory)
                .join(qCategory)
                .on(qSubCategory.categoryNo.eq(qCategory.categoryNo))
                .where(qCategory.categoryNo.eq(categoryNo))
                .fetch();
    }
}
