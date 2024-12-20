package com.hanzan.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class DataController {

    @GetMapping("/api/data")
    public List<Data> getData() {
        return Arrays.asList(
            new Data("Item 1"),
            new Data("Item 2"),
            new Data("Item 3")
        );
    }

    static class Data {
        private String name;

        public Data(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}
