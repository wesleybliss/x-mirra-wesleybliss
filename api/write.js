import fs from 'fs'
import path from 'path'

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

module.exports = (req, res) => {
    
    //res.set('Content-Type', 'text/plain')
    
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
    
}
