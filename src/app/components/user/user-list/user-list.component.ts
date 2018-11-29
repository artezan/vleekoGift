import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users;
  isLoad: boolean;
  constructor(
    private sessionService: SessionService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getAllUser();
  }
  getAllUser() {
    this.isLoad = false;
    this.userService.getItems().subscribe(urs => {
      this.users = urs;
      this.users = this.users.map(user => {
        if (user.friendId && user.friendId !== '') {
          user['friend'] = this.users.find(u => u.id === user.friendId);
          return user;
        } else {
          return user;
        }
      });
      console.log(this.users);
      this.isLoad = true;
    });
  }
}
