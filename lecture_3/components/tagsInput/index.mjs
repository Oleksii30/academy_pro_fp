import { createId } from '../../helpers.mjs'
import {tags} from '../form/index.mjs'

export const initTagsInput = (tagsInput, container, onTagsChange) => {
    const tagsContainer = container

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

    const updateTagListeners = () => {
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
        updateTagListeners()
    }

    tagsInput.addEventListener('keyup', changeHandler(tagsContainer))
    renderTags(tagsContainer)(tags)
}
