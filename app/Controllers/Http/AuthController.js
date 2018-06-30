'use strict'

const User = use('App/Models/User')

class AuthController {
    async register({request, response}) {
        const data = request.only(['username', 'email', 'password'])

        const user = await User.create(data)

        response.status(201).json({
            message: 'Successfully created a new user.',
            data: user
        })
    }

    async authenticate({request, auth}) {
        const { email, password } = request.all()

        const token = await auth.attempt(email, password)
        
        response.status(200).json({
            message: 'Successfully authenticate.',
            data: token
        })
    }
}

module.exports = AuthController
