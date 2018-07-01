'use strict'

const Model = use('Model')

class Researcher extends Model {
    areas() {
        return this.belongsToMany('App/Models/Area')
    }
}

module.exports = Researcher
