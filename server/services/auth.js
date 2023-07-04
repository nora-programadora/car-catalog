const bcrypt = require('bcryptjs')

const authService = class {
    constructor(userService) {
        this.UserService = userService
    }

    async Login(email, password) {
        const user = await this.UserService.getByEmail(email)

        if(!user) {
            throw new Error('Este ususario no existe')
        } else if (await bcrypt.compare(password, user.password) || !user) {
            return user.toObject()
        } else {
            throw new Error('Usuario inautorizado')
        }
    }
}

module.exports = authService