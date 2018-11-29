import { Component } from '@angular/core';
import { SessionService } from './services/session.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'vleeko-gift';
  islogin: boolean;
  link;
  user;
  public isCollapsed = true;
  constructor(private sessionService: SessionService, private router: Router) {
    {
      sessionService.userSession$.subscribe(user => {
        this.user = user;
        if (user && user.id) {
          this.router.navigate(['panel']);

          this.islogin = true;
          router.events.pipe(map((m: any) => m.url)).subscribe(r => {
            if (r !== undefined) {
              this.link = r;
            }
          });
        } else {
          this.islogin = false;

          this.router.navigate(['login']);
        }
      });
    }
  }
  logout() {
    this.islogin = false;
    this.sessionService.logOutSession();
  }
}
