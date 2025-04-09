import { test, expect } from '../support';

const data = require('../support/fixtures/movies.json')
import { executeSQL } from '../support/database';


test('Deve poder cadastrar um novo filme', async ({ page }) => {

    const movie = data.zumbilandia
    const message = 'Cadastro realizado com sucesso!'

    await executeSQL(`DELETE FROM public.movies WHERE title = '${movie.title}';`)

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()
    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year)
    await page.toast.containText(message)
    
})

test('Não pode Cadastrar um filme repetido', async ({ page }) => {

    // É necessário estar logado
    const movie = data.zumbilandia
    const message = 'Este conteúdo já encontra-se cadastrado no catálogo'

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()    
    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year)    
    await page.toast.containText(message)   

})