export const PROFILE = {
  name: "Jimoh Yusuf Kayode",
  title: "Python Backend Engineer & Odoo Developer",
  location: "Lagos, Nigeria",
  email: "jimohkayodeyusuf@gmail.com",
  phone: "+234 816 639 8746",
  github: "github.com/expensive7832",
  githubUrl: "https://github.com/expensive7832",
  linkedin: "linkedin.com/in/esquire-expensive",
  linkedinUrl: "https://www.linkedin.com/in/esquire-expensive",
  yearsExp: 6,

  summaries: {
    backend:
      "Python backend engineer with 6 years building APIs, backend services and data-heavy business systems. Hands-on with Django, Django REST Framework and FastAPI, plus PostgreSQL schema design, JWT/OAuth 2.0 authentication, and Dockerised deployments on Linux behind nginx. For the last 3.5 years I have built backend systems for regulated financial institutions in Nigeria—including a real-time fraud-monitoring pipeline that processes up to 5 million transactions on peak days, combining FastAPI machine-learning services, ETL ingestion from core banking systems and a Python/PostgreSQL case management platform.",
    odoo:
      "Experienced Odoo Developer with hands-on expertise in custom module development, ERP implementation and enterprise workflow automation. Delivered production Odoo solutions for financial institutions including Sterling Bank, FSDH Merchant Bank, Bank of Industry and Covenant Microfinance Bank—including a large-scale compliance and risk management platform processing up to 5 million transactions on peak days. Proficient in the full Odoo development stack: ORM, QWeb, XML views, wizards, computed fields, automated actions and server-side business logic. Experienced across Odoo 16, 17, 18 and 19, Community and Enterprise editions.",
  },

  cv: {
    django: {
      url: "/cv/Jimoh_Yusuf_Kayode_Django_CV.pdf",
      label: "Download Django / Python CV",
      filename: "Jimoh_Yusuf_Kayode_Django_CV.pdf",
    },
    odoo: {
      url: "/cv/Jimoh_Yusuf_Kayode_Odoo_CV.pdf",
      label: "Download Odoo CV",
      filename: "Jimoh_Yusuf_Kayode_Odoo_CV.pdf",
    },
  },

  experience: [
    {
      title: "Full-Stack Engineer / Odoo Developer",
      company: "Novaji Introserve Limited",
      period: "Apr 2023 – Present",
      current: true,
      highlights: [
        "Built a real-time fraud-monitoring FastAPI service (Isolation Forest & Random Forest) processing up to 5 million transactions on peak days across 5+ banks",
        "Architected a Python/Odoo compliance platform of 10+ interdependent modules covering transaction monitoring, customer risk scoring, case management, multi-stage approvals and regulatory reporting",
        "Designed a microservice architecture: ML service, SeaTunnel ETL pipeline, and core platform each in their own Docker container",
        "Integrated with Microsoft Active Directory and core banking systems via REST, XML-RPC and JSON-RPC APIs",
        "Implemented RBAC using groups, record-level rules and field-level permissions to enforce segregation of duties; full audit logging",
        "Deployed and managed multi-client production instances on Ubuntu with Docker, PostgreSQL, nginx and CI/CD pipelines",
      ],
    },
    {
      title: "Senior Software Developer",
      company: "Novaji Introserve Limited",
      period: "Mar 2023 – Apr 2023",
      current: false,
      highlights: [
        "Built backend services with Django REST Framework and Node.js alongside ERP deployments",
        "Translated client requirements into technical specifications and delivered on agreed timelines",
      ],
    },
    {
      title: "Software Developer (Backend)",
      company: "Novaji Introserve Limited",
      period: "Mar 2021 – Mar 2023",
      current: false,
      highlights: [
        "Built Python backend services and automation scripts supporting ERP and business-process workflows",
        "Designed and optimised PostgreSQL schemas for high-volume transactional applications",
        "Implemented secure authentication and session management with JWT and OAuth 2.0",
      ],
    },
    {
      title: "Junior Developer",
      company: "Novaji Introserve Limited",
      period: "Feb 2020 – Feb 2021",
      current: false,
      highlights: [
        "Built enterprise web applications with Django and React.js",
        "Worked on backend architecture and frontend integration",
      ],
    },
  ],

  projects: [
    {
      id: "fraud",
      name: "Fraud Monitoring & Compliance Platform",
      clients:
        "Sterling Bank · Alternative Bank · FSDH Merchant Bank · Bank of Industry · Covenant Microfinance Bank",
      stack: [
        "FastAPI",
        "Python",
        "PostgreSQL",
        "Docker",
        "SeaTunnel ETL",
        "Isolation Forest",
        "Random Forest",
        "Odoo",
        "nginx",
        "Linux",
      ],
      problem:
        "Regulated banks needed a real-time system to detect suspicious transactions, manage investigations, and produce audit-ready regulatory reports—without disrupting core banking operations.",
      built:
        "A microservice architecture: a FastAPI ML service using Isolation Forest and Random Forest models that learns transaction patterns and scores each incoming transaction. Flagged transactions flow into a Python/Odoo case management platform where compliance officers investigate and resolve cases. A SeaTunnel ETL pipeline ingests transaction data from core banking systems into PostgreSQL in real time. Each service runs in its own Docker container.",
      outcome:
        "Deployed across 5+ financial institutions. Processes up to 5 million transactions on peak days. 10+ interdependent custom modules covering monitoring, risk scoring, approvals and regulatory reporting.",
      hasArchDiagram: true,
    },
    {
      id: "loan",
      name: "Loan Origination & Approval System",
      clients: "Covenant Microfinance Bank",
      stack: ["Odoo", "Python ORM", "QWeb", "PostgreSQL", "Docker"],
      problem:
        "Manual loan processing caused bottlenecks, inconsistent credit review, and poor audit trails across disbursement and repayment.",
      built:
        "An end-to-end loan lifecycle system in Odoo: application intake, credit officer review, multi-level approval workflow, disbursement tracking and repayment scheduling. Custom Odoo portal views allow external stakeholders to track application status. QWeb report templates generate audit-ready documentation directly from Odoo.",
      outcome:
        "Full audit logging across every lifecycle stage. Compliance officers generate regulatory-ready reports directly from Odoo.",
      hasArchDiagram: false,
    },
    {
      id: "odoo",
      name: "Custom Odoo Enterprise Modules",
      clients: "Multiple enterprise financial clients",
      stack: ["Odoo 16–19", "Python ORM", "QWeb", "XML-RPC", "JSON-RPC"],
      problem:
        "Enterprise clients needed bespoke ERP workflows that standard Odoo modules couldn't cover, particularly around Nigerian regulatory and operational requirements.",
      built:
        "Bespoke modules extending core Accounting, Purchase, Contacts, Discuss, HR and Approval modules using classical and delegation inheritance. Implemented wizard-based data entry flows, computed fields, scheduled cron actions, configurable rule engines and QWeb report templates.",
      outcome:
        "Deployed across multiple financial institutions in Community and Enterprise editions, Odoo 16 through 19.",
      hasArchDiagram: false,
    },
  ],

  skills: {
    backend: [
      {
        category: "Backend",
        items: [
          "Python",
          "Django",
          "Django REST Framework",
          "FastAPI",
          "Celery",
          "Redis",
          "Node.js",
          "Odoo (Python ORM)",
        ],
      },
      {
        category: "APIs & Integration",
        items: [
          "RESTful API design",
          "JSON-RPC / XML-RPC",
          "Third-party API integration",
          "Microsoft Active Directory",
          "Microservices",
          "ETL pipelines (SeaTunnel)",
        ],
      },
      {
        category: "Security",
        items: [
          "JWT",
          "OAuth 2.0",
          "Session management",
          "Role-based access control",
          "Record-level permissions",
          "Audit trails",
        ],
      },
      {
        category: "Data",
        items: ["PostgreSQL — schema design, optimisation, administration"],
      },
      {
        category: "Machine Learning",
        items: [
          "Isolation Forest",
          "Random Forest",
          "FastAPI ML service",
          "Transaction anomaly detection",
        ],
      },
      {
        category: "Linux & DevOps",
        items: [
          "Linux / Ubuntu",
          "Bash scripting",
          "systemd services",
          "Cron job scheduling",
          "Docker",
          "Multi-container deployments",
          "nginx reverse proxy",
          "CI/CD pipelines",
          "Git / GitHub",
        ],
      },
      {
        category: "Frontend",
        items: ["React.js", "JavaScript"],
      },
    ],
    odoo: [
      {
        category: "Module Development",
        items: [
          "Custom module creation",
          "Classical & delegation inheritance",
          "Computed fields",
          "Onchange methods",
          "Constraints",
          "Wizards",
          "Transient models",
        ],
      },
      {
        category: "Views & UI",
        items: [
          "QWeb templates",
          "XML form / list / kanban / calendar views",
          "Custom dashboards",
          "Client actions",
          "Portal views",
          "Website pages",
        ],
      },
      {
        category: "Business Logic",
        items: [
          "Python ORM",
          "Recordsets",
          "Domain filters",
          "Automated actions",
          "Scheduled actions (cron)",
          "Server actions",
          "Workflow state machines",
        ],
      },
      {
        category: "Integration",
        items: [
          "Odoo REST API",
          "XML-RPC",
          "JSON-RPC",
          "Microsoft Active Directory",
          "FastAPI microservices",
          "SeaTunnel ETL",
        ],
      },
      {
        category: "Modules Worked On",
        items: [
          "Accounting",
          "Invoicing",
          "Purchase",
          "Inventory",
          "CRM",
          "HR",
          "Project",
          "Discuss",
          "Contacts",
          "Approval Workflows",
          "Custom Compliance Modules",
        ],
      },
      {
        category: "Versions",
        items: ["Odoo 16", "Odoo 17", "Odoo 18", "Odoo 19", "Community", "Enterprise"],
      },
    ],
  },
};
