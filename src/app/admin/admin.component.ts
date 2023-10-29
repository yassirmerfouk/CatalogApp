import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  authUser!: String;

  constructor(private authenticationService: AuthenticationService,private router: Router) {}
  ngOnInit(): void {
    this.authUser = this.authenticationService.authenticatedUser!.username;
  }

  public handleLogout(){
    this.authenticationService.logout().subscribe({
      next : () => {
        this.router.navigateByUrl("/login");
      }
    });
  }
}
