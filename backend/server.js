const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");

const app = express();

const PORT = 3000;

const DB_HOST = process.env.DB_HOST || "mysql";
const DB_PORT = Number(process.env.DB_PORT || 3306);
const DB_NAME = process.env.DB_NAME || "devops_roadmap";
const DB_USER = process.env.DB_USER || "devops";
const DB_PASSWORD = process.env.DB_PASSWORD || "";

const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASSWORD =
    process.env.ADMIN_PASSWORD || "ChangeMe";

const JWT_SECRET =
    process.env.JWT_SECRET || "change-this-secret";


// --------------------------------------------------
// Middleware
// --------------------------------------------------

app.use(cors());

app.use(
    express.json({
        limit: "1mb"
    })
);


// --------------------------------------------------
// MySQL Connection Pool
// --------------------------------------------------

const pool = mysql.createPool({

    host: DB_HOST,

    port: DB_PORT,

    user: DB_USER,

    password: DB_PASSWORD,

    database: DB_NAME,

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0

});


// --------------------------------------------------
// Initialize Database
// --------------------------------------------------

async function initializeDatabase() {

    let retries = 20;

    while (retries > 0) {

        try {

            const connection =
                await pool.getConnection();

            console.log(
                "Connected to MySQL"
            );

            await connection.query(`

                CREATE TABLE IF NOT EXISTS inquiries (

                    id BIGINT AUTO_INCREMENT PRIMARY KEY,

                    name VARCHAR(100) NOT NULL,

                    email VARCHAR(150) NOT NULL,

                    phone VARCHAR(20) NOT NULL,

                    course VARCHAR(100) NOT NULL,

                    qualification VARCHAR(100),

                    experience VARCHAR(50),

                    message TEXT,

                    status VARCHAR(30)
                        NOT NULL DEFAULT 'New',

                    created_at TIMESTAMP
                        DEFAULT CURRENT_TIMESTAMP

                )

            `);

            connection.release();

            console.log(
                "Database initialized successfully"
            );

            return;

        } catch (error) {

            console.log(
                "Waiting for MySQL...",
                error.message
            );

            retries--;

            await new Promise(
                resolve =>
                    setTimeout(resolve, 3000)
            );

        }

    }

    throw new Error(
        "Unable to connect to MySQL"
    );

}


// --------------------------------------------------
// Health Check
// --------------------------------------------------

app.get(
    "/api/health",
    async (req, res) => {

        try {

            await pool.query(
                "SELECT 1"
            );

            res.json({

                status: "UP",

                service:
                    "devops-roadmap-api",

                database:
                    "UP"

            });

        } catch (error) {

            res.status(503).json({

                status: "DOWN",

                service:
                    "devops-roadmap-api",

                database:
                    "DOWN"

            });

        }

    }
);


// --------------------------------------------------
// Roadmap
// --------------------------------------------------

const roadmap = [

    {
        id: 1,
        title: "Linux",
        icon: "🐧",
        description:
            "Linux fundamentals, administration and shell scripting.",
        topics: [
            "Linux Commands",
            "Permissions",
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
            "Version control and professional Git workflows.",
        topics: [
            "Git",
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
            "Networking fundamentals required for DevOps.",
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
            "Learn AWS cloud infrastructure and services.",
        topics: [
            "EC2",
            "VPC",
            "IAM",
            "S3",
            "RDS",
            "EKS"
        ]
    },

    {
        id: 5,
        title: "Docker",
        icon: "🐳",
        description:
            "Containerization and Docker management.",
        topics: [
            "Images",
            "Containers",
            "Dockerfile",
            "Volumes",
            "Networks",
            "Compose"
        ]
    },

    {
        id: 6,
        title: "Kubernetes",
        icon: "☸️",
        description:
            "Deploy and manage applications with Kubernetes.",
        topics: [
            "Pods",
            "Deployments",
            "Services",
            "ConfigMaps",
            "Secrets",
            "Ingress"
        ]
    },

    {
        id: 7,
        title: "CI/CD",
        icon: "🚀",
        description:
            "Automated build, testing and deployment.",
        topics: [
            "Jenkins",
            "GitHub Actions",
            "GitLab CI",
            "Build",
            "Deploy",
            "Rollback"
        ]
    },

    {
        id: 8,
        title: "Terraform",
        icon: "🏗️",
        description:
            "Infrastructure as Code.",
        topics: [
            "Providers",
            "Resources",
            "Variables",
            "Modules",
            "State",
            "Backend"
        ]
    },

    {
        id: 9,
        title: "Ansible",
        icon: "⚙️",
        description:
            "Configuration management and automation.",
        topics: [
            "Inventory",
            "Playbooks",
            "Roles",
            "Variables",
            "Handlers"
        ]
    },

    {
        id: 10,
        title: "Monitoring",
        icon: "📊",
        description:
            "Infrastructure and application monitoring.",
        topics: [
            "Prometheus",
            "Grafana",
            "Node Exporter",
            "Logs",
            "Alerts"
        ]
    },

    {
        id: 11,
        title: "DevOps Security",
        icon: "🔐",
        description:
            "Secure infrastructure and applications.",
        topics: [
            "IAM",
            "Secrets",
            "TLS/SSL",
            "Security Scanning",
            "Container Security"
        ]
    },

    {
        id: 12,
        title: "DevSecOps",
        icon: "🛡️",
        description:
            "Integrate security into CI/CD.",
        topics: [
            "SAST",
            "DAST",
            "Dependency Scanning",
            "Container Scanning",
            "Security Gates"
        ]
    }

];


app.get(
    "/api/roadmap",
    (req, res) => {

        res.json(roadmap);

    }
);


// --------------------------------------------------
// Submit Inquiry
// --------------------------------------------------

app.post(
    "/api/inquiries",
    async (req, res) => {

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


            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailRegex.test(email)) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Please enter a valid email address."

                });

            }


            const phoneRegex =
                /^[0-9+\-\s]{10,15}$/;


            if (!phoneRegex.test(phone)) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Please enter a valid mobile number."

                });

            }


            await pool.execute(

                `

                INSERT INTO inquiries

                (
                    name,
                    email,
                    phone,
                    course,
                    qualification,
                    experience,
                    message
                )

                VALUES (?, ?, ?, ?, ?, ?, ?)

                `,

                [

                    String(name).trim(),

                    String(email).trim(),

                    String(phone).trim(),

                    String(course).trim(),

                    qualification
                        ? String(qualification).trim()
                        : null,

                    experience
                        ? String(experience).trim()
                        : null,

                    message
                        ? String(message).trim()
                        : null

                ]

            );


            res.status(201).json({

                success: true,

                message:
                    "Thank you! Your inquiry has been submitted successfully."

            });


        } catch (error) {

            console.error(
                "Inquiry error:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Unable to submit inquiry."

            });

        }

    }
);


// --------------------------------------------------
// Admin Login
// --------------------------------------------------

app.post(
    "/api/admin/login",
    (req, res) => {

        const {
            username,
            password
        } = req.body;


        if (
            username !== ADMIN_USER ||
            password !== ADMIN_PASSWORD
        ) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid username or password."

            });

        }


        const token =
            jwt.sign(

                {
                    username
                },

                JWT_SECRET,

                {
                    expiresIn:
                        "8h"
                }

            );


        res.json({

            success: true,

            token

        });

    }
);


// --------------------------------------------------
// Admin Authentication
// --------------------------------------------------

function authenticateAdmin(
    req,
    res,
    next
) {

    const header =
        req.headers.authorization;


    if (
        !header ||
        !header.startsWith("Bearer ")
    ) {

        return res.status(401).json({

            success: false,

            message:
                "Authentication required."

        });

    }


    const token =
        header.substring(7);


    try {

        const decoded =
            jwt.verify(
                token,
                JWT_SECRET
            );


        req.admin =
            decoded;


        next();


    } catch (error) {

        return res.status(401).json({

            success: false,

            message:
                "Invalid or expired token."

        });

    }

}


// --------------------------------------------------
// Admin - Get All Inquiries
// --------------------------------------------------

app.get(
    "/api/admin/inquiries",
    authenticateAdmin,
    async (req, res) => {

        try {

            const [
                rows
            ] = await pool.query(`

                SELECT

                    id,

                    name,

                    email,

                    phone,

                    course,

                    qualification,

                    experience,

                    message,

                    status,

                    created_at

                FROM inquiries

                ORDER BY created_at DESC

            `);


            res.json({

                success: true,

                inquiries: rows

            });


        } catch (error) {

            console.error(error);


            res.status(500).json({

                success: false,

                message:
                    "Unable to load inquiries."

            });

        }

    }
);


// --------------------------------------------------
// Admin - Update Inquiry Status
// --------------------------------------------------

app.patch(
    "/api/admin/inquiries/:id/status",
    authenticateAdmin,
    async (req, res) => {

        try {

            const {
                status
            } = req.body;


            const allowedStatuses = [

                "New",

                "Contacted",

                "Interested",

                "Converted",

                "Rejected"

            ];


            if (
                !allowedStatuses.includes(status)
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid status."

                });

            }


            await pool.execute(

                `

                UPDATE inquiries

                SET status = ?

                WHERE id = ?

                `,

                [
                    status,
                    req.params.id
                ]

            );


            res.json({

                success: true,

                message:
                    "Inquiry status updated."

            });


        } catch (error) {

            console.error(error);


            res.status(500).json({

                success: false,

                message:
                    "Unable to update status."

            });

        }

    }
);


// --------------------------------------------------
// Admin - Delete Inquiry
// --------------------------------------------------

app.delete(
    "/api/admin/inquiries/:id",
    authenticateAdmin,
    async (req, res) => {

        try {

            await pool.execute(

                `

                DELETE FROM inquiries

                WHERE id = ?

                `,

                [
                    req.params.id
                ]

            );


            res.json({

                success: true,

                message:
                    "Inquiry deleted."

            });


        } catch (error) {

            console.error(error);


            res.status(500).json({

                success: false,

                message:
                    "Unable to delete inquiry."

            });

        }

    }
);


// --------------------------------------------------
// Start
// --------------------------------------------------

initializeDatabase()
    .then(() => {

        app.listen(
            PORT,
            "0.0.0.0",
            () => {

                console.log(
                    `API running on port ${PORT}`
                );

            }
        );

    })
    .catch(error => {

        console.error(
            "Startup failed:",
            error
        );

        process.exit(1);

    });
