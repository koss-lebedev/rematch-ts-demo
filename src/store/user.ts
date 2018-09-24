import { IUserModel } from './types'

const user: IUserModel = {
  state: {
    name: 'User',
    age: 25,
  },
  reducers: {
    setName(state, { name }) {
      return { ...state, name, wrong: 'value' }
    }
  },
  effects: dispatch => ({
    async setNameAsync({ name }) {
      dispatch.count.decrement()
      dispatch.user.setName({ name })
    }
  })
}

export default user
