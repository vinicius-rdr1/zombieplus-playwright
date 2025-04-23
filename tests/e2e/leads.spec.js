
import { test, expect } from '../support';
import { faker } from '@faker-js/faker';



test('Cadastrar o Lead na fila de espera', async ({ page }) => {
 
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.'
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()
   
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadModal(leadName, leadEmail)
  await page.popup.haveText(message)

});

test('Não deve cadastrar quando o email ja existe', async ({ page, request }) => {
 
  const message = 'Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.'
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  const newLead = await request.post('http://localhost:3333/leads', { 
    data: {
      name: leadName,
      email: leadEmail,
    }
  })

  expect(newLead.ok()).toBeTruthy
  
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadModal(leadName, leadEmail)
  
  await page.popup.haveText(message)

});


test('Nao deve cadastrar com email incorreto', async ({ page }) => {

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadModal('Vinicius Rodrigues Souza', 'vincius.rdr.gmail.com')    
  await page.leads.alertText('Email incorreto')

});

test('Nao deve cadastrar quando o nome não é preenchido', async ({ page }) => {

  page.leads.visit()
  page.leads.openLeadModal()
  page.leads.submitLeadModal('', 'vinicius.rd1@gmail.com')  
  await page.leads.alertText('Campo obrigatório')

});



test('Nao deve cadastrar quando o email não é preenchido', async ({ page }) => {

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadModal('Vinicisu R. Souza', '')
  await page.leads.alertText('Campo obrigatório')

});


test('Nao deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
 
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadModal('','')  
  await page.leads.alertText(['Campo obrigatório', 'Campo obrigatório'])

});

