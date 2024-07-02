import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.css'
})
export class EmployeeCardComponent {

  @Input() employee: Employee = new Employee(0, "Test", "", "", "", 0, null);
  

  @Output() deleteEmployeeEvent = new EventEmitter<number>();

  deleteEmployee() {
    this.deleteEmployeeEvent.emit(this.employee.employeeId);
  }
}
