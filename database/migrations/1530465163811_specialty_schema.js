'use strict'

const Schema = use('Schema')

class SpecialtySchema extends Schema {
  up () {
    this.create('specialties', (table) => {
      table.increments()
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('specialties')
  }
}

module.exports = SpecialtySchema
