import { Component, OnInit } from '@angular/core';
import { AuthService } from '../..//services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages/module';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private users: Object[];

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService

  ) { }

  ngOnInit() {
    this.loadUsers();
  }
  deleteUser(id: String, username: String) {
    if (confirm('Are you sure you want to delete user: ' + username)) {
      // console.log('trying');
      this.authService.deleteUser(id).subscribe(data => {
        if (data.success) {
          this.flashMessage.show('User successfully deleted', { cssClass: 'alert-success', timeout: 3000 });
          this.loadUsers();
        } else {
          this.flashMessage.show('Could not delete user', { cssClass: 'alert-danger', timeout: 3000 });
          this.loadUsers();
        }
      });
    }
  }

  loadUsers() {
    this.authService.getOtherUsers().subscribe(users => {
      this.users = users;
    },
      err => {
        console.log(err);
        return false;
      });
  }
}
