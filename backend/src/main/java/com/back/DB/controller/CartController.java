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
    public ResponseEntity<List<CartProduct>> getCartItems(@RequestParam("userId") String userId) {
        try {
            List<CartProduct> cartItems = cartService.getCartItems(userId);
            return ResponseEntity.ok(cartItems);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<CartProduct> addToCart(@RequestBody CartProduct cartProduct) {
        try {
            CartProduct savedCartProduct = cartService.addToCart(cartProduct);
            return ResponseEntity.ok(savedCartProduct);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<CartProduct> updateCartItem(@PathVariable Integer id, @RequestBody CartProduct cartProduct) {
        Optional<CartProduct> updatedCartProduct = cartService.updateCartItem(id, cartProduct);
        return updatedCartProduct.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Integer id) {
        try {
            cartService.deleteCartItem(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
