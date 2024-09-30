import { Request, Response } from 'express';
import Profile from '../models/Profile';

// Criar um novo perfil
export const createProfile = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, profession, balance, type } = req.body;
    const profile = await Profile.create({ firstname, lastname, profession, balance, type });
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar perfil.' });
  }
};

// Obter todos os perfis
export const getProfiles = async (req: Request, res: Response) => {
  try {
    const profiles = await Profile.findAll();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar perfis.' });
  }
};

// Obter um perfil pelo ID
export const getProfileById = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(404).json({ error: 'Perfil não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar perfil.' });
  }
};

// Atualizar um perfil pelo ID
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (profile) {
      const updatedProfile = await profile.update(req.body);
      res.status(200).json(updatedProfile);
    } else {
      res.status(404).json({ error: 'Perfil não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar perfil.' });
  }
};

// Excluir um perfil pelo ID
export const deleteProfile = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (profile) {
      await profile.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Perfil não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir perfil.' });
  }
};
