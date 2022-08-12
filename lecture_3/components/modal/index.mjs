import { initFormComponent } from "../form/index.mjs"

export const initModalComponent = ({modal, modalBody, book, editItem}) => {

    const closeHandler = () => {
        modal.classList.add('hidden')
        modalBody.innreHTML = ''
    }

    const handleEditItem = (values) => {
        editItem(values)
        closeHandler()
    }

    const renderModal = (modal, modalBody) => {
        modal.classList.remove('hidden')
        const closeButton = document.createElement('span')
        closeButton.onclick = closeHandler
        closeButton.classList.add("close_button")
        closeButton.innerHTML = '&#10006'
        modalBody.append(closeButton)
        initFormComponent({root: modalBody, book, handleEditItem})
    }

    renderModal(modal, modalBody)
}
