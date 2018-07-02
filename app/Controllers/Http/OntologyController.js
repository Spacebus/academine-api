'use strict'

const Researcher = use('App/Models/Researcher')
const Specialty = use('App/Models/Specialty')
const Database = use('Database')

class OntologyController {

    async put_researcher({request, response}){
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
            console.info(err)
            response.status(400).json({
                message: 'Unsuccessfully created a new researcher.',
                data: {}
            })
        }
    }

    async put_specialty({request, response}){
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
            console.info(err)
            response.status(400).json({
                message: 'Unsuccessfully created a new specialty.',
                data: {}
            })
        } 
    }

    async post_researcher({request, response}){
        const {query} = request.post()

        try{
            const researcher = await Database
            .select('*')
            .from('researchers')
            .where('name', query)

            response.status(200).json({
                message: 'Successfully listed researchers.',
                data: researcher
            })

        } catch(err){
            console.info(err)
            response.status(400).json({
                message: 'Unsuccessfully listed researchers.',
                data: {}
            })
        }

    }

    async post_specialty({request, response}){
        const {query} = request.post()

        try{
            const specialty = await Database
            .select('*')
            .from('specialties')
            .where('name', query)

            response.status(200).json({
                message: 'Successfully listed specialties.',
                data: specialty
            })

        } catch(err){
            console.info(err)
            response.status(400).json({
                message: 'Unsuccessfully listed specialties.',
                data: {}
            })
        }
    }

}

module.exports = OntologyController
