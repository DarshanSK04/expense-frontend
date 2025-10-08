import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarcomponentComponent } from '../navbarcomponent/navbarcomponent.component';

@Component({
  selector: 'app-viewonlineexpense',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule,NavbarcomponentComponent],
  templateUrl: './viewonlineexpense.component.html',
  styleUrls: ['./viewonlineexpense.component.css']
})
export class ViewonlineexpenseComponent implements OnInit {
  expenses: any[] = [];
  totalAmount: number = 0;

  http = inject(HttpClient);
  router = inject(Router);
  private baseUrl = 'https://registerapp-1-2fcd.onrender.com';


  ngOnInit(): void {
    const email = localStorage.getItem('email');
    const id=localStorage.getItem('userId');
    if (!email) {
      alert("User not logged in!");
      this.router.navigate(['/login']);
      return;
    }

    this.http.get<any[]>(`${this.baseUrl}/api/expenses/onlineExpenses/${id}`, {})
      .subscribe((data) => {
        this.expenses = data;

        
        this.totalAmount = this.expenses.reduce((sum, exp) => sum + exp.amount, 0);
      });
  }

  deleteExpense(id: number) {
    this.http.delete(`${this.baseUrl}/api/expenses/deleteExpense/${id}`)
      .subscribe(() => {
        
        this.expenses = this.expenses.filter(exp => exp.id !== id);

        
        this.totalAmount = this.expenses.reduce((sum, exp) => sum + exp.amount, 0);

        alert("Deleted Successfully!");
        
      });
  }
  editExpense(id:number)
  {
    localStorage.setItem('id',id.toString());
    this.router.navigate(['/editexpense']);
  }
  
}