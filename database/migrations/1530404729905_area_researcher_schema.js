'use strict'

const Schema = use('Schema')

class AreaResearcherSchema extends Schema {
  up () {
    this.create('area_researcher', (table) => {
      table.increments()
      table
        .integer('area_id')
        .unsigned()
        .index('area_id')
      table
        .integer('researcher_id')
        .unsigned()
        .index('researcher_id')
      table
        .foreign('area_id')
        .references('areas.id')
        .onDelete('cascade')
      table
        .foreign('researcher_id')
        .references('researchers.id')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('area_researcher')
  }
}

module.exports = AreaResearcherSchema
