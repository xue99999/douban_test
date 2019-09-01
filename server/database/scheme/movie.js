const mongoose = require('mongoose')
const Scheme = mongoose.Schema

const movieScheme = new Scheme({
    doubanId: {
        unique: true,
        required: true,
        type: String,
    },
    title: String,
    rate: Number,
    summary: String,
    video: String,
    cover: String,
    poster: String,

    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

movieScheme.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }

    next()
})

mongoose.model('Movie', movieScheme)
