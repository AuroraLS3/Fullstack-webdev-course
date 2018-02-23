const mongoose = require('mongoose')

const User = mongoose.model('User', {
    username: String,
    name: String,
    password: String,
    adult: Boolean,
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog'}]
})

User.format = (user) => {
    return {
        id: user._id,
        username: user.username,
        name: user.name,
        adult: user.adult
    }
}

module.exports = User