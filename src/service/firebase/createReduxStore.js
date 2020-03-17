import { createStore } from 'redux'
import reducer from './reducer.js'

const initialState = {}

export default () => {
  return createStore(
    reducer,
    initialState,
  )
}