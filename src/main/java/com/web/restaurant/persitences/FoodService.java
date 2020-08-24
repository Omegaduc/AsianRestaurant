package com.web.restaurant.persitences;

import com.web.restaurant.models.Food;
import org.springframework.stereotype.Service;

import java.util.List;

public interface FoodService {
    List<Food> getByFoodNameContaining(String name);

    Iterable<Food> findAll();

    Food save(Food food);

    void deleteByID(Integer id);

}
