import { Request, Response } from "express";
import battleService from "../Services/BattleService";

class BattleController {
    public async getAll(req: Request, res: Response) {
        try {
            const battles = await battleService.getAll();
            res.send(battles);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async add(req: Request, res: Response) {
        try {
            const battle = await battleService.add(req.body);
            res.send(battle);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async uploadIcon(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const battle = await battleService.setImage(id, req.file);
            res.send(battle);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updatedBattle = await battleService.update(id, req.body);
            res.send(updatedBattle);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await battleService.delete(id);
            res.send("Deleted");
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async getFilters(req: Request, res: Response) {
        try {
            const filters = await battleService.getFilters();
            res.send(filters);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async getAndFilter(req: Request, res: Response) {
        try {
            const { filter, search } = req.body;
            const battles = await battleService.getAndFilter(filter, search);
            res.send(battles);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}

export default new BattleController();
