const express = require ("express") 
const server = express()


server.set("PORT", 3000)

server.get("/", (req, res) => {
        res.send("ESTE ES EL SERVIDOR DE LA APLICACION")
})

server.listen(server.get("PORT"), () => {
    console.log(`Servidor en el puerto  http://localhost:${server.get("PORT")}`)

})