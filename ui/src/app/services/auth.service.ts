import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as moment from "moment/moment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = "http://localhost:3001/auth/login";

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }
  isStaff() {
    if (!!localStorage.getItem("priority")) return Number(localStorage.getItem("priority")) > 1;
    else return false;
  }
  getExpiration() {
    if (localStorage.getItem("expires_at")) {
      const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
      return moment(expiresAt);
    }
    return null;
  }
  login(username: string, password: string) {
    return this.httpClient.post<loginRequest>(this.loginUrl, {username, password});
    // this is just the HTTP call,
    // we still need to handle the reception of the token

  }
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("priority");
    this.router.navigateByUrl("/books")
      // .then(r => window.location.reload());
  }
  setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiredAt, 'second');
    localStorage.setItem("user", JSON.stringify(authResult.user));
    localStorage.setItem("token", authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem("priority", authResult.priority);
    // window.location.reload();
  }
}

interface loginRequest {
  username: string,
  password: string
}

