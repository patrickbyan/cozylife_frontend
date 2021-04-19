import Axios from 'axios'
import Swal from 'sweetalert2'

export const onCreateTodo = (dataToSend) => {
    return (dispatch) => {

        let data = {
            token: dataToSend.token
        }

        Axios.post('http://localhost:4000/todo/create', dataToSend)
        .then((res) => {
            Axios.post('http://localhost:4000/todo/get', data)
            .then((response) => {
                dispatch({
                    type: 'TODO_SUCCESS',
                    payload: response.data.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: 'TODO_ERROR',
                    payload: error.response.data.message
                })
            })
        })
        .catch((err) => {
            dispatch({
                type: 'TODO ERROR',
                payload: err.response.data.message
            })
        })
    }
}

export const onGetTodo = (data) => {
    return(dispatch) => {
        Axios.post('http://localhost:4000/todo/get', data)
        .then((response) => {
            dispatch({
                type: 'TODO_SUCCESS',
                payload: response.data.data
            })
        })
        .catch((error) => {
            dispatch({
                type: 'TODO_ERROR',
                payload: error.response.data.message
            })
        })
    }
}

export const onPatchStatus = (idTodo, token, currentStatus) => {
    return(dispatch) => {
        let data = {
            idTodo, token, currentStatus
        }
        
        Axios.patch('http://localhost:4000/todo/statusPatch', data)
        .then((res) => {
            Axios.post('http://localhost:4000/todo/get', data)
            .then((response) => {
                dispatch({
                    type: 'TODO_SUCCESS',
                    payload: response.data.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: 'TODO_ERROR',
                    payload: error.response.data.message
                })
            })
        })
        .catch((err) => {
            dispatch({
                type: 'TODO_ERROR',
                payload: err.response.data.message
            })
        })
    }
}

export const onDeleteTodo = (idTodo, token) => {
    return (dispatch) => {

        let data = {
            idTodo, token
        }

        Axios.post('http://localhost:4000/todo/remove', data)
        .then((res) => {
            Axios.post('http://localhost:4000/todo/get', data)
            .then((response) => {
                dispatch({
                    type: 'TODO_SUCCESS',
                    payload: response.data.data
                })
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Delete Success',
                    showConfirmButton: false,
                    timer: 800
                })
            })
            .catch((error) => {
                dispatch({
                    type: 'TODO_ERROR',
                    payload: error.response.data.message
                })
            })
        })
        .catch((err) => {
            dispatch({
                type: 'TODO_ERROR',
                payload: err.response.data.message
            })
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: err.response.data.message,
                showConfirmButton: false,
                timer: 800
            })
        })
    }
}