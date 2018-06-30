'use strict'

const Model = use('Model')

class Researcher extends Model {
    area() {
        return this.hasMany('App/Models/Area')
    }
}

module.exports = Researcher
