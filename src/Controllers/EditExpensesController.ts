import express, { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
const db = require("../DAO/models");

const EditExpensesController = () => {
    const path: string = "/edit-expenses"
    const router = express.Router()


    //Endpoint para editar los gastos
    router.post("/", async (req: Request, res: Response): Promise<any> => {
        // Verificar token
      const authorization = req.get("authorization") || "";
      const token = authorization.toLowerCase().startsWith("bearer ") ? authorization.substring(7) : "";
      const decodedToken = jwt.verify(token, process.env.SECRET as string) as { id: number };
      
      if (!decodedToken.id) {
        return res.json({ error: "Token no valido" });
      }
        
      
      const { user_id, date, amount, description, recurring, category_id } = req.body;
      const user = await db.Usuario.findOne({ where: {user_id} })

      await db.Expenses.update({
        user_id: user.id,
        date: date,
        amount: amount,
        description: description,
        recurring: recurring,
        category_id: category_id
    
        });

        res.json({
            msg: ""
        })

    })

    return [ path, router ]
}

export default EditExpensesController