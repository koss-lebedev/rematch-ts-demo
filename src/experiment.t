type Call<T> = T extends (...args: any[]) => infer R ? R : never

type ExtractPayload<T> = T extends (state: any, payload: infer P) => infer S
  ? (payload: P) => S
  : never

type ExtractPayloads<T> = {
  [R in keyof T]: ExtractPayload<T[R]>
}

type ExtractReducers<M> = M extends { reducers: infer U } ? ExtractPayloads<U> : never

type ExtractEffects<M> = M extends { effects: infer U } ? Call<U> : never

type ExtractDispatch<M> = ExtractReducers<M> & ExtractEffects<M>

type Dispatch<Models> = {
  [model in keyof Models]: ExtractDispatch<Models[model]>
}

type ExtractState<M> = M extends { state: infer S } ? S : never

type State<Models> = {
  [model in keyof Models]: ExtractState<Models[model]>
}

type ModelEffects<S> = {
  [key: string]: (payload: any, rootState: S) => void
}

type ModelReducers<S> = {
  [key: string]: (state: S, payload: any) => S,
}

type ModelConfig<T, AllModels> = {
  state: T,
  reducers?: ModelReducers<T>,
  effects?: (dispatch: Dispatch<AllModels>) => ModelEffects<T>
}

/* manual */

type CounterState = number

interface IPayload {
  value: number
}

const countModel: ModelConfig<CounterState, AllModels> = {
  state: 0,
  reducers: {
    increment(state, payload: IPayload) {
      return state + payload.value
    },
    decrement(state, payload: IPayload) {
      return state - payload.value
    }
  },
  effects: dispatch => ({
    async incrementAsync({ value }) {
      dispatch.count.increment({ value })
    }
  }),
}

const allModels = {
  count: countModel,
}

type AllModels = typeof allModels

type RootDispatch = Dispatch<AllModels>
type RootState = State<AllModels>



const mapProps = (state: RootState) => state.count

const mapDispatch = (dispatch: RootDispatch) => ({
  increment: dispatch.count.increment,
})


