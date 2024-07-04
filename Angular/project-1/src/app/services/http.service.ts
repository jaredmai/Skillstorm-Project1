import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Office } from '../models/office';

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

  getEmployeesSortedByName() {
    return this.http.get(this.url + 'employee/sortName', { observe: 'response' });
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
    return this.http.put(this.url + 'employee', 
      employee,
      { observe: 'response' });
  }

  // a DELETE request to delete a Department
  deleteEmployee(employeeId: number) {
    return this.http.delete(this.url + 'employee/' + employeeId, { observe: 'response' });
  }



  getAllOffices() {
    return this.http.get(this.url + 'office', { observe: 'response' });
  }

  // a GET request for a single Department (by id as a path variable)
  getOfficeById(officeId: number) {
    return this.http.get(this.url + 'office/' + officeId, { observe: 'response' });
  }

  getOfficesSortedByName() {
    return this.http.get(this.url + 'office/sortName', { observe: 'response' });
  }

  // a POST request to create a Department
  addOffice(office: Office) {
    return this.http.post(this.url + 'office', 
      office,
      { observe: 'response' });
  }

  // a PUT request to update a Department
  // request parameters for name and id, List of employees in the body
  
  updateOffice(office: Office) {
    return this.http.put(this.url + 'office', 
      office,
      { observe: 'response' });
  }

  // a DELETE request to delete a Department
  deleteOffice(officeId: number) {
    return this.http.delete(this.url + 'office/' + officeId, { observe: 'response' });
  }
}

