package com.skillstorm.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.skillstorm.models.Employee;
import com.skillstorm.repositories.EmployeeRepositiory;

@Service
public class EmployeeService {
	
	@Autowired
	private EmployeeRepositiory repo;
	
	// Get All
	public Iterable<Employee> getAllEmployees() {
		return repo.findAll();
	}
	
	// Get by ID
	public Employee getEmployeeById(int id) {
		if (!repo.existsById(id))
			return null;
		return repo.findById(id).get();
	}
	
	// Update
	public Employee updateEmployee(Employee employee) {
		if (!repo.existsById(employee.getEmployeeId()))
			return null;
		return repo.save(employee);
	}
	
	// Create
	public Employee createEmployee(Employee employee) {
		if (repo.existsById(employee.getEmployeeId()))
			return null;
		return repo.save(employee);
	}
	
	// Delete by ID
	public void deleteEmployeeById(int id) {
		if (repo.existsById(id))
			repo.deleteById(id);
	}

}
