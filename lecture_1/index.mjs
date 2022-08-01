import { data } from './data.mjs'
import { flow } from './flow.mjs'

const requiredFields = [
    'name',
    'price',
    'date'
]

const root = document.getElementById('root')

const table = document.createElement('table')
const firstRow = document.createElement('tr')
const secondRow = document.createElement('tr')
table.append(firstRow, secondRow)

const list = document.createElement('ul')

root.append(table, list)

const createCell = (value) => {
   const cell = document.createElement('td')
   cell.innerHTML = value
   return cell
}

const createListItem = (value) => {
    const listItem = document.createElement('li')
    listItem.innerHTML = value
    return listItem
 }

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)
const dollarFormat = (value) => `${value}$`

const formatListItem = (product) => {
    let result = '{ '
    const keys = Object.keys(product)
    for (const key of keys) {
        result += `${key}: ${product[key]}`

        if(keys.indexOf(key) < keys.length - 1) {
            result += ', '
        }
    }
    result += ' }'
    return result
}

const validateFields = (inputFields, requiredFields) => {
    for (const field of requiredFields) {
        if(!inputFields.includes(field)) {
            return false
        }
    }
    return true
}

const filterValidProducts = (products) => products.filter(product => validateFields(Object.keys(product), requiredFields))
const filterUnvalidProducts = (products) => products.filter(product => !validateFields(Object.keys(product), requiredFields))

const createProductCellsArray = (products) => products.map(product => ({
    first: createCell(product.date),
    second: createCell(`${capitalize(product.name)}-${dollarFormat(product.price)}`)
}))

const renderProductCells = (products, firstRow, secondRow) => products.forEach(product => {
    firstRow.append(product.first)
    secondRow.append(product.second)
})

const createListItemsArray = (products) => products.map(product => createListItem(formatListItem(product)))

const renderListItems = (products, list) => products.forEach(product => {
    list.append(product)
})


flow([
    filterValidProducts,
    createProductCellsArray,
    (productCells) => renderProductCells(productCells, firstRow, secondRow),
])(data)

flow([
    filterUnvalidProducts,
    createListItemsArray,
    (productListItems) => renderListItems(productListItems, list),
])(data)
