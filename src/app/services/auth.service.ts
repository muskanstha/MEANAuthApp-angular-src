import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/map';

import { tokenNotExpired } from 'angular2-jwt';
interface UserData { users: Object[]; }
interface PostData { posts: Object[]; }

@Injectable()
export class AuthService {

  localhost: String;

  authToken: any;
  user: any;

  userRole: String;

  constructor(private http: Http, private httpc: HttpClient) {
    this.localhost = 'http://localhost:8080/';
    // this.localhost = '';
  }

  registerUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.localhost + 'api/users/register', user, {
      headers: headers
    })
      .map(res => res.json());
  }

  authenticateUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.localhost + 'api/users/authenticate', user, {
      headers: headers
    })
      .map(res => res.json());
  }

  deleteUser(id: String) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.delete(this.localhost + 'api/users/delete/' + id, {
      headers: headers
    })
      .map(res => res.json());
  }

  getProfile() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.localhost + 'api/users/profile', {
      headers: headers
    })
      .map(res => res.json());
  }

  getProfilec() {
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.authToken })
    };
    return this.httpc.get(this.localhost + 'api/users/profile', httpOptions);
  }
  getOtherUsers() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.localhost + 'api/users', {
      headers: headers
    })
      .map(res => {
        const data: UserData = res.json();
        return data.users;
      }
      );
  }

  getAllUsers() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.localhost + 'api/users/manage', {
      headers: headers
    })
      .map(res => {
        const data: UserData = res.json();
        return data.users;
      }
      );
  }

  getPublicPosts() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.localhost + 'api/posts/public', {
      headers: headers
    })
      .map(res => {
        const data: PostData = res.json();
        return data.posts;
      }
      );
  }

  getPrivatePosts() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.localhost + 'api/posts/private', {
      headers: headers
    })
      .map(res => {
        const data: PostData = res.json();
        return data.posts;
      }
      );
  }


  createPost(post) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.localhost + 'api/posts/create', post, {
      headers: headers
    })
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }


  loggedIn() {
    return tokenNotExpired();
  }

  // adminLoggedIn() {
  //   this.getProfilec().subscribe(profile => {
  //     this.userRole = profile.user.permission;
  //     console.log(this.userRole);
  //   },
  //     err => {
  //       console.log(err);
  //       return false;
  //     });
  //   if (this.userRole === 'admin') {
  //     this.getProfilec().subscribe(profile => {
  //       this.userRole = profile.user.permission;
  //     },
  //       err => {
  //         console.log(err);
  //         return false;
  //       });
  //   }
  //   if (this.userRole === 'admin') {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // adminLoggedIn() {
  //   if (tokenNotExpired()) {
  //     return this.getProfile().map(profile => {
  //       this.user = profile.user;
  //       console.log(this.user);
  //       if (this.user.permission === 'admin') {
  //         return true;
  //       }
  //       else {
  //         return false;
  //       }
  //     });
  //   }
  // }

  adminLoggedIn() {
    if (tokenNotExpired()) {
      const aUser = localStorage.getItem('user');
      if (aUser === null) {
        return false;
      }
      this.user = JSON.parse(aUser);

      if (this.user.permission === 'admin') {
        return true;
      }
      else {
        return false;
      }
    }
  }


  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}

