import { ExtractRootDispatch, ExtractRootState } from './helpers'

export interface ICountModel<T = number> {
  state: T,
  reducers: {
    increment: (state: T) => T
    decrement: (state: T) => T
  },
  effects: (dispatch: ExtractRootDispatch<AllModels>) => ({
    incrementAsync: (payload: number) => Promise<void>
  })
}

interface IUserPayload {
  name: string
}

export interface IUserModel<T = { name: string, age: number }> {
  state: T,
  reducers: {
    setName: (state: T, payload: IUserPayload) => T
  },
  effects: (dispatch: ExtractRootDispatch<AllModels>) => ({
    setNameAsync: (payload: IUserPayload, rootState: ExtractRootState<AllModels>) => Promise<void>
  })
}

export type AllModels = {
  count: ICountModel
  user: IUserModel
}
