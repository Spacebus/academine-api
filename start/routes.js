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
Route.get('/', 'RootController.index')
Route.post('/receive', 'RootController.receive').middleware(['auth'])
Route.post('/register', 'AuthController.register')
Route.post('/authenticate', 'AuthController.authenticate')
Route.put('/researcher', 'OntologyController.put_researcher').middleware(['auth'])
Route.post('/researcher', 'OntologyController.post_researcher').middleware(['auth'])
Route.put('/specialty', 'OntologyController.put_specialty').middleware(['auth'])
Route.post('/specialty', 'OntologyController.post_specialty').middleware(['auth'])
Route.post('/search', 'SearchController.search').middleware(['auth'])

