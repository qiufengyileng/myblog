import express from 'express'
const router = express.Router()

// GET /home
router.get('/', (req, res) => {
  res.send('Home page')
})

// GET /home/list
router.get('/list', (req, res) => {
  res.json({ list: ['item1', 'item2'] })
})

export default router
