import { UserModel } from './../../../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent implements OnInit {
  isNew: boolean;
  user: UserModel = {};
  isLoad = true;
  imgToUpload: File;
  prevImg: string;
  userWorking = false;
  constructor(
    private sessionService: SessionService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.isLoad = true;
        this.getUser(params['id']);
        this.isNew = false;
      } else {
        this.isLoad = false;
        this.isNew = true;
      }
    });
  }

  addEdit(isNew: boolean) {
    this.userWorking = true;
    if (isNew) {
      this.add();
    } else {
      this.edit();
    }
  }
  add() {
    this.userService.upload(this.imgToUpload).then(url => {
      this.user.imgURL = url;
      this.userService.addUser(this.user).then(() => {
        this.userWorking = false;
        this.router.navigateByUrl('/users-all');
      });
    });
  }
  edit() {
    const editUser = () => {
      this.userService.editUser(this.user).then(() => {
        this.userWorking = false;
        this.router.navigateByUrl('/users-all');
      });
    };
    if (this.user.imgURL) {
      editUser();
    } else {
      this.userService.upload(this.imgToUpload).then(url => {
        this.user.imgURL = url;
        editUser();
      });
    }
  }
  getUser(id: string) {
    this.userService.getUserByIdFire(id).subscribe(user => {
      this.user = user;
      this.isLoad = false;
    });
  }
  getImg(event) {
    this.imgToUpload = event.target.files.item(0);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.prevImg = e.target.result as string;
    };
    reader.readAsDataURL(this.imgToUpload);
  }
  getUserName() {
    if (this.user.lastName && this.user.name && this.isNew) {
      const chars =
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let result = '';
      for (let i = 5; i > 0; --i) {
        result += chars[Math.round(Math.random() * (chars.length - 1))];
      }
      this.user.userName = `${this.user.name[0]}${this.user.lastName[0]}${result}`;
    }
  }
  deleteImg() {
    this.user.imgURL = undefined;
  }
}
