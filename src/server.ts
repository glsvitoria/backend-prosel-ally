import express, { Request, Response } from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { Database } from './db'

const dbPath = path.join(__dirname, '../', 'database', 'database.json')

const server = express()
server.use(express.json())
server.use(cors())

const db = new Database()
db.connect()

server.post('/destination', async (req: Request, res: Response) => {
   const { name, email, phone, cpf, destinations } = req.body

   db.data.push({
      name, email, phone, cpf, destinations
   })

   try {
      await fs.promises.writeFile(dbPath, JSON.stringify(db.data, null, 4))
   } catch {
      res.status(404).json("Creation of destination failed")
   }

   res.status(204).json("Destination create with sucess")
})

server.get('/destination', async (req: Request, res: Response) => {
   let detinations = await fs.promises.readFile(dbPath, 'utf-8')
   res.json(JSON.parse(detinations))
})

const PORT = 3000 || process.env.PORT

server.listen(PORT, () => {
	console.log(`[SERVER] Running at ${PORT}`)
})
