package com.skillstorm.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	public ResponseEntity<Employee> getEmployeeById(int id) {
		if (!repo.existsById(id))
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					 .header("Error", "An employee with this ID doesn't exist!")
					 .body(null);
		return ResponseEntity.status(HttpStatus.OK)
				 .header("Message", "We successfully got a employee by ID")
				 .body(repo.findById(id).get());
	}
	
	public int getEmployeeCountByOfficeId(int id) {
		return repo.countEmployeesByOffice(id);
	}
	
	public Iterable<Employee> getEmployeesSortedByName() {
		return repo.findAllSortedByName();
	}
	
	// Update by ID
	public ResponseEntity<Employee> updateEmployee(Employee employee) {
		if (!repo.existsById(employee.getEmployeeId()))
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					 .header("error", "invalidId")
					 .body(null);
		
		if (repo.countOfficeById(employee.getOffice().getOfficeId()) <= 0) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.header("error", "invalidOfficeId")
					.body(null);
		}
		
		if (repo.countEmployeesByOffice(employee.getOffice().getOfficeId()) >= (repo.getMaxEmployeesByOfficeId(employee.getOffice().getOfficeId())))
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.header("error", "maxEmployees")
					.body(null);
			
		return ResponseEntity.status(HttpStatus.OK)
				 .header("Message", "We successfully saved an employee by ID")
				 .body(repo.save(employee));
	}
	
	// Create by ID
	public ResponseEntity<Employee> createEmployee(Employee employee) {
		if (repo.existsById(employee.getEmployeeId())) {
			HttpHeaders responseHeaders = new HttpHeaders();
			responseHeaders.set("error", "idAlreadyExists");
			return new ResponseEntity<Employee>(null, responseHeaders, HttpStatus.BAD_REQUEST);
		}
		
		if (repo.countOfficeById(employee.getOffice().getOfficeId()) <= 0) {
			HttpHeaders responseHeaders = new HttpHeaders();
			responseHeaders.set("error", "badOfficeId");
			return new ResponseEntity<Employee>(null, responseHeaders, HttpStatus.BAD_REQUEST);
		}
		
		if (repo.countEmployeesByOffice(employee.getOffice().getOfficeId()) >= (repo.getMaxEmployeesByOfficeId(employee.getOffice().getOfficeId()))) {
			HttpHeaders responseHeaders = new HttpHeaders();
			responseHeaders.set("error", "maxEmployees");
			return new ResponseEntity<Employee>(null, responseHeaders, HttpStatus.BAD_REQUEST);
		}
		
		return ResponseEntity.status(HttpStatus.OK)
				 .header("Message", "We successfully created an employee")
				 .body(repo.save(employee));
	}
	
	// Delete by ID
	public void deleteEmployeeById(int id) {
		if (repo.existsById(id))
			repo.deleteById(id);
	}

}
