'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

//RootController
Route.get('/', 'RootController.index')

//AuthController
Route.post('/register', 'AuthController.register')
Route.post('/authenticate', 'AuthController.authenticate')

//OntologyController
Route.post('/researcher', 'OntologyController.researcher').middleware(['auth'])
Route.post('/specialty', 'OntologyController.specialty').middleware(['auth'])

//SearchController
Route.post('/search', 'SearchController.search').middleware(['auth'])

