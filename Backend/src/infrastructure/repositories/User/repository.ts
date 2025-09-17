import { roleAdmin } from '../../../domain/entities/Role/Role'
import { User } from '../../../domain/entities/User/User'
import { ICrudOperations } from '../../../domain/interfaces/common/ICrud'
let UserList: User[] = [new User('1', 'Admin', 'admin', 'admin@gmail.com', 'admin', roleAdmin)]

export class UserRepository implements ICrudOperations<User> {
  findAll (): User[] {
    return UserList.filter(user => user.getRole().find(role => role.getName() !== 'admin'))
  }

  save (data: User): void {
    UserList.push(data)
  }

  delete (id: string): void {
    UserList = UserList.filter(user => user.getCC() !== id)
  }

  update (data: User): void {
    const index = UserList.findIndex(user => user.getCC() === data.getCC())
    UserList[index] = data
  }

  findByEmail (email: string): User | undefined {
    return UserList.find(user => user.getEmail() === email)
  }

  findById (id: string): User | undefined {
    return UserList.find(user => user.getCC() === id)
  }
}
