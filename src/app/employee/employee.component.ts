
import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../model/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf]
})
export class EmployeeComponent {
  private builder = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private router = inject(Router);

  employeeForm = this.builder.group({
    name: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    city: ['', Validators.required],
    salary: [0, [Validators.required, Validators.min(0)]],
    gender: ['', Validators.pattern('^[MFX]$')],
    email: ['', Validators.email]
  });

  get name(): AbstractControl {
    return this.employeeForm.controls.name;
  }

  get dateOfBirth(): AbstractControl {
    return this.employeeForm.controls.dateOfBirth;
  }

  get city(): AbstractControl {
    return this.employeeForm.controls.city;
  }

  get salary(): AbstractControl {
    return this.employeeForm.controls.salary;
  }

  get gender(): AbstractControl {
    return this.employeeForm.controls.gender;
  }

  get email(): AbstractControl {
    return this.employeeForm.controls.email;
  }

  async onSubmit(): Promise<void> {
    console.log('Submit handler called');

    if (this.employeeForm.invalid) {
      console.warn('Form is invalid.');

      Object.entries(this.employeeForm.controls).forEach(
        ([field, control]) => {
          if (control.invalid) {
            console.warn(`Invalid field: ${field}`, control.errors);
          }
        }
      );

      this.employeeForm.markAllAsTouched();
      return;
    }

    const values = this.employeeForm.getRawValue();
    const [year, month, day] = values.dateOfBirth!.split('-').map(Number);

    const employee = new Employee(
      values.name!.trim(),
      new Date(year, month - 1, day),
      values.city!.trim(),
      Number(values.salary),
      values.gender || undefined,
      values.email || undefined
    );

    try {
      console.log('Saving employee:', employee);

      await this.employeeService.addEmployee(employee);

      console.log('Employee saved successfully');

      this.employeeForm.reset({
        name: '',
        dateOfBirth: '',
        city: '',
        salary: 0,
        gender: '',
        email: ''
      });

      await this.router.navigate(['/employees']);
    } catch (error) {
  console.error('Failed to save employee:', error);
  alert('Failed to save employee. Please try again.');
}
  }
}
