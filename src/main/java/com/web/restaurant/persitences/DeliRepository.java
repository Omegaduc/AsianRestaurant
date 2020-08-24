package com.web.restaurant.persitences;

import com.web.restaurant.models.Deli;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

interface DeliRepository extends CrudRepository<Deli, Integer> {

    List<Deli> getByCustomerContaining(String name);

    Deli save(Deli deli);

    void deleteById(Integer id);

}