import { Injectable } from '@angular/core';
import { AppUser } from '../models/AppUser';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private users!: Array<AppUser>;
  public authenticatedUser : AppUser | undefined;

  constructor() {
    this.users = [];
    this.users.push({
      id: 1,
      username: 'user1',
      password: 'user1',
      roles: ['USER'],
    });
    this.users.push({
      id: 1,
      username: 'user2',
      password: 'user2',
      roles: ['USER'],
    });
    this.users.push({
      id: 1,
      username: 'admin',
      password: 'admin',
      roles: ['USER', 'ADMIN'],
    });
  }

  public login(username: string, password: string): Observable<AppUser> {
    let user = this.users.find((element) => element.username == username);
    if (!user) return throwError(() => new Error('Username not found'));
    if (user.password != password)
      return throwError(() => new Error('Bad credential'));
    return of(user);
  }

  public authenticate(appUser: AppUser) : Observable<boolean> {
    this.authenticatedUser = appUser;
    localStorage.setItem(
      'authUser',
      JSON.stringify({
        username: appUser.username,
        roles: appUser.roles,
        jwt: 'JWT_Token',
      })
    );
    return of(true);
  }

  public hasRole(role : string) : boolean{
    return this.authenticatedUser!.roles.includes(role);
  }

  public isAuthenticated() : boolean{
    return this.authenticatedUser != undefined;
  }

  public logout() : Observable<boolean>{
    this.authenticatedUser = undefined;
    localStorage.removeItem("authUser");
    return of(true);
  }
}
