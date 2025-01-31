import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUri = '/api/user';

  isAuthenticated: boolean = false;
  token!: any;
  profile: any;

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    const body = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.post(this.baseUri + '/token',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded'),
        observe: 'response'
      }
    );
  }

  hasRole(role: string): boolean {
    let filter = this.profile.scope == role;
    console.log("roles = " + filter);
    return this.profile.scope == role;
  }
}
