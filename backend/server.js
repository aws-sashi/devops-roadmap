const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = 3000;

const DATA_DIR = "/app/data";
const DATA_FILE = path.join(DATA_DIR, "inquiries.json");


// --------------------------------------------------
// Middleware
// --------------------------------------------------

app.use(cors());

app.use(express.json({
    limit: "1mb"
}));


// --------------------------------------------------
// Data Directory
// --------------------------------------------------

if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, {
        recursive: true
    });
}

if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(
        DATA_FILE,
        "[]",
        "utf8"
    );
}


// --------------------------------------------------
// Roadmap Data
// --------------------------------------------------

const roadmap = [

    {
        id: 1,
        title: "Linux",
        icon: "🐧",
        description:
            "Learn Linux fundamentals, system administration and shell scripting.",
        topics: [
            "Linux Commands",
            "File Permissions",
            "Users & Groups",
            "Processes",
            "Systemd",
            "Shell Scripting"
        ]
    },

    {
        id: 2,
        title: "Git & GitHub",
        icon: "🔀",
        description:
            "Learn version control and professional Git workflows.",
        topics: [
            "Git Basics",
            "Branches",
            "Merge",
            "Rebase",
            "Pull Requests",
            "GitHub Actions"
        ]
    },

    {
        id: 3,
        title: "Networking",
        icon: "🌐",
        description:
            "Understand networking concepts required for DevOps engineers.",
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
        title: "AWS Cloud",
        icon: "☁️",
        description:
            "Learn AWS cloud infrastructure and production services.",
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
        description:
            "Containerize applications and manage container environments.",
        topics: [
            "Images",
            "Containers",
            "Dockerfile",
            "Volumes",
            "Networks",
            "Docker Compose",
            "Registry"
        ]
    },

    {
        id: 6,
        title: "Kubernetes",
        icon: "☸️",
        description:
            "Deploy and manage containerized applications using Kubernetes.",
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
        description:
            "Automate application build, testing and deployment.",
        topics: [
            "Jenkins",
            "GitHub Actions",
            "GitLab CI",
            "Build Pipeline",
            "Deployment",
            "Rollback"
        ]
    },

    {
        id: 8,
        title: "Terraform",
        icon: "🏗️",
        description:
            "Manage cloud infrastructure using Infrastructure as Code.",
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
        description:
            "Automate server configuration and application deployment.",
        topics: [
            "Inventory",
            "Playbooks",
            "Roles",
            "Variables",
            "Handlers",
            "Automation"
        ]
    },

    {
        id: 10,
        title: "Monitoring",
        icon: "📊",
        description:
            "Monitor infrastructure, applications and containers.",
        topics: [
            "Prometheus",
            "Grafana",
            "Node Exporter",
            "Logs",
            "Alerts",
            "Dashboards"
        ]
    },

    {
        id: 11,
        title: "DevOps Security",
        icon: "🔐",
        description:
            "Secure cloud infrastructure and application environments.",
        topics: [
            "IAM",
            "Secrets",
            "TLS/SSL",
            "Security Scanning",
            "Container Security",
            "Network Security"
        ]
    },

    {
        id: 12,
        title: "DevSecOps",
        icon: "🛡️",
        description:
            "Integrate security into the complete software delivery lifecycle.",
        topics: [
            "SAST",
            "DAST",
            "Dependency Scanning",
            "Container Scanning",
            "Security Gates",
            "Compliance"
        ]
    }

];


// --------------------------------------------------
// Health API
// --------------------------------------------------

app.get("/api/health", (req, res) => {

    res.status(200).json({
        status: "UP",
        service: "devops-roadmap-api"
    });

});


// --------------------------------------------------
// Roadmap API
// --------------------------------------------------

app.get("/api/roadmap", (req, res) => {

    res.status(200).json(roadmap);

});


// --------------------------------------------------
// Submit Admission Inquiry
// --------------------------------------------------

app.post("/api/inquiries", (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            course,
            qualification,
            experience,
            message
        } = req.body;


        // Required fields

        if (
            !name ||
            !email ||
            !phone ||
            !course
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Name, email, phone and course are required."

            });

        }


        // Email validation

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailRegex.test(email)) {

            return res.status(400).json({

                success: false,

                message:
                    "Please enter a valid email address."

            });

        }


        // Phone validation

        const phoneRegex =
            /^[0-9+\-\s]{10,15}$/;


        if (!phoneRegex.test(phone)) {

            return res.status(400).json({

                success: false,

                message:
                    "Please enter a valid mobile number."

            });

        }


        // Create inquiry

        const inquiry = {

            id: Date.now(),

            name: String(name).trim(),

            email: String(email).trim(),

            phone: String(phone).trim(),

            course: String(course).trim(),

            qualification:
                qualification
                    ? String(qualification).trim()
                    : "",

            experience:
                experience
                    ? String(experience).trim()
                    : "",

            message:
                message
                    ? String(message).trim()
                    : "",

            status: "New",

            createdAt:
                new Date().toISOString()

        };


        // Read existing inquiries

        const inquiries =
            JSON.parse(
                fs.readFileSync(
                    DATA_FILE,
                    "utf8"
                )
            );


        // Add new inquiry

        inquiries.push(inquiry);


        // Save data

        fs.writeFileSync(

            DATA_FILE,

            JSON.stringify(
                inquiries,
                null,
                2
            ),

            "utf8"

        );


        console.log(
            `New inquiry received from ${inquiry.name}`
        );


        return res.status(201).json({

            success: true,

            message:
                "Thank you! Your inquiry has been submitted successfully."

        });


    } catch (error) {

        console.error(
            "Inquiry submission error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to submit inquiry. Please try again later."

        });

    }

});


// --------------------------------------------------
// 404
// --------------------------------------------------

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "API endpoint not found."

    });

});


// --------------------------------------------------
// Start Server
// --------------------------------------------------

app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `DevOps Roadmap API running on port ${PORT}`
        );

    }
);
