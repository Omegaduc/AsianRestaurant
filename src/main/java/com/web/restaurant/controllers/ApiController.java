package com.web.restaurant.controllers;

import com.web.restaurant.models.Customer;
import com.web.restaurant.models.Deli;
import com.web.restaurant.models.Food;
import com.web.restaurant.persitences.DeliService;
import com.web.restaurant.persitences.FoodService;
import com.web.restaurant.persitences.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ApiController {
    FoodService foodService;
    CustomerService customerService;
    DeliService deliService;

    // Constructor injection
    public ApiController(FoodService foodService, CustomerService customerService, DeliService deliService) {
        this.foodService = foodService;
        this.customerService = customerService;
        this.deliService = deliService;
    }
   @GetMapping("/api/foods")
    Iterable<Food> foods() {
        Iterable<Food> foods = foodService.findAll();
        return foods;
    }


    @GetMapping("/api/customers")
    Iterable<Customer> customers() {
        Iterable<Customer> customers = customerService.findAll();
        return customers;
    }


    @PostMapping(value = "/api/reserve")
    ResponseEntity<?> reserve(Customer customer) {
        customerService.save(customer);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/api/add")
    ResponseEntity<?> add(Food food) {
        foodService.save(food);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/api/delete_reserve_by_id")
    ResponseEntity<?> deleteReserveById(Integer id) {
        customerService.deleteByID(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/api/delivery_order")
    ResponseEntity<?> deliveryOrder(Deli deli) {
        deliService.save(deli);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/api/delivery")
    Iterable<Deli> delivery() {
        Iterable<Deli> delivery = deliService.findAll();
        return delivery;
    }
    @PostMapping(value = "/api/delete_delivery_order_by_id")
    ResponseEntity<?> deleteDeliveryOrderById(Integer id) {
        deliService.deleteByID(id);
        return ResponseEntity.ok().build();
    }
}
