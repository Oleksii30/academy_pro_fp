import { groupMatrixByRow, openMatrix } from './logic.mjs'

export const oldTable = document.getElementById('old_table')
export const newTable = document.getElementById('new_table')
export const form = document.getElementById('form')

const createRow = () => document.createElement('tr')

const createCellAndAppendToRow = row => cellValue => {
    const cell = document.createElement('td')
    cell.innerHTML = cellValue
    row.append(cell)
}

export const render = rootElement => table => {
    rootElement.innerHTML = ''
    const groupedByRow = groupMatrixByRow(openMatrix(table))

    groupedByRow.forEach(row => {
        const rowElement = createRow()
        rootElement.append(rowElement)
        row.forEach(cell => createCellAndAppendToRow(rowElement)(cell.id))
    })
}

export const renderComponent = (prevState, newState) => {
    render(oldTable)(prevState)
    render(newTable)(newState)
}
