import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {first, firstValueFrom, map, Observable} from "rxjs";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService  {

  private userUrl = "http://localhost:3001/user";
  private roleUrl = "http://localhost:3001/role";
  listUser = async(): Promise<any> => {
    return await firstValueFrom(this.httpClient.get(this.userUrl, { 'headers': this.createAuthorizationHeader() }));
  }

  listRole = async (): Promise<any> => {
    return await firstValueFrom(this.httpClient.get(this.roleUrl, { 'headers': this.createAuthorizationHeader() }));
  }

  updateUser(data): Observable<any> {
    return this.httpClient.patch(this.userUrl, data, {'headers': this.createAuthorizationHeader()});
        // .pipe(map(response => response));
  }

  deleteUser(id: string): Observable<any> {
    return this.httpClient.delete(this.userUrl + `/${id}`, {'headers': this.createAuthorizationHeader()});
  }
}

