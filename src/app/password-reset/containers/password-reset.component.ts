import { Component, OnInit } from "@angular/core";
import { Params, ActivatedRoute } from "@angular/router";

// Services
import { PasswordResetService } from "../services/password-reset.service";

// Interfaces
import { Credentials } from "../models/credentials.interface";

@Component({
  styleUrls: ["./password-reset.component.scss"],
  providers: [PasswordResetService],
  templateUrl: "password-reset.component.html"
})
export class PasswordResetComponent implements OnInit {
  passwordResetResponse: any;
  header: string;
  copy: string;
  jwt = "request-reset";
  resetAction: string;
  nativeAppLink: boolean;

  welcomeHeader = "Forgot Your Password?";
  welcomeCopy =
    "No problem! Just enter your password below and we’ll send you a link to reset it.";
  successHeader = "Thanks!";
  successCopy =
    "Click below to resend it if needed, and don't forget to check those pesky SPAM folders!";
  failureHeader = "Error";
  failureCopy = "An error has occurred, please contact support.";
  resetHeader = "New Password Time!";
  resetCopy = "Enter a new password that's at least 8 characters long.";
  resetSuccessHeader = "All Good!";
  resetSuccessCopy = "Your new password is set, let's go login";
  expiredHeader = "Error";
  expiredCopy =
    "Looks like that link is expired, please request a new password reset link";
  resetErrorHeader = "Error";
  resetErrorCopy = "Looks like there was a problem, please contact support";

  constructor(
    private passwordResetService: PasswordResetService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.jwt = params["token"];
      if (this.jwt) {
        this.setLoginRedirect(params["role"]);
        this.resetAction = "new-pw";
        this.setText(this.resetHeader, this.resetCopy);
      } else {
        this.resetAction = "reset-submission";
        this.setText(this.welcomeHeader, this.welcomeCopy);
      }
    });
  }

  setLoginRedirect(role) {
    if (role === "Consumer") {
      this.nativeAppLink = true;
    } else {
      this.nativeAppLink = false;
    }
  }

  submitPasswordReset(event: Credentials) {
    this.passwordResetService
      .resetPassword(event)
      .subscribe((response: any) => {
        this.passwordResetResponse = response.status;
        if (response.status === 201) {
          this.setText(this.successHeader, this.successCopy);
        } else {
          this.setText(this.failureHeader, this.failureHeader);
        }
      });
  }

  submitNewPassword(event: string) {
    this.passwordResetService.submitNewPassword(event, this.jwt).subscribe(
      response => {
        this.setText(this.resetSuccessHeader, this.resetSuccessCopy);
      },
      error => {
        if (error._body === '{"errors":["invalid token"]}') {
          this.setText(this.resetErrorHeader, this.resetErrorCopy);
        } else if (error._body === '{"errors":["expired token"]}') {
          this.setText(this.expiredHeader, this.expiredCopy);
        }
      }
    );
    this.resetAction = "submitted";
  }

  setText(header, copy) {
    this.header = header;
    this.copy = copy;
  }
}
