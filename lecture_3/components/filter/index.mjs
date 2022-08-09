import { state, dispatch } from "../../state.mjs"
import { CHANGE_FILTER } from "../../actionTypes.mjs"

export const initFiltersComponent = (authorInput, tagInput, onFilterChange) => {

    const tagChangeHandler = (e) => {
        const filter = {
            ...state.filter,
            tag: e.target.value
        }
        dispatch(CHANGE_FILTER, filter)
        onFilterChange(filter)
    }

    const authorChangeHandler = (e) => {
        const filter = {
            ...state.filter,
            author: e.target.value
        }
        dispatch(CHANGE_FILTER, filter)
        onFilterChange(filter)
    }

    authorInput.addEventListener('keyup', authorChangeHandler)
    tagInput.addEventListener('keyup', tagChangeHandler)
}


