const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Schema } = mongoose

const userSchema = new Schema ({ 
    // name: {
    //     type: String, 
    //     required: true
    // },
    // username: {
    //     type: String, 
    //     required: true
    // },
    // password: {
    //     type: String, 
    //     required: true
    // },
    // canshowall: {
    //     type: Boolean, 
    //     required: true
    // }
    name: String,
    username: String,
    email: String,
    password: String,
    canshowall: Boolean
},{
    versionKey: false,
    timestamps: true
})

// const userModel = mongoose.model('users', userSchema)

userSchema.pre('save', function(next) {
    console.log('antes: ',this.email, this.password)
    const hashedPassword = bcrypt.hashSync(this.password,12)
    this.password = hashedPassword
    console.log('despues: ',this.email, this.password)
    next();
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel