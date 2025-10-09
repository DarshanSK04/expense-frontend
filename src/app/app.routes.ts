import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AddExpenseComponent } from './addexpense/addexpense.component';
import { ViewExpenseComponent } from './viewexpense/viewexpense.component';
import { ViewonlineexpenseComponent } from './viewonlineexpense/viewonlineexpense.component';
import { ViewofflineexpenseComponent } from './viewofflineexpense/viewofflineexpense.component';
import { EditexpenseComponent } from './editexpense/editexpense.component';
import { NavbarcomponentComponent } from './navbarcomponent/navbarcomponent.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { OtpvalidationComponent } from './otpvalidation/otpvalidation.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { AccountComponent } from './account/account.component';



export const routes: Routes = [

    {path:'', 
        component: LoginComponent     

    },
    {
        path: 'registration',
        component: RegistrationComponent
    },
   
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path:'dash-board',
        component: DashBoardComponent
    },
    {
        path: 'addexpense',
        component: AddExpenseComponent
    },
    {
        path: 'viewexpense',
        component: ViewExpenseComponent
    },
    {
        path: 'viewonlineexpense',
        component: ViewonlineexpenseComponent
    },
    {
        path: 'viewofflineexpense',
        component: ViewofflineexpenseComponent
    },
    {
        path: 'editexpense',
        component: EditexpenseComponent
      },
      {
        path: 'navbarcomponent',
        component: NavbarcomponentComponent
      },
      {
        path: 'sidebar',
        component: SidebarComponent
      },
      {
        path: 'passwordreset',
        component: PasswordresetComponent
      },
      {
        path:'otpvalidation',
        component: OtpvalidationComponent
      },
      {
        path: 'updatepassword',
        component: UpdatepasswordComponent
      }
      ,
      {
        path: 'account',
        component: AccountComponent
      }
];
