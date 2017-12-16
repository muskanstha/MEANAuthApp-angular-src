import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';

import { FlashMessagesService } from 'angular2-flash-messages/module';

import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  title: String;
  content: String;
  public: Boolean;
  // password: String;
  // phone: Number;


  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  onCreateSubmit() {
    // console.log(123);
    const post = {
      title: this.title,
      content: this.content,
      public: this.public,
    };
    console.log(post);
    // Required fields

    if (!this.validateService.validateCreate(post)) {
      this.flashMessage.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }


    // Register user
    this.authService.createPost(post).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Post successfully created', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/posts']);
      } else {
        this.flashMessage.show('Could not post', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['post/create']);

      }
    });
  }

}
