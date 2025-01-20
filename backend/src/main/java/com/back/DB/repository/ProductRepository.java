package com.back.DB.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.back.DB.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
