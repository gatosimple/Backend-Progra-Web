import express, {Request, Response} from "express"
const db = require("../DAO/models")

const UsuarioController = () => {
    const path: string = "/admin/users";

    const router = express.Router()

    // Endpoint para obtener todos los usuarios
    router.get('/', async (req: Request, resp: Response) => {
        const usuarios = await db.Usuario.findAll({
            include : {
                model : db.Role,
                as : "Role",
                attributes : ["name"],
                required : true
            },
            order: [["id", "ASC"]] // Ordena por ID ascendente
        })

        resp.json({
            msg : "",
            usuarios : usuarios
        })
    })

    // Endpoint para agregar un nuevo usuario
    router.post("/", async (req : Request, resp : Response) => {
        const nuevoUsuario = req.body

        const usuarioCreado = await db.Usuario.create({
            id : null,
            name : nuevoUsuario.nombre,
            email : nuevoUsuario.email,
            password_hash : nuevoUsuario.password_hash,
            role_id : nuevoUsuario.role_id
        })

        resp.json({
            msg : "",
            usuario : usuarioCreado
        })
    })

    // Endpoint para eliminar un usuario
    router.delete("/", async (req : Request, resp : Response) => {
        const id = req.query.id

        await db.Usuario.destroy({
            where : {
                id : id
            }
        })

        resp.json({
            msg : ""
        })
    })

    // Endpoint para filtrar usuarios por nombre
    router.get("/filter", async (req: Request, resp: Response) => {
        
        const id = Number(req.query.role_id)
        const usuarios = await db.Usuario.findAll({
            where : {
                role_id : id
            },
            include : {
                model : db.Role,
                as : "Role",
                attributes : ["name"],
                required : true
            },
            order: [["id", "ASC"]] // Ordena por ID ascendente
        })

        resp.json({
            msg : "",
            usuarios : usuarios
        })
    })

    // Endpoint para obtener un usuario por su ID
    router.get("/:id", async (req : Request, resp : Response) => {
        const id = req.params.id
        const usuario = await db.Usuario.findByPk(id, {
            include : {
                model : db.Role,
                as : "Role",
                attributes : ["name"],
                required : true
            }
        })

        resp.json({
            msg : "",
            usuario : usuario
        })
    })


    // Endpoint para actualizar un usuario
    router.put("/:id", async (req: Request, resp: Response) => {
        const id = req.params.id
        const datosActualizados = req.body
        await db.Usuario.update({
                name: datosActualizados.nombre,
                email: datosActualizados.email,
                password_hash: datosActualizados.password_hash,
                role_id: datosActualizados.role_id
            },
            { where: { 
                    id: id 
                }
            }
        )
        resp.json({ msg: "" })
    })

    

    return [ path, router ]
}

export default UsuarioController;