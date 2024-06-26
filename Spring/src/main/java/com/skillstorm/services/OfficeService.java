package com.skillstorm.services;

import org.springframework.beans.factory.annotation.Autowired;
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
		
		// Get by ID
		public Office getOfficeById(int id) {
			if (!repo.existsById(id))
				return null;
			return repo.findById(id).get();
		}
		
		// Update by ID
		public Office updateOffice(Office office) {
			if (!repo.existsById(office.getOfficeId()))
				return null;
			return repo.save(office);
		}
		
		// Create by ID
		public Office createOffice(Office office) {
			if (repo.existsById(office.getOfficeId()))
				return null;
			return repo.save(office);
		}
		
		// Delete by ID
		public void deleteOfficeById(int id) {
			if (repo.existsById(id))
				repo.deleteById(id);
		}
	
}
