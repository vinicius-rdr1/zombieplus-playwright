const { test: base, expect } = require('@playwright/test')


import { Login } from './actions/Login'
import { Popup } from './actions/Components'
import { Movies } from './actions/Movies'
import { Leads } from './actions/Leads'
import { Api } from './api'


const test = base.extend({
    page: async ({page}, use) => {
        
        const context = page
        context['leads'] = new Leads(page)
        context['popup'] = new Popup(page)
        context['login'] = new Login(page)
        context['movies'] = new Movies(page)

        await use(context)
    },
    request: async({request}, use) => {
        const context = request
        context['api'] = new Api(request)
        await context['api'].setToken()

        await use(context)
    }
})

export { test, expect}