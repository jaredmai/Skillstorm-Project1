package com.skillstorm.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity      				  // specifies that this class is representative of a DB entity
@Table(name = "employee")   // specifies which table these are coming from
public class Employee {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "employee_id")
	private int employeeId;
	
	@Column(name = "employee_firstname")
	private String employeeFirstName;
	
	@Column(name = "employee_lastname")
	private String employeeLastName;
	
	@Column(name = "employee_address")
	private String employeeAddress;
	
	@Column(name = "employee_ssn")
	private String employeeSsn;
	
	@Column(name = "employee_manager_id")
	private String employeeManagerId;
	
	// Needs to be foreign key
	@ManyToOne
	@JoinColumn(name = "office_id", referencedColumnName = "office_id")
	@JsonIgnoreProperties("employees")
	private Office office;
	
	public Employee() {
		super();
	}

	public Employee(int employeeId, String employeeFirstName, String employeeLastName, String employeeAddress,
			String employeeSsn, String employeeManagerId, Office office) {
		super();
		this.employeeId = employeeId;
		this.employeeFirstName = employeeFirstName;
		this.employeeLastName = employeeLastName;
		this.employeeAddress = employeeAddress;
		this.employeeSsn = employeeSsn;
		this.employeeManagerId = employeeManagerId;
		this.office = office;
	}

	public int getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}

	public String getEmployeeFirstName() {
		return employeeFirstName;
	}

	public void setEmployeeFirstName(String employeeFirstName) {
		this.employeeFirstName = employeeFirstName;
	}

	public String getEmployeeLastName() {
		return employeeLastName;
	}

	public void setEmployeeLastName(String employeeLastName) {
		this.employeeLastName = employeeLastName;
	}

	public String getEmployeeAddress() {
		return employeeAddress;
	}

	public void setEmployeeAddress(String employeeAddress) {
		this.employeeAddress = employeeAddress;
	}

	public String getEmployeeSsn() {
		return employeeSsn;
	}

	public void setEmployeeSsn(String employeeSsn) {
		this.employeeSsn = employeeSsn;
	}

	public String getEmployeeManagerId() {
		return employeeManagerId;
	}

	public void setEmployeeManagerId(String employeeManagerId) {
		this.employeeManagerId = employeeManagerId;
	}

	public Office getOffice() {
		return office;
	}

	public void setOffice(Office office) {
		this.office = office;
	}

	
	
	
	
}
