import { Employee } from "./employee";

export class Office {

    officeId: number;
    officeName: string;
    officeAddress: string;
    officeMaxEmployees: number;
    employees: Employee[];

    constructor(officeId: number, officeName: string, officeAddress: string, officeMaxEmployees: number, employees: Employee[]) {
        this.officeId = officeId;
        this.officeName = officeName;
        this.officeAddress = officeAddress;
        this.officeMaxEmployees = officeMaxEmployees;
        this.employees = employees;
    }

}
