package com.web.restaurant.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String foodName;

    private String image;

    private Double cost;

    private Integer foodGroupId;

    public Food() {
    }

    public Food(String foodName, String image, Double cost, Integer foodGroupId) {
        this.foodName = foodName;
        this.image = image;
        this.cost = cost;
        this.foodGroupId = foodGroupId;
    }

    // For demo only
    public Food(Integer id, String foodName, String image, Double cost, Integer foodGroupId) {
        this.id = id;
        this.foodName = foodName;
        this.image = image;
        this.cost = cost;
        this.foodGroupId = foodGroupId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public Integer getFoodGroupId() {
        return foodGroupId;
    }

    public void setFoodGroupId(Integer foodGroupId) {
        this.foodGroupId = foodGroupId;
    }
}
