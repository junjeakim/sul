package com.back.DB.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.back.DB.model.CartProduct;

public interface CartProductRepository extends JpaRepository<CartProduct, Integer> {
}