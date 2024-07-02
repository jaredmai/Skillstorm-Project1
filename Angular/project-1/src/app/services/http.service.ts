import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';

// in Angular @something is called a Decorator
// basically just like a Spring annotation
// indicates the function/type of a file

// @Injectable means this is a service that can be injected
// as a dependency in another component
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  url: String = 'http://localhost:8080/';
  

  // a GET request for all Departments
  getAllEmployees() {
    return this.http.get(this.url + 'employee', { observe: 'response' });
  }

  // a GET request for a single Department (by id as a path variable)
  getEmployeeById(employeeId: number) {
    return this.http.get(this.url + 'employee/' + employeeId, { observe: 'response' });
  }

  // a POST request to create a Department
  createEmployee(employee: Employee) {
    return this.http.post(this.url + 'employee', 
      employee,
      // the above is equivalent to this but with an
      // enforced adherence to the Department format
      // {'departmentId': 123,
      // 'departmentName': 'Test Post Department',
      // 'employees': []}, 
      { observe: 'response' });
  }

  // a PUT request to update a Department
  // request parameters for name and id, List of employees in the body
  
  updateEmployee(employee: Employee) {
    return this.http.post(this.url + 'employee', 
      employee,
      { observe: 'response' });
  }

  // a DELETE request to delete a Department
  deleteEmployee(employeeId: number) {
    return this.http.delete(this.url + 'employee/' + employeeId, { observe: 'response' });
  }
}

