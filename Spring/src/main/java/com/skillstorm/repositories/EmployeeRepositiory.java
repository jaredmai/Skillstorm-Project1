package com.skillstorm.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.skillstorm.models.Employee;

@Repository
public interface EmployeeRepositiory extends CrudRepository<Employee, Integer> {
	
	// getting a count of the employees by office
	@Query(value = "SELECT COUNT(*) FROM employee WHERE office_id = :officeId", nativeQuery = true)
	public int countEmployeesByOffice(@Param("officeId") int officeId );
	
	// getting maxEmployeeCount by office ID
	@Query(value = "SELECT office_max_employees FROM office WHERE office_id = :officeId", nativeQuery = true)
	public int getMaxEmployeesByOfficeId(@Param("officeId") int officeId );
	
	// Sort employees by firstname, lastname
	@Query(value = "SELECT * FROM employee ORDER BY employee_firstname, employee_lastname", nativeQuery = true)
	public Iterable<Employee> findAllSortedByName();
	
	// Does office exists
	@Query(value = "SELECT COUNT(*) FROM office WHERE office_id = :officeId", nativeQuery = true)
	public int countOfficeById(@Param("officeId") int officeId );
	
}
