'use strict'

const Researcher = use('App/Models/Researcher')
const Specialty = use('App/Models/Specialty')

class OntologyController {

    async researcher({request, response}){
        const {name, bibliographic_citation, country, uf, city, resume, email, phone, photo_url, lattes_url, specialties} = request.post()

        try{
            const researcher = await Researcher.create({name, bibliographic_citation, country, uf, city, resume, email, phone, photo_url, lattes_url})

            if(specialties && specialties.length > 0){
                await researcher.specialties().attach(specialties)
                researcher.specialties = await researcher.specialties().fetch()
            }

            response.status(201).json({
                message: 'Successfully created a new researcher.',
                data: researcher
            })

        } catch(err) {
            response.status(400).json({
                message: 'Unsuccessfully created a new researcher.',
                data: {}
            })
        }
    }

    async specialty({request, response}){
        const {name, researchers} = request.post()

        try {
            const specialty = await Specialty.create({name})

            if(researchers && researchers.length > 0){
                await specialty.researchers().attach(researchers)
                specialty.researchers = await specialty.researchers().fetch()
            }

            response.status(201).json({
                message: 'Successfully created a new specialty.',
                data: specialty
            })

        } catch(err) {
            response.status(400).json({
                message: 'Unsuccessfully created a new specialty.',
                data: {}
            })
        } 
    }

}

module.exports = OntologyController
