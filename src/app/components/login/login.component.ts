import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  id;
  isRemember: boolean;
  alert: boolean;
  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private router: Router,
  ) {}

  ngOnInit() {}
  login() {
    this.userService.getUserById(this.id.trim()).subscribe(res => {
      console.log('res', res);
      console.log('rem', this.isRemember);
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
}
