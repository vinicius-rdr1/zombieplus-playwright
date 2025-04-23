import { expect } from "@playwright/test"

export class Movies {

    constructor(page) {
        this.page = page
    }

    async goForm(){
        await this.page.locator('a[href$="register"]').click()

    }
    async submit(){
        await this.page.getByRole('button', {name: 'Cadastrar'}).click()
    }

    async create(movie){
        
        
        await this.goForm()
        await this.page.getByLabel('Titulo do filme').fill(movie.title)
        await this.page.getByLabel('Sinopse').fill(movie.overview)

        //Clica no select da Distribuidora e seleciona a opção desejada
        await this.page.locator('#select_company_id .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({hasText: movie.company}).click()
       

        //Clica no select do ano de lançamento e seleciona a opção desejada
        await this.page.locator('#select_year .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({hasText: movie.release_year}).click()
        //Clica no botão Escolher arquivo

        await this.page.locator('input[name=cover]').setInputFiles('tests/support/fixtures' + movie.cover)


        if(movie.featured){
            await this.page.locator('.featured .react-switch').click()
        }
       

        // Clica no botao de cadastrar o filme
    
        await this.submit()



    }

    async alertText(target) {        
        await expect(this.page.locator('.alert')).toHaveText(target)        
    }
    
}