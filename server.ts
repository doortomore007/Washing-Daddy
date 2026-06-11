import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // === IN-MEMORY DATABASE MOCK ===
  // In a real application, you'd replace this with a real Database like Cloud SQL or Firebase.
  const database = {
    user: {
      id: 'u1',
      name: 'Rahul Sharma',
      phone: '+91 98765 43210',
      plan: 'sedan',
      profilePic: 'https://api.dicebear.com/7.x/notionists/svg?seed=Rahul'
    },
    vehicles: [
      {
        id: 'v1',
        make: 'Honda',
        model: 'City',
        year: 2023,
        color: 'White',
        plate: 'DL 8C 1234',
        isPrimary: true
      }
    ],
    status: 'Healthy and secure'
  };

  // === API ROUTES ===
  // Prefixing backend routes with /api/
  
  app.get('/api/health', (req, res) => {
    res.json({ status: database.status });
  });

  app.get('/api/user', (req, res) => {
    res.json(database.user);
  });

  app.get('/api/vehicles', (req, res) => {
    res.json(database.vehicles);
  });

  // Example POST route
  app.post('/api/vehicles', (req, res) => {
    const newVehicle = { id: `v${Date.now()}`, ...req.body };
    database.vehicles.push(newVehicle);
    res.status(201).json(newVehicle);
  });

  // === VITE MIDDLEWARE (Development) or STATIC HTML (Production) ===
  const isProd = process.env.NODE_ENV === 'production';
  
  if (!isProd) {
    // Integrate Vite in development mode to handle asset serving and hot reloading
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve the built static assets from the dist folder
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend Server running on http://localhost:${PORT}`);
  });
}

startServer();
