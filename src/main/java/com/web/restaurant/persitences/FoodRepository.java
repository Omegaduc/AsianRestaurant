package com.web.restaurant.persitences;

import com.web.restaurant.models.Food;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

interface FoodRepository extends CrudRepository<Food, Integer> {

    Food getFoodByFoodName(String foodName);

    Food save(Food food);

    List<Food> getByFoodNameContaining(String name);

}