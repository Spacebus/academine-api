'use strict'

const Schema = use('Schema')

class ResearcherSpecialtySchema extends Schema {
  up () {
    this.create('researcher_specialty', (table) => {
      table.increments()
      table
        .integer('researcher_id')
        .unsigned()
        .index('researcher_id')
      table
        .integer('specialty_id')
        .unsigned()
        .index('specialty_id')      
      table
        .foreign('specialty_id')
        .references('specialties.id')
        .onDelete('cascade')
      table
        .foreign('researcher_id')
        .references('researchers.id')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('researcher_specialty')
  }
}

module.exports = ResearcherSpecialtySchema
