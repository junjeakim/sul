package com.back.DB.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cartproduct")
public class CartProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cpCode;
    private Integer cartCode;
    private Integer cpPrCode;
    private Integer cpQuantity;

    // Getters and Setters
    public Integer getCpCode() {
        return cpCode;
    }

    public void setCpCode(Integer cpCode) {
        this.cpCode = cpCode;
    }

    public Integer getCartCode() {
        return cartCode;
    }

    public void setCartCode(Integer cartCode) {
        this.cartCode = cartCode;
    }

    public Integer getCpPrCode() {
        return cpPrCode;
    }

    public void setCpPrCode(Integer cpPrCode) {
        this.cpPrCode = cpPrCode;
    }

    public Integer getCpQuantity() {
        return cpQuantity;
    }

    public void setCpQuantity(Integer cpQuantity) {
        this.cpQuantity = cpQuantity;
    }
}