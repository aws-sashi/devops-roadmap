const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const roadmap = [
  {
    id: 1,
    title: "Linux",
    icon: "🐧",
    description: "Linux fundamentals, commands, permissions and system administration.",
    topics: [
      "Linux commands",
      "File permissions",
      "Users and groups",
      "Processes",
      "Systemd",
      "Shell scripting"
    ]
  },
  {
    id: 2,
    title: "Git & GitHub",
    icon: "🔀",
    description: "Learn source code management and Git workflows.",
    topics: [
      "Git basics",
      "Branches",
      "Merge and Rebase",
      "Pull Requests",
      "GitHub Actions",
      "Git workflows"
    ]
  },
  {
    id: 3,
    title: "Networking",
    icon: "🌐",
    description: "Understand networking concepts required for DevOps.",
    topics: [
      "TCP/IP",
      "DNS",
      "HTTP/HTTPS",
      "Ports",
      "Load Balancer",
      "Reverse Proxy"
    ]
  },
  {
    id: 4,
    title: "AWS",
    icon: "☁️",
    description: "Learn cloud infrastructure using AWS.",
    topics: [
      "EC2",
      "VPC",
      "IAM",
      "S3",
      "RDS",
      "CloudWatch",
      "Route53",
      "EKS"
    ]
  },
  {
    id: 5,
    title: "Docker",
    icon: "🐳",
    description: "Containerize applications and manage container images.",
    topics: [
      "Images",
      "Containers",
      "Dockerfile",
      "Volumes",
      "Networks",
      "Docker Compose",
      "Docker Registry"
    ]
  },
  {
    id: 6,
    title: "Kubernetes",
    icon: "☸️",
    description: "Deploy and manage containerized applications at scale.",
    topics: [
      "Pods",
      "Deployments",
      "Services",
      "ConfigMaps",
      "Secrets",
      "Ingress",
      "HPA",
      "Namespaces"
    ]
  },
  {
    id: 7,
    title: "CI/CD",
    icon: "🚀",
    description: "Automate build, test and deployment pipelines.",
    topics: [
      "Jenkins",
      "GitHub Actions",
      "GitLab CI",
      "Build pipelines",
      "Deployment strategies",
      "Rollback"
    ]
  },
  {
    id: 8,
    title: "Terraform",
    icon: "🏗️",
    description: "Manage infrastructure using Infrastructure as Code.",
    topics: [
      "Providers",
      "Resources",
      "Variables",
      "Modules",
      "State",
      "Remote Backend"
    ]
  },
  {
    id: 9,
    title: "Ansible",
    icon: "⚙️",
    description: "Automate server configuration and application deployment.",
    topics: [
      "Inventory",
      "Playbooks",
      "Roles",
      "Variables",
      "Handlers",
      "Idempotency"
    ]
  },
  {
    id: 10,
    title: "Monitoring",
    icon: "📊",
    description: "Monitor infrastructure, applications and Kubernetes.",
    topics: [
      "Prometheus",
      "Grafana",
      "Node Exporter",
      "Logs",
      "Alerts",
      "Application monitoring"
    ]
  },
  {
    id: 11,
    title: "DevOps Security",
    icon: "🔐",
    description: "Secure infrastructure, applications and CI/CD pipelines.",
    topics: [
      "IAM",
      "Secrets management",
      "TLS/SSL",
      "Security scanning",
      "Container security",
      "Network security"
    ]
  },
  {
    id: 12,
    title: "DevSecOps",
    icon: "🛡️",
    description: "Integrate security into the complete software delivery lifecycle.",
    topics: [
      "SAST",
      "DAST",
      "Dependency scanning",
      "Container scanning",
      "Security gates",
      "Compliance"
    ]
  }
];

app.get("/api/health", (req, res) => {
  res.json({
    status: "UP",
    service: "devops-roadmap-api"
  });
});

app.get("/api/roadmap", (req, res) => {
  res.json(roadmap);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
