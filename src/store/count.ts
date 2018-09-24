import { ICountModel } from './types'

const count: ICountModel = {
  state: 0,
  reducers: {
    increment(state) {
      return state + 1
    },
    decrement(state) {
      return state - 1
    }
  },
  effects: dispatch => ({
    async incrementAsync(value) {
      dispatch.count.increment()
    }
  }),
}

export default count
