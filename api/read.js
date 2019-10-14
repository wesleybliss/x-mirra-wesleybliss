import fs from 'fs'
import path from 'path'

const publicFileUri = path.join(__dirname, 'public.txt')

module.exports = (req, res) => {
    
    res.set('Content-Type', 'text/plain')
    
    try {
        fs.readFile(publicFileUri, 'utf-8', (err, data) => {
            res.send(err ? '' : data || '')
        })
    } catch (e) {
        res.send('Erra')
    }
    
}
