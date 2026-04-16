import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'total', pure: true })
export class TotalPipe implements PipeTransform {

    transform(items: any[], field: string): number {
        if (!items || !field) return 0;

        return items.reduce((sum, item) => sum + (+item[field] || 0), 0);
    }
}

//Usage HTML
// expenses = [
//   { amount: '200' },
//   { amount: '300' }
// ];

// {{ expenses | total:'amount' | currencyFormat }} = ₹500.00


@Pipe({ name: 'balance', pure: true })
export class BalancePipe implements PipeTransform {

    transform(transactions: any[]): number {
        if (!transactions) return 0;

        return transactions.reduce((balance, t) => {
            return t.type === 'income'
                ? balance + t.amount
                : balance - t.amount;
        }, 0);
    }
}

// Usage HTML
// transactions = [
//   { type: 'income', amount: 5000 },
//   { type: 'expense', amount: 2000 },
//   { type: 'income', amount: 3000 },
//   { type: 'expense', amount: 1000 }
// ];

// Calculation How to:-
// 5000 (income)
// -2000 (expense)
// +3000 (income)
// -1000 (expense)
// = 5000 ✅

// <h3>{{ transactions | balance | currencyFormat }}</h3> = ₹5000.00


@Pipe({ name: 'currencyFormat', pure: true })
export class CurrencyFormatPipe implements PipeTransform {

    transform(value: number, currency: string = 'INR'): string {
        if (value == null) return '';

        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    }
}

// Usage HTML
// <p>{{ 1500 | currencyFormat }}</p> = ₹1,500.00


@Pipe({ name: 'numberFormat', pure: true })
export class NumberFormatPipe implements PipeTransform {

    transform(value: number, currencySymbol: string = '₹'): string {
        if (value == null) return '';

        const absValue = Math.abs(value);
        let result = '';

        if (absValue >= 10000000) result = (absValue / 10000000).toFixed(2) + ' Cr';
        else if (absValue >= 100000) result = (absValue / 100000).toFixed(2) + ' L';
        else if (absValue >= 1000) result = (absValue / 1000).toFixed(2) + ' K';
        else result = absValue.toString();

        return value < 0
            ? `-${currencySymbol} ${result}`
            : `${currencySymbol} ${result}`;
    }
}

// Usage HTML
// {{ 1250000 | numberFormat }} = ₹12.50 L
// {{ 1250000 | numberFormat:'$' }} = $12.50 L
// {{ -45000 | numberFormat }} = -₹45.00 K


@Pipe({ name: 'searchBy', pure: true })
export class SearchPipe implements PipeTransform {

    transform(items: any[], field: string, value: any): any[] {
        if (!Array.isArray(items) || !field) return items;

        if (value == null || value.toString().trim() === '') return items;

        const search = value.toString().toLowerCase().trim();

        return items.filter(item => {
            const fieldValue = item?.[field];

            if (fieldValue == null) return false;

            return fieldValue
                .toString()
                .toLowerCase()
                .includes(search);
        });
    }
}

//Usage HTML
// users = [
//   { name: 'John', role: 'Admin', age: 28 },
//   { name: 'Alice', role: 'User', age: 24 },
//   { name: 'Bob', role: 'Admin', age: 30 }
// ];

// Real Use Case (Table Search)
// <input [(ngModel)]="searchText" placeholder="Search...">

// <tr *ngFor="let user of users | searchBy:'name':searchText">
//   <td>{{ user.name }}</td>
//   <td>{{ user.role }}</td>
// </tr>

// Ex: searchText = 'jo';
// Output => John - Admin


@Pipe({ name: 'filterBy', pure: true })
export class FilterPipe implements PipeTransform {

    transform(items: any[], field: string, value: any): any[] {
        if (!items || !field) return items;

        return items.filter(item => item[field] === value);
    }
}

//Usage HTML
// users = [
//   { name: 'John', role: 'admin', age: 28 },
//   { name: 'Alice', role: 'user', age: 24 },
//   { name: 'Bob', role: 'admin', age: 30 }
// ];

// <div *ngFor="let user of users | filterBy:'age':24">
//   {{ user.name }}
// </div>

// Output => Alice

// It only supports exact match

// Real Use Case (Dropdown Filter) - *Important*
// <select [(ngModel)]="selectedRole">
//   <option value="">All</option>
//   <option value="admin">Admin</option>
//   <option value="user">User</option>
// </select>


// <div *ngFor="let user of users | filterBy:'role':selectedRole">
//   {{ user.name }}
// </div>


@Pipe({ name: 'sortBy', pure: true })
export class SortPipe implements PipeTransform {

    transform(items: any[], field: string, direction: 'asc' | 'desc' = 'asc'): any[] {
        if (!items || !field) return items;

        return [...items].sort((a, b) => {
            let valA = a[field];
            let valB = b[field];

            // Handle null/undefined
            if (valA == null) return 1;
            if (valB == null) return -1;

            // Case-insensitive for strings
            if (typeof valA === 'string') valA = valA.toLowerCase();
            if (typeof valB === 'string') valB = valB.toLowerCase();

            if (valA < valB) return direction === 'asc' ? -1 : 1;
            if (valA > valB) return direction === 'asc' ? 1 : -1;

            return 0;
        });
    }
}

// Usage HTML
// <th (click)="sortDir = sortDir === 'asc' ? 'desc' : 'asc'">Name</th>

// <tr *ngFor="let user of users | sortBy:'name':sortDir">
//   <td>{{ user.name }}</td>
//   <td>{{ user.age }}</td>
// </tr>


@Pipe({ name: 'statusText', pure: true })
export class StatusPipe implements PipeTransform {

    transform(value: number): string {
        switch (value) {
            case 1: return 'Active';
            case 0: return 'Inactive';
            default: return 'Unknown';
        }
    }
}

// Usage HTML
// users = [
//   { name: 'John', status: 1 },
//   { name: 'Alice', status: 0 },
//   { name: 'Bob', status: 2 }
// ];

// <tr *ngFor="let user of users">
//   <td>{{ user.name }}</td>
//   <td>{{ user.status | statusText }}</td>
// </tr>

// Output
// John   → Active
// Alice  → Inactive
// Bob    → Unknown

// Status 1 & 0 instead of you can customize to any value