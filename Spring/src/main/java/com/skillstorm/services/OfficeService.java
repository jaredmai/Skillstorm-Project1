package com.skillstorm.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.skillstorm.models.Office;
import com.skillstorm.repositories.OfficeRepository;

@Service
public class OfficeService {

	@Autowired
	private OfficeRepository repo;
	
	// Get All
	public Iterable<Office> getAllOffices() {
		return repo.findAll();
	}
	
	public Iterable<Office> getOfficeSortedByName() {
		return repo.findAllSortedByName();
	}
	
	// Get by ID
	public ResponseEntity<Office> getOfficeById(int id) {
		if (!repo.existsById(id))
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					 .header("Error", "An office with this ID doesn't exist!")
					 .body(null);
		return ResponseEntity.status(HttpStatus.OK)
				 .header("Message", "We successfully got a Office by ID")
				 .body(repo.findById(id).get());
	}
	
	
	
	// Update by ID
	public ResponseEntity<Office> updateOffice(Office office) {
		if (!repo.existsById(office.getOfficeId()))
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					 .header("error", "invalidId")
					 .body(null);
		
		if (office.getOfficeMaxEmployees() < office.getEmployees().size())
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					 .header("error", "maxEmployees")
					 .body(null);
			
		return ResponseEntity.status(HttpStatus.OK)
				 .header("Message", "We successfully saved an Office by ID")
				 .body(repo.save(office));
	}
	
	// Create by ID
	public ResponseEntity<Office> createOffice(Office office) {
		if (repo.existsById(office.getOfficeId()))
			return ResponseEntity.status(HttpStatus.CONFLICT)
					 .header("error", "idAlreadyExists")
					 .body(null);
		
		if (repo.officeCountByName(office.getOfficeName()) > 0) {
			return ResponseEntity.status(HttpStatus.CONFLICT)
					 .header("error", "nameAlreadyExists")
					 .body(null);
		}
		return ResponseEntity.status(HttpStatus.OK)
				 .header("Message", "We successfully created an Office")
				 .body(repo.save(office));
	}
	
	// Delete by ID
	public void deleteOfficeById(int id) {
		if (repo.existsById(id))
			repo.deleteById(id);
	}
	
}
