package com.back.DB.controller;

import com.back.DB.model.CartProduct;
import com.back.DB.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping
    public List<CartProduct> getCartItems(@RequestParam String userId) {
        return cartService.getCartItems(userId);
    }

    @PostMapping
    public ResponseEntity<CartProduct> addToCart(@RequestBody CartProduct cartProduct) {
        CartProduct savedCartProduct = cartService.addToCart(cartProduct);
        return ResponseEntity.ok(savedCartProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CartProduct> updateCartItem(@PathVariable Integer id, @RequestBody CartProduct cartProduct) {
        Optional<CartProduct> updatedCartProduct = cartService.updateCartItem(id, cartProduct);
        return updatedCartProduct.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Integer id) {
        cartService.deleteCartItem(id);
        return ResponseEntity.ok().build();
    }
}
