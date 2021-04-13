import User from './User.js'

describe('User', () => {
  it('Should show the name correct', () => {
    const user = new User({ firstname: 'Gean', lastname: 'Gonçalves' })

    expect(user.name).toBe('Gean Gonçalves')
    expect(1).toEqual(expect.any(Number))
    expect(user).toMatchSnapshot()
  })
})
