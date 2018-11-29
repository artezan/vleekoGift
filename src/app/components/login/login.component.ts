import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  id;
  isRemember: boolean;
  alert: boolean;
  sub: Subscription;

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private router: Router,
  ) {}

  ngOnInit() {}
  login() {
    this.sub = this.userService.getUserById(this.id.trim()).subscribe(res => {
      if (res.length > 0) {
        this.sessionService.login(this.isRemember, res[0]);
        this.router.navigate(['panel']);
      } else {
        this.alert = true;
      }
    });
    /* this.userService.getItems().subscribe(items => {
      items.forEach(item => {
        this.userService.editUserNameTrim(item);
      });
    }); */
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
