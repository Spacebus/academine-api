'use strict'

const Model = use('Model')

class Specialty extends Model {
    researchers() {
        return this.belongsToMany('App/Models/Researcher')
    }
}

module.exports = Specialty
