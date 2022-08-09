import { state, dispatch } from "../../state.mjs"
import { ADD, REMOVE, EDIT } from "../../actionTypes.mjs"
import { initFiltersComponent } from "../filter/index.mjs"
import { initFormComponent } from '../form/index.mjs'
import { initModalComponent } from "../modal/index.mjs"


export const initListComponent = (table) => {
    const authorInput = document.getElementById('author_filter')
    const tagInput = document.getElementById('tag_filter')
    const tagsInput = document.getElementById('tags_input')
    const tagsContainer = document.getElementById('tags_container')
    const form = document.getElementById('form')

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

    const renderWithFilteredValues = () => {
        const filtered = filterBooks(state.books, state.filter)
        renderTable(table)(filtered)
    }

    const onFilterChange = () => {
        renderWithFilteredValues()
    }

    const addItem = (values) => {
        dispatch(ADD, values)
        renderWithFilteredValues()
    }

    const removeItem = (id) => {
        dispatch(REMOVE, id)
        renderWithFilteredValues()
    }

    const editItem = (item) => {
        dispatch(EDIT, item)
        renderWithFilteredValues()
    }

    const openEditModal = (book) => {
        const modal = document.getElementById('modal')
        initModalComponent({modal, book, editItem})
    }

    const createRow = () => document.createElement('tr')

    const createHedingRow = () => {
        return `
            <tr class="table_head">
                <td>Title</td>
                <td>Author</td>
                <td>Publishing House</td>
                <td>Book Tags</td>
                <td>Edit</td>
                <td>Remove</td>
            </tr>
        `
    }

    const createTextCellAndAppendToRow = row => cellValue => {
        const cell = document.createElement('td')
        cell.innerHTML = cellValue
        row.append(cell)
    }

    const createNewTag = (tag) => {
        const newTag = document.createElement('span')
        newTag.classList.add('tag')
        newTag.innerHTML = tag
        return newTag
    }

    const createTagsCellAndAppendToRow = row => tags => {
        const cell = document.createElement('td')
        tags.forEach(tag => {
            cell.append(createNewTag(tag.text))
        })
        row.append(cell)
    }

    const createButtonEditCellAndAppendToRow = row => entity => {
        const cell = document.createElement('td')
        const button = document.createElement('button')
        button.innerHTML = 'edit'
        button.onclick = () => openEditModal(entity)
        cell.append(button)
        row.append(cell)
    }

    const createButtonRemoveCellAndAppendToRow = row => entityId  => {
        const cell = document.createElement('td')
        const button = document.createElement('button')
        button.innerHTML = 'remove'
        button.onclick = () => removeItem(entityId)
        cell.append(button)
        row.append(cell)
    }

    const renderTable = rootElement => books => {
        rootElement.innerHTML = ''
        rootElement.insertAdjacentHTML('beforeend', createHedingRow())
        books.forEach(book => {
            const row = createRow()
            createTextCellAndAppendToRow(row)(book.title)
            createTextCellAndAppendToRow(row)(book.author)
            createTextCellAndAppendToRow(row)(book.publishingHouse)
            createTagsCellAndAppendToRow(row)(book.tags)
            createButtonEditCellAndAppendToRow(row)(book)
            createButtonRemoveCellAndAppendToRow(row)(book.id)
            rootElement.append(row)
        })
    }

    initFormComponent({form, tagsInput, tagsContainer, addItem})
    initFiltersComponent(authorInput, tagInput, onFilterChange)
}
