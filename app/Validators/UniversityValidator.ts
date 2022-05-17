import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginUserValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    'name': schema.string({trim: true}, [ rules.required() ]),
    'description': schema.string({trim: true}, [ rules.required() ]),
    'city': schema.string({trim: true}, [ rules.required() ]),
    'link': schema.string({trim: true}, [ rules.required() ]),
    'rating': schema.number([ rules.required() ]),
    'rating_numbers': schema.number([ rules.required() ]),
    'lat': schema.number([ rules.required() ]),
    'long': schema.number([ rules.required() ]),
    'faculties': schema.array().members(schema.string()),
    'specialization': schema.array().members(schema.string()),
    'email': schema.string({trim: true}, [ rules.required(), rules.email() ]),
  })
  public messages = {}
}
