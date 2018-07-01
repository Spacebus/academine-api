'use strict'

const Schema = use('Schema')

class ResearchersSchema extends Schema {
  up () {
    this.create('researchers', (table) => {
      table.increments()
      table.string('name').unique()
      table.string('bibliographic_citation')
      table.string('country')
      table.string('uf')
      table.string('city')
      table.string('resume', 4000)
      table.string('email')
      table.string('phone')
      table.timestamps()
    })
  }

  down () {
    this.drop('researchers')
  }
}

module.exports = ResearchersSchema
