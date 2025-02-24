import express, {Express, Request, Response, Router} from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import RegisterController from "./Controllers/RegisterController";
import LoginController from "./Controllers/LoginController";
import UsuarioController from "./Controllers/UsuarioController";
import AddGastoController from "./Controllers/AddGastoController";
import RoleController from "./Controllers/RoleController";

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
const [ userPath, userRouter ] = UsuarioController();
const [ rolePath, roleRouter ] = RoleController();
const [ addGastoPath, addGastoRouter ] = AddGastoController();
app.use(registerPath as string, registerRouter as Router);
app.use(loginPath as string, loginRouter as Router);
app.use(userPath as string, userRouter as Router);
app.use(rolePath as string, roleRouter as Router);

app.listen(port, () => {
    console.log(`[Server]: Servidor ejecutandose en puerto ${port}`)
})