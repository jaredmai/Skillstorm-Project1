import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Office } from '../models/office';
import { Router } from '@angular/router';

@Component({
  selector: 'app-office-card',
  standalone: true,
  imports: [],
  templateUrl: './office-card.component.html',
  styleUrl: './office-card.component.css'
})
export class OfficeCardComponent {

  // Injecting the Router to navigate to the edit page
  constructor(private router: Router) {}

  // This is the office object that will be passed in from the parent component
  @Input() office: Office = new Office(0, "", "", 0, []);
  
  // This is the event emitter that will be used to delete an office
  @Output() deleteOfficeEvent = new EventEmitter<number>();

  // Method to emit the delete event
  deleteOffice() {
    this.deleteOfficeEvent.emit(this.office.officeId);
  }

  // Method to navigate to the edit page
  editOffice() {
    this.router.navigate(['office/' + this.office.officeId]);
  }
}
