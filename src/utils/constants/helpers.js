export const serializeBool = (str) => {
    if(typeof str === 'boolean') {
        return str
    }
    return str === 'true'
}