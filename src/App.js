// Default
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Component
import Navbar from './Component/Navbar'

// CSS
import './Supports/Stylesheets/Utils.css'

// Redux
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import allReducer from './Redux/Reducers/Index'

//Page
import Register from './Page/Register'
import Login from './Page/Login'
import Confirmation from './Page/Confirmation'
import ForgotPassword from './Page/ForgotPassword'
import NewPassword from './Page/NewPassword'
import Todolist from './Page/Todolist'

const store = createStore(allReducer, applyMiddleware(thunk))

function App(){
    return(
        <Provider store={store}>
          <BrowserRouter>
            <Navbar />
              <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/confirmation/:id/:pass' component={Confirmation} />
                <Route path='/forgot-password' component={ForgotPassword} />
                <Route path='/new-password/:email' component={NewPassword} />
                <Route path='/todolist' component={Todolist} />
              </Switch>
          </BrowserRouter>
        </Provider>
    )
}

export default App