export default class User {
  constructor ({ firstname, lastname }) {
    this.firstname = firstname
    this.lastname = lastname
  }

  get name () {
    return `${this.firstname} ${this.lastname}`
  }
}
