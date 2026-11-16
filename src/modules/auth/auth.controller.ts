import type { Request, Response } from 'express';
import { register, login } from './auth.service.js';

export async function registerCtrl(req: Request, res: Response) {
  try {
    const { email, username, password } = req.body;
    const data = await register(email, username, password);
    res.status(201).json(data);
  } catch (e: any) {
    if (e.message === 'Email ya registrado') {
      return res.status(409).json({ message: e.message });
    }
    if (e.code === 'P2002') {
      return res.status(409).json({ message: 'El email o el nombre de usuario ya están en uso' });
    }
    res.status(500).json({ message: e.message });
  }
}

export async function loginCtrl(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const data = await login(email, password);
    res.json(data);
  } catch (e: any) {
    if (e.message === 'Credenciales inválidas') {
      return res.status(401).json({ message: e.message });
    }
    res.status(500).json({ message: e.message });
  }
}