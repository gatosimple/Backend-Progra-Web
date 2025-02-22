import express, {Request, Response} from "express"
const db = require("../DAO/models")

const UsuarioController = () => {
    const path: string = "/admin/users";

    const router = express.Router()

    // Endpoint para obtener todos los usuarios
    router.get('/', async (req: Request, resp: Response) => {
        const usuarios = await db.User.findAll({
            include : {
                model : db.Role,
                as : "Role",
                attributes : ["nombre"],
                required : true
            }
        })

        resp.json({
            msg : "",
            usuarios : usuarios
        })
    })

    return [ path, router ];
}

export default UsuarioController;