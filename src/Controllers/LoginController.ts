import express, {Request, Response} from "express"
const db = require("../DAO/models")

const LoginController = () => {
    const path: string = "/login";

    const router = express.Router();

    // Endpoint para verificar usuario
    router.post('/', async (req: Request, res: Response) => {
        const email = req.body.email
        const password = req.body.password

        const usuarios = await db.Usuario.findAll({
            where: {
                email: email,
                password_hash: password
            }
        });

        if (usuarios.length > 0) {
            res.json({
                msg: ""
            })
        } else {
            res.json({
                msg: "Error en login"
            })
        }
    });

    return [ path, router ];
}

export default LoginController;