const { test, expect } = require('../support')


test('Deve logar como administrador', async ({page}) => {

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.login.isLoggedIn('Admin')

})


test('Não Deve logar com Senha Incorreta', async ({page}) => {

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', '123adm')
    const message = 'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'

    await page.popup.haveText(message)


})

test('Não Deve logar com Email Incorreto', async ({page}) => {

    await page.login.visit()
    await page.login.submit('admin.zombieplus.com', 'pwd123')
    await page.login.alertHaveText('Email incorreto')

})

test('Não Deve logar quando o Email não é preenchido', async ({page}) => {

    await page.login.visit()
    await page.login.submit('', 'pwd123')
    await page.login.alertHaveText('Campo obrigatório')

})

test('Não Deve logar quando a Senha não é preenchida', async ({page}) => {

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', '')
    await page.login.alertHaveText('Campo obrigatório')

})

test('Não Deve logar quando nenhum campo é preenchido', async ({page}) => {

    await page.login.visit()
    await page.login.submit('', '')
    await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])

})