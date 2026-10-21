
import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  CollectionReference
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Employee } from '../model/employee';

interface EmployeeDocument {
  name?: string;
  dateOfBirth?: unknown;
  city?: string;
  salary?: number | string;
  gender?: string;
  email?: string;
  id?: string;
}

function parseDate(value: unknown): Date {
  if (value instanceof Date) {
    return value;
  }

  // Supports Firestore Timestamp values.
  if (
    value !== null &&
    typeof value === 'object' &&
    'toDate' in value &&
    typeof value.toDate === 'function'
  ) {
    return value.toDate();
  }

  if (typeof value === 'string' && value.length > 0) {
    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);

    if (match) {
      return new Date(
        Number(match[1]),
        Number(match[2]) - 1,
        Number(match[3])
      );
    }

    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }

  return new Date(0);
}

function dateToLocalString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly firestore = inject(Firestore);

  private readonly employeesCollection: CollectionReference =
    collection(this.firestore, 'employees');

  get $(): Observable<readonly Employee[]> {
    return collectionData(this.employeesCollection, {
      idField: 'id'
    }).pipe(
      map(records =>
        (records as EmployeeDocument[]).map(record =>
          new Employee(
            record.name ?? '',
            parseDate(record.dateOfBirth),
            record.city ?? '',
            Number(record.salary ?? 0),
            record.gender ?? '',
            record.email ?? ''
          )
        )
      )
    );
  }

  async addEmployee(employee: Employee): Promise<void> {
    await addDoc(this.employeesCollection, {
      name: employee.name,
      dateOfBirth: dateToLocalString(employee.dateOfBirth),
      city: employee.city,
      salary: Number(employee.salary),
      gender: employee.gender ?? '',
      email: employee.email ?? ''
    });
  }
}
