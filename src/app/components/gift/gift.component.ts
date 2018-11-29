import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.scss'],
})
export class GiftComponent implements OnInit {
  onlyShow: boolean;
  user: UserModel;
  isLoad: boolean;
  numbers = [0, 1, 2];
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private sessionService: SessionService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.onlyShow = true;
        this.getUser(params['id']);
      } else {
        this.getUserMe();
        this.onlyShow = false;
      }
    });
  }
  getUser(friendId) {
    this.userService.getUserByIdFire(friendId).subscribe(u => {
      if (u) {
        this.user = u;
        this.isLoad = true;
        if (
          this.onlyShow &&
          u.friendId &&
          u.id !== this.sessionService.userSession$.value.friendId
        ) {
          this.router.navigate(['loggin']);
        }
      }
    });
  }
  getUserMe() {
    this.userService
      .getUserById(this.sessionService.userSession$.value.userName)
      .subscribe(u => {
        if (u.length > 0) {
          this.user = u[0];
          this.isLoad = true;
        }
      });
  }
  goToGiftNew(num: number) {
    const data: NavigationExtras = {
      queryParams: { num: num, acction: 'new' },
    };
    this.router.navigate(['gift-new-edit'], data);
  }
  goToGiftEdit(num: number) {
    const data: NavigationExtras = {
      queryParams: { num: num, acction: 'edit' },
    };
    this.router.navigate(['gift-new-edit'], data);
  }
  deleteGift(num: number) {
    this.user.gifts[num] = null;
    this.userService.editUser(this.user);
  }
}
