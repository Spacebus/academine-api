'use strict'

const Model = use('Model')

class Area extends Model {
    researcher() {
        return this.hasOne('App/Models/Researcher')
    }
}

module.exports = Area
