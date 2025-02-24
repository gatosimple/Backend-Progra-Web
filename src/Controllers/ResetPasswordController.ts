import express, {Request, Response} from "express"
const db = require("../DAO/models")
const bcrypt = require("bcrypt")

const ResetPasswordController = () => {
    const path: string = "/reset-password";
    
    const router = express.Router();

    // Endpoint para cambiar la constraseña
    router.post('/', async (req: Request, res: Response) => {

        const { email, password, rw_password } = req.body;

        const newPasswordCorrect = password === rw_password ? true : false
        const userExists = await db.Usuario.findOne({ where: { email } });
        

        if ((newPasswordCorrect && userExists)) {

            res.json({
                msg: ""
            })

            const newPasswordHash = await bcrypt.hash(password, 10);
            await db.Usuario.update(
                { password_hash: newPasswordHash }, // Valores a actualizar
                { where: { email } } // Condición para encontrar al usuario
              );

        } else {
            res.json({
                msg: "Contraseñas o usuario incorrectos"
            })
        }

    });

    return [path, router]

}

export default ResetPasswordController