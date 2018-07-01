'use strict'

const User = use('App/Models/User')

class AuthController {
    async register({request, response}) {
        const {username, email, password} = request.post()
        
        try{
            const user = await User.create({username, email, password})
            response.status(201).json({
                message: 'Successfully created a new user.',
                data: user
            })
        } catch {
            response.status(406).json({
                message: 'Unsuccessfully created a new user.',
                data: {}
            })
        } 
    }

    async authenticate({request, response, auth}) {
        const { email, password } = request.post()

        try {
            const token = await auth.attempt(email, password)
        
            response.status(200).json({
                message: 'Successfully authenticate.',
                data: token
            })
        } catch {
            response.status(406).json({
                message: 'Unsuccessfully authenticate.',
                data: {}
            })
        }
        
    }
}

module.exports = AuthController
