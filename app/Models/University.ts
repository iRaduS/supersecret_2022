import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm'

export default class University extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public city: string

  @column()
  public lat: number

  @column()
  public long: number

  @column()
  public email: string

  @column()
  public link: string

  @column()
  public image: string

  @column()
  public rating: number

  @column()
  public rating_numbers: number

  @column()
  public faculties: any

  @column()
  public specialization: any

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static stringifyFaculties (uni: University) {
    if (uni.$dirty.faculties) {
      uni.faculties = JSON.stringify(uni.faculties)
    }
  }

  @beforeSave()
  public static stringifySpecializations (uni: University) {
    if (uni.$dirty.specialization) {
      uni.specialization = JSON.stringify(uni.specialization)
    }
  }
}
