'use strict'

const Researcher = use('App/Models/Researcher')

class SearchController {
    
    async search({request, response}){
        const {areas} = request.only("areas")
        const Database = use('Database')
        console.log(areas)

        const researchers_ids = await Database
                .select("researcher_id")
                .from("area_researcher")
                .whereIn("area_researcher.area_id", areas)
        console.log(researchers_ids)
        
        var aux = []

        for (var key in researchers_ids){
            aux.push(researchers_ids[key]["researcher_id"])
        }
        
        const researchers_names = await Database
                .select("name")
                .from("researchers")
                .whereIn("researchers.id", aux)
        console.log(researchers_names)

        if (areas && areas.length > 0){
            response.status(200).json({
                message: 'Successfully listed researchers.',
                data: researchers_names
            })
        }
        else {
            response.status(200).json({
                message: 'Unsuccessfully listed. Missing area ids',
            })
        }

    }
}

module.exports = SearchController
