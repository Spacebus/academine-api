'use strict'

const Schema = use('Schema')

class ResearchersSchema extends Schema {
  up () {
    this.create('researchers', (table) => {
      table.increments()
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('researchers')
  }
}

module.exports = ResearchersSchema
