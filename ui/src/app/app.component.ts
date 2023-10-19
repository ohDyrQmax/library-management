import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    // localStorage.removeItem("user");
    // localStorage.removeItem("token");
    // localStorage.removeItem("expires_at");
    // localStorage.removeItem("priority");
  }
  login() {
    const val = this.form.value;

    if (val.username && val.password) {
      this.authService.login(val.username, val.password)
        .subscribe({
          next: (data:any) => {
            this.authService.setSession(data);
            document.getElementById("login-form").classList.remove("show");
            window.location.reload();
          },
          error: (err) => this.errorMessage = err.error.message || err.error.error
        });
    }
  }
  logout() {
    this.authService.logout();
    window.location.reload();
  }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  isStaff() {
    return this.authService.isStaff();
  }
}
