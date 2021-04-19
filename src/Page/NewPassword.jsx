import React from 'react'
import axios from 'axios'

class NewPassword extends React.Component{
    state = {
        message: null,
        error: true
    }

    // componentDidMount(){

    // }

    onNewPassword = () => {
        let newData = {
            email: this.props.match.params.email,
            newPassword: this.password.value
        }

        axios.patch('http://localhost:4000/authentic-system/forgot-password', {newData})
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
                        <h1>
                            New Password
                        </h1>
                        <input type="password" ref={(e) => this.password = e} placeholder="Your New Password" className="form form-control my-3" />
                        {/* <input type="password" ref={(e) => this.confirmpassword = e} placeholder="Confirm Password" className="form form-control my-3" /> */}
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" />
                            <label className="form-check-label">Show Password</label>
                        </div>
                        <input type='button' onClick={() => this.onNewPassword()} disabled={!(this.state.error)} value='Change Password' className="btn btn-warning w-100 mt-3" />
                        <h6 className="text-center text-danger mt-5">
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

export default NewPassword