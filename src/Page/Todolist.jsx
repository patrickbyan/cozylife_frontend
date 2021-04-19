import React from 'react'
import {connect} from 'react-redux'
import { faCheckCircle, faSlidersH, faSortDown, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from 'sweetalert2'

// Actions
import { checkUserVerify } from '../Redux/Actions/UserAction'
import { onGetTodo } from '../Redux/Actions/TodoAction'
import { onPatchStatus } from '../Redux/Actions/TodoAction'
import { onDeleteTodo } from '../Redux/Actions/TodoAction'

// Import Component
import CreateModal from '../Component/CreateTodoModal'

class Todolist extends React.Component{

    state = {
        showCreateModal: false,
        status: false
    }

    componentDidMount(){
        this.userVerify()
        this.getTodoList()
    }

    userVerify = () => {
        let token = localStorage.getItem('my-tkn')

        this.props.checkUserVerify(token)   
    }

    getTodoList = () => {
        let token = localStorage.getItem('my-tkn')

        let data = {
            token
        }

        this.props.onGetTodo(data)
    }

    onPatchTodo = (idTodo, currentStatus) => {
        let token = localStorage.getItem('my-tkn')

        this.props.onPatchStatus(idTodo, token, currentStatus)
    }

    onDeleteTodo = (idTodo) => {
        let token = localStorage.getItem('my-tkn')

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })

        .then((result) => {
            if (result.isConfirmed) {
                this.props.onDeleteTodo(idTodo, token)

            }
        })
    }

    render(){
        if(this.props.todo.data === null){
            return(
                <div className="container text-center mt-5 height-150 mb-5">
                    <div className="spinner-grow text-warning" style={{width: '3rem', height: '3rem'}} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }

        return(
            <div className="background-image-landing-page">
                <div className="container mt-5">
                    <div className="row justify-content-center py-5">
                        <div className="col-8 shadow py-3 bg-light">
                            <div className="text-center">
                                {
                                    this.props.user.is_email_confirmed === 0?
                                        <div className="alert alert-danger" role="alert">
                                            Your account not activated. Click <a href="/" className="alert-link">here</a> to activate your account.
                                        </div>
                                    :
                                        null
                                }
                                {
                                    this.props.todo.message !== null?
                                        <div className="alert alert-danger" role="alert">
                                            {this.props.todo.message}
                                        </div>
                                    :
                                        null
                                }
                            </div>
                            <div className="col-12">
                                <div className="row justify-content-between align-items-center">
                                    <div className="col-6">
                                        <CreateModal />
                                    </div>
                                    <div className="col-6 text-right">
                                        <FontAwesomeIcon icon={ faSlidersH } className="text-muted h5 align-bottom" />
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div className="row px-3">
                                {
                                    this.props.todo.data.map((value, index) => {
                                        return(
                                            <>
                                                <div key={index} className="col-12 mb-3">
                                                    <span>
                                                        <FontAwesomeIcon icon={ faSortDown } className="text-center text-dark text-center h5 align-bottom" />
                                                    </span>
                                                    <span className="h5 font-weight-bold ml-2">
                                                        {value.date.split('T')[0]}
                                                    </span>
                                                </div>
                                                {
                                                    value.todolist.map((val, idx) => {
                                                        return(
                                                            <>
                                                                <div key={idx} className="col-8">
                                                                    {
                                                                        val.status === 0?
                                                                            <span>
                                                                                <FontAwesomeIcon icon={ faCheckCircle } className="text-center h5 align-top cl-clickable-element success-link" onClick={() => this.onPatchTodo(val.id, val.status)} />
                                                                            </span>
                                                                        :
                                                                            <span>
                                                                                <FontAwesomeIcon icon={ faCheckCircle } className="text-center h5 align-top cl-clickable-element muted-link" onClick={() => this.onPatchTodo(val.id, val.status)} />
                                                                            </span>
                                                                    }
                                                                    <span className="font-weight-bold ml-2" style={{fontSize: '18px'}}>
                                                                        {val.title}
                                                                    </span>
                                                                    <span className="font-weight-light ml-2" style={{fontSize: '13px'}}>
                                                                        {val.description}
                                                                    </span>
                                                                </div>
                                                                <div className="col-4 text-right">
                                                                    {
                                                                        val.status === 0?
                                                                            <span className="badge badge-pill ml-3 badge-warning">On Progress</span>
                                                                        :
                                                                            <span className="badge badge-pill ml-3 badge-success">Done</span>
                                                                    }
                                                                    <span className="badge badge-pill badge-light">{val.date.split('T')[1].substr(0, 5)}</span>
                                                                    <span>
                                                                        <FontAwesomeIcon icon={ faTrashAlt } className="text-center align-top ml-3 cl-clickable-element danger-link" onClick={() => this.onDeleteTodo(val.id)}/>
                                                                    </span>
                                                                </div>
                                                                <hr />


                                                            </>
                                                        )
                                                    })
                                                }

                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    checkUserVerify, onGetTodo, onPatchStatus, onDeleteTodo
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        todo: state.todo
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todolist)