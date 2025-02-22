import express, {Request, Response} from "express"
const db = require("../DAO/models")

const AddGastoController = () => {
    const path: string = "/add-gasto";

    const router = express.Router();

    // Endpoint para enviar categorias
    router.get('/categories', async (req: Request, res: Response) => {
        const categorias = await db.Categories.findAll()
        res.json({
            msg : "",
            categorias : categorias
        }) 
    });

    return [ path, router ];
}

export default AddGastoController;