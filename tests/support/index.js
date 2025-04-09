const { test: base, expect } = require('@playwright/test')


import { LoginPage } from '../pages/LoginPage'
import { Toast } from '../pages/Components'
import { MoviesPage } from '../pages/MoviesPage'
import { LandingPage } from '../pages/LandingPage';


const test = base.extend({
    page: async ({page}, use) => {
        await use({
            ...page,
            landing: new LandingPage(page),
            toast: new Toast(page),
            login: new LoginPage(page),
            movies: new MoviesPage(page),

        })
    } 
})

export { test, expect}