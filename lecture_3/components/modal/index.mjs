import { initFormComponent } from "../form/index.mjs"

export const initModalComponent = ({modal, book, editItem}) => {
    modal.classList.remove('hidden')
    const closeButton = document.getElementById('close_btn')
    const tagsInput = document.getElementById('edit_tags_input')
    const tagsContainer = document.getElementById('edit_tags_container')
    const form = document.getElementById('edit_form')

    const closeHandler = () => {
        modal.classList.add('hidden')
        closeButton.removeEventListener('click', closeHandler)
    }

    const handleEditItem = (values) => {
        editItem(values)
        closeHandler()
    }

    initFormComponent({form, tagsInput, tagsContainer, book, handleEditItem})

    closeButton.addEventListener('click', closeHandler)
}
