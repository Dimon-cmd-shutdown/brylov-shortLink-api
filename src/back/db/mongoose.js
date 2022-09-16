const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('Connected to mongoDB')
}).catch((error) => {
    console.log(error)
})