'use strict'

const Model = use('Model')

class Area extends Model {
    researchers() {
        return this.belongsToMany('App/Models/Researcher')
    }
}

module.exports = Area
