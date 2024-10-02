import { Router } from "express";
import {
  createProfile,
  verifyBalanceById,
  updateProfile,
  deleteProfile,
} from "../controllers/profileController";
import {
  createDeposit,
  getDeposits,
  getDepositById,
  updateDeposit,
  deleteDeposit,
} from "../controllers/depositController";
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  getJobsByContractId,
  getTotalUnpaidJobs
} from "../controllers/jobController";
import {
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
} from "../controllers/paymentController";
import {
  createContract,
  getContracts,
  getContractById,
  updateContract,
  deleteContract,
} from "../controllers/contractController";

const router = Router();

// Rotas para Profile
router.post("/profiles", createProfile);
router.get("/profiles/:id", verifyBalanceById);
router.put("/profiles/:id", updateProfile);
router.delete("/profiles/:id", deleteProfile);

// Rotas para Deposit
router.post("/deposits", createDeposit);
router.get("/deposits", getDeposits);
router.get("/deposits/:id", getDepositById);
router.put("/deposits/:id", updateDeposit);
router.delete("/deposits/:id", deleteDeposit);

// Rotas para Job
//Termino projeto
router.post("/jobs", createJob);
router.get("/jobs", getJobs);
router.get("/jobs/:id", getJobById);
router.put("/jobs/:id", updateJob);
router.delete("/jobs/:id", deleteJob);
router.get('/jobs/unpaid/total', getTotalUnpaidJobs);
router.get("/jobs/jobscontract/:contractId", getJobsByContractId);

// Rotas para Payment
router.post("/payments", createPayment);
router.get("/payments", getPayments);
router.get("/payments/:id", getPaymentById);
router.put("/payments/:id", updatePayment);
router.delete("/payments/:id", deletePayment);

// Rotas para Contract
router.post("/contracts", createContract);
router.get("/contracts", getContracts);
router.get("/contracts/:id", getContractById);
router.put("/contracts/:id", updateContract);
router.delete("/contracts/:id", deleteContract);

export default router;
