import { Request, Response } from "express";
import Contract from "../models/Contract";

// Criar um novo contrato
export const createContract = async (req: Request, res: Response) => {
  try {
    const { clientId, details, startDate, endDate } = req.body;
    const contract = await Contract.create({
      clientId,
      details,
      startDate,
      endDate,
    });
    res.status(201).json(contract);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar contrato." });
  }
};

// Obter todos os contratos
export const getContracts = async (req: Request, res: Response) => {
  try {
    const contracts = await Contract.findAll();
    res.status(200).json(contracts);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar contratos." });
  }
};

// Obter um contrato pelo ID
export const getContractById = async (req: Request, res: Response) => {
  try {
    const contract = await Contract.findByPk(req.params.id);
    if (contract) {
      res.status(200).json(contract);
    } else {
      res.status(404).json({ error: "Contrato não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar contrato." });
  }
};

// Atualizar um contrato pelo ID
export const updateContract = async (req: Request, res: Response) => {
  try {
    const contract = await Contract.findByPk(req.params.id);
    if (contract) {
      const updatedContract = await contract.update(req.body);
      res.status(200).json(updatedContract);
    } else {
      res.status(404).json({ error: "Contrato não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar contrato." });
  }
};

// Excluir um contrato pelo ID
export const deleteContract = async (req: Request, res: Response) => {
  try {
    const contract = await Contract.findByPk(req.params.id);
    if (contract) {
      await contract.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Contrato não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir contrato." });
  }
};
