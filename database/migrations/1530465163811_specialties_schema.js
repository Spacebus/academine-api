'use strict'

const Schema = use('Schema')

class SpecialtiesSchema extends Schema {
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

module.exports = SpecialtiesSchema
