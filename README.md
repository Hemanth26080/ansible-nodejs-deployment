# 🚀 Ansible Node.js Deployment to DigitalOcean

[![Ansible](https://img.shields.io/badge/Ansible-2.15%2B-blue?logo=ansible)](https://www.ansible.com/)
[![Node.js](https://img.shields.io/badge/Node.js-v20-LTS-green?logo=node.js)](https://nodejs.org/)
[![DigitalOcean](https://img.shields.io/badge/DigitalOcean-Droplet-orange?logo=digitalocean)](https://www.digitalocean.com/)
[![License](https://img.shields.io/badge/License-MIT-purple)](LICENSE)

Automate deployment of a Node.js application to a DigitalOcean droplet using Ansible — with **PM2 for process management** + **systemd for auto-restart reliability**.

![Deployment Diagram](https://via.placeholder.com/800x400?text=Ansible+→+DigitalOcean+Droplet+%7C+PM2+%2B+systemd)

## ✨ Why This Hybrid Approach?

| Tool | Role | Benefit |
|------|------|---------|
| **Ansible** | Automation engine | One command deploys entire stack |
| **PM2** | Node.js process manager | Zero-downtime reloads, log management |
| **systemd** | Linux init system | Auto-start on reboot, crash recovery |
| **Hybrid** | systemd → PM2 → Node.js | Best of both worlds ✅ |

## 🛠️ Prerequisites

| Requirement | How to Verify |
|-------------|---------------|
| **DigitalOcean Account** | [Sign up for $200 free credit](https://cloud.digitalocean.com/registrations/new) |
| **SSH Key on PC** | `ls ~/.ssh/id_ed25519*` should show key files |
| **SSH Key in DO** | DO → Settings → Security → SSH Keys |
| **$5 Ubuntu 22.04 Droplet** | Created with your SSH key selected |
| **Ansible on Local PC** | `ansible --version` shows 2.15+ |

## 🚀 Quick Start (5 Minutes)

### 1. Clone this repo & initialize Git
```bash
git clone https://github.com/yourname/ansible-playbook-nodejs-deployment.git
cd ansible-playbook-nodejs-deployment
git init  # Fixes "world writable directory" warning

2. Update inventory with your droplet IP
ini
12
3. Run the playbook (NO --check mode!)
bash
1
⚠️ Critical: Never use --check with npm/pip tasks — it fails because packages aren't actually installed in dry-run mode. Use --diff for safe visibility.
4. Test your deployed app
bash
1
✅ Expected output:

{
  "message": "🚀 Hello from DigitalOcean!",
  "deployed_by": "Ansible Hybrid Playbook",
  "server": "node-app-server",
  "timestamp": "2026-02-15T14:30:00.000Z",
  "environment": "production"
}

📂 Project Structure

ansible-playbook-nodejs-deployment/
├── playbooks/               # Main automation playbook
│   └── site.yml
├── inventory/               # Server definitions
│   └── hosts
├── group_vars/              # Shared variables
│   └── all.yml
├── files/                   # Static files to deploy
│   └── app.js               # Sample Node.js app
├── templates/               # Config templates
│   ├── ecosystem.config.js.j2   # PM2 config
│   └── pm2-systemd.service.j2   # systemd service
├── roles/                   # (Future) Reusable roles
├── ansible.cfg              # Ansible settings
├── .gitignore               # Security-focused ignores
└── README.md                # You are here!

🔒 Security Best Practices
✅ Non-root app user: App runs as nodeapp (not root)
✅ GPG-verified packages: Node.js repo signed with official key
✅ Firewall rules: Only port 3000 exposed
✅ Secrets protection: .gitignore blocks SSH keys/secrets

After successful deployment:

# Disable root SSH login (prevents brute-force attacks)
ssh root@YOUR_DROPLET_IP "sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config && systemctl restart sshd"

🛠️ Troubleshooting

