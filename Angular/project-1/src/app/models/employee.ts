export class Employee {

    employeeId: number;
    employeeFirstName: string;
    employeeLastName: string;
    employeeAddress: string;
    employeeSsn: string;
    employeeManagerId: number;
    office: any;


    constructor(employeeId: number, employeeFirstName: string, employeeLastName: string, employeeAddress: string, employeeSsn: string, employeeManagerId: number, office: any) {
        this.employeeId = employeeId;
        this.employeeFirstName = employeeFirstName;
        this.employeeLastName = employeeLastName;
        this.employeeAddress = employeeAddress;
        this.employeeSsn = employeeSsn;
        this.employeeManagerId = employeeManagerId;
        this.office = office;
    }

}
