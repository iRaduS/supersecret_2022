import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import University from "App/Models/University";
import UniversityValidator from "App/Validators/UniversityValidator";

export default class UniversityController {
  public async index ({ request, view }: HttpContextContract) {
    const page = request.input('page', 1)

    const universities = await University.query().paginate(page, 15)
    return view.render('admin/university/index', { universities })
  }

  public async store ({ request, response, session }: HttpContextContract) {
    const data = await request.validate(UniversityValidator)

    try {
      await University.create({
        name: data.name,
        description: data.description,
        city: data.city,
        lat: data.lat,
        long: data.long,
        email: data.email,
        link: data.link,
        rating: data.rating,
        rating_numbers: data.rating_numbers,
        faculties: data.faculties,
        specialization: data.specialization
      })
    } catch (error) {
      session.flash('error', error.message)
      return response.redirect().back()
    }

    session.flash('success', 'The school was created with success.')
    return response.redirect().back()
  }

  public async show ({ view, params }: HttpContextContract) {
    const university = await University.findOrFail(params.id)

    return view.render('dashboard/university/show', {university})
  }

  public async update ({ params, request, response, session }: HttpContextContract) {
    const data = await request.validate(UniversityValidator)

    try {
      await University.query().where('id', params.id).update({
          name: data.name,
          description: data.description,
          city: data.city,
          lat: data.lat,
          long: data.long,
          email: data.email,
          link: data.link,
          rating: data.rating,
          rating_numbers: data.rating_numbers,
          faculties: JSON.stringify(data.faculties),
          specialization: JSON.stringify(data.specialization)
        }
      )
    } catch (error) {
      session.flash('error', error.message)
      return response.redirect().back()
    }

    session.flash('success', 'The university was updated with success.')
    return response.redirect().back()
  }

  public async destroy ({ response, session, params }: HttpContextContract) {
    const uni = await University.findOrFail(params.id)

    try {
      await uni.delete()
    } catch (error) {
      session.flash('error', error.message)
      return response.redirect().back()
    }

    session.flash('success', 'The university was deleted with success.')
    return response.redirect().back()
  }
}
