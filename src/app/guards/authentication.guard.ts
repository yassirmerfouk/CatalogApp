import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authenticationService : AuthenticationService = inject(AuthenticationService)
  const router : Router = inject(Router)
  let isAuthenticated = authenticationService.isAuthenticated();
  if(isAuthenticated == false){
    router.navigateByUrl("/login");
    return false;
  }
  return true;
};
