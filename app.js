const express = require('express')
const app = express()
const port = 3000
const router = require('./routers/index')
const {index, incubators, startup} = router

app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))
app.use('/', router)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})