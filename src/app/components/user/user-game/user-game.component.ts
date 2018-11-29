import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/models/user.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-game',
  templateUrl: './user-game.component.html',
  styleUrls: ['./user-game.component.scss'],
})
export class UserGameComponent implements OnInit {
  user: UserModel;
  isLoad: boolean;
  friend: UserModel;
  userReciver: UserModel;
  isStart: boolean;
  arr = [];
  acction = '';
  finish: boolean;
  sub: Subscription;

  constructor(
    private sessionService: SessionService,
    private userService: UserService,
    private router: Router,
    public route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.getUser(params['id']);
      } else {
      }
    });
  }
  getUser(id) {
    this.userService.getUserByIdFire(id).subscribe(u => {
      if (u) {
        this.user = u;
        this.isLoad = true;
      }
    });
  }
  start() {
    this.finish = false;
    this.isStart = true;
    console.log('Buscando... 🙏🏻 ');
    this.sub = this.userService.getItems().subscribe(allUser => {
      const userNotReciver = allUser.filter(user => {
        return (
          !allUser.some(u => u.friendId === user.id) && user.id !== this.user.id
        );
      });
      console.log(userNotReciver);
      if (userNotReciver.length === 1) {
        const item = userNotReciver[0];
        this.isStart = false;
        this.acction = 'inn';
        this.arr.push(item);
        this.userReciver = item;
        this.asig(item);
      } else if (userNotReciver.length === 0) {
        this.setEdwin();
      } else {
        for (let i = 1; i < 4; i++) {
          (iter => {
            setTimeout(() => {
              this.arr = [];
              const random = Math.floor(Math.random() * userNotReciver.length);
              const item = userNotReciver[random];
              this.isStart = false;
              this.acction = 'inn';
              this.arr.push(item);
              if (iter === 3) {
                this.userReciver = item;
                this.asig(item);
              } else {
                if (userNotReciver.length > 2) {
                  userNotReciver.splice(random, 1);
                }

                setTimeout(() => {
                  this.acction = 'out';
                  console.log('sale');
                }, 2000);
              }
            }, 3000 * iter);
          })(i);
        }
      }
    });
  }

  asig(user: UserModel) {
    this.sub.unsubscribe();
    this.finish = true;
    this.userReciver = user;
    this.user.friendId = user.id;
    this.userService
      .editUser(this.user)
      .then(() => console.log('se le asigno', user));
  }
  goToList() {
    this.router.navigate(['user-list']);
  }
  setEdwin() {
    this.userService.getUserById('rpea61').subscribe(ed => {
      const item = ed[0];
      this.isStart = false;
      this.acction = 'inn';
      this.arr.push(item);
      this.userReciver = item;
      this.asig(item);
    });
  }
}
