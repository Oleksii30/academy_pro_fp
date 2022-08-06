import { render, oldTable, form, renderComponent } from './ui.mjs'
import { state, dispatch } from './state.mjs'
import { getNewState } from './logic.mjs'
import { NEW_FORM_VALUES } from './actionTypes.mjs'

const formSubmitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const values = {
        newColumn: Number(formData.get('new_column')),
        newRow: Number(formData.get('new_row')),
        oldColumn: Number(formData.get('old_column')),
        oldRow: Number(formData.get('old_row')),
    }

    const newState = getNewState(state, values)
    const prevState = state

    dispatch(NEW_FORM_VALUES, newState)

    renderComponent(prevState, newState)
}

render(oldTable)(state)
form.addEventListener('submit', formSubmitHandler)
