export const flow = functions => values => functions.reduce((prev, cur) => {
    return cur(prev)
}, values)