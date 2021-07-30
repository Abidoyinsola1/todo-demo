module.exports.getDate = () => {
    let today = new Date()
    let options = {
        weekday: 'long',
        day: '2-digit',
        month: 'long'
    }

    const thisDay = today.toLocaleDateString('en-US', options)
    return thisDay
}

