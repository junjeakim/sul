package com.back.DB.repository;

import com.back.DB.model.CartProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CartProductRepository extends JpaRepository<CartProduct, Integer> {
    List<CartProduct> findByCartCode(Integer cartCode);
}
