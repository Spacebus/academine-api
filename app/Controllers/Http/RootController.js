'use strict'

class RootController {
    index({response}){
        response.status(200).json({
            message: 'Successfully access to lattes mining api.',
            data: {}
        })        
    }

    async receive({request, reponse}){
        const data = request.post()

        response.status(200).json({
            message: 'Successfully receive data.',
            data: researcher
        })
        
    }
}

module.exports = RootController
