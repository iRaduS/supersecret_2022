import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginUserValidator from "App/Validators/LoginUserValidator";

export default class LoginController {
  public async login(ctx: HttpContextContract) {
    return ctx.view.render('auth/login')
  }

  public async submitLogin(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(LoginUserValidator);

    try {
      await ctx.auth.use('web').attempt(payload.email, payload.password)
    } catch {
      ctx.session.flash('error', 'Something is wrong with the authentication process, verify your credentials')
      return ctx.response.redirect().toRoute('LoginController.login')
    }

    ctx.session.flash('success', 'You have logged in with success.')
    return ctx.response.redirect().toRoute('dashboard')
  }

  public async logout(ctx: HttpContextContract)  {
    await ctx.auth.logout()

    ctx.session.flash('success', 'You have logged out from your account with success.')
    return ctx.response.redirect().toRoute('welcome')
  }
}
