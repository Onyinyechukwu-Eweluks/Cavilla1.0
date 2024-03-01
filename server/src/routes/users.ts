import * as express from "express";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Request, Response} from 'express';
import { Users } from '../entity/Users';
import { AppDataSource } from '../data-source';

const router = express.Router();
const source = AppDataSource.getRepository(Users);

router.get('/users', async (req: Request, res: Response, next) => {
    try {
        const users = await source.find();
        res.json(users);
    } catch (error) {
        res.send({message: 'Unable to get users', error});
    }
});

router.get('/users/:id', async (req: Request, res: Response, next) => {
    try {
        const user = await source.findOneBy({id: parseInt(req.params.id)});
        res.json(user);
    } catch (error) {
        res.send({message: 'Unable to get user', error})
    }
});

router.put('/users/:id', async (req: Request, res: Response, next) => {
    try {
        const user = await source.findOneBy({id: parseInt(req.params.id)})
        source.merge(user!, req.body)
        const result = await source.save(user!)
        return res.send(result)
    } catch (error) {
        res.send(error)
    }
});

router.patch('/users/:id', async (req: Request, res: Response, next) => {
    try {
        const user = await source.findOneBy({id: parseInt(req.params.id)})
       if (user) {
        source.merge(user!, req.body)
        const result = await source.save(user!)
        res.send(result)
       }else {
        res.send('user not found')
       }
    } catch (error) {
        res.send(error)
    }
});

router.delete('/users/:id', async (req: Request, res: Response, next) => {
    try {
        const user = await source.findOneBy({id: parseInt(req.params.id)});
        if (user) {
            const result = await source.delete({id: parseInt(req.params.id)})
            return res.json(result)
        }
        
    } catch (error) {
        res.send(error)
    }
});

// register
router.post('/users',async (req: Request, res: Response, next) => {
    try {
        const user = await source.findOne({
            where: {
                email: req.body.email
            }
        })
        if (user) {
           return res.send('User with this email already exist')
        }
        const salt = await bcrypt.genSalt(6);
        const hashed = await bcrypt.hash(req.body.password, salt);
        const newUser = await source.create({...req.body, password: hashed});
        const result = await source.save(newUser)
        return res.json({message: 'Registered successfully', result});
    } catch (error) {
        res.send({message: 'Unable to register', error})
    }
  });
  
  //login
  router.post('/users',async (req: Request, res: Response, next) => {
    try {
        const user = await source.findOne({
            where: {
                email: req.body.email
            }
        })
        if (!user) {
            res.statusCode = 404;
           return res.send('User does not exist please register');
        }
        
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) {
            res.statusCode = 400;
            return res.send('Email and Password does not match');
        }
        const accessToken = jwt.sign({email: user.email, id: user.id}, 'secretKey', { expiresIn: 60 * 60 })
        return res.json({message: 'Registered successfully', token: accessToken});
    } catch (error) {
        res.send({message: 'Unable to register', error})
    }
  });

module.exports = router;