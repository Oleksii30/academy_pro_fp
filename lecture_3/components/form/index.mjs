import { createId } from "../../helpers.mjs";
import { state } from "../../state.mjs";
import { initTagsInput } from "../tagsInput/index.mjs";

export let tags = Immutable.List()

export const initFormComponent = ({form, tagsInput, tagsContainer, addItem, book, handleEditItem}) => {

    const onTagsChange = (newTags) => {
        tags = newTags
    }

    const setFormValues = (values) => {
        const titleInput = document.getElementById('edit_title')
        const authorInput = document.getElementById('edit_author')
        const phInput = document.getElementById('edit_ph')
        titleInput.value = values.title
        authorInput.value = values.author
        phInput.value = values.publishingHouse

        tags = Immutable.List(values.tags)
    }

    if(book) {
        setFormValues(book)
    }

    const clearTags = () => {
        tags = Immutable.List()
        tagsContainer.innerHTML = ''
    }

    const resetForm = () => {
        form.reset()
        clearTags()
    }

    const formSubmitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData(form)
        const values = {
            id: createId('table_', state.books),
            title:formData.get('title'),
            author: formData.get('author'),
            publishingHouse: formData.get('publishing_house'),
            date: Date.now(),
            tags: tags.toArray(),
            isRead: false
        }

        if(book) {
            const editValues = {
                ...book,
                title:formData.get('title'),
                author: formData.get('author'),
                publishingHouse: formData.get('publishing_house'),
                tags: tags.toArray(),
            }

            handleEditItem(editValues)
            resetForm()
            form.removeEventListener('submit', formSubmitHandler)
            return
        }

        addItem(values)
        resetForm()
    }

    form.addEventListener('submit', formSubmitHandler)
    initTagsInput(tagsInput, tagsContainer, onTagsChange)
}
