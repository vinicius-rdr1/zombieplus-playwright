
import { test, expect } from '../support';
import { faker } from '@faker-js/faker';



test('Cadastrar o Lead na fila de espera', async ({ page }) => {
 
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()
   
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadModal(leadName, leadEmail)
  await page.toast.containText(message)

});

test('Não deve cadastrar quando o email ja existe', async ({ page, request }) => {
 
  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  const newLead = await request.post('http://localhost:3333/leads', { 
    data: {
      name: leadName,
      email: leadEmail,
    }
  })

  expect(newLead.ok()).toBeTruthy
  
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadModal(leadName, leadEmail)
  
  await page.toast.containText(message)

});


test('Nao deve cadastrar com email incorreto', async ({ page }) => {

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadModal('Vinicius Rodrigues Souza', 'vincius.rdr.gmail.com')    
  await page.landing.alertText('Email incorreto')

});

test('Nao deve cadastrar quando o nome não é preenchido', async ({ page }) => {

  page.landing.visit()
  page.landing.openLeadModal()
  page.landing.submitLeadModal('', 'vinicius.rd1@gmail.com')  
  await page.landing.alertText('Campo obrigatório')

});



test('Nao deve cadastrar quando o email não é preenchido', async ({ page }) => {

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadModal('Vinicisu R. Souza', '')
  await page.landing.alertText('Campo obrigatório')

});


test('Nao deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
 
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadModal('','')  
  await page.landing.alertText(['Campo obrigatório', 'Campo obrigatório'])

});

