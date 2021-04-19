import axios from 'axios'
import React from 'react'
import validator from 'validator'

class ForgotPassword extends React.Component{

    state = {
        message: null,
        error: true
    }

    onForgotPassword = () => {
        var email = this.email.value

        if(!email) throw this.setState({message: 'Data Must Be Filled'})
        if(!(validator.isEmail(email))) throw this.setState({message: 'Email Not Valid'})

        axios.post('http://localhost:4000/authentic-system/get-email', {email})
        .then((res) => {
            this.setState({message: res.data.message, error: res.data.error})
        })
        .catch((err) => {
            this.setState({message: err.response.data.message, error: err.response.data.error})
        })
    }

    render(){
        return(
            <div className="container">
                <div className="row justify-content-center align-items-center height-500 mt-5">
                    <div className="col-5 px-5 pt-5 pb-5 border">
                        <h1 className="text-center mb-5">
                            Forgotten your Password?
                        </h1>
                        <input type="text" ref={(e) => this.email = e} placeholder="Insert your Email" className="form form-control mb-3" />
                        <input type='button' onClick={() => this.onForgotPassword()} disabled={!(this.state.error)} value='Forgot Password' className="btn btn-warning w-100 mt-3" />
                        <h6 className="text-center text-danger mt-3">
                            {
                                this.state.message
                            }
                        </h6>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotPassword