import React from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router'

// Action
import {onUserLogin} from '../Redux/Actions/UserAction'



class Login extends React.Component{

    componentDidMount(){
        var token = localStorage.getItem('my-tkn')

        if(token){
            window.location = "/todolist"
        }
    }

    onLogin = () => {
        let data = {
            email: this.email.value,
            password: this.password.value
        }

        this.props.onUserLogin(data)
    }

    render(){
        if(this.props.user.isRedirect){
            return(
                <div>
                    <Redirect to="/todolist" />
                </div>
            )
        }
        return(
            <div className="background-image">
                <div className="container">
                    <div className="row">
                        <div className="col login-img" style={{height: '520px'}}>
                            
                        </div>
                        <div className="col">
                            <div className="row justify-content-center align-items-center" style={{marginLeft: '-60px', height: '500px'}}>
                            <div className="col-11 card-body border shadow bg-light px-5" style={{marginTop: '150px', height: '520px'}}>
                                <h2 className="text-center my-4">
                                    Login
                                </h2>
                                <div class="form-group">
                                    <label>Email address</label>
                                    <input type="text" ref={(e) => this.email = e} placeholder="Input your Email" className="form form-control" />
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" ref={(e) => this.password = e} placeholder="Input your Password" className="form form-control" />
                                    <small class="form-text text-muted">We'll never share your data with anyone else.</small>
                                </div>
                                <p className="text-right cl-hover-red cl-clickable-element mb-3" style={{fontSize: '12px', marginTop: '-34px'}} onClick={() => window.location = '/forgot-password'}>Forgot Password</p>
                                <div className="form-group form-check mt-n2">
                                    <input type="checkbox" className="form-check-input" />
                                    <label className="form-check-label">Show Password</label>
                                </div>
                                <input type='button' onClick={() => this.onLogin()} disabled={this.props.user.loading} value='Login' className="btn btn-warning w-100 mt-3" />
                                <h6 className="text-center text-danger mt-5">
                                    {
                                        this.props.user.message
                                    }
                                </h6>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    onUserLogin
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)