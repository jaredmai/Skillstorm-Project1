import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OfficeCardComponent } from "../office-card/office-card.component";
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { Office } from '../models/office';

@Component({
    selector: 'app-offices',
    standalone: true,
    templateUrl: './offices.component.html',
    styleUrl: './offices.component.css',
    imports: [CommonModule, OfficeCardComponent, FormsModule]
})
export class OfficesComponent {

  offices: Office[] = [];
  officeNames: string[] = [];
  searchId: number = 0;
  officeDoesNotExist: boolean = false;

  // this injects HttpClient for us to use
  // dependency injection
  // the client is a singleton, like when we inject services in Spring
  constructor(private httpService: HttpService) {
    // method that makes the call
    this.getAllOffices();
  }

  formOffice: Office = new Office(0, "", "", 0, []);

  isNameNull: boolean = false;

  addOffice() {
    if (this.formOffice.officeName == "") {
      this.isNameNull = true;
      return;
    }
    this.isNameNull = false;
    console.log(this.formOffice)
    this.httpService.addOffice(this.formOffice)
        .subscribe(response => {
          console.log(response);
          this.getAllOffices();
        });
  }

  getAllOffices() {
    this.offices = [];
    this.officeNames = [];

    this.httpService.getAllOffices()
        .subscribe(response => {
          let body: any = response.body;

          for (let item of body) {
            // we're creating a new Department object for each item in the response
            // and pushing it into our departments array
            this.offices.push(new Office(item.officeId, item.officeName, item.officeAddress, item.officeMaxEmployees, item.employees));
            this.officeNames.push(item.officeName);
          }
        });
  }

  getOfficesSortedByName() {
    this.offices = [];

    this.httpService.getOfficesSortedByName()
        .subscribe(response => {
          let body: any = response.body;

          for (let item of body) {
            this.offices.push(new Office(item.officeId, item.officeName, item.officeAddress, item.officeMaxEmployees, item.employees));
          }
        });
  }

  getOfficeById() {
    this.offices = [];

    this.httpService.getOfficeById(this.searchId)
        .subscribe(response => {
          let body: any = response.body;

          this.offices.push(new Office(body.officeId, body.officeName, body.officeAddress, body.officeMaxEmployees, body.employees));
        });
  }

  deleteOffice(officeId: number) {
    this.httpService.deleteOffice(officeId)
      .subscribe(data => {
        this.getAllOffices();
      });
  }

  // this method runs when the deleteDepartmentEvent is emitted from the child component
  processDeleteEvent(officeId: number) {
    this.deleteOffice(officeId);
  }

}
