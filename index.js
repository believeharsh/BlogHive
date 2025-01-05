const express = require("express") ; 
const app = express() ; 
const path = require("path") ; 


const PORT = 8000 ; 
app.set("view engine", "ejs") ; 
app.set("views" , path.resolve("./views")) ; 

app.get("/", (req, res) => {
    res.render("home") ; 
})

app.listen(PORT, () => console.log("server is running at port 8000")) ; 