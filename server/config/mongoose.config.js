const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/coWatch_db", {
    usenewURLParser:true,
    useUnifiedTopology:true,
})
.then( () => console.log("Established connection to database."))
.catch( err => console.log(err) )
