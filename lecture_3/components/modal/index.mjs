import { initFormComponent } from "../form/index.mjs"

export const initModalComponent = ({modal, book, editItem}) => {
    
    // const closeButton = document.getElementById('close_btn')
    // const tagsInput = document.getElementById('edit_tags_input')
    // const tagsContainer = document.getElementById('tags_outher_container_edit')
    // const form = document.getElementById('edit_form')

    const closeHandler = () => {
        modal.classList.add('hidden')
        //closeButton.removeEventListener('click', closeHandler)
    }

    const handleEditItem = (values) => {
        editItem(values)
        closeHandler()
    }

    const renderModal = (modal) => {
        modal.classList.remove('hidden')
        initFormComponent({root: modal, book, handleEditItem})
    }

    renderModal(modal)

    //closeButton.addEventListener('click', closeHandler)
}
