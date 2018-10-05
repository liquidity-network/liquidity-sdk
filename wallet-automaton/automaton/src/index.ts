import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import lqdClient from './controllers/lqd-client'
import routes from './routes/index'

lqdClient.start({})

const app = express()
app.use(cors({origin: true}))
app.use(bodyParser.json())
routes(app)

app.listen(80, () => 'Listening...')
