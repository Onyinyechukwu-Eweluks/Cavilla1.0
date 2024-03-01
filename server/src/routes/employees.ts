import * as express from "express"
import { Request, Response} from 'express'
import { Employees } from '../entity/Employees'
import { AppDataSource } from '../data-source'

const router = express.Router()
const source = AppDataSource.getRepository(Employees)

router.get('/employees', async (req: Request, res: Response, next) => {
    try {
        const employees = await source.find()
        res.json(employees)
    } catch (error) {
        res.send({message: 'Unable to get employees', error})
    }
});

router.get('/employees/:id', async (req: Request, res: Response, next) => {
    try {
        const employee = await source.findOneBy({id: parseInt(req.params.id)})
        res.json(employee)
    } catch (error) {
        res.send({message: 'Unable to get employee', error})
    }
});

router.post('/employees',async (req: Request, res: Response, next) => {
    try {
        const employee = await source.create(req.body);
        const result = await source.save(employee)
        return res.json({message: 'Registered successfully', result});
    } catch (error) {
        res.send({message: 'Unable to register', error})
    }
});

router.put('/employees/:id', async (req: Request, res: Response, next) => {
    try {
        const employee = await source.findOneBy({id: parseInt(req.params.id)})
        source.merge(employee!, req.body)
        const result = await source.save(employee!)
        return res.send(result)
    } catch (error) {
        res.send(error)
    }
});

router.patch('/employees/:id', async (req: Request, res: Response, next) => {
    try {
        const employee = await source.findOneBy({id: parseInt(req.params.id)})
       if (employee) {
        source.merge(employee!, req.body)
        const result = await source.save(employee!)
        res.send(result)
       }else {
        res.send('Employee not found')
       }
    } catch (error) {
        res.send(error)
    }
});

router.delete('/employees/:id', async (req: Request, res: Response, next) => {
    try {
        const employee = await source.findOneBy({id: parseInt(req.params.id)});
        if (employee) {
            const result = await source.delete({id: parseInt(req.params.id)})
            return res.json(result)
        }
        
    } catch (error) {
        res.send(error)
    }
});

module.exports = router