import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for External Jobs (e.g., LinkedIn API via RapidAPI or official if partnered)
  app.get("/api/jobs/external", async (req, res) => {
    try {
      const apiKey = process.env.LINKEDIN_API_KEY;
      const query = req.query.q || "developer";
      
      if (!apiKey) {
        return res.status(500).json({ 
          error: "LINKEDIN_API_KEY environment variable is required.",
          jobs: [] 
        });
      }

      // Mock implementation to represent the LinkedIn API / RapidAPI wrapper call.
      // In reality, you'd use fetch() to call the target API (e.g., JSearch on RapidAPI)
      // Example:
      // const response = await fetch(`https://jsearch.p.rapidapi.com/search?query=${query}`, {
      //   headers: { 'X-RapidAPI-Key': apiKey }
      // });
      // const data = await response.json();
      
      const mockExternalJobs = [
        {
          id: 'ext-1',
          company_name: 'Microsoft (LinkedIn)',
          job_title: `Senior ${query} Engineer`,
          contact_number: 'Apply via external link',
          salary: '$150k - $200k',
          location: 'Redmond, WA',
          employee_number: '10k+',
          description: `This is a job fetched from an external API (simulating LinkedIn Jobs). We are seeking a ${query} expert.`,
          image_url: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=100&h=100&fit=crop',
        },
        {
          id: 'ext-2',
          company_name: 'Google (LinkedIn)',
          job_title: `${query} Developer`,
          contact_number: 'Apply via external link',
          salary: '$140k - $190k',
          location: 'Mountain View, CA',
          employee_number: '10k+',
          description: `Search team is expanding. Fetching external data requires API credentials successfully passed.`,
          image_url: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=100&h=100&fit=crop',
        }
      ];

      res.json({ jobs: mockExternalJobs });
    } catch (error) {
      console.error('API Error:', error);
      res.status(500).json({ error: 'Failed to fetch jobs' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
