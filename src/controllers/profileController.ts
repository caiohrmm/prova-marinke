import { Request, Response } from 'express';
import Profile from '../models/Profile';
import { sequelize } from '../config/db'

export const createProfile = async (req: Request, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction();

  try {
    const { firstname, lastname, profession, balance, type } = req.body;

    if (balance < 0) {
      res.status(400).json({ message: 'Saldo não pode ser negativo!' });
      return;
    }

    // Criar o perfil dentro da transação
    const profile = await Profile.create({ firstname, lastname, profession, balance, type }, { transaction });

    // Confirmar a transação
    await transaction.commit();

    res.status(201).json(profile);
  } catch (error) {
    await transaction.rollback();
    console.error('Erro ao criar perfil:', error);
    res.status(500).json({ error: 'Erro ao criar perfil.' });
  }
};


// Obter um perfil pelo ID
export const verifyBalanceById = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (profile) {
      res.status(200).json(profile.balance);
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
