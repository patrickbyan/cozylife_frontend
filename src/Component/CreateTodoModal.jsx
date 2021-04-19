import React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody } from 'reactstrap'

import { onCreateTodo } from '../Redux/Actions/TodoAction'

class CreateTodoModal extends React.Component{
    state = {
        modalOpen: false,
        message: null
    }

    onSubmit = () => {
        let title = this.title.value
        let description = this.description.value
        let date = this.date.value
        let token = localStorage.getItem('my-tkn')

        if(!title, !description, !date) throw this.setState({ message: 'Data Must Be Filled' })

        let dataToSend = {
            title, 
            description,
            date,
            token
        }

        this.props.onCreateTodo(dataToSend)
        this.setState({modalOpen: false})
    }

    render(){
        return(
            <>
                <input type="button" value="Add Todo" className="btn btn-primary btn-sm my-3" onClick={() => this.setState({modalOpen: true})} disabled={this.props.user.is_email_confirmed === 0? true : false} />
                <Modal toggle={() => this.setState({modalOpen: false})} isOpen={this.state.modalOpen}>
                    <ModalBody>
                        <div>
                            <h3>
                                Create Todo
                            </h3>
                        </div>
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" ref={(e) => this.title = e} placeholder="Enter Title" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input type="text" ref={(e) => this.description = e} placeholder="Enter Description" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <input type="datetime-local" ref={(e) => this.date = e} placeholder="Enter Date" className="form-control" />
                        </div>
                        <div>
                            <input type="button" onClick={() => this.onSubmit()} value="Submit" className="btn btn-primary w-100" />
                        </div>
                        <div>
                            <h6 className="text-danger text-center mt-3">
                                {this.state.message}
                                {
                                    this.props.todo.message?
                                        this.props.todo.message
                                    :
                                        null
                                }
                            </h6>
                        </div>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        todo: state.todo
    }
}

const mapDispatchToProps = {
    onCreateTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTodoModal)