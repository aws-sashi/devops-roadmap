# 🚀 TryNewCloud DevOps Roadmap

A production-style containerized DevOps learning and admission platform built using Docker, Docker Compose, Node.js, Express, MySQL and Nginx.

🌐 **Live Website:** https://trynewcloud.com

📦 **GitHub:** https://github.com/aws-sashi/devops-roadmap

---

## 📌 Project Overview

TryNewCloud DevOps Roadmap is a hands-on DevOps portfolio project.

The application provides:

- Complete DevOps learning roadmap
- AWS and Cloud learning topics
- Docker and Kubernetes topics
- CI/CD learning path
- Admission / Inquiry form
- MySQL-based inquiry storage
- Admin login
- Admin dashboard
- Inquiry management
- Inquiry status tracking
- Docker containerization
- Docker Compose orchestration
- Nginx reverse proxy
- HTTPS using Cloudflare and SSL

---

# 🏗️ Architecture

```text
                         Internet
                            |
                            v
                       Cloudflare
                       DNS / HTTPS
                            |
                            v
                         AWS EC2
                            |
                            v
                      Nginx Reverse Proxy
                            |
                            v
                 +-----------------------+
                 | Frontend Container    |
                 | Nginx                 |
                 | Port 80               |
                 +-----------+-----------+
                             |
                         /api/*
                             |
                             v
                 +-----------------------+
                 | Backend Container     |
                 | Node.js + Express     |
                 | Port 3000             |
                 +-----------+-----------+
                             |
                             v
                 +-----------------------+
                 | MySQL Container       |
                 | MySQL 8.4             |
                 +-----------+-----------+
                             |
                             v
                       inquiries table
