import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // Injecting the HttpService to make API calls
  constructor(private httpSerivce: HttpService) { 
    this.getTotalEmployees();
    this.getTotalOffices();
  }

  // Variables to hold the total number of employees and offices
  totalEmployees: number = 0;
  totalOffices: number = 0;

  // Function to get the total number of employees
  getTotalEmployees() {
    this.httpSerivce.getAllEmployees().subscribe((data: any) => {
      this.totalEmployees = data.body.length;
    });
  }

  // Function to get the total number of offices
  getTotalOffices() {
    this.httpSerivce.getAllOffices().subscribe((data: any) => {
      this.totalOffices = data.body.length;
    });
  }
}
