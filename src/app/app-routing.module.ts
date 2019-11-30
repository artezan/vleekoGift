import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PanelComponent } from './components/panel/panel.component';
import { GiftComponent } from './components/gift/gift.component';
import { GiftNewEditComponent } from './components/gift-new-edit/gift-new-edit.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserGameComponent } from './components/user/user-game/user-game.component';
import { UsersAllComponent } from './components/user/users-all/users-all.component';
import { UserAddEditComponent } from './components/user/user-add-edit/user-add-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'panel', component: PanelComponent },
  { path: 'gift', component: GiftComponent },
  { path: 'gift-new-edit', component: GiftNewEditComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'user-game', component: UserGameComponent },
  { path: 'users-all', component: UsersAllComponent },
  { path: 'user-add-edit', component: UserAddEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
