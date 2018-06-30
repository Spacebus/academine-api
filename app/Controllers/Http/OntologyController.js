'use strict'

const Researcher = use('App/Models/Researcher')

const Area = use('App/Models/Area')

class OntologyController {

    async researcher({request}){
        const data = request.only(["name"])

        const researcher = await Researcher.create(data)

        return researcher

    }

    async area({request}){
        const data = request.only(["name"])

        const area = await Area.create(data)

        return area
    }
}

module.exports = OntologyController
