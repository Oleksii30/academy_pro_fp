export const createId = (hash, values) => {
    if(R.isEmpty(values.toArray())) {
        return hash + 0
    }

    const lastId = R.last(values.toArray()).id
    const idNumber = R.replace(hash, '', lastId)

    return hash + (Number(idNumber) + 1)
}