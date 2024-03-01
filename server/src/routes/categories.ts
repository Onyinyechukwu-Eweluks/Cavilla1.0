import * as express from "express";
import { Request, Response} from 'express';
import { Category } from '../entity/Category';
import { AppDataSource } from '../data-source';
import { Business } from '../entity/Business';


const router = express.Router();
const source = AppDataSource.getRepository(Category);
const source2 = AppDataSource.getRepository(Business)

router.get('/categories', async (req: Request, res: Response, next) => {
    try {
        const categories = await source.find(
            {
                relations: ["business"]
              }
        );
        if (categories) {
            res.send(categories);
        }else {
            res.send('No categories found');
        }
    } catch (error) {
        res.send({message: 'Unable to get categories', error});
    }
});

router.get('/categories/:id', async (req: Request, res: Response, next) => {
    try {
        const category = await source.findOneBy({id: parseInt(req.params.id)});
        if (category) {
            res.json(category);
        } else {
            res.status(404).send('Sorry, cant find this category');
        };
    } catch (error) {
        res.send({message: 'An error occured', error});
    }
});

router.post('/categories',async (req: Request, res: Response, next) => {
    try {
        const inputCategory = await source.findOne({
            where: {
              name: req.body.name,
            },
          });
      
          if (inputCategory) {
            return res.send("Category already exist");
          }
        const category = await source.create(req.body);
        const result = await source.save(category)
        return res.json({message: 'Registered successfully', result});
    } catch (error) {
        res.send({message: 'Unable to register', error});
    }
});

router.put('/categories/:id', async (req: Request, res: Response, next) => {
    try {
        const category = await source.findOneBy({id: parseInt(req.params.id)});
        source.merge(category!, req.body);
        const result = await source.save(category!);
        return res.send(result);
    } catch (error) {
        res.send(error);
    }
});

router.patch('/categories/:id', async (req: Request, res: Response, next) => {
    try {
        const category = await source.findOneBy({id: parseInt(req.params.id)});
       if (category) {
        source.merge(category!, req.body);
        const result = await source.save(category!);
        res.send(result);
       }else {
        res.send('category not found');
       }
    } catch (error) {
        res.send(error);
    }
});

router.delete('/categories/:id', async (req: Request, res: Response, next) => {
    try {
        const category = await source.findOneBy({id: parseInt(req.params.id)});
        if (category) {
            const result = await source.delete({id: parseInt(req.params.id)});
            return res.json(result);
        }
        
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;