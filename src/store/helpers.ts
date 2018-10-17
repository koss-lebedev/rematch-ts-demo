import * as Redux from 'redux'

/* reducers */

type ReducerWithoutState<T> =
  T extends (state: infer S) => infer S ? () => S :
  T extends (state: infer S, payload: infer P) => infer S ? (payload: P) => S :
  never

type TransformReducers<Reducers> = {
  [reducerKey in keyof Reducers]: ReducerWithoutState<Reducers[reducerKey]>
}

type ExtractReducers<M> = M extends { reducers: infer U } ? TransformReducers<U> : never

/* effects */

type ExtractEffectPayload<T> = T extends (payload: infer P, ...args: any[]) => infer R
  ? (payload: P) => R
  : never

type TransformEffects<Effects> = {
  [effectKey in keyof Effects]: ExtractEffectPayload<Effects[effectKey]>
}

type ExtractEffectObject<T> = T extends (...args: any[]) => infer R ? TransformEffects<R> : never

type ExtractEffects<M> = M extends { effects: infer U } ? ExtractEffectObject<U> : never

/* dispatch */

type ExtractActions<M> = ExtractReducers<M> & ExtractEffects<M>

type ExtractRootDispatch<Models> = {
  [modelKey in keyof Models]: ExtractActions<Models[modelKey]>
} & Redux.Dispatch<any> // for Redux compatibility

/* state */

type ExtractState<Model> = Model extends { state: infer S } ? S : never

type ExtractRootState<Models> = {
  [modelKey in keyof Models]: ExtractState<Models[modelKey]>
}

/* exports */

export { ExtractRootDispatch, ExtractRootState }
