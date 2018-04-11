import { handleActions } from 'redux-actions'

export default handleActions({
  test(state) {
    return state
  }
}, {
    name: 'test'
  })