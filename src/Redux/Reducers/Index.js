import {combineReducers} from 'redux'
import userReducer from './UserReducer'
import todoReducer from './TodoReducer'

const allReducer = combineReducers({
    user: userReducer,
    todo: todoReducer
})

export default allReducer