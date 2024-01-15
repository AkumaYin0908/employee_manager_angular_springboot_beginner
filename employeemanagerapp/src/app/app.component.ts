import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HttpClientModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'employeemanagerapp';

  public employees:Employee[]=[];
  public editEmployee!:Employee|null;
  public deleteEmployee!:Employee|null;

  constructor(private employeeService: EmployeeService){}

  ngOnInit(): void {
    this.getEmployees();
  }
  
  public getEmployees():void{
    this.employeeService.getEmployees().subscribe(
      (response:Employee[]) =>{
        this.employees=response;
      },
      (error:HttpErrorResponse) =>{
       console.log(error.message);
      }
    );
  }

  public addEmployee(addForm:NgForm):void{
      document.getElementById("add-employee-form")?.click();
      this.employeeService.addEmployee(addForm.value).subscribe(
        (response : Employee) =>{
            console.log(response);
            this.getEmployees();
            addForm.reset();
        },
        (error: HttpErrorResponse)=>{
          alert(error.message);
          addForm.reset();
        }
      );
  }


  public updateEmployee(employee:Employee):void{
   
    this.employeeService.updateEmployee(employee).subscribe(
        (response: Employee)=>{
            console.log(response);
              this.getEmployees();
          },
        (error: HttpErrorResponse)=>{
          alert(error.message);
        }
      );

  }

  public searchEmployees(key:string) :void{
  console.log(key);

  if (!key) {
    this.getEmployees();
    return;
  }

  const results: Employee[] = this.employees.filter((employee) =>
    this.employeeMatchesSearch(employee, key)
  );

  this.employees = results;

  console.log(results.length);
    
  }

  private employeeMatchesSearch(employee: Employee, key: string): boolean {
  const searchKey = key.toLowerCase();

  return (
    employee.name.toLowerCase().includes(searchKey) ||
    employee.email.toLowerCase().includes(searchKey) ||
    employee.phone.toLowerCase().includes(searchKey) ||
    employee.jobTitle.toLowerCase().includes(searchKey)
  );
}

  public deleteEmployeeById(employeeId:number|undefined) : void{
    this.employeeService.deleteEmployee(employeeId!).subscribe(
      (response : void) =>{
        console.log(response);
        this.getEmployees();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  public onOpenModal(employee:Employee|null, mode:string) :void {
    const container = document.getElementById("main-container");

    const button =document.createElement("button");
    button.type="button";
    button.style.display="none";
    button.setAttribute("data-bs-toggle","modal");

    if(mode === "add"){
      button.setAttribute("data-bs-target","#addEmployeeModal");
    }else if(mode === "edit"){
      this.editEmployee = employee;
      button.setAttribute("data-bs-target","#editEmployeeModal");
    }else if(mode === "delete"){
      this.deleteEmployee=employee;
      button.setAttribute("data-bs-target","#deleteEmployeeModal");
    }

    container?.appendChild(button);
    button.click();

  }
}
