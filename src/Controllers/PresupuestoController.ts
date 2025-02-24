import express, {Request, Response} from "express"
const db = require("../DAO/models")

const PresupuestoController = () => {
    const path: string = "/presupuesto";

    const router = express.Router()

    // Endpoint para obtener todos los presupuestos
    router.get('/', async (req: Request, resp: Response) => {
        const presupuestos = await db.Budget.findAll({
            include : {
                model : db.Usuario,
                as : "Usuario",
                attributes : ["name"],
                required : true
            }
        })

        resp.json({
            msg : "",
            presupuestos : presupuestos
        })
    })

    // Endpoint para añadir presupuesto
    router.post('/', async (req: Request, res: Response) => {
        const nuevoPresupuesto = req.body;

        const presupuestoCreado = await db.Budget.create({
            id: null,
            user_id: nuevoPresupuesto.user_id,
            monthly_budget: nuevoPresupuesto.monthly_budget,
            category_id: nuevoPresupuesto.category_id
        });

        res.json({
            msg: "",
            presupuesto: presupuestoCreado
        })
    })

    // Endpoint para eliminar presupuesto
    router.delete('/:id', async (req: Request, res: Response) => {
        const id = req.query.id;

        await db.Budget.destroy({
            where : {
                id : id
            }
        })

        res.json({
            msg : "Presupuesto eliminado"
        })
    })

    // Endpoint para modificar presupuesto
    router.put('/:id', async (req: Request, res: Response) => {
        const id = req.params.id;
        const presupuestoModificado = req.body;

        await db.Budget.update({
            user_id: presupuestoModificado.user_id,
            monthly_budget: presupuestoModificado.monthly_budget,   
            category_id: presupuestoModificado.category_id
        }, {
            where : {
                id : id
            }
        })

        res.json({
            msg : "Presupuesto modificado"
        })
    })

    return [ path, router ];
}

export default PresupuestoController;