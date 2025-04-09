const {Pool} = require('pg')

const DbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'zombieplus', 
    password: 'pwd123',
    port: 5432
}

export async function executeSQL(sqlScript){

    let client
    const pool = new Pool(DbConfig)

    try{                
        client = await pool.connect()    
    
        const result = await client.query(sqlScript)
        console.log(result.rows)

    } catch(error) {
        console.log('Erro ao executar o SQL ' + error)
    }

}