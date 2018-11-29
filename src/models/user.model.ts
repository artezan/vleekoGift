export interface UserModel {
  area?: string;
  friendId?: string;
  gifts?: {
    name?: string;
    description?: string;
  }[];
  lastName?: string;
  name?: string;
  userName?: string;
  id?: string;
  imgURL?: string;
  friend?: UserModel;
}
