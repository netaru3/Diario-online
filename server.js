import express from 'express'
import {log} from './mongo.js'
import {createServer} from 'http'
import {Server} from 'socket.io'
import dotenv from 'dotenv'
dotenv.config()

let app= express()
const server= createServer(app)
// Servidor
const IO = new Server(server, { 
    cors: {
        origin: "https://pleasant-illumination-url.up.railway.app",
        methods: ["GET", "POST"],
        credentials: true
    },
    pingTimeout: 60000,
    pingInterval: 25000,
    upgradeTimeout: 30000,
    transports: ['polling', 'websocket']
})
app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.get('/',function(req,res){ 
    res.sendFile("registro1.html",{
        root: import.meta.dirname
    })
})

app.post('/data',async function(req,res){
       try{ if(req.body)
       { let cuenta=await log.find({usuario:req.body.usuario
    });
    console.log(cuenta);
    if(cuenta.length>0){res.setHeader("Content-Type", "text/plain");
       return res.send("el usuario ya está tomado")}
        log.create({
        usuario: req.body.usuario,
        contraseña: req.body.contraseña
       })}} catch(error){
    console.log("error:",error)
   };
    res.sendFile("login.html",{
        root: import.meta.dirname
    })
    
})

app.get('/data',async function(req,res){
      // try{ log.create({
       // usuario: req.body.usuario,
       // contraseña: req.body.contraseña
      // })} catch(error){
    //console.log("error:",error)
  // };
    res.sendFile("login.html",{
        root: import.meta.dirname
    })
    
})
let cuenta=[]
app.post('/data/logeado',async function(req,res,next){
    let cuenta=await log.find({usuario:req.body.usuario,
        contraseña:req.body.contraseña
    })
;
    if(cuenta.length>0){ 
   return  res.send("ok")
    }
else{
     res.send("error en el inicio de sesión")
}
    

})
let mensajestotal="querido diario:"
app.get("/diario/:nombre", async function(req,res){ 
      async function obtenerlogs(){let cuenta1= await log.find({usuario: req.params.nombre })
    for(let logs of cuenta1){
        if(logs.mensaje!==undefined && logs.mensaje!==null && logs.mensaje!==NaN){mensajestotal+=`\n${logs.mensaje}`
            console.log(mensajestotal)
        }
    
}
return mensajestotal};
await obtenerlogs()
  if(req.query.contraseña===undefined){return res.send("acceso denegado")}
    let cuenta=await log.find({usuario:req.params.nombre,
        contraseña:req.query.contraseña
    })
;
    if(cuenta.length>0){ res.send(`<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diario Personal</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            padding: 40px;
            max-width: 600px;
            width: 100%;
            animation: fadeIn 0.5s ease-in;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        h1 {
            color: #667eea;
            text-align: center;
            margin-bottom: 30px;
            font-size: 2.5em;
            font-weight: 600;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .input-container {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
        }

        #input {
            flex: 1;
            padding: 15px 20px;
            border: 2px solid #e0e0e0;
            border-radius: 50px;
            font-size: 16px;
            transition: all 0.3s ease;
            outline: none;
        }

        #input:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        button {
            padding: 15px 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }

        button:active {
            transform: translateY(0);
        }

        .mensaje-container {
            background: #f8f9fa;
            border-radius: 15px;
            padding: 20px;
            min-height: 200px;
            max-height: 400px;
            overflow-y: auto;
            border: 2px solid #e0e0e0;
        }

        .mensaje-container::-webkit-scrollbar {
            width: 8px;
        }

        .mensaje-container::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }

        .mensaje-container::-webkit-scrollbar-thumb {
            background: #667eea;
            border-radius: 10px;
        }

        .mensaje-container::-webkit-scrollbar-thumb:hover {
            background: #764ba2;
        }

        #mensaje {
            color: #333;
            line-height: 1.8;
            font-size: 16px;
            word-wrap: break-word;
        }

        .mensaje-item {
            background: white;
            padding: 12px 18px;
            border-radius: 10px;
            margin-bottom: 10px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
            animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(-10px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @media (max-width: 600px) {
            .container {
                padding: 25px;
            }

            h1 {
                font-size: 2em;
            }

            .input-container {
                flex-direction: column;
            }

            button {
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📔 Diario Personal</h1>
        <div class="input-container">
            <input type="text" placeholder="Escribe lo que piensas..." id="input">
            <button onclick="enviarmensaje()">Enviar</button>
        </div>
        <div class="mensaje-container">
            <p id="mensaje"></p>
        </div>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const nombre = "${req.params.nombre}";
        console.log(nombre);
  


// Cliente
const socket = io("https://pleasant-illumination-url.up.railway.app/", {
    withCredentials: true,
    transports: ['polling', 'websocket'],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5
});

        
        socket.on("mensajerespuesta", function(mensaje) {
            document.getElementById("mensaje").textContent += mensaje;
        });
        
        function enviarmensaje() {
            const inputElement = document.getElementById("input");
            const mensajeElement = document.getElementById("mensaje");
            
            if (inputElement.value.trim() !== "") {
                mensajeElement.textContent += " " + inputElement.value;
                socket.emit("mensaje", {
                    usuario: nombre,
                    mensaje: inputElement.value
                });
                inputElement.value = "";
            }
        }
        
        // Permitir enviar con Enter
        document.getElementById("input").addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                enviarmensaje();
            }
        });
        
        console.log(nombre);
    </script>
</body>
</html>`)
   
    }
else{
     res.send("error en el inicio de sesión")
}
   


    
})



IO.on("connection",function(socket){
      socket.emit("mensajerespuesta",mensajestotal)
      
       socket.on("mensaje",function(objeto){
        log.create({usuario: objeto.usuario ,
            mensaje: objeto.mensaje
        }); console.log(objeto.mensaje)
    })


    console.log("te conectaste")
   
    socket.on("error-sesion",function(){
      
        socket.emit("error","hubo un error en el inicio de sesion")
    })
    

    socket.on("disconnect",function(){
mensajestotal=""
    })})

server.listen(process.env.PORT || 3000)
