'use strict'

const Schema = use('Schema')

class AreasSchema extends Schema {
  up () {
    this.create('areas', (table) => {
      table.increments()
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('areas')
  }
}

module.exports = AreasSchema
