import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';
import { OfficesComponent } from './offices/offices.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { OfficeDetailComponent } from './office-detail/office-detail.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },

    {
        path: 'employees',
        component: EmployeesComponent
    },

    {
        path: 'offices',
        component: OfficesComponent
    },

    {
        path: 'employee/:id',
        component: EmployeeDetailComponent
    },

    {
        path: 'office/:id',
        component: OfficeDetailComponent
    }
];
