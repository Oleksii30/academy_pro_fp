import { state, dispatch } from "../../state.mjs"
import { CHANGE_FILTER } from "../../actionTypes.mjs"

export const initFiltersComponent = ({root, onFilterChange}) => {

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

    const renderFiltersComponent = (root) => {

        const filtersContainer = document.createElement('div')
        filtersContainer.classList.add('filters')

        const authorInput = document.createElement('input')
        authorInput.setAttribute('type', 'text')
        authorInput.value = state.filter.author
        authorInput.setAttribute('placeholder', 'Author')

        const tagInput = document.createElement('input')
        tagInput.setAttribute('type', 'text')
        tagInput.value = state.filter.tag
        tagInput.setAttribute('placeholder', 'Tags')

        authorInput.onkeyup = authorChangeHandler
        tagInput.onkeyup =  tagChangeHandler

        filtersContainer.append(authorInput)
        filtersContainer.append(tagInput)

        root.append(filtersContainer)
    }

    renderFiltersComponent(root)
}


