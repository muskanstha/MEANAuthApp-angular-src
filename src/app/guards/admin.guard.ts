import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

    userRole: String;
    constructor(private authService: AuthService, private router: Router) { }


    canActivate() {
        console.log(this.authService.adminLoggedIn());

        if (this.authService.adminLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/users']);
            return false;
        }
        // return true;
    }
}
