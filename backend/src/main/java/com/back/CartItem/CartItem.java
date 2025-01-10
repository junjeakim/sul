package com.back.CartItem;

import jakarta.persistence.*;
import com.back.product.Product; // Product 클래스 임포트
import com.back.user.User; // User 클래스 임포트

@Entity
@Table(name = "cartproduct")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cpCode;

    @ManyToOne
    @JoinColumn(name = "cMemid")
    private User user;

    @ManyToOne
    @JoinColumn(name = "cpPrCode")
    private Product product;

    private int cpQuantity;

    // Getters and Setters
}
