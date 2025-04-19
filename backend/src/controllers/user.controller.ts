import { Request, Response } from 'express';
import { createUser, getUsers } from '../models/user.model';

export const addUser = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const result = await createUser(name);
    res.status(201).json({ message: 'User added', result });
  } catch (err) {
    res.status(500).json({ error: 'Could not add user' });
  }
};

export const listUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get users' });
  }
};
