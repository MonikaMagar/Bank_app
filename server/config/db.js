const mongoose = require('mongoose')

const connect = () => {
    mongoose.connect('mongodb://localhost:27017/Bank')
        .then(() => { console.log("database connected successfully😎") })
        .catch((error) => {
            console.log("error connecting database", error)
        })
}

module.exports = connect