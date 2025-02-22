import express, {Express, Request, Response, Router} from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import RegisterController from "./Controllers/RegisterController";
import LoginController from "./Controllers/LoginController";
import AddGastoController from "./Controllers/AddGastoController";

dotenv.config()

const app : Express = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))
app.use(express.static("assets")) // Carpeta archivos estaticos
app.use(cors()) // TODO: Incrementar la seguridad

const port = process.env.PORT || 3000;

const [ registerPath, registerRouter ] = RegisterController();
const [ loginPath, loginRouter ] = LoginController();
const [ addGastoPath, addGastoRouter ] = AddGastoController();

app.use(registerPath as string, registerRouter as Router);
app.use(loginPath as string, loginRouter as Router);
app.use(addGastoPath as string, addGastoRouter as Router);

app.listen(port, () => {
    console.log(`[Server]: Servidor ejecutandose en puerto ${port}`)
})