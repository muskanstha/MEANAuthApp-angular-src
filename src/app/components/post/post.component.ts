import { Component, OnInit } from '@angular/core';

import { AuthService } from '../..//services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  private posts: Object[];


  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    switch (this.route.snapshot.params['title']) {
      case 'public':
        this.publicPosts();
        break;
      case 'private':
        this.privatePosts();
        break;
      default:
        this.publicPosts();
        break;
    }

  }

  publicPosts() {
    this.authService.getPublicPosts().subscribe(posts => {
      this.posts = posts;
    },
      err => {
        console.log(err);
        return false;
      });
    this.router.navigate(['/posts', 'public']);

  }

  privatePosts() {
    this.authService.getPrivatePosts().subscribe(posts => {
      this.posts = posts;
      console.log(posts);
    },
      err => {
        console.log(err);
        return false;
      });
    this.router.navigate(['/posts', 'private']);

  }

  createPost() {
    this.router.navigate(['/post/create']);
  }
}
