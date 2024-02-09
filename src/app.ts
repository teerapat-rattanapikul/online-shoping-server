import express, { Express, Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import apis from './apis'
import cors from 'cors'

mongoose.connect('mongodb+srv://teerapat:gYzbHn2NbZGANlcA@online-shoping.lxvuyky.mongodb.net/?retryWrites=true&w=majority', {
  dbName: 'online-shoping'
}).then(() => {
  console.log('connect db success')
});

const app: Express = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const port: number = 8000

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Hello Express + TypeScirpt!!',
  })
})

app.use('/api', apis)

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
  });
});

app.listen(port, () => console.log(`Application is running on port ${port}`))