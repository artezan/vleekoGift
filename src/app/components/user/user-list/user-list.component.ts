import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { Router, NavigationExtras } from '@angular/router';
import { UserModel } from 'src/models/user.model';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: UserModel[];
  isLoad: boolean;
  sub: Subscription;
  flagReset = false;

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
      this.isLoad = true;
    });
  }
  goToGame(id: string) {
    const data: NavigationExtras = {
      queryParams: { id: id },
    };
    this.router.navigate(['user-game'], data);
  }
  reset() {
    this.flagReset = true;
    this.sub = this.userService.getItems().subscribe(items => {
      items.forEach(item => {
        item.friendId = '';
        this.userService.editUser(item);
      });
    });
  }
  ngOnDestroy() {
    if (this.flagReset) {
      this.sub.unsubscribe();
    }
  }
}
