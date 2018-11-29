import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { UserModel } from 'src/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  user: UserModel;
  isLoad: boolean;
  friend: UserModel;

  constructor(
    private sessionService: SessionService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getUser();
  }
  getUser() {
    this.userService
      .getUserById(this.sessionService.userSession$.value.userName)
      .subscribe(u => {
        if (u.length > 0) {
          this.user = u[0];
          this.isLoad = true;
          if (u[0].friendId && u[0].friendId !== '') {
            this.getFriend(u[0].friendId);
          }
        }
      });
  }
  getFriend(friendId: string) {
    this.userService.getUserByIdFire(friendId).subscribe(friend => {
      this.friend = friend;
    });
  }
  goToFrind() {
    const data: NavigationExtras = {
      queryParams: { id: this.friend.id },
    };
    this.router.navigate(['gift'], data);
  }
}
