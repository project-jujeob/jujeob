package com.jujeob.repository;

import java.util.List;

public interface SubCategoryRepositoryCustom {
    List<String> getCategoryNameByCategoryNoUsingQuerydsl(Integer categoryNo);
}