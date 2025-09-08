package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // No need to write anything here, JpaRepository provides findAll, save, deleteById
}