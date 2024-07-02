import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EmployeeCardComponent } from "../employee-card/employee-card.component";
import { Employee } from '../models/employee';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';

@Component({
    selector: 'app-employees',
    standalone: true,
    templateUrl: './employees.component.html',
    styleUrl: './employees.component.css',
    imports: [CommonModule, EmployeeCardComponent, FormsModule]
})
export class EmployeesComponent {

  employees: Employee[] = [];

  // this injects HttpClient for us to use
  // dependency injection
  // the client is a singleton, like when we inject services in Spring
  constructor(private httpService: HttpService) {
    // method that makes the call
    this.getAllEmployees();
  }

  formEmployee: Employee = new Employee(0, "", "", "", "", 0, {"officeId": 0});

  addEmployee() {
    this.httpService.updateEmployee(this.formEmployee)
        .subscribe(response => {
          console.log(response);
          this.getAllEmployees();
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
