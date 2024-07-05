import { Component } from '@angular/core';
import { Office } from '../models/office';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-office-detail',
  standalone: true,
  imports: [NgClass, FormsModule],
  templateUrl: './office-detail.component.html',
  styleUrl: './office-detail.component.css'
})
export class OfficeDetailComponent {

  // Object to hold office information, received from the API
  office: Office = new Office(0, "Test", "", 0, []);
  // Object to hold office information, to be updated from form
  updatedOffice: Office = new Office(0, "Test", "", 0, []);
  // Error flag for when an trying to update max employees to a number less than the current number of employees
  maxEmployees: boolean = false;

  // ActivatedRoute allows us to have access to values included in the route/URL
  // HttpService allows us to make API calls
  // Router allows us to navigate to different components
  constructor(private route: ActivatedRoute, private httpService: HttpService, private router : Router) { 
    this.getOfficeById();
  }

  // Method to get the office by the id in the route from API
  getOfficeById() {
    // this syntax allows us to access specific parameter values
    console.log(this.route.snapshot.params['id']);

    this.httpService.getOfficeById(this.route.snapshot.params['id']) 
                        .subscribe(data => {
                          this.office = data.body as Office;
                          this.updatedOffice = new Office(this.office.officeId, this.office.officeName, this.office.officeAddress, this.office.officeMaxEmployees, this.office.employees);
    });
                        
  }

  // Method to route to the employee detail page
  routeToEmployeeDetail(employeeId: number) {
    this.router.navigate(['employee/' + employeeId]);

  }


  // Method to update the office
  updateOffice() {
    this.httpService.updateOffice(this.updatedOffice).subscribe({
      // Response was successful, so we're going to get the office again and set all errors to false
      next: data => {
        if (data.body && data.body !== null) {
          this.getOfficeById();
          // Reset the error flags
          this.maxEmployees = false;
        }
      },
      // Response was an error, so we're going to get to set the error flags
      error: error => {

        console.log(error.headers);
        // If the error is a 400 and the header is maxEmployees, we set maxEmployees to true
        if (error.status == 400 && error.headers.get('error') == 'maxEmployees') {
          this.maxEmployees = true;
        }

        // Get the office again to reset the form
        this.getOfficeById();
      },
    });
  }

}
