package com.skillstorm.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.skillstorm.models.Office;

@Repository
public interface OfficeRepository extends CrudRepository<Office, Integer> {

	// Sort offices by Name
	@Query(value = "SELECT * FROM office ORDER BY office_name", nativeQuery = true)
	public Iterable<Office> findAllSortedByName();
	
	// Get Count of Offices by Name
	@Query(value = "SELECT COUNT(*) FROM office WHERE office_name = :officeName", nativeQuery = true)
	public int officeCountByName(@Param("officeName") String officeName);
	
}
