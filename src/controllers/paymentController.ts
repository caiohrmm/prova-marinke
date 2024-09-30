import { Request, Response } from "express";
import Payment from "../models/Payment";

// Criar um novo pagamento
export const createPayment = async (req: Request, res: Response) => {
  try {
    const { jobId, operationDate, paymentValue } = req.body;
    const payment = await Payment.create({
      jobId,
      operationDate,
      paymentValue,
    });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar pagamento." });
  }
};

// Obter todos os pagamentos
export const getPayments = async (req: Request, res: Response) => {
  try {
    const payments = await Payment.findAll();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pagamentos." });
  }
};

// Obter um pagamento pelo ID
export const getPaymentById = async (req: Request, res: Response) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (payment) {
      res.status(200).json(payment);
    } else {
      res.status(404).json({ error: "Pagamento não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pagamento." });
  }
};

// Atualizar um pagamento pelo ID
export const updatePayment = async (req: Request, res: Response) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (payment) {
      const updatedPayment = await payment.update(req.body);
      res.status(200).json(updatedPayment);
    } else {
      res.status(404).json({ error: "Pagamento não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar pagamento." });
  }
};

// Excluir um pagamento pelo ID
export const deletePayment = async (req: Request, res: Response) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (payment) {
      await payment.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Pagamento não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir pagamento." });
  }
};
