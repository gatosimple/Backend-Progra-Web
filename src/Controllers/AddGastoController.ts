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

    // Endpoint para enviar gastos
    router.post('/', async (req: Request, res: Response) => {
        const nuevoGasto = req.body;

        const gastoCreado = await db.Expenses.create({
            id: null,
            user_id: nuevoGasto.user_id,
            date: nuevoGasto.date,
            amount: nuevoGasto.amount,
            description: nuevoGasto.description,
            recurring: nuevoGasto.recurring,
            category_id: nuevoGasto.category_id
        });

        res.json({
            msg: "",
            gasto: gastoCreado
        })
    });

    return [ path, router ];
}

export default AddGastoController;