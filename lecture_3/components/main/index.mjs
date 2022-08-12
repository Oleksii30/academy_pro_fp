import { state, dispatch } from "../../state.mjs"
import { ADD, REMOVE, EDIT } from "../../actionTypes.mjs"
import { initFiltersComponent } from "../filter/index.mjs"
import { initFormComponent } from '../form/index.mjs'
import { initModalComponent } from "../modal/index.mjs"
import { initListComponent } from "../list/index.mjs"

export const initMainComponent = (root) => {

    const filterByAuthor = author => books => {
        if(!author) {
            return books
        }
        return books.filter(book => book.author.toLowerCase().includes(author.toLowerCase()))
    }

    const filterByTag = tag => books => {
        if(!tag) {
            return books
        }
        return books.filter(book => book.tags.some(el => el.text.toLowerCase().includes(tag.toLowerCase())))
    }

    const filterBooks = (books, filter) => {
        const filtered = R.pipe(
            filterByAuthor(filter.author),
            filterByTag(filter.tag)
        )(books.toArray())

        return filtered
    }

    const onFilterChange = () => {
        initListComponent({root, books: filterBooks(state.books, state.filter), removeItem, openEditModal})
    }

    const addItem = (values) => {
        dispatch(ADD, values)
        initListComponent({root, books: filterBooks(state.books, state.filter), removeItem, openEditModal})
    }

    const removeItem = (id) => {
        dispatch(REMOVE, id)
        initListComponent({root, books: filterBooks(state.books, state.filter), removeItem, openEditModal})
    }

    const editItem = (item) => {
        dispatch(EDIT, item)
        initListComponent({root, books: filterBooks(state.books, state.filter), removeItem, openEditModal})
    }

    const openEditModal = (book) => {
        const modal = document.getElementById('modal')
        const modalBody = document.getElementById('modal_body')
        initModalComponent({modal, modalBody, book, editItem})
    }

    const renderMainComponent = (root) => {
        root.innerHTML = ''

        initFormComponent({root, addItem})
        initFiltersComponent({root, onFilterChange})
        initListComponent({root, books: filterBooks(state.books, state.filter), removeItem, openEditModal})
    }

    renderMainComponent(root)
}
