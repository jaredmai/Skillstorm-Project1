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

  constructor(private router: Router) {}

  @Input() office: Office = new Office(0, "", "", 0, []);
  

  @Output() deleteOfficeEvent = new EventEmitter<number>();

  deleteOffice() {
    this.deleteOfficeEvent.emit(this.office.officeId);
  }

  editOffice() {
    this.router.navigate(['office/' + this.office.officeId]);
  }
}
