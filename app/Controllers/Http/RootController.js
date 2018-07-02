'use strict'

class RootController {
    index({response}){
        response.status(200).json({
            message: 'Successfully access to lattes-mining.',
            data: {}
        })        
    }
}

module.exports = RootController
