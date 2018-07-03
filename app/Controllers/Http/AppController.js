'use strict'

const Database = use('Database')
const xmlJs = use('xml-js')
const Researcher = use('App/Models/Researcher')
const Specialty = use('App/Models/Specialty')


class AppController {
    
    async index({response}){
        response.status(200).json({
            message: 'Successfully access to academine api.',
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
        const { xml } = request.post()
        try {
            var json = JSON.parse(xmlJs.xml2json(xml, {compact: true, spaces: 4}))
            var name = json['CURRICULO-VITAE']['DADOS-GERAIS']._attributes['NOME-COMPLETO']
            var bibliographic_citation = json['CURRICULO-VITAE']['DADOS-GERAIS']._attributes['NOME-EM-CITACOES-BIBLIOGRAFICAS']
            var country = json['CURRICULO-VITAE']['DADOS-GERAIS']._attributes['PAIS-DE-NASCIMENTO']
            var uf = json['CURRICULO-VITAE']['DADOS-GERAIS']._attributes['UF-NASCIMENTO']
            var city = json['CURRICULO-VITAE']['DADOS-GERAIS']._attributes['CIDADE-NASCIMENTO']
            var resume = json['CURRICULO-VITAE']['DADOS-GERAIS']['RESUMO-CV']._attributes['TEXTO-RESUMO-CV-RH']
            
            const researcher = await Researcher.create({name, bibliographic_citation, country, uf, city, resume})

            var specialties = json["CURRICULO-VITAE"]['DADOS-GERAIS']['AREAS-DE-ATUACAO']['AREA-DE-ATUACAO']

            specialties.forEach((s) => {
                let name = "";
                if(s._attributes['NOME-DA-ESPECIALIDADE'] !== "") {
                    name = s._attributes['NOME-DA-ESPECIALIDADE']
                } else if (s._attributes['NOME-DA-SUB-AREA-DO-CONHECIMENTO'] !== "") {
                    name = s._attributes['NOME-DA-SUB-AREA-DO-CONHECIMENTO']
                } else if (s._attributes['NOME-DA-AREA-DO-CONHECIMENTO'] !== "") {
                    name = s._attributes['NOME-DA-AREA-DO-CONHECIMENTO']
                } else if (s._attributes['NOME-DA-GRANDE-AREA-DO-CONHECIMENTO'] !== "") {
                    name = s._attributes['NOME-DA-GRANDE-AREA-DO-CONHECIMENTO']
                }
                var specialty = Specialty.create({name})
                specialty.researchers().attach([researcher.id])
                specialty.researchers = specialty.researchers().fetch()
            })

            response.status(200).json({
                message: 'Successfully receive data.',
                data: researcher
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
