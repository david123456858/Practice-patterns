import { User } from '../../../domain/entities/User/User'
import { ICrudOperations } from '../../../domain/interfaces/common/ICrud'

export class UserRepository implements ICrudOperations<User> {
  private readonly UserList: User[] = []
  save (data: User): void {
    this.UserList.push(data)
  }

  delete (id: string): void {}
  update (data: User): void {}

  findById (id: string): User | undefined {
    return this.UserList.find(user => user.getCC() === id)
  }
}
