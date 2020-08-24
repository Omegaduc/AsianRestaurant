package com.web.restaurant.persitences;

import com.web.restaurant.models.Customer;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

interface CustomerRepository extends CrudRepository<Customer, Integer> {

    List<Customer> getByCustomerNameContaining(String name);

    Customer save(Customer customer);

    void deleteById(Integer id);

}