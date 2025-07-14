import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertFacultySchema, insertBannerSchema, insertNewsSchema, insertIprSchema,
  insertManagementTeamSchema, insertCellsCommitteesSchema, insertGallerySchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Faculty routes
  app.get("/api/faculty", async (req, res) => {
    try {
      const faculty = await storage.getFaculty();
      res.json(faculty);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch faculty" });
    }
  });

  app.post("/api/faculty", async (req, res) => {
    try {
      const validatedData = insertFacultySchema.parse(req.body);
      const faculty = await storage.createFaculty(validatedData);
      res.status(201).json(faculty);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create faculty" });
      }
    }
  });

  app.put("/api/faculty/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertFacultySchema.partial().parse(req.body);
      const faculty = await storage.updateFaculty(id, validatedData);
      res.json(faculty);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update faculty" });
      }
    }
  });

  app.delete("/api/faculty/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteFaculty(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete faculty" });
    }
  });

  // Banner routes
  app.get("/api/banners", async (req, res) => {
    try {
      const banners = await storage.getBanners();
      res.json(banners);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch banners" });
    }
  });

  app.post("/api/banners", async (req, res) => {
    try {
      const validatedData = insertBannerSchema.parse(req.body);
      const banner = await storage.createBanner(validatedData);
      res.status(201).json(banner);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create banner" });
      }
    }
  });

  app.put("/api/banners/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertBannerSchema.partial().parse(req.body);
      const banner = await storage.updateBanner(id, validatedData);
      res.json(banner);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update banner" });
      }
    }
  });

  app.delete("/api/banners/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteBanner(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete banner" });
    }
  });

  // News routes
  app.get("/api/news", async (req, res) => {
    try {
      const news = await storage.getNews();
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  app.post("/api/news", async (req, res) => {
    try {
      const validatedData = insertNewsSchema.parse(req.body);
      const news = await storage.createNews(validatedData);
      res.status(201).json(news);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create news" });
      }
    }
  });

  app.put("/api/news/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertNewsSchema.partial().parse(req.body);
      const news = await storage.updateNews(id, validatedData);
      res.json(news);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update news" });
      }
    }
  });

  app.delete("/api/news/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteNews(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete news" });
    }
  });

  // IPR routes
  app.get("/api/ipr", async (req, res) => {
    try {
      const ipr = await storage.getIpr();
      res.json(ipr);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch IPR" });
    }
  });

  app.post("/api/ipr", async (req, res) => {
    try {
      const validatedData = insertIprSchema.parse(req.body);
      const ipr = await storage.createIpr(validatedData);
      res.status(201).json(ipr);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create IPR" });
      }
    }
  });

  app.put("/api/ipr/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertIprSchema.partial().parse(req.body);
      const ipr = await storage.updateIpr(id, validatedData);
      res.json(ipr);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update IPR" });
      }
    }
  });

  app.delete("/api/ipr/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteIpr(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete IPR" });
    }
  });

  // Management Team routes
  app.get("/api/management", async (req, res) => {
    try {
      const management = await storage.getManagementTeam();
      res.json(management);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch management team" });
    }
  });

  app.post("/api/management", async (req, res) => {
    try {
      const validatedData = insertManagementTeamSchema.parse(req.body);
      const management = await storage.createManagementTeam(validatedData);
      res.status(201).json(management);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create management team member" });
      }
    }
  });

  app.put("/api/management/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertManagementTeamSchema.partial().parse(req.body);
      const management = await storage.updateManagementTeam(id, validatedData);
      res.json(management);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update management team member" });
      }
    }
  });

  app.delete("/api/management/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteManagementTeam(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete management team member" });
    }
  });

  // Cells & Committees routes
  app.get("/api/cells", async (req, res) => {
    try {
      const cells = await storage.getCellsCommittees();
      res.json(cells);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cells & committees" });
    }
  });

  app.post("/api/cells", async (req, res) => {
    try {
      const validatedData = insertCellsCommitteesSchema.parse(req.body);
      const cell = await storage.createCellsCommittees(validatedData);
      res.status(201).json(cell);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create cell/committee" });
      }
    }
  });

  app.put("/api/cells/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertCellsCommitteesSchema.partial().parse(req.body);
      const cell = await storage.updateCellsCommittees(id, validatedData);
      res.json(cell);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update cell/committee" });
      }
    }
  });

  app.delete("/api/cells/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteCellsCommittees(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete cell/committee" });
    }
  });

  // Gallery routes
  app.get("/api/gallery", async (req, res) => {
    try {
      const gallery = await storage.getGallery();
      res.json(gallery);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery" });
    }
  });

  app.post("/api/gallery", async (req, res) => {
    try {
      const validatedData = insertGallerySchema.parse(req.body);
      const item = await storage.createGallery(validatedData);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create gallery item" });
      }
    }
  });

  app.put("/api/gallery/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertGallerySchema.partial().parse(req.body);
      const item = await storage.updateGallery(id, validatedData);
      res.json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update gallery item" });
      }
    }
  });

  app.delete("/api/gallery/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteGallery(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete gallery item" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
