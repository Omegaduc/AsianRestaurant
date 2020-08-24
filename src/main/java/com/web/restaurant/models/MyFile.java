package com.web.restaurant.models;

import java.io.Serializable;

import org.springframework.web.multipart.MultipartFile;

public class MyFile implements Serializable {

    private static final long serialVersionUID = 1L;

    private MultipartFile multipartFile;

    private String description;

    public MultipartFile getMultipartFile() {
        return multipartFile;
    }

    public void setMultipartFile(MultipartFile multipartFile) {
        this.multipartFile = multipartFile;
    }

    public String getName() {
        return description;
    }

    public void setName(String description) {
        this.description = description;
    }

    public String getCost() {
        return description;
    }

    public void setCost(String description) {
        this.description = description;
    }

    public String getCategory() {
        return description;
    }

    public void setCategory(String description) {
        this.description = description;
    }


}
