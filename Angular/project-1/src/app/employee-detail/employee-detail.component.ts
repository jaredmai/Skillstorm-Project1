import { Component } from '@angular/core';
import { Employee } from '../models/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { Office } from '../models/office';
import { FormsModule, NgModel } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [NgClass, FormsModule],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent {

  // Employee object to hold the employee we are displaying
  employee: Employee = new Employee(0, "Test", "", "", "", 0, new Office(0, "", "", 0, []));

  // Boolean activated when user attempts to add an employee to an office that is at max capacity
  maxEmployees: boolean = false;

  // ActivatedRoute allows us to have access to values included in the route/URL
  constructor(private route: ActivatedRoute, private httpService: HttpService, private router: Router) { 
    this.getEmployeeById();
  }

  // Function to get the employee by the employeeId included in the route
  getEmployeeById() {
    // this syntax allows us to access specific parameter values
    console.log(this.route.snapshot.params['id']);

    // Actualling sending the http request to get the employee by the employeeId
    this.httpService.getEmployeeById(this.route.snapshot.params['id']) 
                        .subscribe(data => {
                          // Casting the response body to an Employee object
                          this.employee = data.body as Employee;

                          // If office is null, we create a dummy office object to prevent errors
                          if (this.employee.office == null) {
                            this.employee.office = new Office(0, "Office Not Found", "", 0, []);
                          }

                          // Setting the updatedEmployee object to the employee object we just received
                          this.updatedEmployee = new Employee(this.employee.employeeId,
                                                     this.employee.employeeFirstName, 
                                                     this.employee.employeeLastName, 
                                                     this.employee.employeeAddress, 
                                                     this.employee.employeeSsn, 
                                                     this.employee.employeeManagerId, 
                                                     // We only need officeId and officeName for the updatedEmployee object
                                                     // Thus, we create a new Office object with only those values
                                                     new Office(this.employee.office.officeId, this.employee.office.officeName, "", 0, []));
                         }
                      
                      );
                        
  }

  // Employee object to hold the updated employee information for the form
  updatedEmployee: Employee = new Employee(0, "", "", "", "", 0, new Office(0, "", "", 0, []));

  // Function to route the user to the OfficeDetailComponent with the officeId of the office to be viewed
  // This function is called when the user clicks on the office name or id in the employee detail view
  routeToOfficeDetail(officeId: number) {
    this.router.navigate(['office/' + officeId]);
  }

  // Function to update the employee information based on the form input
  updateEmployee() {
    this.httpService.updateEmployee(this.updatedEmployee).subscribe(
      {
        // If the update is successful, we get the updated employee information
        next: data => {
          if (data.body && data.body !== null) {
            this.getEmployeeById();
            this.maxEmployees = false;
          }
        },
        // If the update is unsuccessful, we get the error response and display a message to the user
        error: error => {
          // If the error status is 400 and the error header is 'maxEmployees', we set the maxEmployees boolean to true
          if (error.status == 400 && error.headers.get('error') == 'maxEmployees') {
            this.maxEmployees = true;
          }

          // Update the employee information regardless of the error, so the user can see the current information
          this.getEmployeeById();
        },
    });
  }
  

  

}
