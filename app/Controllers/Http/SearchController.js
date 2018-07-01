'use strict'
const Database = use('Database')

class SearchController {
    
    async search({request, response}){
        const {areas} = request.post()

        if(areas && areas.length > 0){
            try{
                const researchers_ids = await Database
                .select("researcher_id")
                .from("area_researcher")
                .whereIn("area_researcher.area_id", areas)
        
                var json_to_list = []

                for (var key in researchers_ids){
                    json_to_list.push(researchers_ids[key]["researcher_id"])
                }
                
                const researchers_names = await Database
                        .select("name")
                        .from("researchers")
                        .whereIn("researchers.id", json_to_list)
                
                response.status(200).json({
                    message: 'Successfully listed researchers.',
                    data: researchers_names
                })
            } catch {
                response.status(400).json({
                    message: 'Unsuccessfully listed researchers.',
                    data: {}
                })
            }
            

        } else {
            try {
                var researchers = await Database
                .select("name")
                .from("researchers")
                response.status(200).json({
                    message: 'Successfully listed researchers.',
                    data: researchers
                })

            } catch {
                response.status(400).json({
                    message: 'Unsuccessfully listed researchers.',
                    data: {}
                })
            }
            
        }
    }
}

module.exports = SearchController
