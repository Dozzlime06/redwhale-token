import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Subscriber API
  app.post(api.subscribers.create.path, async (req, res) => {
    try {
      const input = api.subscribers.create.input.parse(req.body);
      
      const existing = await storage.getSubscriberByEmail(input.email);
      if (existing) {
        return res.status(409).json({ message: "Email already subscribed" });
      }

      const subscriber = await storage.createSubscriber(input);
      res.status(201).json(subscriber);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // GitHub API routes - only in development
  if (process.env.NODE_ENV === 'development') {
    const { createRepoAndPush, pushAllFiles } = await import("./github");
    
    app.post('/api/github/create-repo', async (req, res) => {
      try {
        const { repoName } = req.body;
        if (!repoName) {
          return res.status(400).json({ message: "Repository name is required" });
        }
        
        const result = await createRepoAndPush(repoName);
        res.json(result);
      } catch (err: any) {
        console.error('GitHub error:', err);
        res.status(500).json({ message: err.message || 'Failed to create repository' });
      }
    });

    app.post('/api/github/push', async (req, res) => {
      try {
        const { owner, repo } = req.body;
        if (!owner || !repo) {
          return res.status(400).json({ message: "Owner and repo are required" });
        }
        
        const result = await pushAllFiles(owner, repo);
        res.json(result);
      } catch (err: any) {
        console.error('GitHub push error:', err);
        res.status(500).json({ message: err.message || 'Failed to push files' });
      }
    });
  }

  return httpServer;
}
