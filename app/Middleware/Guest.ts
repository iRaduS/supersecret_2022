import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Guest {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>) {
    if (!auth.isGuest) {
      response.redirect().toRoute('dashboard')
      return
    }
    await next()
  }
}
