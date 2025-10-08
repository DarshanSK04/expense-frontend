import { CommonModule } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarcomponentComponent } from '../navbarcomponent/navbarcomponent.component';

@Component({
  selector: 'app-editexpense',
  standalone: true,
  imports: [RouterModule,RouterOutlet,CommonModule,FormsModule,NavbarcomponentComponent],
  templateUrl: './editexpense.component.html',
  styleUrl: './editexpense.component.css'
})
export class EditexpenseComponent implements OnInit{

http=inject(HttpClient);
router=inject(Router);

expenseObj:any={
description: '',
category: '',
amount: '',
paymentMethod: '',
transactionDate: ''
};
expenseId: number =parseInt(localStorage.getItem('id')!);

private baseUrl = 'https://registerapp-1-2fcd.onrender.com';


ngOnInit(): void
{
  
  this.http.get<any>(`${this.baseUrl}/api/expenses/editExpense/${this.expenseId}`).subscribe((data)=>{
    this.expenseObj=data;
    console.log(this.expenseObj);
  }
  );
}
  updateExpense()
  {
    if (
      !this.expenseObj.description ||
      !this.expenseObj.category ||
      !this.expenseObj.paymentMethod ||
      !this.expenseObj.transactionDate ||
      this.expenseObj.amount <= 0
    ) {
      // Sirf red line hi nahi — backend call bhi roko
      return;
    }
    this.http.put(`${this.baseUrl}/api/expenses/updateExpense/${this.expenseId}`,this.expenseObj).subscribe({
      next:()=>
      {
        alert("Expenses Updated Successfully")
        this.router.navigate(['/viewexpense']);
        
      },
      error:()=>
      {
        alert("Failed to Update expenses");
      }
    });
  }
}



