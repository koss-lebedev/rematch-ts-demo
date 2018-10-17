import React, { SFC } from 'react'
import { connect } from 'react-redux'
import { RootState, RootDispatch } from '../store'

type CounterProps = ReturnType<typeof mapProps> & ReturnType<typeof mapDispatch>

const Counter: SFC<CounterProps> = ({ value, increment, decrement }) => (
  <div>
    <button onClick={decrement}>-</button>
    <div>{value}</div>
    <button onClick={increment}>+</button>
  </div>
)

const mapProps = (state: RootState) => ({
  value: state.count,
})

const mapDispatch = (dispatch: RootDispatch) => ({
  increment: dispatch.count.increment,
  decrement: dispatch.count.decrement,
  setNameAsync: dispatch.user.setNameAsync({ name: 'test '}),
})

export default connect(mapProps, mapDispatch)(Counter)
