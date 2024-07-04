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

  constructor(private httpSerivce: HttpService) { 
    this.getTotalEmployees();
    this.getTotalOffices();
  }

  totalEmployees: number = 0;
  totalOffices: number = 0;

  getTotalEmployees() {
    this.httpSerivce.getAllEmployees().subscribe((data: any) => {
      this.totalEmployees = data.body.length;
    });
  }

  getTotalOffices() {
    this.httpSerivce.getAllOffices().subscribe((data: any) => {
      this.totalOffices = data.body.length;
    });
  }
}
