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

  employee: Employee = new Employee(0, "Test", "", "", "", 0, new Office(0, "", "", 0, []));
  officeDoesNotExist: boolean = false;
  maxEmployees: boolean = false;

  // ActivatedRoute allows us to have access to values included in the route/URL
  constructor(private route: ActivatedRoute, private httpService: HttpService, private router: Router) { 
    this.getEmployeeById();
  }

  getEmployeeById() {
    // this syntax allows us to access specific parameter values
    console.log(this.route.snapshot.params['id']);

    this.httpService.getEmployeeById(this.route.snapshot.params['id']) 
                        .subscribe(data => {
                          this.employee = data.body as Employee;
                          if (this.employee.office == null) {
                            this.employee.office = new Office(0, "Office Not Found", "", 0, []);
                          }
                          this.updatedEmployee = new Employee(this.employee.employeeId,
                                                     this.employee.employeeFirstName, 
                                                     this.employee.employeeLastName, 
                                                     this.employee.employeeAddress, 
                                                     this.employee.employeeSsn, 
                                                     this.employee.employeeManagerId, 
                                                     new Office(this.employee.office.officeId, this.employee.office.officeName, "", 0, []));
                          console.log(this.employee);
                         }
                      
                      );
                        
  }

  updatedEmployee: Employee = new Employee(0, "", "", "", "", 0, new Office(0, "", "", 0, []));


  routeToOfficeDetail(officeId: number) {
    this.router.navigate(['office/' + officeId]);
  }

  updateEmployee() {
    this.httpService.updateEmployee(this.updatedEmployee).subscribe(
      {
        next: data => {
          if (data.body && data.body !== null) {
            this.getEmployeeById();
            this.officeDoesNotExist = false;
            this.maxEmployees = false;
            console.log('success!');
          }
        },
        error: error => { // some lambda for an error response
  
          console.log(error);
          if (error.status == 400 && error.headers.get('error') == 'invalidOfficeId') {
            this.officeDoesNotExist = true;
            this.maxEmployees = false;
          } else if (error.status == 400 && error.headers.get('error') == 'maxEmployees') {
            this.maxEmployees = true;
            this.officeDoesNotExist = false;
          }
          this.getEmployeeById();
        },
        // a lambda for something to do AFTER a successful response
        // useful for void return HTTP methods like DELETE
        complete: () => {
          console.log('Complete');
        }
    });
  }
  

  

}
