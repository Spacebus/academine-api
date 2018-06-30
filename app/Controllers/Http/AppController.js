'use strict'

const Researcher = use('App/Models/Researcher')

class AppController {

    async index(){
        const researchers = await Researcher.all()
        return researchers
    }
}

module.exports = AppController
