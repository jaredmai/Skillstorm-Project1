package com.skillstorm.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.models.Office;

@Repository
public interface OfficeRepository extends CrudRepository<Office, Integer> {

}
