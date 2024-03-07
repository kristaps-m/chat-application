import {types} from "mobx-state-tree";
import { generateMockUsers } from "./mockData";

let mockUsers;
// Fetch mock data when the component mounts
mockUsers = generateMockUsers()

export const UserModel = types.model("UserModel", {
  id: types.number,
  fullName: types.string,
  profileImage: types.string,
  theMessages: types.optional(types.array(types.string), [])
})

export const UsersStore = types.model("UsersStore", {
  users: types.array(UserModel)
}).actions(store => ({
  setUsers(newUsers) {
    store.users = newUsers
  },
  async fetchUsers(){
    // console.log(mockUsers)
    store.setUsers(mockUsers)
  }
})).actions((store) => ({
  searchUser(searchUser) {
    store.users = store.users.filter((u) =>
      u.fullName.toLowerCase().includes(searchUser.toLowerCase())
    );
  }
}))

let _userStore
export const useUsers = () => {
  if(!_userStore){
    _userStore = UsersStore.create({
      users: []
    })
  }

  return _userStore
};