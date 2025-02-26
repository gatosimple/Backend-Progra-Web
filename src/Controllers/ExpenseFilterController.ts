import express, { Request, Response, Router } from "express";
const db = require("../DAO/models");
import { Op } from "sequelize";

const router: Router = express.Router();

// ✅ Definir correctamente la función con la tipificación adecuada
const getFilteredExpenses = async (req: Request, res: Response): Promise<void> => {
    try {
        const { categoria, fechaInicio, fechaFin, montoMin, montoMax } = req.query;

        if (!db.expenses) {
            console.error("❌ Error: Modelo 'expenses' no encontrado.");
            res.status(500).json({ message: "Database model 'expenses' not found" });
            return;
        }

        const Gasto = db.expenses;
        let whereCondition: any = {};

        if (categoria && typeof categoria === "string") {
            whereCondition.categoria = categoria;
        }

        if (fechaInicio && fechaFin && typeof fechaInicio === "string" && typeof fechaFin === "string") {
            whereCondition.fecha = {
                [Op.between]: [new Date(fechaInicio), new Date(fechaFin)]
            };
        }

        if (montoMin && montoMax && !isNaN(Number(montoMin)) && !isNaN(Number(montoMax))) {
            whereCondition.monto = {
                [Op.between]: [parseFloat(montoMin as string), parseFloat(montoMax as string)]
            };
        }

        const filteredExpenses = await Gasto.findAll({ where: whereCondition });

        res.status(200).json(filteredExpenses);
    } catch (error) {
        console.error("❌ Error al obtener egresos filtrados:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// 🚀 Registrar ruta en el router asegurando la correcta tipificación
router.get("/", getFilteredExpenses);

// ✅ Exportar correctamente como función
export default function ExpenseFilterController(): [string, Router] {
    return ["/filter-expenses", router];
}
