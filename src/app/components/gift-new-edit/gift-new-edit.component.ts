import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/models/user.model';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-gift-new-edit',
  templateUrl: './gift-new-edit.component.html',
  styleUrls: ['./gift-new-edit.component.scss'],
})
export class GiftNewEditComponent implements OnInit, OnDestroy {
  numArr: any;
  isNew: boolean;
  user: UserModel;
  isLoad: boolean;
  nameInput: string;
  descriptionInput: string;
  sub: Subscription;
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private sessionService: SessionService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['num'] && params['acction']) {
        this.numArr = params['num'];
        if (params['acction'] === 'new') {
          this.isNew = true;
        } else {
          this.isNew = false;
        }
      } else {
      }
    });
    this.getUser();
  }
  getUser() {
    this.sub = this.userService
      .getUserById(this.sessionService.userSession$.value.userName)
      .subscribe(u => {
        if (u.length > 0) {
          this.user = u[0];
          if (!this.isNew) {
            this.nameInput = u[0].gifts[this.numArr].name;
            this.descriptionInput = u[0].gifts[this.numArr].description;
          }
          this.isLoad = true;
        }
      });
  }
  newGift() {
    this.user.gifts[this.numArr] = {
      description: this.descriptionInput,
      name: this.nameInput,
    };
    this.userService.editUser(this.user).then(() => {
      this.router.navigate(['gift']);
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
