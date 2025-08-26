import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint for AWS deployment
  app.get("/api/health", (req, res) => {
    res.status(200).json({ 
      status: "healthy", 
      timestamp: new Date().toISOString(),
      service: "amarjeet-portfolio" 
    });
  });

  // Portfolio data endpoints
  app.get("/api/portfolio", async (req, res) => {
    try {
      const data = await storage.getPortfolioData();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch portfolio data" });
    }
  });

  app.get("/api/portfolio/:type", async (req, res) => {
    try {
      const { type } = req.params;
      const data = await storage.getPortfolioDataByType(type);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch portfolio data by type" });
    }
  });

  // Contact info endpoint
  app.get("/api/contact", async (req, res) => {
    try {
      const contact = await storage.getContactInfo();
      if (!contact) {
        return res.status(404).json({ error: "Contact information not found" });
      }
      res.json(contact);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact information" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
