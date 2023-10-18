import {Component, OnInit, Renderer2} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../common/common.component";
import {Role} from "../../common/common.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  loading = true;
  Roles: { [key: string]: Role };
  Users: { [key: string]: User };
  selectUser: User;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private render: Renderer2
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      roleId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.authService.isStaff() && this.authService.isLoggedIn()) {
      this.listRole()
        .then(() => {
          this.listUser();
          this.loading = false
        })
    } else {
      this.router.navigateByUrl("/");
    }


  }

  async listRole() {
    try {
      this.Roles = await this.userService.listRole();
    } catch (e) {
      alert("Error fetching roles:" + e || e.error.message);
    }
  }

  async listUser() {
    try {
      this.Users = await this.userService.listUser();
    } catch (e) {
      alert("Error fetching roles:" + e.error?.error || e.error?.message)
    }
  }

  setUpdateUser(user: User) {
    this.selectUser = user;
  }

  updateUser(id: string) {
    const val = this.form.value;
    const data = {
      id: id,
      username: (document.getElementById("update-username") as HTMLInputElement).value,
      name: (document.getElementById("update-name") as HTMLInputElement).value,
      roleId: (document.getElementById("update-role") as HTMLInputElement).value
    }
    this.userService.updateUser(data)
      .subscribe({
        next: (data: any) => {
          this.router.navigateByUrl("/users");
          window.location.reload();
        },
        error: (err) => alert(err)
      });
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe({
      next: (data: any) => {
        alert(`Remove ${this.Users[id].name} successfully from the system.`)
        window.location.reload();
      },
      error: (err) => {
        alert(err.error);
        window.location.reload();
      }
    })
  }

}
