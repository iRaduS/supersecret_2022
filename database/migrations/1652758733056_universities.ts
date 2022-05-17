import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Universities extends BaseSchema {
  protected tableName = 'universities'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('description')
      table.string('city')
      table.decimal('lat')
      table.decimal('long')
      table.string('email').unique()
      table.string('link')
      table.decimal('rating')
      table.integer('rating_numbers')
      table.json('faculties')
      table.json('specialization')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
