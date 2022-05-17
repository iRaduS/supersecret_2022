import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CheckAdmin {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>) {
    if (auth.user?.role.toLowerCase() !== "admin") {
      response.redirect().toRoute('dashboard')
      return
    }
    await next()
  }
}
