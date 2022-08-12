import { createId } from "../../helpers.mjs";
import { state } from "../../state.mjs";
import { initTagsInput } from "../tagsInput/index.mjs";

export const initFormComponent = ({root, addItem, book, handleEditItem}) => {

    let tags = Immutable.List()

    let title = book ? book.title : ''
    let author = book ? book.author : ''
    let publishingHouse = book ? book.publishingHouse : ''

    const onTagsChange = (newTags) => {
        tags = newTags
        //root.innerHTML = ''
        renderFormComponent(root)
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
        //tagsContainer.innerHTML = ''
    }

    const resetForm = () => {
        title = ''
        author = ''
        publishingHouse = ''
        clearTags()
        renderFormComponent(root)
    }

    const formSubmitHandler = (e) => {
        e.preventDefault()
        const values = {
            id: createId('table_', state.books),
            title: title,
            author: author,
            publishingHouse: publishingHouse,
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
            //form.removeEventListener('submit', formSubmitHandler)
            return
        }

        addItem(values)
        resetForm()
    }

    const inputChangeHandlel = (name) => e => {
        const value = e.target.value
        switch (name){
            case 'title':
                title = value
                return
            case 'author':
                author = value
                return
            case 'publishingHouse':
                publishingHouse = value
                return
        }
        renderFormComponent(form)
    }

    const cerateFormInput = (attributes) => {
        const input = document.createElement('input')
        input.classList.add('input')
        input.onkeyup = inputChangeHandlel(attributes.name)
        Object.keys(attributes).forEach(key => input.setAttribute(key, attributes[key]))

        return input
    }

    const renderFormComponent = (container) => {

        let form = document.getElementById('form')
        if(!form) {
            form = document.createElement('form')
            form.setAttribute('id', 'form')
            container.append(form)
        }

        form.innerHTML = ''

        const inputsContainer = document.createElement('div')
        inputsContainer.classList.add('input_column')
        const inputTitle = cerateFormInput({type: "text", placeholder:"Title", name:"title", required: true, value: title})
        const authorTitle = cerateFormInput({type: "text", placeholder:"Author", name:"author", required: true, value: author})
        const phTitle = cerateFormInput({type: "text", placeholder:"Publishing House", name:"publishingHouse", required: true, value: publishingHouse})
        const tagsLabel = document.createElement('p')
        tagsLabel.innerText = 'Add tags here:'
        const tagsContainer = document.createElement('div')
        tagsContainer.classList.add('tags_outher_container')
        const helpText = document.createElement('span')
        helpText.classList.add('help_text')
        helpText.innerText = '* press spase to add a tag'
        inputsContainer.append(inputTitle)
        inputsContainer.append(authorTitle)
        inputsContainer.append(phTitle)
        inputsContainer.append(tagsLabel)
        inputsContainer.append(tagsContainer)
        inputsContainer.append(helpText)
        const button = document.createElement('button')
        button.setAttribute('type', 'submit')
        button.innerText = 'Submit'
        form.append(inputsContainer)
        form.append(button)

        form.onsubmit = formSubmitHandler
        initTagsInput(tagsContainer, onTagsChange, tags)
    }

    renderFormComponent(root)
}
