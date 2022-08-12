
export const initListComponent = ({root, books, removeItem, openEditModal}) => {

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
        let table = document.getElementById('table')
        if(!table) {
            table = document.createElement('table')
            table.setAttribute('id', 'table')
            rootElement.append(table)
        }

        table.innerHTML = ''

        table.insertAdjacentHTML('beforeend', createHedingRow())
        books.forEach(book => {
            const row = createRow()
            createTextCellAndAppendToRow(row)(book.title)
            createTextCellAndAppendToRow(row)(book.author)
            createTextCellAndAppendToRow(row)(book.publishingHouse)
            createTagsCellAndAppendToRow(row)(book.tags)
            createButtonEditCellAndAppendToRow(row)(book)
            createButtonRemoveCellAndAppendToRow(row)(book.id)
            table.append(row)
        })
    }

    renderTable(root)(books)
}
