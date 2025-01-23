package com.back.DB.service;

import com.back.DB.model.CartProduct;
import com.back.DB.repository.CartProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private CartProductRepository cartProductRepository;

    public List<CartProduct> getCartItems(String userId) {
        return cartProductRepository.findAll(); // 단순하게 모든 아이템을 가져옴
    }

    public CartProduct addToCart(CartProduct cartProduct) {
        return cartProductRepository.save(cartProduct);
    }

    public Optional<CartProduct> updateCartItem(Integer id, CartProduct cartProduct) {
        return cartProductRepository.findById(id).map(existingCartProduct -> {
            existingCartProduct.setCpQuantity(cartProduct.getCpQuantity());
            return cartProductRepository.save(existingCartProduct);
        });
    }

    public void deleteCartItem(Integer id) {
        cartProductRepository.deleteById(id);
    }
}
