const express = require("express")
const mysql = require("mysql")
const cors = require("cors")
const shortid = require('shortid')

const app = express()

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "logindatabase",
})

const mailformat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

app.post('/register', (req,res) => {

  const email = req.body.email 
  const password = req.body.password
  const address = req.body.address
  const referrer = req.body.referrerCode
  const referralCode = shortid.generate()
  let loginResult



  if(email == '') {
    res.send({message: "Missing email"})
  }  else if (password == '') {
    res.send({message: "Missing password"})
  } else if(referrer == '') {
    res.send({message: "Missing referral code"})
  } else if(address == '') {
    res.send({message: "Missing wallet address. Please Connect Wallet"})
  } else if (email.match(mailformat) == null){
    res.send({message: "Invalid email format"})
  }else {
    db.query("SELECT * FROM users WHERE email = ?",[email],
    (err,result) => {
      if (result.length == 0) {

      db.query("SELECT * FROM users WHERE referralCode = ?",[referrer],
       (err,result) => { 
          if (result.length == 0) {
          res.send({message: "Referral code does not exist."})
          } else {
             db.query("SELECT * FROM users WHERE walletaddress = ?",[address],
             (err,result) => { 
                if (result.length == 0) {
                    db.query(
                    "INSERT INTO users (email, password, walletaddress, referrercode, referralcode) VALUES(?,?,?,?,?)", 
                    [email, password, address, referrer, referralCode],
                    (err, result)=> {
                      if(err) {
                          console.log(err)
                        } else {
                          res.send({message: "Registration successful. Please Login."})
                          }
                        })} else {
            res.send({message: "this wallet address has already been registered."})
          }}) } 
        })
      }else {
    res.send({message: "User already exists. Please login."})
   }})}
  })


app.post('/login', (req,res) => {
  const email = req.body.email 
  const password = req.body.password

  if(email == '') {
    res.send({message: "Missing email"})
  } else if (password == '') {
    res.send({message: "Missing password"})
  }  else if (email.match(mailformat) == null) {
    res.send({message: "Invalid email format"})
  } else {
  db.query(
    "SELECT * FROM users WHERE email = ? ",
    [email], (err, result) => {

      if(result.length == 0) {
        res.send({message: "No such user!"})
      } else {

        db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {

      if(result.length == 0) {
        res.send({message: "Wrong email / password combination"}) 
      } else {
        res.send(result)       
      }
    })     
      }
    })
  }})


app.post('/referral', (req,res) => {
  const referralCode = req.body.referralCode

  db.query(
    "SELECT walletaddress FROM users WHERE referralcode = ?",
    [referralCode],
    (err, result) => {
      if(err) {
        res.send({err: err})
      }

      if(result.length > 0) {
        res.send(result)
      } else {
        res.send({message: "fetch wallet fail"})
      }
    })
})


app.post('/refData', (req,res) => {
  const referralCode = req.body.refCode

  db.query(
    "SELECT DISTINCT * FROM logindatabase.users AS u INNER JOIN logindatabase.users AS s on s.referrercode = u.referralcode WHERE s.referrercode = ?",
    [referralCode],
    (err, result) => {
      if(err) {
        res.send({err: err})
      }

      if(result.length > 0) {
        res.send(result)
      } else {
        res.send({message: "no Referral signups yet"})
      }
    })
})



app.listen(3001, ()=> {
  console.log('running server')
})