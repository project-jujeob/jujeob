
package com.jujeob.service;

import com.jujeob.entity.Product;
import com.jujeob.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class ProductServiceTest {
    @Test
    public void testGetProductByProductNo() {

        // Mocking the ProductRepository
        ProductRepository productRepositoryMock = mock(ProductRepository.class);


        // Creating a sample Product
        Product sampleProduct = new Product();
        sampleProduct.setProductNo(1);
        sampleProduct.setName("Sample Product");

        // Stubbing the findById method to return the sample product
        when(productRepositoryMock.findById(1)).thenReturn(Optional.of(sampleProduct));

        ProductService productService = new ProductService(productRepositoryMock);

        // Calling the service method
        Optional<Product> result = productService.getProductByProductNo(1);

        // Asserting the result
        assertEquals("Sample Product", result.isPresent() ? result.get().getName() : null);
    }
}

