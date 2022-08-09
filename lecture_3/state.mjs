import { ADD, REMOVE, CHANGE_FILTER, EDIT } from './actionTypes.mjs'

const filter = {
    author: '',
    tag: ''
}

export let state = {
    books: Immutable.List(),
    filter
}

export const dispatch = (actionType, payload) => {
    switch (actionType) {
        case ADD:
            state = {
                ...state,
                books: state.books.push(payload)
            }
            break;
        case REMOVE:
            const index = R.findIndex(R.propEq('id', payload))(state.books.toArray())
            state = {
                ...state,
                books: state.books.delete(index)
            }
            break;
        case EDIT:
            const editIndex = R.findIndex(R.propEq('id', payload.id))(state.books.toArray())
            state = {
                ...state,
                books: state.books.update(editIndex, () => payload)
            }
            break;
        case CHANGE_FILTER:
            state = {
                ...state,
                filter: payload
            }
            break;
        default:
            break;
    }
}
