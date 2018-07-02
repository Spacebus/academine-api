'use strict'

class RootController {
    index({response}){
        response.status(400).json({
            message: 'Successfully access to lattes-mining.',
            data: {}
        })        
    }
}

module.exports = RootController
