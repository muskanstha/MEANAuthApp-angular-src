import { Component, OnInit } from '@angular/core';
import { AuthService } from '../..//services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private users: Object[];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getOtherUsers().subscribe(users => {
      this.users = users;
    },
      err => {
        console.log(err);
        return false;
      });
  }

}
