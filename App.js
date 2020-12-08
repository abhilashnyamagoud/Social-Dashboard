import React from 'react'
import {Route} from 'react-router-dom'
import LoginPage from './LoginPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import UserShow from './UserShow';

const App=(props)=>{

  return(
    <div>
      <Route path='/' component={LoginPage} exact={true} />
      <Route path='/users/:id'component={UserShow} />
    </div>
  )
}

export default App