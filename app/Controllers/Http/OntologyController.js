'use strict'

const Researcher = use('App/Models/Researcher')

class OntologyController {

    async researcher({request}){
        const data = request.only(["name"])

        const researcher = await Researcher.create(data)

        return researcher

    }
}

module.exports = OntologyController
