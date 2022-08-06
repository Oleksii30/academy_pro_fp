import { table } from './data.mjs'
import { NEW_FORM_VALUES } from './actionTypes.mjs'

export let state = table

export const dispatch = (actionType, payload) => {
    switch (actionType) {
        case NEW_FORM_VALUES:
            state = payload
            break;
        default:
            break;
    }
}
