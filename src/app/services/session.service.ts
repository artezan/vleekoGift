import { Injectable } from '@angular/core';
import { UserModel } from 'src/models/user.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  public userSession$ = new BehaviorSubject<UserModel>({});

  constructor() {}
  // inicia antes que la app mandando un Promise en cada respuesta environment.production &&
  // inicia antes que la app mandando un Promise en cada respuesta
  public checkValidSession(): Promise<any> {
    return new Promise((resolve, reject) => {
      // ve si hay un usuario en el localstore
      const currentUser: UserModel = JSON.parse(
        localStorage.getItem('userSession'),
      );
      if (currentUser && currentUser.userName && currentUser.id) {
        this.userSession$.next(currentUser);
        return resolve(true);
      } else {
        // no hay usuario manda a login

        this.logOutSession();
        return resolve(true);
      }
    });
  }
  public login(remember: boolean, user: UserModel) {
    if (remember) {
      localStorage.setItem('userSession', JSON.stringify(user));
    }
    this.userSession$.next(user);
  }
  public logOutSession() {
    localStorage.removeItem('userSession');
    this.userSession$.next({});
  }
}
