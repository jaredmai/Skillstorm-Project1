package com.skillstorm.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.skillstorm.models.Employee;

@Repository
public interface EmployeeRepositiory extends CrudRepository<Employee, Integer> {
	
	// getting a count of the departments
	@Query(value = "SELECT COUNT(*) FROM employee WHERE office_id = :officeId", nativeQuery = true)
	public int countEmployeesByOffice(@Param("officeId") int officeId );

}
