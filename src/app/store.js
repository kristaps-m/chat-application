import {types} from "mobx-state-tree";
import { generateMockUsers } from "./mockData";

let mockUsers;

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
    // Fetch mock data when the component mounts
    mockUsers = generateMockUsers()
    console.log(mockUsers)
    store.setUsers(mockUsers)
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