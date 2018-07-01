'use strict'

const Researcher = use('App/Models/Researcher') 
const Area = use('App/Models/Area')

class OntologyController {

    async researcher({request, response}){
        const {name, areas} = request.post()

        try{
            const researcher = await Researcher.create({name})

            if(areas && areas.length > 0){
                await researcher.areas().attach(areas)
                researcher.areas = await researcher.areas().fetch()
            }

            response.status(201).json({
                message: 'Successfully created a new researcher.',
                data: researcher
            })

        } catch {
            response.status(400).json({
                message: 'Unsuccessfully created a new researcher.',
                data: {}
            })
        }
    }

    async area({request, response}){
        const {name, researchers} = request.post()

        try {
            const area = await Area.create({name})

            if(researchers && researchers.length > 0){
                await area.researchers().attach(researchers)
                area.researchers = await area.researchers().fetch()
            }

            response.status(201).json({
                message: 'Successfully created a new area.',
                data: area
            })

        } catch {
            response.status(400).json({
                message: 'Unsuccessfully created a new area.',
                data: {}
            })
        } 
    }
}

module.exports = OntologyController
