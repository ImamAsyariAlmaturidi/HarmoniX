const generateRandomString = (length) => {
    let randomString = ''
    const possibleLetters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * possibleLetters.length)
        randomString += possibleLetters[randomIndex]
    }
    return randomString
}

module.exports = {
    generateRandomString
}