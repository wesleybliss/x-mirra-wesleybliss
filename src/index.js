import fs from 'fs'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}))
app.use(bodyParser.text({ type: '*/*' }))

let timer = null
const timeoutSec = 30 * 1000 // 30s
const publicFileUri = path.join(__dirname, 'public.txt')

const updateTimer = () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
        fs.writeFile(publicFileUri, '', 'utf-8', err => {})
        //console.log('timer hit')
    }, timeoutSec)
}

app.get('/', (req, res) => {
    
    res.set('Content-Type', 'text/plain')
    
    try {
        fs.readFile(publicFileUri, 'utf-8', (err, data) => {
            res.send(err ? '' : data || '')
        })
    } catch (e) {
        res.send('Erra')
    }
    
})

app.post('/', (req, res) => {
    
    res.set('Content-Type', 'text/plain')
    
    try {
        const data = req.body || ''
        if (data.length < 1) return
        fs.writeFile(publicFileUri, data, 'utf-8', err => {
            if (err) {
                res.send('Erra')
            } else {
                updateTimer()
                res.send(timeoutSec)
            }
        })
    } catch (e) {
        res.send('Erra')
    }
    
})

app.listen(port, host, () =>
    console.log(`Mirra on the wall @ http://${host}:${port}`))
