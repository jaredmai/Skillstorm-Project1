import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EmployeeCardComponent } from "../employee-card/employee-card.component";
import { Employee } from '../models/employee';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { Office } from '../models/office';

@Component({
    selector: 'app-employees',
    standalone: true,
    templateUrl: './employees.component.html',
    styleUrl: './employees.component.css',
    imports: [CommonModule, EmployeeCardComponent, FormsModule]
})
export class EmployeesComponent {

  // this is the array that will hold all of our employees
  // We create an employee card for every item in the array
  employees: Employee[] = [];

  // this is the searchId that will be used to search for an employee
  searchId: number = 0;

  // error flag for when an employee does not exist when searching by id
  employeeDoesNotExist: boolean = false;
  // error flag for when an office does not exist when adding an employee
  officeDoesNotExist: boolean = false;
  // error flag for when an office is at max capacity when adding an employee
  maxEmployees: boolean = false;

  // this injects HttpClient for us to use
  // dependency injection
  // the client is a singleton, like when we inject services in Spring
  constructor(private httpService: HttpService) {
    // method that makes the call
    this.getAllEmployees();
  }

  // this is the object that will be bound to the form
  formEmployee: Employee = new Employee(0, "", "", "", "", 0, new Office(0, "", "", 0, []));

  // this method will be called when the form is submitted
  addEmployee() {
    this.httpService.createEmployee(this.formEmployee)
    .subscribe(
      // this object contains our observer arguments
      // next for success, error for failure, complete for all

      // Response was successful, so we're going to get all employees again and set all errors to false
    {
      next: data => {
        this.employees = [];
        if (data.body && data.body !== null) {
          this.getAllEmployees();
          this.officeDoesNotExist = false;
          this.maxEmployees = false;
        }
      },

      // Response was an error, so we're going to set the appropriate error to true
      error: error => {

        // If the error is a 400 and the header is badOfficeId, we set officeDoesNotExist to true
        if (error.status == 404 && error.headers.get('error') == 'badOfficeId') {
          this.officeDoesNotExist = true;

        // If the error is a 400 and the header is maxEmployees, we set maxEmployees to true
        } else if (error.status == 400 && error.headers.get('error') == 'maxEmployees') {
          this.maxEmployees = true;
        }
      },
    });
  }


  // Method to get all employees and add them to the employees array
  getAllEmployees() {
    this.employees = [];

    this.httpService.getAllEmployees()
        .subscribe(response => {
          let body: any = response.body;

          for (let item of body) {
            // we're creating a new Employee object for each item in the response
            // and pushing it into our employee array
            this.employees.push(new Employee(item.employeeId, item.employeeFirstName, item.employeeLastName, item.employeeAddress, item.employeeSsn, item.employeeManagerId, item.office));
          }
        });
    }

  // Method to get all employees sorted by name and add them to the employees array
  getEmployeesSortedByName() {
    this.employees = [];

    this.httpService.getEmployeesSortedByName()
        .subscribe(response => {
          let body: any = response.body;

          for (let item of body) {
            this.employees.push(new Employee(item.employeeId, item.employeeFirstName, item.employeeLastName, item.employeeAddress, item.employeeSsn, item.employeeManagerId, item.office));
          }
        });
  }

  // Get a specific employee by ID, used in the search feature. Will only show one employee card when used
  getEmployeeById() {

    // Send the HTTP Request
    this.httpService.getEmployeeById(this.searchId).subscribe(
    {
      // response was successful, clear the employees array and add the employee to it
      next: data => {
        this.employees = [];
        if (data.body && data.body !== null) {
          this.employees.push(data.body as Employee);
          this.employeeDoesNotExist = false;
        }
      },
      // response was an error, set the employeeDoesNotExist flag to true
      error: error => {
        this.employeeDoesNotExist = true;
        this.getAllEmployees();
      },
    });
  }

  // Method to delete an employee by ID
  // This method will call the deleteEmployee method in the httpService
  deleteEmployee(employeeId: number) {
    // Confirm the user wants to delete the employee
    if (confirm("Are you sure you want to delete this employee? (ID: " + employeeId + ")")) {
      this.httpService.deleteEmployee(employeeId)
      .subscribe(data => {
        this.getAllEmployees();
      });
    }
  }

  // Listener for the delete event from the employee card component
  // Pass the id into deleteEmployee()
  processDeleteEvent(employeeId: number) {
    this.deleteEmployee(employeeId);
  }

}
