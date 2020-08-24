package com.web.restaurant.persitences;

import com.web.restaurant.models.Deli;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliServiceImpl implements DeliService {

    DeliRepository repository;

    public DeliServiceImpl(DeliRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Deli> getByCustomerContaining(String name) {
        return repository.getByCustomerContaining(name);
    }

    @Override
    public Iterable<Deli> findAll() {
        return repository.findAll();
    }

    public Deli save(Deli deli){
        return repository.save(deli);
    }

    @Override
    public void deleteByID(Integer id) {
        repository.deleteById(id);
    }
}