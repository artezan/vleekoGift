import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private afs: AngularFirestore) {}
  getItems(): Observable<UserModel[]> {
    return this.afs
      .collection('users', ref => {
        return ref.orderBy('name');
      })
      .snapshotChanges()
      .pipe(
        map(actions => {
          return <UserModel[]>actions.map(item => ({
            id: item.payload.doc.id,
            ...item.payload.doc.data(),
          }));
        }),
      );
  }
  getItemsNoRealTime(): Observable<UserModel[]> {
    return this.afs
      .collection('users', ref => {
        return ref.orderBy('name');
      })
      .snapshotChanges()
      .pipe(
        map(actions => {
          return <UserModel[]>actions.map(item => ({
            id: item.payload.doc.id,
            ...item.payload.doc.data(),
          }));
        }),
      );
  }
  addItem(name, number) {
    this.afs.collection('users').add({ name: name, numero: number });
  }
  editUserNameTrim(user: UserModel) {
    this.afs.doc('users/' + user.id).update({ userName: user.userName.trim() });
  }
  editUser(user: UserModel): Promise<void> {
    return this.afs.doc('users/' + user.id).update(user);
  }
  deleteItem(itemId) {
    const id = String(itemId);
    this.afs.doc('users/' + id).delete();
  }
  getUserById(userName: string): Observable<UserModel[]> {
    return this.afs
      .collection('users', ref => {
        return ref.where('userName', '==', userName);
      })
      .snapshotChanges()
      .pipe(
        map(actions => {
          return <UserModel[]>actions.map(item => ({
            id: item.payload.doc.id,
            ...item.payload.doc.data(),
          }));
        }),
      );
  }
  getUserByIdFire(id: string): Observable<UserModel> {
    return this.afs
      .collection('users', ref => {
        return ref.orderBy('name');
      })
      .snapshotChanges()
      .pipe(
        map(actions => {
          return <UserModel>actions
            .map(item => ({
              id: item.payload.doc.id,
              ...item.payload.doc.data(),
            }))
            .find(r => r.id === id);
        }),
      );
  }
}
