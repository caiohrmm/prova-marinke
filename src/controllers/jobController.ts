import { Request, Response } from "express";
import Job from "../models/Job";

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
