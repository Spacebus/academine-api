'use strict'

const Researcher = use('App/Models/Researcher')

class SearchController {
    
    async search({response}){
        const researchers = await Researcher.all()
        response.status(200).json({
            message: 'Successfully listed researchers.',
            data: researchers
        })
    }
}

module.exports = SearchController
