package com.jujeob.repository;

import com.jujeob.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubCategoryRepository extends JpaRepository<SubCategory, Integer>, SubCategoryRepositoryCustom {

}
