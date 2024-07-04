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

  office: Office = new Office(0, "Test", "", 0, []);
  updatedOffice: Office = new Office(0, "Test", "", 0, []);
  maxEmployees: boolean = false;

  // ActivatedRoute allows us to have access to values included in the route/URL
  constructor(private route: ActivatedRoute, private httpService: HttpService, private router : Router) { 
    this.getOfficeById();
  }

  getOfficeById() {
    // this syntax allows us to access specific parameter values
    console.log(this.route.snapshot.params['id']);

    this.httpService.getOfficeById(this.route.snapshot.params['id']) 
                        .subscribe(data => {
                          this.office = data.body as Office;
                          this.updatedOffice = new Office(this.office.officeId, this.office.officeName, this.office.officeAddress, this.office.officeMaxEmployees, this.office.employees);
    });
                        
  }

  routeToEmployeeDetail(employeeId: number) {
    this.router.navigate(['employee/' + employeeId]);

  }



  updateOffice() {
    this.httpService.updateOffice(this.updatedOffice).subscribe({
      next: data => {
        if (data.body && data.body !== null) {
          this.getOfficeById();
          this.maxEmployees = false;
          console.log('success!');
        }
      },
      error: error => { // some lambda for an error response

        console.log(error.headers);
        if (error.status == 400 && error.headers.get('error') == 'maxEmployees') {
          this.maxEmployees = true;
        }
        this.getOfficeById();
      },
      // a lambda for something to do AFTER a successful response
      // useful for void return HTTP methods like DELETE
      complete: () => {
        console.log('Complete');
      }
    });
  }

}
