import { Request, Response } from "express";
import Job from "../models/Job";
import Contract from "../models/Contract";

// Criar um novo trabalho
export const createJob = async (req: Request, res: Response) => {
  try {
    const { contractId, description, operationDate, paymentDate, price } =
      req.body;
    const job = await Job.create({
      contractId,
      description,
      operationDate,
      paymentDate,
      price,
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar trabalho." });
  }
};

// Obter todos os trabalhos
export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.findAll();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar trabalhos." });
  }
};

// Obter um trabalho pelo ID
export const getJobById = async (req: Request, res: Response) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (job) {
      res.status(200).json(job);
    } else {
      res.status(404).json({ error: "Trabalho não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar trabalho." });
  }
};

// Atualizar um trabalho pelo ID
export const updateJob = async (req: Request, res: Response) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (job) {
      const updatedJob = await job.update(req.body);
      res.status(200).json(updatedJob);
    } else {
      res.status(404).json({ error: "Trabalho não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar trabalho." });
  }
};

// Excluir um trabalho pelo ID
export const deleteJob = async (req: Request, res: Response) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (job) {
      await job.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Trabalho não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir trabalho." });
  }
};

// Obter todos os jobs de um contrato específico
export const getJobsByContractId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { contractId } = req.params;

    // Verificar se o contrato existe
    const contract = await Contract.findByPk(contractId);
    if (!contract) {
      res.status(404).json({ error: 'Contrato não encontrado.' });
      return;
    }

    // Buscar jobs relacionados ao contrato
    const jobs = await Job.findAll({ where: { contractId } });

    res.status(200).json(jobs);
  } catch (error) {
    console.error('Erro ao buscar jobs:', error);
    res.status(500).json({ error: 'Erro ao buscar jobs.' });
  }
};

// Obter a soma de todos os jobs não pagos
export const getTotalUnpaidJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalUnpaid = await Job.sum('price', {
      where: {
        paid: 0, // Considera apenas jobs não pagos
      },
    });

    res.status(200).json({ total: totalUnpaid });
  } catch (error) {
    console.error('Erro ao calcular total de jobs não pagos:', error);
    res.status(500).json({ error: 'Erro ao calcular total de jobs não pagos.' });
  }
};
