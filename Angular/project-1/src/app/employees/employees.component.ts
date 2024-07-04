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

  employees: Employee[] = [];
  searchId: number = 0;
  employeeDoesNotExist: boolean = false;
  officeDoesNotExist: boolean = false;
  maxEmployees: boolean = false;

  // this injects HttpClient for us to use
  // dependency injection
  // the client is a singleton, like when we inject services in Spring
  constructor(private httpService: HttpService) {
    // method that makes the call
    this.getAllEmployees();
  }

  formEmployee: Employee = new Employee(0, "", "", "", "", 0, new Office(0, "", "", 0, []));
  addEmployee() {
    this.httpService.createEmployee(this.formEmployee)
    .subscribe(
      // this object contains our observer arguments
      // next for success, error for failure, complete for all
    {
      next: data => {
        this.employees = [];
        if (data.body && data.body !== null) {
          this.getAllEmployees();
          this.officeDoesNotExist = false;
          this.maxEmployees = false;
          console.log('success!');
        }
      },
      error: error => { // some lambda for an error response

        console.log(error.headers);
        if (error.status == 400 && error.headers.get('error') == 'badOfficeId') {
          this.officeDoesNotExist = true;
        } else if (error.status == 400 && error.headers.get('error') == 'maxEmployees') {
          this.maxEmployees = true;
        }
        this.getAllEmployees();
      },
      // a lambda for something to do AFTER a successful response
      // useful for void return HTTP methods like DELETE
      complete: () => {
        console.log('Complete');
      }
    });
  }

  getAllEmployees() {
    this.employees = [];

    this.httpService.getAllEmployees()
        .subscribe(response => {
          let body: any = response.body;

          for (let item of body) {
            // we're creating a new Department object for each item in the response
            // and pushing it into our departments array
            this.employees.push(new Employee(item.employeeId, item.employeeFirstName, item.employeeLastName, item.employeeAddress, item.employeeSsn, item.employeeManagerId, item.office));
          }
        });
    }

  getEmployeesSortedByName() {
    this.employees = [];

    this.httpService.getEmployeesSortedByName()
        .subscribe(response => {
          let body: any = response.body;

          for (let item of body) {
            // we're creating a new Department object for each item in the response
            // and pushing it into our departments array
            console.log(item);
            this.employees.push(new Employee(item.employeeId, item.employeeFirstName, item.employeeLastName, item.employeeAddress, item.employeeSsn, item.employeeManagerId, item.office));
          }
        });
  }

  getEmployeeById() {
    this.httpService.getEmployeeById(this.searchId).subscribe(
      // this object contains our observer arguments
      // next for success, error for failure, complete for all
    {
      next: data => {
        this.employees = [];
        if (data.body && data.body !== null) {
          this.employees.push(data.body as Employee);
          this.employeeDoesNotExist = false;
          console.log('success!');
        }
      },
      error: error => { // some lambda for an error response
        console.log(error);
        this.employeeDoesNotExist = true;
        this.getAllEmployees();
      },
      // a lambda for something to do AFTER a successful response
      // useful for void return HTTP methods like DELETE
      complete: () => {
        console.log('Complete');
      }
    });
  }

  deleteEmployee(employeeId: number) {
    this.httpService.deleteEmployee(employeeId)
      .subscribe(data => {
        this.getAllEmployees();
      });
  }

  // this method runs when the deleteDepartmentEvent is emitted from the child component
  processDeleteEvent(employeeId: number) {
    this.deleteEmployee(employeeId);
  }

}
