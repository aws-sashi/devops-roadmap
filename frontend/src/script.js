// --------------------------------------------------
// Load Roadmap
// --------------------------------------------------

async function loadRoadmap() {

    const container =
        document.getElementById(
            "roadmap-container"
        );


    try {

        const response =
            await fetch("/api/roadmap");


        if (!response.ok) {

            throw new Error(
                "Unable to load roadmap"
            );

        }


        const roadmap =
            await response.json();


        container.innerHTML = "";


        roadmap.forEach(
            (item, index) => {


                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "roadmap-card";


                const number =
                    String(index + 1)
                        .padStart(2, "0");


                card.innerHTML = `

                    <div class="roadmap-number">
                        ${number}
                    </div>

                    <div class="card-header">

                        <div class="icon">
                            ${item.icon}
                        </div>

                        <h3>
                            ${item.title}
                        </h3>

                    </div>


                    <p>
                        ${item.description}
                    </p>


                    <div class="topics">

                        ${item.topics
                            .map(
                                topic =>
                                    `<span class="topic">
                                        ${topic}
                                    </span>`
                            )
                            .join("")
                        }

                    </div>

                `;


                container.appendChild(card);

            }
        );


    } catch (error) {

        console.error(error);


        container.innerHTML = `

            <div class="loading">

                Unable to load roadmap.
                Please refresh the page.

            </div>

        `;

    }

}



// --------------------------------------------------
// Admission Form
// --------------------------------------------------

const inquiryForm =
    document.getElementById(
        "inquiry-form"
    );


const formMessage =
    document.getElementById(
        "form-message"
    );



if (inquiryForm) {


    inquiryForm.addEventListener(
        "submit",
        async function (event) {


            event.preventDefault();


            const submitButton =
                inquiryForm.querySelector(
                    ".submit-button"
                );


            submitButton.disabled =
                true;


            submitButton.textContent =
                "Submitting...";


            formMessage.className =
                "";

            formMessage.textContent =
                "";


            const formData = {

                name:
                    document.getElementById(
                        "name"
                    ).value.trim(),

                email:
                    document.getElementById(
                        "email"
                    ).value.trim(),

                phone:
                    document.getElementById(
                        "phone"
                    ).value.trim(),

                course:
                    document.getElementById(
                        "course"
                    ).value,

                qualification:
                    document.getElementById(
                        "qualification"
                    ).value.trim(),

                experience:
                    document.getElementById(
                        "experience"
                    ).value,

                message:
                    document.getElementById(
                        "message"
                    ).value.trim()

            };


            try {


                const response =
                    await fetch(
                        "/api/inquiries",
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    formData
                                )

                        }
                    );


                const result =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        result.message ||
                        "Unable to submit inquiry"
                    );

                }


                formMessage.className =
                    "success-message";


                formMessage.textContent =
                    result.message;


                inquiryForm.reset();


            } catch (error) {


                console.error(error);


                formMessage.className =
                    "error-message";


                formMessage.textContent =
                    error.message ||
                    "Something went wrong. Please try again.";


            } finally {


                submitButton.disabled =
                    false;


                submitButton.textContent =
                    "Submit Inquiry →";

            }

        }
    );

}



// --------------------------------------------------
// Initialize
// --------------------------------------------------

loadRoadmap();


// ===== COURSE SYLLABUS =====

// ===== COURSE SYLLABUS =====

const courseSyllabus = {
    "Linux": [
        "Linux fundamentals and file system",
        "Users, groups and permissions",
        "File and directory management",
        "Process management",
        "Networking commands",
        "SSH and remote administration",
        "Package management",
        "Systemd and services",
        "Disk and storage management",
        "Logs and troubleshooting",
        "Shell scripting basics",
        "Production troubleshooting"
    ],

    "Git & GitHub": [
        "Git fundamentals",
        "Repository and working tree",
        "git init, clone, add, commit",
        "Branches and merging",
        "Pull requests",
        "GitHub repositories",
        "Tags and releases",
        "Git reset, revert and cherry-pick",
        "Conflict resolution",
        "GitHub Actions basics",
        "Production Git workflow"
    ],

    "AWS Cloud": [
        "AWS fundamentals",
        "IAM users, groups, roles and policies",
        "EC2 and instance types",
        "AMI and EBS",
        "VPC and subnets",
        "Route tables and Internet Gateway",
        "Security Groups and NACL",
        "Elastic Load Balancer",
        "Auto Scaling",
        "S3 and storage classes",
        "RDS and databases",
        "Route 53",
        "CloudWatch monitoring",
        "Lambda",
        "EKS fundamentals",
        "AWS security",
        "Cost optimization",
        "High Availability architecture",
        "Production AWS scenarios"
    ],

    "Docker": [
        "Docker fundamentals",
        "Images and containers",
        "Dockerfile",
        "Docker build and run",
        "Ports and networking",
        "Volumes",
        "Environment variables",
        "Docker logs and troubleshooting",
        "Docker Compose",
        "Multi-container applications",
        "Docker security",
        "Production Docker deployment"
    ],

    "DevOps Engineering": [
        "DevOps fundamentals",
        "Linux administration",
        "Git and GitHub",
        "AWS Cloud",
        "Docker",
        "Jenkins",
        "GitHub Actions",
        "CI/CD pipelines",
        "Kubernetes",
        "Terraform",
        "Ansible",
        "Monitoring and logging",
        "DevSecOps",
        "Cloud security",
        "Production deployment",
        "High Availability and disaster recovery"
    ],

    "Kubernetes": [
        "Kubernetes architecture",
        "Cluster, node and control plane",
        "Pods",
        "Deployments",
        "ReplicaSets",
        "Services",
        "ConfigMaps",
        "Secrets",
        "Namespaces",
        "Ingress",
        "Persistent Volumes",
        "Storage Classes",
        "RBAC",
        "Resource limits and requests",
        "HPA",
        "Helm",
        "Rolling updates and rollback",
        "Kubernetes troubleshooting",
        "Production EKS architecture"
    ],

    "Terraform": [
        "Infrastructure as Code",
        "Terraform installation",
        "Providers",
        "Resources",
        "Variables",
        "Outputs",
        "Locals",
        "Data sources",
        "Terraform state",
        "Remote state",
        "Modules",
        "Workspaces",
        "terraform plan and apply",
        "State locking",
        "AWS infrastructure automation",
        "Production Terraform structure"
    ],

    "Ansible": [
        "Ansible fundamentals",
        "Inventory",
        "SSH configuration",
        "Ad-hoc commands",
        "Playbooks",
        "Tasks and handlers",
        "Variables",
        "Facts",
        "Templates",
        "Roles",
        "Loops and conditions",
        "Vault",
        "Server configuration",
        "Application deployment",
        "Production Ansible structure"
    ],

    "DevSecOps": [
        "DevSecOps fundamentals",
        "Security in CI/CD",
        "Secrets management",
        "Dependency scanning",
        "Container image scanning",
        "SAST and DAST",
        "IAM security",
        "Linux security",
        "Docker security",
        "Kubernetes security",
        "AWS security",
        "Vulnerability management",
        "Security monitoring",
        "Production security practices"
    ],

    "Jenkins": [
        "Jenkins fundamentals",
        "Jenkins installation",
        "Agents and nodes",
        "Credentials",
        "Freestyle jobs",
        "Pipeline jobs",
        "Jenkinsfile",
        "Declarative pipeline",
        "Stages and steps",
        "Environment variables",
        "Build triggers",
        "Docker integration",
        "GitHub integration",
        "CI/CD pipeline",
        "Production Jenkins architecture"
    ]
};

function normalizeCourseName(name) {
    return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getSyllabus(courseName) {
    const exact = courseSyllabus[courseName];
    if (exact) return exact;

    const normalized = normalizeCourseName(courseName);

    for (const [name, topics] of Object.entries(courseSyllabus)) {
        if (
            normalizeCourseName(name).includes(normalized) ||
            normalized.includes(normalizeCourseName(name))
        ) {
            return topics;
        }
    }

    return [
        "Course fundamentals",
        "Core concepts",
        "Tools and configuration",
        "Hands-on practical exercises",
        "Production use cases",
        "Troubleshooting",
        "Interview preparation"
    ];
}

function showSyllabus(courseName) {
    const topics = getSyllabus(courseName);

    let modal = document.getElementById("syllabus-modal");

    if (!modal) {
        modal = document.createElement("div");
        modal.id = "syllabus-modal";
        modal.className = "syllabus-modal";

        modal.innerHTML = `
            <div class="syllabus-box">
                <button class="syllabus-close" onclick="closeSyllabus()">×</button>
                <div class="syllabus-heading">
                    <span>COURSE SYLLABUS</span>
                    <h2 id="syllabus-title"></h2>
                </div>
                <ol id="syllabus-list"></ol>
            </div>
        `;

        document.body.appendChild(modal);

        modal.addEventListener("click", function(event) {
            if (event.target === modal) {
                closeSyllabus();
            }
        });
    }

    document.getElementById("syllabus-title").textContent = courseName;

    document.getElementById("syllabus-list").innerHTML =
        topics.map(topic => `<li>${topic}</li>`).join("");

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeSyllabus() {
    const modal = document.getElementById("syllabus-modal");

    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }
}

window.showSyllabus = showSyllabus;
window.closeSyllabus = closeSyllabus;

function addSyllabusButtons() {
    const container = document.getElementById("roadmap-container");

    if (!container) return;

    const cards = container.querySelectorAll(
        ".roadmap-card, .course-card, .roadmap-item, .roadmap-step"
    );

    cards.forEach(card => {
        if (card.querySelector(".syllabus-button")) return;

        const heading = card.querySelector("h2, h3, h4");

        if (!heading) return;

        const courseName = heading.textContent.trim();

        const button = document.createElement("button");
        button.className = "syllabus-button";
        button.textContent = "View Syllabus →";
        button.onclick = () => showSyllabus(courseName);

        card.appendChild(button);
    });
}

const roadmapContainer = document.getElementById("roadmap-container");

if (roadmapContainer) {
    const observer = new MutationObserver(() => {
        addSyllabusButtons();
    });

    observer.observe(roadmapContainer, {
        childList: true,
        subtree: true
    });
}
