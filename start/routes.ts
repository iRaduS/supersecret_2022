/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import University from "App/Models/University";

Route.get('/', async ({ view }) => {
  return view.render('welcome')
}).as('welcome')

Route
  .group(() => {
    Route
      .get('/login', 'Auth/LoginController.login')
      .as('auth.show.login')

    Route
      .post('/login', 'Auth/LoginController.submitLogin')
      .as('auth.login')
  })
  .middleware('guest')

Route
  .group(() => {
    Route
      .get('/logout', 'Auth/LoginController.logout')
      .as('auth.logout')

    Route.get('/dashboard', async ({ view }) => {
      const uni = await University.all()

      return view.render('dashboard', {uni})
    }).as('dashboard')

    Route.get('/show/:id', async ({ view, params }) => {
      const university = await University.findOrFail(params.id)

      return view.render('detail', {university})
    }).as('detail')

    Route.group(() => {
      Route.resource('/university', 'Admin/UniversityController')
           .except(['create', 'edit'])
    }).middleware('admin')
  })
  .middleware('auth')
