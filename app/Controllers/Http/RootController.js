'use strict'

const xmlJs = use('xml-js')

class RootController {
    index({response}){
        response.status(200).json({
            message: 'Successfully access to lattes mining api.',
            data: {}
        })        
    }

    async receive({request, response}){
        const data = request.post()
        try {
                var xml = xmlJs.xml2json('<?xml version="1.0" encoding="utf-8"?>' +
            '<note importance="high" logged="true">' +
            '    <title>Happy</title>' +
            '    <todo>Work</todo>' +
            '    <todo>Play</todo>' +
            '</note>', {compact: true, spaces: 4})
            
            console.info(xml)

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

module.exports = RootController
