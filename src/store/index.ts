import { init } from '@rematch/core'
import { ExtractRootDispatch, ExtractRootState } from './helpers'
import { AllModels } from './types'

import count from './count'
import user from './user'

const models: AllModels = {
  count,
  user,
}

const store = init({
  models: models as any,
})

export default store

export type RootDispatch = ExtractRootDispatch<AllModels>
export type RootState = ExtractRootState<AllModels>
