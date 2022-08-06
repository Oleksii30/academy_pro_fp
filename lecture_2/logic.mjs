const findElementByPosition = array => position => R.find(R.propEq('position', position))(array)

export const openMatrix = table => table.flat()

const getIndex = table => (row, column) => {
    return table.find(cell => cell.row === row && cell.column === column).position -1
}

const closeMatrix = table => R.collectBy(R.prop('column'), table)

export const groupMatrixByRow = table => R.collectBy(R.prop('row'), table)

const moveElementToPosition = (curIndex, moveToIndex) => array => R.move(curIndex, moveToIndex, array)

const updateValues = prevTable => table => {
    const example = openMatrix(prevTable)
    const search = findElementByPosition(example)
    return table.map((cell, index) => ({
        id: cell.id,
        row: search(index+1).row,
        column: search(index+1).column,
        position: search(index+1).position
    }))
}

export const getNewState = (prevState, values) => {
    const indexSearch = getIndex(openMatrix(prevState))
    const elIndex = indexSearch(values.oldRow, values.oldColumn)
    const toIndex = indexSearch(values.newRow, values.newColumn)

    const newState = R.pipe(
        openMatrix,
        moveElementToPosition(elIndex, toIndex),
        updateValues(prevState),
        closeMatrix
    )(prevState)

    return newState
}
