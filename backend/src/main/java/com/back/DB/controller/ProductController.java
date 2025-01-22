package com.back.DB.controller;

import com.back.DB.model.Product;
import com.back.DB.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") Integer id) {
        Optional<Product> product = productService.getProductById(id);
        return product.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    @PostMapping("/upload")
    public ResponseEntity<Product> uploadProduct(
            @RequestParam("file") MultipartFile file,
            @RequestParam("subject") String subject,
            @RequestParam("content") String content,
            @RequestParam("price") String price,
            @RequestParam("category") String category) {
        try {
            Product product = productService.saveProduct(file, subject, content, price, category);
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            System.err.println("제품 업로드 중 오류 발생: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new Product());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") Integer productId) {
        try {
            boolean isDeleted = productService.deleteProduct(productId);
            if (isDeleted) {
                return ResponseEntity.ok("제품이 성공적으로 삭제되었습니다.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 제품을 찾을 수 없습니다.");
            }
        } catch (Exception e) {
            System.err.println("제품 삭제 중 오류 발생: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("제품 삭제 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
}