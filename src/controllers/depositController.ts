import { Request, Response } from 'express';
import Deposit from '../models/Deposit';
import Profile from '../models/Profile';
import { sequelize } from '../config/db'; 

// Criar um novo depósito
// Criar um novo depósito e atualizar o saldo do cliente
export const createDeposit = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();

  try {
    const { clientId, operationDate, depositValue } = req.body;

    if (depositValue < 0){ 
      res.status(404).json({
        error: "Não pode depositar valor negativo!"
      })
    }

    // Encontrar o cliente pelo ID
    const profile = await Profile.findByPk(clientId, { transaction });

    if (!profile) {
      res.status(404).json({ error: 'Cliente não encontrado.' });
      await transaction.rollback();
      return;
    }

    // Inicializa o balance como 0 se for null
    const currentBalance = profile.balance ?? 0;

    // Criar o depósito
    const deposit = await Deposit.create(
      {
        clientId,
        operationDate,
        depositValue,
      },
      { transaction }
    );

    // Adicionar o valor do depósito ao saldo do cliente
    profile.balance = currentBalance + depositValue; // Atualiza o saldo
    await profile.save({ transaction });

    // Confirmar a transação
    await transaction.commit();

    res.status(201).json(deposit);
  } catch (error) {
    await transaction.rollback();
    console.error('Erro ao criar depósito:', error);
    res.status(500).json({ error: 'Erro ao criar depósito.' });
  }
};

// Obter todos os depósitos
export const getDeposits = async (req: Request, res: Response) => {
  try {
    const deposits = await Deposit.findAll();
    res.status(200).json(deposits);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar depósitos.' });
  }
};

// Obter um depósito pelo ID
export const getDepositById = async (req: Request, res: Response) => {
  try {
    const deposit = await Deposit.findByPk(req.params.id);
    if (deposit) {
      res.status(200).json(deposit);
    } else {
      res.status(404).json({ error: 'Depósito não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar depósito.' });
  }
};

// Atualizar um depósito pelo ID
export const updateDeposit = async (req: Request, res: Response) => {
  try {
    const deposit = await Deposit.findByPk(req.params.id);
    if (deposit) {
      const updatedDeposit = await deposit.update(req.body);
      res.status(200).json(updatedDeposit);
    } else {
      res.status(404).json({ error: 'Depósito não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar depósito.' });
  }
};

// Excluir um depósito pelo ID
export const deleteDeposit = async (req: Request, res: Response) => {
  try {
    const deposit = await Deposit.findByPk(req.params.id);
    if (deposit) {
      await deposit.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Depósito não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir depósito.' });
  }
};
