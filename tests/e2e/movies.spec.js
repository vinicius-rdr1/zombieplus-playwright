import { test, expect } from '../support';

const data = require('../support/fixtures/movies.json')
import { executeSQL } from '../support/database';


test('Deve cadastrar um novo filme', async ({ page }) => {

    const movie = data.zumbilandia
    const message = `O filme '${movie.title}' foi adicionado ao catálogo.`

    await executeSQL(`DELETE FROM public.movies WHERE title = '${movie.title}';`)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.create(movie)
    await page.popup.haveText(message)

})

test('Não pode Cadastrar um filme repetido', async ({ page, request}) => {

    // É necessário estar logado
    const movie = data.duplicate
    const message = `O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`

    await executeSQL(`DELETE FROM public.movies WHERE title = '${movie.title}';`)

    await request.api.postMovie(movie)


    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')    
    await page.movies.create(movie)    
    await page.popup.haveText(message)   

})

test('Não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
    
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.goForm()
    await page.movies.submit()

    await page.movies.alertText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório'


    ])
})