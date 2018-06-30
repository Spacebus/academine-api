'use strict'

const Researcher = use('App/Models/Researcher')

const Area = use('App/Models/Area')

class OntologyController {

    async researcher({request, response}){
        const data = request.only(["name"])

        const researcher = await Researcher.create(data)

        response.status(201).json({
            message: 'Successfully created a new researcher.',
            data: researcher
        })

    }

    async area({request, response}){
        const data = request.only(["name"])

        const area = await Area.create(data)

        response.status(201).json({
            message: 'Successfully created a new area.',
            data: area
        })
    }
}

module.exports = OntologyController
