import React from 'react'
import validator from 'validator'

import { connect } from 'react-redux'
import {onUserRegister} from '../Redux/Actions/UserAction'

class Register extends React.Component{

    state = {
        error: null
    }

    onRegister = () => {
        this.setState({loading: true})

        let email = this.email.value
        let password = this.password.value
        let symbol = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

        if(!email || !password) throw this.setState({error: 'Data Must Be Filled', loading: false})
        if(!(validator.isEmail(email))) throw this.setState({error: 'Email Not Valid', loading: false})
        if(!(symbol.test(password))) throw this.setState({error: 'Password must contains uppercase, lowercase and numeric characters at least 1 character', loading: false})

        
        this.props.onUserRegister(email, password)
    }
    render(){
        return(
            <div className="background-image">
                <div className="container">
                    <div className="row justify-content-center align-items-center height-500">
                        <div className="col-5 card-body border shadow bg-light px-5" style={{marginTop: '150px'}}>
                            <h2 className="text-center mb-3">
                                Register
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
                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" />
                                <label className="form-check-label">Show Password</label>
                            </div>
                            <input type='button' onClick={() => this.onRegister()} disabled={this.props.user.loading} value='Register' className="btn btn-warning w-100 mt-1" />
                            <p className="text-center text-danger mt-3">
                                {this.state.error}
                                {
                                    this.props.user.message
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    onUserRegister
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)