import { User } from '../../../domain/entities/User/User'
import { ICrudOperations } from '../../../domain/interfaces/common/ICrud'
let UserList: User[] = []

export class UserRepository implements ICrudOperations<User> {
  findAll (): User[] {
    return UserList
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

  findById (id: string): User | undefined {
    return UserList.find(user => user.getCC() === id)
  }
}
