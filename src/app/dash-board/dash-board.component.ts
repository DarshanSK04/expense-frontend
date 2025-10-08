import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import {Router} from '@angular/router'
import { NavbarcomponentComponent } from '../navbarcomponent/navbarcomponent.component';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [RouterModule,RouterOutlet,CommonModule,NavbarcomponentComponent],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent implements OnInit{
  router=inject(Router);
  totalAmount:number=0;
  http = inject(HttpClient);
  monthWiseExpenses:{[key:string]:any[]}={};
  private baseUrl = 'https://registerapp-1-2fcd.onrender.com';

  ngOnInit(): void {
      const email=localStorage.getItem('email');
      if(email)
      {
        this.http.get(`${this.baseUrl}/api/expenses/expensesbymonth/${email}`).subscribe((data:any)=>{
          this.monthWiseExpenses=data;

          
        })
      }
  }
  getMonthKeys():string[]{
    return Object.keys(this.monthWiseExpenses);
  }
  calculateTotalForMonth(month:string):number{
    const expenses=this.monthWiseExpenses[month];
    return expenses.reduce((sum,exp)=>sum+exp.amount,0);
  }

}
