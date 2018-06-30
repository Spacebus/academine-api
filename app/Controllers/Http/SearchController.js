'use strict'

const Researcher = use('App/Models/Researcher')

class SearchController {
    
    async search(){
        const researchers = await Researcher.all()
        return researchers
    }
}

module.exports = SearchController
