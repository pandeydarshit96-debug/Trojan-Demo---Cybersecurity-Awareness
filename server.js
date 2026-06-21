const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

const SECRET_KEY = 'jarvis2026'; // Yeh key sirf tumhe pata hai

app.use(cors());
app.use(express.json());

// ngrok browser warning bypass
app.use((req, res, next) => {
  res.setHeader('ngrok-skip-browser-warning', 'true');
  next();
});

// Auth middleware — har request mein key check karo
app.use((req, res, next) => {
  if (req.path === '/ping') return next(); // ping ke liye key nahi chahiye
  const key = req.headers['x-secret-key'] || req.body?.key;
  if (key !== SECRET_KEY) {
    return res.status(403).json({ success: false, message: '🔒 Access Denied' });
  }
  next();
});

// Folder search function
function searchFolderInDrive(rootPath, targetName) {
  const results = [];

  function walk(currentPath) {
    try {
      const items = fs.readdirSync(currentPath, { withFileTypes: true });
      for (const item of items) {
        if (!item.isDirectory()) continue;

        const skipFolders = ['node_modules', 'Windows', 'System32', '$Recycle.Bin', '.git', 'AppData'];
        if (skipFolders.includes(item.name)) continue;

        const fullPath = path.join(currentPath, item.name);

        if (item.name.toLowerCase() === targetName.toLowerCase()) {
          results.push(fullPath);
        }

        walk(fullPath);
      }
    } catch (err) {
      // Access denied - skip
    }
  }

  walk(rootPath);
  return results;
}

// Message se folder naam extract karo
function extractFolderName(message) {
  const msg = message.trim();

  // Common patterns se folder naam nikalo
  const patterns = [
    /(?:mujhe|open|kholo|do|folder|dikhao|chahiye|find|search|dhundo)\s+([a-zA-Z0-9_\-. ]+?)(?:\s+(?:ka|ki|ke|folder|dikhao|do|chahiye|path|open|kholo))?$/i,
    /([a-zA-Z0-9_\-]+)\s+(?:ka|ki|ke)\s+(?:folder|path)/i,
    /(?:folder|open|find|search|dhundo)\s+([a-zA-Z0-9_\-. ]+)/i,
  ];

  for (const pattern of patterns) {
    const match = msg.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  // Agar koi pattern match nahi hua toh pure message ko folder naam maano
  return msg;
}

// API endpoint — chatbot yahan request bhejega
app.post('/search', (req, res) => {
  let { folderName } = req.body;

  if (!folderName) {
    return res.json({ success: false, message: 'Folder naam nahi diya!' });
  }

  // Message se folder naam extract karo
  const extracted = extractFolderName(folderName);
  folderName = extracted;

  // Direct path check
  if (fs.existsSync(folderName)) {
    exec(`explorer "${folderName}"`);
    return res.json({
      success: true,
      message: `✅ "${folderName}" folder mila aur khul gaya!`,
      paths: [folderName]
    });
  }

  // Drive mein search karo
  const found = searchFolderInDrive('C:\\', folderName);

  if (found.length === 0) {
    return res.json({
      success: false,
      message: `❌ "${folderName}" naam ka koi folder nahi mila.\n💡 Thoda aur specific naam do.`
    });
  }

  // Pehla result Explorer mein open karo
  exec(`explorer "${found[0]}"`);

  return res.json({
    success: true,
    message: `✅ "${folderName}" ke ${found.length} folder(s) mile! Explorer mein khul gaya.`,
    paths: found
  });
});

// Server status check
app.get('/ping', (req, res) => {
  res.json({ status: 'online', pc: process.env.USERNAME });
});

app.listen(PORT, () => {
  console.log(`\n✅ Server chal raha hai: http://localhost:${PORT}`);
  console.log(`📡 ngrok se expose karo: ngrok http ${PORT}`);
  console.log(`🔗 ngrok URL chatbot mein daalo\n`);
});
