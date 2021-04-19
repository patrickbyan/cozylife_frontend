import React from 'react';
import logo from '../Supports/Assets/logo.jpg'
import { Link } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class Navbar extends React.Component{
    state = {
        showModal: false
    }

    render(){
        return(
        <>
            <div className="cl-bg-primary sticky-top" style={{height: '50px'}}>
                <div className="container">
                    <div className='row align-items-center' style={{height: '50px'}}>
                        <div className='col-2'>
                            <Link to='/todolist' className="text-decoration-none cl-secondary">
                                <img src={logo} style={{width: '100px'}} alt="logo-cl" />
                            </Link>
                        </div>
                        <div className='col-6 ml-n5'>
                            <span className="mx-3"><Link to='/register' className="text-decoration-none cl-secondary">Register</Link></span>
                            <span className="mx-3 cl-secondary">Menu 2</span>
                            <span className="mx-3 cl-secondary">Menu 3</span>
                        </div>
                        <div className='col-4 text-right'>
                            <span className="mx-2 cl-secondary">Logout</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Section */}
            <Modal toggle={() => this.setState({showModal: false})} isOpen={this.state.showModal} className="width-400">
                <ModalHeader>Login Page</ModalHeader>
                    <ModalBody>
                        <div>
                            <input type='text' ref="inputLogin" placeholder='Username / Nomor Handphone / Email' className='form form-control' />
                        </div>
                        <div className="row container">
                            <input type='password' ref="inputPassword" placeholder='Password' className='form form-control my-3 col-10' />
                            <input type='button' className='btn btn-outline-secondary text-center my-3 col-2' />       
                        </div>
                        <div>
                            <p className="text-warning cp-font-size-14">
                                
                            </p>
                        </div>
                        <div className="d-flex mt-3">
                            <input type='button' value='Login' className='btn btn-warning' />
                            <input type='button' value='Cancel' className='btn btn-danger ml-2' />
                        </div>
                        <div className="mt-5 text-center">
                            <p>
                                Don't have account? <Link to="/Register"><span className="font-weight-bold">Register here!</span></Link>
                            </p>
                        </div>
                    </ModalBody>
                    <ModalFooter></ModalFooter>
            </Modal>
        </>
        )
    }
}

export default Navbar