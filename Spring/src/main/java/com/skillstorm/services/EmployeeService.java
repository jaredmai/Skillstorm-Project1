package com.skillstorm.services;

import org.springframework.beans.factory.annotation.Autowired;
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
	
	// Update by ID
	public ResponseEntity<Employee> updateEmployee(Employee employee) {
		if (!repo.existsById(employee.getEmployeeId()))
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					 .header("Error", "An employee with this ID doesn't exist!")
					 .body(null);
		
		if (repo.countEmployeesByOffice(employee.getOffice().getOfficeId()) >= employee.getOffice().getOfficeMaxEmployees())
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.header("Error", "Office has max employees!")
					.body(null);
			
		return ResponseEntity.status(HttpStatus.OK)
				 .header("Message", "We successfully saved an employee by ID")
				 .body(repo.save(employee));
	}
	
	// Create by ID
	public ResponseEntity<Employee> createEmployee(Employee employee) {
		if (repo.existsById(employee.getEmployeeId())) {
			System.out.println("ID EXISTS");
			return ResponseEntity.status(HttpStatus.CONFLICT)
					 .header("Error", "An employee with this ID already exists!")
					 .body(null);
		}
		
//		if (repo.countEmployeesByOffice(employee.getOffice().getOfficeId()) >= employee.getOffice().getOfficeMaxEmployees()) {
//			System.out.println(employee.getOffice().getOfficeMaxEmployees());
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//					.header("Error", "Office has max employees!")
//					.body(null);
//		}
		
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
