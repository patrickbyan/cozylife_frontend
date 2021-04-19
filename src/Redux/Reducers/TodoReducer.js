let initialState = {
    loading: false,
    data: null,
    message: null
}

const todoReducer = (state = initialState, action) => {
    switch(action.type){
        case 'LOADING':
            return { ...state, loading: true }
        case 'TODO_SUCCESS':
            return { ...state, data: action.payload, loading: false }
        case 'TODO_ERROR':
            return { ...state, message: action.payload, loading: false }
        default:
            return state
    }
}

export default todoReducer