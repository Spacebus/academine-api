'use strict'

const Model = use('Model')

class Researcher extends Model {
    specialties() {
        return this.belongsToMany('App/Models/Specialty')
    }
}

module.exports = Researcher
