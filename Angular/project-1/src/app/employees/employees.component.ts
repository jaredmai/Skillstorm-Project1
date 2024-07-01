import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {

  data: any = [];

  // this injects HttpClient for us to use
  // dependency injection
  // the client is a singleton, like when we inject services in Spring
  constructor(private http: HttpClient) {
    // method that makes the call

    this.http.get('http://localhost:8080/employee', { observe: 'response' })
        .subscribe(response => {
          this.data = response.body;
        });
  }

}
