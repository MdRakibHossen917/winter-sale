// Simple server test script
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Test server is running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log('===========================================');
  console.log(`✅ Test Server running on port ${PORT}`);
  console.log(`💚 Health: http://localhost:${PORT}/health`);
  console.log('===========================================');
  console.log('\nIf you see this, Express is working!');
  console.log('Now try: npm run dev (for full server)\n');
});

