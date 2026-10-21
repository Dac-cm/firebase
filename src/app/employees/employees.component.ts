
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, AsyncPipe, DatePipe]
})
export class EmployeesComponent {
  private readonly employeeService = inject(EmployeeService);

  protected readonly employees$ = this.employeeService.$;
}
