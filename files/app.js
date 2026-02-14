// files/app.js
const http = require('http');
const os = require('os');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  
  const response = {
    message: "🚀 Hello from DigitalOcean!",
    deployed_by: "Ansible Hybrid Playbook",
    server: os.hostname(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  };
  
  res.end(JSON.stringify(response, null, 2));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Node.js app running on port ${PORT}`);
  console.log(`✅ Server: ${os.hostname()}`);
});