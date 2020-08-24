package com.web.restaurant.persitences;

import com.web.restaurant.models.Food;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodServiceImpl implements FoodService{

    FoodRepository repository;

    public FoodServiceImpl(FoodRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Food> getByFoodNameContaining(String name) {
        return repository.getByFoodNameContaining(name);
    }

    @Override
    public Iterable<Food> findAll() {
        return repository.findAll();
    }

    public Food save(Food food){ return repository.save(food);}

    @Override
    public void deleteByID(Integer id) {
        repository.deleteById(id);
    }
}
