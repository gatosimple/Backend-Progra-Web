import express, {Express, Request, Response, Router} from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import RegisterController from "./Controllers/RegisterController";
import LoginController from "./Controllers/LoginController";
import UsuarioController from "./Controllers/UsuarioController";
import AddGastoController from "./Controllers/AddGastoController";
import PresupuestoController from "./Controllers/PresupuestoController";
import ExpensesController from "./Controllers/ExpensesControllers";
import ReportsController from "./Controllers/ReportsController";
import CategoriaController from "./Controllers/CategoriaController";
import ResetPasswordController from "./Controllers/ResetPasswordController";
import AccessLogsController from "./Controllers/AccessLogsController";

dotenv.config()

const app : Express = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))
app.use(express.static("assets")) // Carpeta archivos estaticos
app.use(cors()) // TODO: Incrementar la seguridad

const port = process.env.PORT || 5000;

const [ registerPath, registerRouter ] = RegisterController();
const [ loginPath, loginRouter ] = LoginController();
const [ userPath, userRouter ] = UsuarioController();
const [ addGastoPath, addGastoRouter ] = AddGastoController();
const [ PresupuestoPath, PresupuestoRouter ] = PresupuestoController();
const [expensesPath, expensesRouter] = ExpensesController();
const [reportsPath, reportsRouter] = ReportsController();
const [catPath, catRouter] = CategoriaController();
const [ resetPasswordPath, resetPasswordRouter ] = ResetPasswordController();
const [ accessLogPath, accessLogRouter ] = AccessLogsController();


app.use(registerPath as string, registerRouter as Router);
app.use(loginPath as string, loginRouter as Router);
app.use(userPath as string, userRouter as Router);
app.use(addGastoPath as string, addGastoRouter as Router);
app.use(PresupuestoPath as string, PresupuestoRouter as Router);
app.use(expensesPath as string, expensesRouter as Router);
app.use(reportsPath as string, reportsRouter as Router);
app.use(catPath as string, catRouter as Router);
app.use(resetPasswordPath as string, resetPasswordRouter as Router);
app.use(accessLogPath as string, accessLogRouter as Router);

app.listen(port, () => {
    console.log(`[Server]: Servidor ejecutandose en puerto ${port}`)
})