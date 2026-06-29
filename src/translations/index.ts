export type Lang = "en" | "es";

const translations = {
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      roles: [
        "Software Developer",
        "Cloud & DevOps Engineer",
        "Full Stack Developer",
      ],
      viewWork: "View My Work",
      getInTouch: "Get in Touch",
    },
    about: {
      badge: "About Me",
      lead: "Engineer passionate about building scalable software systems, cloud infrastructure, and DevOps automation.",
      bio: [
        `I'm an engineer pursuing concurrent degrees in Software Systems Engineering and Telematics Engineering at Universidad Icesi in Cali, Colombia, specializing in software development and cloud infrastructure.`,
        `I design and build production-ready, scalable, and maintainable systems, from APIs and microservices to cloud-native deployments. I've contributed to projects across sectors such as healthcare, e-commerce, and human-talent management, always focused on solving real problems, not just making something work in a demo.`,
        `I learn fast and adapt easily to new technologies and work contexts, which has allowed me to contribute to teams with very different needs without losing sight of what matters: clean architectures, CI/CD pipelines you can rely on, and code written so anyone on the team can understand and maintain it, not just whoever wrote it.`,
      ],
      education: {
        title: "Education",
        desc: "Concurrent degrees in Software Systems Engineering and Telematics Engineering at Universidad Icesi, Cali. Specializing in software development with a clear path toward DevOps and Cloud Engineering.",
      },
      technicalFocus: {
        title: "Technical Focus",
        items: [
          {
            title: "Software Development",
            desc: "Spring Boot, NestJS, Next.js: REST APIs and microservices with Java, Python, TypeScript, and JavaScript. Strong in data modeling with MySQL, PostgreSQL, and MongoDB.",
          },
          {
            title: "Cloud & DevOps",
            desc: "Infrastructure as Code with Terraform, CI/CD with Jenkins and GitHub Actions, configuration management with Ansible. AWS and Azure.",
          },
          {
            title: "Engineering Practices",
            desc: "Git workflows, Agile methodologies (SCRUM, Kanban), Docker containerization, and clean architecture principles.",
          },
        ],
      },
    },
    skills: {
      badge: "Technical Skills",
      title: "My tech stack",
      subtitle:
        "Technologies, tools, and professional skills across backend, frontend, cloud, and engineering",
      tabs: {
        languages: { name: "Languages", label: "Lang" },
        backend: { name: "Backend", label: "Core" },
        frontend: { name: "Frontend", label: "UI" },
        devops: { name: "Cloud & DevOps", label: "Infra" },
        skills: { name: "Skills", label: "Pro" },
      },
      softSkills: [
        "Requirements Analysis",
        "Web Development",
        "Database Management",
        "Agile Methodologies",
        "API Design",
        "Team Collaboration",
        "Software Architecture",
        "CI/CD Pipelines",
        "Clean Code",
        "Version Control",
      ],
    },
    projects: {
      badge: "Portfolio",
      title: "Featured projects",
      subtitle:
        "A showcase of my work in software development and cloud infrastructure",
      seeMore: "See more",
      seeLess: "See less",
      viewDetails: "View details",
      keyHighlights: "Key highlights",
      techStack: "Tech stack",
      viewCode: "View code",
      liveDemo: "Live demo",
      close: "Close",
      inProgress: "In Progress",
      inDevelopment: "In Development",
      cta: {
        title: "Want to see more?",
        subtitle:
          "Check out my GitHub for additional projects and contributions",
        button: "View All on GitHub",
      },
      items: {
        "1": {
          title: "Medical Management Platform — Oncologic",
          shortTitle: "Oncologic Platform",
          description:
            "Full-stack platform to optimize administrative and operational management for Oncologic Clinic in Cali. REST API with JWT auth and role-based access on the backend; React SPA with role-specific dashboards for admins, doctors, and patients on the frontend.",
          highlights: [
            "JWT authentication with role-based access control for admins, doctors, and patients",
            "React SPA with dedicated, role-specific dashboards and Redux state management",
            "Spring Boot REST API backed by PostgreSQL, fully containerized with Docker",
            "Built for a real oncology clinic to streamline day-to-day operations",
          ],
        },
        "2": {
          title: "Usolo — Mobile Object Rental App",
          shortTitle: "Usolo App",
          description:
            "Mobile application that enables peer-to-peer object rental with time and price flexibility. Includes Directus CMS for content management and Docker-based deployment pipeline.",
          highlights: [
            "Native Android app built in Kotlin for peer-to-peer object rental",
            "Flexible rental logic based on custom time windows and pricing",
            "Directus headless CMS for managing catalog content",
            "Docker-based deployment pipeline with a PostgreSQL database",
          ],
        },
        "3": {
          title: "TicketHub — AWS Cloud Infrastructure",
          shortTitle: "TicketHub",
          description:
            "Production-ready AWS infrastructure for an event ticketing platform, built entirely with CloudFormation. Multi-AZ VPC with ALB and Auto Scaling Groups, RDS PostgreSQL with automated backups, and EC2-hosted Next.js/NestJS services under PM2. Includes CloudWatch alarms and dashboards, SNS alert routing, and CloudTrail audit logging.",
          highlights: [
            "Entire AWS stack defined as code with CloudFormation, reproducible end to end",
            "Multi-AZ VPC with Application Load Balancer and Auto Scaling Groups for high availability",
            "RDS PostgreSQL with automated backups; Next.js/NestJS services on EC2 under PM2",
            "Observability with CloudWatch dashboards, SNS alerting, and CloudTrail auditing",
          ],
        },
        "4": {
          title: "Polyglot Microservices — Azure DevOps Pipeline",
          shortTitle: "Microservices Pipeline",
          description:
            "Fully automated DevOps pipeline for deploying polyglot microservices on Azure. Five services in Go, Java, Node.js, Python, and Vue.js with zero-touch deployment via GitHub Actions. Infrastructure as Code with Terraform and Ansible, Cache-Aside with Redis, Circuit Breaker for resilience, and distributed tracing with Zipkin.",
          highlights: [
            "Five polyglot services in Go, Java, Node.js, Python, and Vue.js",
            "Zero-touch deployments orchestrated through GitHub Actions",
            "Infrastructure as Code with Terraform and configuration management with Ansible",
            "Resilience patterns: Redis cache-aside, circuit breaker, and Zipkin distributed tracing",
          ],
        },
      } as Record<
        string,
        { title: string; shortTitle: string; description: string; highlights: string[] }
      >,
    },
    contact: {
      badge: "Contact",
      title: "Let's work together",
      subtitle:
        "Open to DevOps, Cloud Engineering, and Software Development opportunities. Let's build something great together.",
      getInTouch: "Get in touch",
      location: "Location",
      form: {
        name: "Your Name",
        email: "Email Address",
        message: "Message",
        namePlaceholder: "Jane Smith",
        emailPlaceholder: "jane@company.com",
        messagePlaceholder: "Tell me about the opportunity or project...",
        send: "Send Message",
        sending: "Sending...",
        sent: "Message Sent!",
        error: "Error — Try Again",
        successNote: "Thanks! I'll get back to you within 24 hours.",
      },
    },
  },
  es: {
    nav: {
      about: "Sobre mí",
      skills: "Habilidades",
      projects: "Proyectos",
      contact: "Contacto",
    },
    hero: {
      roles: [
        "Desarrollador de Software",
        "Ingeniero Cloud & DevOps",
        "Desarrollador Full Stack",
      ],
      viewWork: "Ver mi trabajo",
      getInTouch: "Contáctame",
    },
    about: {
      badge: "Sobre mí",
      lead: "Ingeniero apasionado por construir sistemas de software escalables, infraestructura en la nube y automatización DevOps.",
      bio: [
        `Soy Ingeniero con simultaneidad de carreras en Ingeniería de Sistemas e Ingeniería Telemática en la Universidad Icesi, Cali, Colombia, con especialización en desarrollo de software e infraestructura en la nube.`,
        `Diseño y construyo sistemas listos para producción, escalables y mantenibles, desde APIs y microservicios hasta despliegues cloud-native. He participado en proyectos en sectores como salud, comercio electrónico y gestión de talento humano, siempre con foco en resolver problemas concretos, no solo en hacer que algo funcione en una demo.`,
        `Aprendo rápido y me adapto con facilidad a nuevas tecnologías y contextos de trabajo, lo que me ha permitido aportar en equipos con necesidades distintas sin perder de vista lo esencial: arquitecturas limpias, pipelines de CI/CD en los que se puede confiar, y código pensado para que cualquiera del equipo lo entienda y lo mantenga, no solo quien lo escribió.`,
      ],
      education: {
        title: "Educación",
        desc: "Simultaneidad de carreras en Ingeniería de Sistemas e Ingeniería Telemática en la Universidad Icesi, Cali. Con especialización en desarrollo de software y una trayectoria clara hacia DevOps e Ingeniería Cloud.",
      },
      technicalFocus: {
        title: "Enfoque Técnico",
        items: [
          {
            title: "Desarrollo de Software",
            desc: "Spring Boot, NestJS, Next.js: APIs REST y microservicios con Java, Python, TypeScript y JavaScript. Sólido manejo de modelos de datos con MySQL, PostgreSQL y MongoDB.",
          },
          {
            title: "Cloud & DevOps",
            desc: "Infraestructura como código con Terraform, CI/CD con Jenkins y GitHub Actions, gestión de configuración con Ansible. AWS y Azure.",
          },
          {
            title: "Prácticas de Ingeniería",
            desc: "Flujos de Git, metodologías ágiles (SCRUM, Kanban), contenerización con Docker y principios de arquitectura limpia.",
          },
        ],
      },
    },
    skills: {
      badge: "Habilidades Técnicas",
      title: "Mi stack tecnológico",
      subtitle:
        "Tecnologías, herramientas y habilidades profesionales en backend, frontend, cloud e ingeniería",
      tabs: {
        languages: { name: "Lenguajes", label: "Lang" },
        backend: { name: "Backend", label: "Core" },
        frontend: { name: "Frontend", label: "UI" },
        devops: { name: "Cloud & DevOps", label: "Infra" },
        skills: { name: "Habilidades", label: "Pro" },
      },
      softSkills: [
        "Análisis de Requerimientos",
        "Desarrollo Web",
        "Gestión de Bases de Datos",
        "Metodologías Ágiles",
        "Diseño de APIs",
        "Trabajo en Equipo",
        "Arquitectura de Software",
        "Pipelines CI/CD",
        "Código Limpio",
        "Control de Versiones",
      ],
    },
    projects: {
      badge: "Portafolio",
      title: "Proyectos destacados",
      subtitle:
        "Una muestra de mi trabajo en desarrollo de software e infraestructura cloud",
      seeMore: "Ver más",
      seeLess: "Ver menos",
      viewDetails: "Ver detalles",
      keyHighlights: "Aspectos destacados",
      techStack: "Tecnologías",
      viewCode: "Ver código",
      liveDemo: "Demo en vivo",
      close: "Cerrar",
      inProgress: "En progreso",
      inDevelopment: "En desarrollo",
      cta: {
        title: "¿Quieres ver más?",
        subtitle:
          "Revisa mi GitHub para proyectos y contribuciones adicionales",
        button: "Ver todo en GitHub",
      },
      items: {
        "1": {
          title: "Plataforma de Gestión Médica — Oncológica",
          shortTitle: "Plataforma Oncológica",
          description:
            "Plataforma full-stack para optimizar la gestión administrativa y operativa de la Clínica Oncológica de Cali. API REST con autenticación JWT y control de acceso basado en roles en el backend; SPA en React con paneles específicos por rol para administradores, médicos y pacientes en el frontend.",
          highlights: [
            "Autenticación JWT con control de acceso por roles para administradores, médicos y pacientes",
            "SPA en React con paneles dedicados por rol y gestión de estado con Redux",
            "API REST en Spring Boot sobre PostgreSQL, totalmente contenerizada con Docker",
            "Construida para una clínica oncológica real para agilizar su operación diaria",
          ],
        },
        "2": {
          title: "Usolo — App Móvil de Alquiler de Objetos",
          shortTitle: "App Usolo",
          description:
            "Aplicación móvil que permite el alquiler peer-to-peer de objetos con flexibilidad de tiempo y precio. Incluye Directus CMS para la gestión de contenido y un pipeline de despliegue basado en Docker.",
          highlights: [
            "App Android nativa construida en Kotlin para alquiler de objetos entre personas",
            "Lógica de alquiler flexible basada en ventanas de tiempo y precios personalizados",
            "Directus como CMS headless para gestionar el contenido del catálogo",
            "Pipeline de despliegue basado en Docker con base de datos PostgreSQL",
          ],
        },
        "3": {
          title: "TicketHub — Infraestructura AWS",
          shortTitle: "TicketHub",
          description:
            "Infraestructura AWS lista para producción para una plataforma de venta de entradas de eventos, construida íntegramente con CloudFormation. VPC multi-AZ con ALB y Auto Scaling Groups, RDS PostgreSQL con copias de seguridad automáticas, y servicios Next.js/NestJS en EC2 bajo PM2. Incluye alarmas y dashboards de CloudWatch, enrutamiento de alertas por SNS y registro de auditoría con CloudTrail.",
          highlights: [
            "Toda la infraestructura AWS definida como código con CloudFormation, reproducible de extremo a extremo",
            "VPC multi-AZ con Application Load Balancer y Auto Scaling Groups para alta disponibilidad",
            "RDS PostgreSQL con copias de seguridad automáticas; servicios Next.js/NestJS en EC2 bajo PM2",
            "Observabilidad con dashboards de CloudWatch, alertas por SNS y auditoría con CloudTrail",
          ],
        },
        "4": {
          title: "Microservicios Políglotas — Pipeline Azure DevOps",
          shortTitle: "Pipeline de Microservicios",
          description:
            "Pipeline DevOps completamente automatizado para desplegar microservicios políglotas en Azure. Cinco servicios en Go, Java, Node.js, Python y Vue.js con despliegue sin intervención manual mediante GitHub Actions. Infraestructura como código con Terraform y Ansible, Cache-Aside con Redis, Circuit Breaker para resiliencia y trazado distribuido con Zipkin.",
          highlights: [
            "Cinco servicios políglotas en Go, Java, Node.js, Python y Vue.js",
            "Despliegues sin intervención manual orquestados con GitHub Actions",
            "Infraestructura como código con Terraform y gestión de configuración con Ansible",
            "Patrones de resiliencia: cache-aside con Redis, circuit breaker y trazado distribuido con Zipkin",
          ],
        },
      } as Record<
        string,
        { title: string; shortTitle: string; description: string; highlights: string[] }
      >,
    },
    contact: {
      badge: "Contacto",
      title: "Trabajemos juntos",
      subtitle:
        "Abierto a oportunidades en DevOps, Ingeniería Cloud y Desarrollo de Software. Construyamos algo genial juntos.",
      getInTouch: "Contáctame",
      location: "Ubicación",
      form: {
        name: "Tu nombre",
        email: "Correo electrónico",
        message: "Mensaje",
        namePlaceholder: "Juan García",
        emailPlaceholder: "juan@empresa.com",
        messagePlaceholder: "Cuéntame sobre la oportunidad o proyecto...",
        send: "Enviar mensaje",
        sending: "Enviando...",
        sent: "¡Mensaje enviado!",
        error: "Error — Intenta de nuevo",
        successNote: "¡Gracias! Te responderé en menos de 24 horas.",
      },
    },
  },
};

export type Translations = typeof translations.en;
export default translations;
