import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { User } from './entities/User'
import { Exception } from './utils'
import { Todo } from './entities/Todo'

export const createUser = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.first_name) throw new Exception("Please provide a first_name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")

	const userRepo = getRepository(User)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {email: req.body.email }})
    if(user) throw new Exception("users already exists with this email")
    
    const newtodoDefault = getRepository(Todo).create()
    newtodoDefault.label = "Ejemplo"
    newtodoDefault.done = false;


	const newUser = userRepo.create()
	newUser.first_name = req.body.first_name
    newUser.last_name = req.body.last_name
    newUser.email = req.body.email
    newUser.password = req.body.password
    newUser.todos = [newtodoDefault]
    const results = await userRepo.save(newUser)

    return res.json(results);    
}


export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(User).find();
		return res.json(users);
}

export const getTodo = async (req: Request, res: Response): Promise<Response> =>{
		const todos = await getRepository(Todo).findOne(req.params.id);
		return res.json(todos);
}

export const getTodos = async (req: Request, res: Response): Promise<Response> =>{
		const todos = await getRepository(Todo).find({relations: ["users"]});
		return res.json(todos);
}

export const createTodo = async (req: Request, res: Response): Promise<Response> =>{
    if(!req.body.label) throw new Exception("Proporcione una etiqueta")

        const user = await getRepository(User).findOne({relations : ["todo"], where: {id: req.params.id}});
        if (user) {
            const newtodo = new Todo();
            newtodo.label = req.body.label
            newtodo.done = false
            user?.todos.push(newtodo)
            const results = await getRepository(User).save(user);
            return res.json(results);
        }     
		return res.json("Nada para hacer");
}

export const updateTodo = async (req: Request, res: Response): Promise<Response> =>{
        const todoRepo = await getRepository(Todo)
        const todos = await todoRepo.findOne(req.params.id);
        if(!todos) throw new Exception("No hay nada para hacer")

        todoRepo.merge(todos, req.body);
        const results = await todoRepo.save(todos);
		return res.json(results);
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> =>{
        const user = await getRepository(User).findOne(req.params.id);
        if(!user) throw new Exception("No hay nada para hacer")
		return res.json(user);
}