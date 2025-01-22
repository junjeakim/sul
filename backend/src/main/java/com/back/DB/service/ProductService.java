package com.back.DB.service;

import com.back.DB.model.Product;
import com.back.DB.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    private final Path root = Paths.get("src/main/resources/static/images");

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Integer id) {
        return productRepository.findById(id);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public boolean deleteProduct(Integer id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            try {
                Path filePath = root.resolve(product.get().getStoredFilename());
                System.out.println("삭제 대상 파일 경로: " + filePath.toAbsolutePath());
                
                // 파일 삭제 로직
                if (Files.exists(filePath)) {
                    Files.delete(filePath);
                    System.out.println("파일 삭제 성공: " + filePath);
                } else {
                    System.out.println("삭제할 파일이 존재하지 않습니다: " + filePath);
                }
                
                // 데이터베이스에서 제품 삭제
                productRepository.deleteById(id);
                System.out.println("데이터베이스에서 제품 삭제 성공: ID=" + id);
                return true;
            } catch (Exception e) {
                System.err.println("파일 삭제 또는 데이터베이스 삭제 중 오류 발생: " + e.getMessage());
                e.printStackTrace();
                return false;
            }
        } else {
            System.out.println("삭제 대상 제품을 찾을 수 없습니다. ID: " + id);
            return false;
        }
    }

    public Product saveProduct(MultipartFile file, String subject, String content, String price, String category) throws Exception {
        if (!Files.exists(root)) {
            Files.createDirectories(root);
        }
        
        String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Files.copy(file.getInputStream(), root.resolve(uniqueFileName));
        Product product = new Product();
        product.setSubject(subject);
        product.setContent(content);
        product.setPrice(price);
        product.setCategory(category);
        product.setStoredFilename(uniqueFileName);
        return productRepository.save(product);
    }
}