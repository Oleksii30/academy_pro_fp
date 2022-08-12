import { createId } from '../../helpers.mjs'

export const initTagsInput = ({container, onTagsChange, tags}) => {

    const deleteTagHandler = tagsContainer => id => {
        const newtags = tags.filter(el => el.id !== id)
        onTagsChange(newtags)
        renderTags(tagsContainer)(newtags)
    }

    const changeHandler = tagsContainer => e => {
        if(e.code === 'Space') {
            const newtags = tags.push({
                id: createId('tag_', tags),
                text: e.target.value
            })
            onTagsChange(newtags)
            renderTags(tagsContainer)(newtags)
            e.target.value = ''
        }
    }

    const createNewTag = (tag) => {
        return `<span class="tag">${tag.text}<span id="${tag.id}" class="teg_delete">&#10008;</span></span>`
    }

    const updateTagListeners = (tagsContainer) => {
        const tagElements = document.querySelectorAll(".teg_delete");
        tagElements.forEach(el => {
            if(!el.onclick) {
                el.onclick = () => deleteTagHandler(tagsContainer)(el.id)
            }
        })
    }

    const renderTags = tagsContainer => tags => {
        tagsContainer.innerHTML = ''
        tags.forEach(tag => {
            tagsContainer.insertAdjacentHTML('beforeend', createNewTag(tag))
        });
        updateTagListeners(tagsContainer)
    }

    const renderComponent = (container, changeHandler) => {
        const tagsContainer = document.createElement('div')
        tagsContainer.classList.add('tags_inner_container')
        const input = document.createElement('input')
        input.setAttribute('type', 'text')
        input.classList.add('tags_input')
        container.append(tagsContainer)
        container.append(input)

        input.onkeyup = changeHandler(tagsContainer)
        input.focus()

        renderTags(tagsContainer)(tags)
    }

    renderComponent(container, changeHandler)
}
