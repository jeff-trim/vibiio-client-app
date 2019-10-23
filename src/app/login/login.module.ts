import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

// Containers
import { LoginComponent } from "./containers/login.component";

// Components
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { LoginGreetingComponent } from "./components/login-greeting/login-greeting.component";

// Services
import { LoginService } from "./services/login.service";
import { AuthService } from "../services/auth.service";

@NgModule({
  declarations: [LoginComponent, LoginFormComponent, LoginGreetingComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
  exports: [LoginComponent],
  providers: [LoginService, AuthService]
})
export class LoginModule {}
