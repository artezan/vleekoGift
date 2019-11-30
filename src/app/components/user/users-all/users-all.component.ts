import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserModel } from 'src/models/user.model';
import { Subscription } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { Router, NavigationExtras } from '@angular/router';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-users-all',
  templateUrl: './users-all.component.html',
  styleUrls: ['./users-all.component.scss']
})
export class UsersAllComponent implements OnInit, OnDestroy {
  users: UserModel[];
  isLoad: boolean;
  sub: Subscription;
  flagReset = false;

  constructor(
    private sessionService: SessionService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllUser();
  }
  getAllUser() {
    this.isLoad = false;
    this.sub = this.userService.getItems().subscribe(urs => {
      this.users = urs;
      this.isLoad = true;
    });
  }
  editUser(id: string) {
    const data: NavigationExtras = {
      queryParams: { id }
    };
    this.router.navigate(['user-add-edit'], data);
  }
  deleteUser(id: string) {
    this.userService.deleteUser(id).then(() => this.getAllUser());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
