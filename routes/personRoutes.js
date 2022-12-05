const router = require('express').Router()
const Person = require('../models/Person')

router.post('/', async (req, res) => {
    const { name, salary, approved } = req.body

    if(!name){
        res.status(422).json({error: 'Erro Name '})
        return
    }

    if(!salary){
        res.status(422).json({error: 'Erro salary '})
        return
    }

    if(!approved){
        res.status(422).json({error: 'Erro approved '})
        return
    }
  
    const person = {
      name,
      salary,
      approved,
    }
  
    try {      
    
      //console.log(person.name)
      //const find = await Person.findOne({name: person.name},person)
      
      await Person.create(person)
  
      res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

router.get('/',async(req,res) => {
    try{
        const people = await Person.find()

        res.status(200).json(people)
    }catch(error){
        res.status(500).json({error: error})
    }
})

router.get('/:id',async(req,res) =>{
    const id = req.params.id
    try{
        const person = await Person.findOne({_id: id})

        if(!person){
            res.status(422).json({message: 'Pessoa nao encontrada'})
            return
        }

        res.status(200).json(person)
    }catch(error){
        res.status(500).json({error: error})
    }
})

router.get('/name/:name',async(req,res) =>{
    const name = req.params.name
    try{
        const person = await Person.findOne({name: name})

        if(!person){
            res.status(422).json({message: 'Pessoa nao encontrada'})
            return
        }

        res.status(200).json(person)
    }catch(error){
        res.status(500).json({error: error})
    }
})

router.patch('/:id',async(req,res) =>{
    const id = req.params.id
    const { name, salary, approved } = req.body

    const person = {
        name,
        salary,
        approved
    }

    try{
        const updatedPerson = await Person.updateOne({_id: id},person)

        console.log(updatedPerson)

        if(updatedPerson.matchedCount === 0){
            res.status(422).json({message: 'O user nao foi encotrado'})
            return
        }

        res.status(200).json(person)
    }catch(error){
        res.status(500).json({error: error})
    }
})

router.delete('/:id',async (req,res) => {
    const id = req.params.id

    const person = await Person.findOne({_id: id})

    if(!person){
        res.status(422).json({message: 'user not found'})
        return
    }

    try{
        await Person.deleteOne({_id: id})
        res.status(200).json({message: 'User deleted'})
    }catch(error){
        res.status(500).json({error: error})
    }
})

module.exports = router