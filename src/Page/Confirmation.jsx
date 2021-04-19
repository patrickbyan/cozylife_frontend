import React from 'react'
import Axios from 'axios'
import { Modal, ModalBody } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUnlock } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'

class Confirmation extends React.Component{
    state = {
        error: false,
        message: null,
        showModal: true
    }

    componentDidMount(){
        this.onConfirmation()
    }

    onConfirmation = () => {
        let codeConfirmation = this.props.location.pathname.split('/')[4]

        let dataToSend = {
            id: this.props.match.params.id,
            password: this.props.match.params.pass,
        }

        if(codeConfirmation === 'false'){
            this.setState({showModal: false})

            Axios.patch('http://localhost:4000/authentic-system/confirmation', {dataToSend})
            .then((res) => {
                this.setState({error: res.data.error, message: res.data.message})
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    onCodeActivate = () => {
        let dataToSend = {
            id: this.props.match.params.id,
            password: this.props.match.params.pass,
            code: this.userCode.value
        }

        Axios.patch('http://localhost:4000/authentic-system/code', {dataToSend})
        .then((res) => {
            console.log(res)
            if(res.data.error === false){
                this.setState({showModal: false})
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1000
                })
            }else{
                this.setState({showModal: false})
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1000
                })
                .then((res) => {
                    window.location = '/todolist'
                })
            }
        })

        .catch((err) => {
            console.log(err)
        })
    }

    render(){
        return(
            <>
            <div className="container">
                <div className="row justify-content-center align-items-center" style={{height: '100vh'}}>
                    <div className="col-5 text-center border border-warning px-3 py-5 rounded">
                        <div>
                            {
                                this.state.error?
                                    <p>
                                        {
                                            this.state.message
                                        }
                                    </p>
                                :
                                    <>
                                        <h1>Welcome With Us</h1>
                                        <p>
                                            {
                                                this.state.message
                                            }
                                        </p>   
                                    </>
                            }
                        </div>
                        
                        <button className="btn btn-warning">
                            Continue Login
                        </button>
                    </div>
                </div>
            </div>

            <Modal toggle={() => this.setState({showModal: false})} isOpen={this.state.showModal}>
                <ModalBody>
                    <div className="container" style={{height: '500px'}}>
                        <div className="row justify-content-center align-items-center">
                            <h1 className="text-center col-12">We're almost done!</h1>
                            <h6 className="text-center text-muted col-12">Please insert your code here</h6>
                            <FontAwesomeIcon icon={ faUnlock } className="text-center text-warning text-center w-100 my-4" style={{fontSize: '80px'}} />
                            <div className="container col-12">
                                <div className="container col-10">
                                    <input className="form-control form-control-lg mt-4" type="text" ref={(e) => this.userCode = e }placeholder="Insert your code here" />
                                </div>
                            </div>
                            <button className="btn btn-warning mt-3" onClick={this.onCodeActivate}>
                                Continue Login
                            </button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
            </>
        )
    }
}

export default Confirmation