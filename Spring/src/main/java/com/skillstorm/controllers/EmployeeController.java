package com.skillstorm.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.models.Employee;
import com.skillstorm.services.EmployeeService;

@RestController							// combines @Controller and @ResponseBody
@RequestMapping("/employee")			// all requests to baseUrl plus this suffix will route here
@CrossOrigin(origins = "*", exposedHeaders = {"error"})	
public class EmployeeController {

	@Autowired
	private EmployeeService service;
	
	// an endpoint for getting all employees
	// @GetMapping says this is a GET request
	// return type has to match what you're getting back (or what you change it to)
	@GetMapping
	public Iterable<Employee> getAllEmployees() {
		return service.getAllEmployees();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable int id) {
		return service.getEmployeeById(id);
	}
	
	@GetMapping("/sortName")
	public Iterable<Employee> getEmployeesSortedByName() {
		return service.getEmployeesSortedByName();
	}
	
	@GetMapping("/count/{id}")
	public int getEmployeeCountByOfficeId(@PathVariable int id) {
		return service.getEmployeeCountByOfficeId(id);
	}
	
	@PutMapping
	public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee) {
		ResponseEntity<Employee> response = service.updateEmployee(employee);
		System.out.println(response);
		return response;
	}
	
	@PostMapping
	public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
		return service.createEmployee(employee);
	}
	
	@DeleteMapping("/{id}")
	public void deleteEmployeeById(@PathVariable int id) {
		service.deleteEmployeeById(id);
	}
}
