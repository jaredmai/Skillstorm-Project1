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

  // Array to hold all the offices, will be used to create office cards
  offices: Office[] = [];
  // Array to hold all the office names, will be used for the search bar
  officeNames: string[] = [];
  // Variable to hold the search id
  searchId: number = 0;
  // Error flag for when the office does not exist when searching by id
  officeDoesNotExist: boolean = false;

  // this injects HttpClient for us to use
  // dependency injection
  constructor(private httpService: HttpService) {
    // method that makes the call
    this.getAllOffices();
  }

  // Object to hold the form data
  formOffice: Office = new Office(0, "", "", 0, []);

  // Error flag for when the office name is null
  isNameNull: boolean = false;

  // Method to add an office to the database
  addOffice() {
    // if the name is null, set the error flag to true and return
    if (this.formOffice.officeName == "") {
      this.isNameNull = true;
      return;
    }
    this.isNameNull = false;

    // make the call to the service
    this.httpService.addOffice(this.formOffice)
        .subscribe(response => {
          this.getAllOffices();
        });
  }

  // Get all offices from API, add them to the offices array
  getAllOffices() {
    // clear the arrays
    this.offices = [];
    this.officeNames = [];

    this.httpService.getAllOffices()
        .subscribe(response => {
          let body: any = response.body;

          for (let item of body) {
            // we're creating a new Office object for each item in the response
            // and pushing it into our offices array
            this.offices.push(new Office(item.officeId, item.officeName, item.officeAddress, item.officeMaxEmployees, item.employees));
            this.officeNames.push(item.officeName);
          }
        });
  }

  // Method to get all offices sorted by name
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

  // Method to get an office by id
  getOfficeById() {
    this.offices = [];

    this.httpService.getOfficeById(this.searchId)
        .subscribe(response => {
          let body: any = response.body;

          this.offices.push(new Office(body.officeId, body.officeName, body.officeAddress, body.officeMaxEmployees, body.employees));
        });
  }

  // Method to delete an office by id
  deleteOffice(officeId: number) {
    // confirm the deletion
    if (confirm("Are you sure you want to delete this office? ID: (" + officeId + ")")) {
      this.httpService.deleteOffice(officeId)
        .subscribe(data => {
          this.getAllOffices();
        });
    }
  }

  // this method runs when the deleteOfficeEvent is emitted from the child component
  processDeleteEvent(officeId: number) {
    this.deleteOffice(officeId);
  }

}
