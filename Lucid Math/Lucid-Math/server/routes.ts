import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuizResultSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Define API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy" });
  });

  // Create a new quiz result
  app.post("/api/quiz-results", async (req, res) => {
    try {
      const validatedData = insertQuizResultSchema.parse(req.body);
      const result = await storage.createQuizResult(validatedData);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid quiz result data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save quiz result" });
      }
    }
  });

  // Get quiz results for a specific user
  app.get("/api/quiz-results/user/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    try {
      const results = await storage.getQuizResultsByUser(userId);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve quiz results" });
    }
  });

  // Get quiz results for a specific table
  app.get("/api/quiz-results/table/:tableNumber", async (req, res) => {
    const tableNumber = parseInt(req.params.tableNumber);
    
    if (isNaN(tableNumber) || tableNumber < 1 || tableNumber > 20) {
      return res.status(400).json({ message: "Invalid table number" });
    }
    
    try {
      const results = await storage.getQuizResultsByTable(tableNumber);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve quiz results" });
    }
  });

  // Get quiz results for a specific user and table
  app.get("/api/quiz-results/user/:userId/table/:tableNumber", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const tableNumber = parseInt(req.params.tableNumber);
    
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    if (isNaN(tableNumber) || tableNumber < 1 || tableNumber > 20) {
      return res.status(400).json({ message: "Invalid table number" });
    }
    
    try {
      const results = await storage.getQuizResultsByUserAndTable(userId, tableNumber);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve quiz results" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
