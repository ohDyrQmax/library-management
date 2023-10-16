import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class BaseService {
  constructor(protected httpClient: HttpClient) {
  }


  createAuthorizationHeader() {
    let role = JSON.parse(localStorage.getItem("user"));
    return new HttpHeaders()
      .set('Authorization', "Bearer " + localStorage.getItem("token"))
      .set('Role', role.roleId);
  }
}
