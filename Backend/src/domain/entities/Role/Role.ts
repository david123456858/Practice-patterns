export class Role {
  private idRole: string
  private name: string
  private permissions: string[]

  constructor (
    idRole: string,
    name: string,
    permissions: string[]
  ) {
    this.idRole = idRole
    this.name = name
    this.permissions = permissions
  }

  // Getters
  getIdRole (): string { return this.idRole }
  getName (): string { return this.name }
  getPermissions (): string[] { return this.permissions }

  // Setters
  setIdRole (idRole: string): void { this.idRole = idRole }
  setName (name: string): void { this.name = name }
  setPermissions (permissions: string[]): void { this.permissions = permissions }
}
