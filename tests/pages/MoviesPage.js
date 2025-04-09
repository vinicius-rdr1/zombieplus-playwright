import { expect } from "@playwright/test"

export class MoviesPage {

    constructor(page) {
        this.page = page
    }

    async isLoggedIn(){
        await this.page.waitForLoadState('networkidle')        
        await expect(this.page).toHaveURL(/.*admin/)
    }

    async create(title, overview, company, release_year){
        await this.page.locator('a[href$="register"]').click()

        await this.page.getByLabel('Titulo do filme').fill(title)
        await this.page.getByLabel('Sinopse').fill(overview)

        //Clica no select da Distribuidora e seleciona a opção desejada
        await this.page.locator('#select_company_id .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({hasText: company}).click()
       

        //Clica no select do ano de lançamento e seleciona a opção desejada
        await this.page.locator('#select_year .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({hasText: release_year}).click()


        // Clica no botao de cadastrar o filme

        await this.page.getByRole('button', {name: 'Cadastrar'}).click()
        


    }
    
}