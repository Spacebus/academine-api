'use strict'

const Database = use('Database')
const xmlJs = use('xml-js')

class AppController {
    
    async index({response}){
        response.status(200).json({
            message: 'Successfully access to lattes mining api.',
            data: {}
        })        
    }

    async search({request, response}){
        const {specialties} = request.post()

        if(specialties && specialties.length > 0){
            try{
                const researchers_ids = await Database
                .select("researcher_id")
                .from("researcher_specialty")
                .whereIn("researcher_specialty.specialty_id", specialties)

                var json_to_list = []

                for (var key in researchers_ids){
                    json_to_list.push(researchers_ids[key]["researcher_id"])
                }

                const researchers = await Database
                        .select("*")
                        .from("researchers")
                        .whereIn("researchers.id", json_to_list)
                response.status(200).json({
                    message: 'Successfully listed researchers.',
                    data: researchers
                })
            } catch(err) {
                console.info(err)
                response.status(400).json({
                    message: 'Unsuccessfully listed researchers.',
                    data: {}
                })
            }


        } else {
            try {
                var researchers = await Database
                .select("*")
                .from("researchers")

                response.status(200).json({
                    message: 'Successfully listed all researchers.',
                    data: researchers
                })

            } catch(err) {
                console.info(err)
                response.status(400).json({
                    message: 'Unsuccessfully listed all researchers.',
                    data: {}
                })
            }

        }
    }

    async receive({request, response}){
        const {xmls} = request.post()
        console.log(xmls)
        try {
            xmls.forEach(xml => {
                console.info(xml)
                var string_xml = xml.replace(/^\uFEFF/g, '')
                console.info(string_xml)
                json = xmlJs.xml2json(string_xml, {compact: true, spaces: 4})
                console.info(json)
            })

            response.status(200).json({
                message: 'Successfully receive data.',
                data: {}
            })

        } catch(err){
            console.info(err)
            response.status(400).json({
                message: 'Unsuccessfully receive data.',
                data: {}
            })
        } 
    }
}

module.exports = AppController
