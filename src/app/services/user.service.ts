import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/models/user.model';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private uploadTask: firebase.storage.UploadTask;
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
            ...item.payload.doc.data()
          }));
        })
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
            ...item.payload.doc.data()
          }));
        })
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
  deleteUser(itemId) {
    const id = String(itemId);
   return this.afs.doc('users/' + id).delete();
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
            ...item.payload.doc.data()
          }));
        })
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
              ...item.payload.doc.data()
            }))
            .find((r: any) => r.id === id);
        })
      );
  }
  addUser(user: UserModel) {
    return this.afs.collection('users').add(user);
  }
  async upload(upload: File): Promise<string> {
    const promise = new Promise((resolve, reject) => {
      try {
        const storageRef = firebase.storage().ref();
        this.uploadTask = storageRef.child(`${upload.name}`).put(upload);
        this.uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          snapshot => {
            // console.log(snapshot);
          },
          err => console.log(err),
          () => {
            resolve(storageRef.child(upload.name).getDownloadURL());
          }
        );
      } catch (error) {
        console.log(error);
      }
    });
    const result: string = (await promise) as string;
    return result;
  }

}
