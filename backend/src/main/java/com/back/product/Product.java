package com.back.product;

import jakarta.persistence.*;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "subject", nullable = false)
    private String subject;

    @Column(name = "price", nullable = false)
    private String price;

    @Column(name = "content", nullable = false)
    private String content;

    // 추가적인 필드와 Getter 및 Setter
}
