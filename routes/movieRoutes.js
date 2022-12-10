const CryptoJS = require('crypto-js');
const router = require('express').Router()
const Movie = require('../models/Movie')

const encryptWithAES = (text) => {
  const passphrase = '123';
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};

const decryptWithAES = (ciphertext) => {
  const passphrase = '123';
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

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

    var name2 = encryptWithAES(name);
    var url_m_2 = encryptWithAES(url_m);
    var img_url_2 = encryptWithAES(img_url);
  
    const movie = {
      name2,
      url_m_2,
      img_url_2,
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