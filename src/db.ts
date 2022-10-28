import fs from 'fs'
import path from 'path'

const dbPath = path.join(__dirname, '../', 'database', 'database.json')

interface IDestination {
   name: string
   email: string
   phone: string
   cpf: string
   destinations: IDestiny[]
}

interface IDestiny {
   country: string
   city: string
}

export class Database {
	data!: IDestination[]
	async connect() {
		try {
			this.data = JSON.parse(await fs.promises.readFile(dbPath, 'utf-8'))
		} catch (error) {
			throw new Error("Can't connect to database")
		}
	}
}