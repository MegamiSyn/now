
const router = require('express').Router()
const Movie = require('../models/Movie')

router.get('/',async(req,res) => {
    try{
        const people = await Movie.find()

        res.status(200).json(people)
    }catch(error){
        res.status(500).json({error: error})
    }
})

router.post('/', async (req, res) => {
    const { name, url_m, img_url } = req.body
  
    const movie = {
      name,
      url_m,
      img_url,
    }
  
    try {      
    
      //console.log(person.name)
      //const find = await Person.findOne({name: person.name},person)
      
      await Movie.create(movie)
  
      res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

module.exports = router