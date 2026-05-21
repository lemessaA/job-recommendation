JOBS = [
    {
        "title": "Software Engineer",
        "company_type": "Tech Startup",
        "required_skills": ["python", "javascript", "git", "sql", "rest apis"],
        "description": "Build and maintain web applications and APIs.",
        "salary_base": 95000,
        "salary_range": (75000, 130000),
    },
    {
        "title": "Data Analyst",
        "company_type": "Enterprise",
        "required_skills": ["sql", "excel", "python", "data visualization", "statistics"],
        "description": "Analyze datasets and produce insights for business decisions.",
        "salary_base": 72000,
        "salary_range": (58000, 95000),
    },
    {
        "title": "Machine Learning Engineer",
        "company_type": "AI Lab",
        "required_skills": ["python", "machine learning", "tensorflow", "pytorch", "statistics", "sql"],
        "description": "Design, train, and deploy ML models in production.",
        "salary_base": 125000,
        "salary_range": (100000, 165000),
    },
    {
        "title": "Product Manager",
        "company_type": "SaaS",
        "required_skills": ["agile", "roadmapping", "user research", "communication", "analytics"],
        "description": "Define product vision and coordinate cross-functional delivery.",
        "salary_base": 110000,
        "salary_range": (85000, 150000),
    },
    {
        "title": "UX Designer",
        "company_type": "Design Agency",
        "required_skills": ["figma", "user research", "wireframing", "prototyping", "accessibility"],
        "description": "Create user-centered interfaces and design systems.",
        "salary_base": 88000,
        "salary_range": (65000, 115000),
    },
    {
        "title": "DevOps Engineer",
        "company_type": "Cloud Provider",
        "required_skills": ["docker", "kubernetes", "ci/cd", "aws", "linux", "terraform"],
        "description": "Automate infrastructure and improve deployment pipelines.",
        "salary_base": 115000,
        "salary_range": (90000, 155000),
    },
    {
        "title": "Cybersecurity Analyst",
        "company_type": "Financial Services",
        "required_skills": ["network security", "siem", "incident response", "risk assessment", "compliance"],
        "description": "Monitor threats and strengthen organizational security posture.",
        "salary_base": 98000,
        "salary_range": (75000, 130000),
    },
    {
        "title": "Full Stack Developer",
        "company_type": "E-commerce",
        "required_skills": ["react", "node.js", "typescript", "sql", "rest apis", "git"],
        "description": "Develop end-to-end features across frontend and backend.",
        "salary_base": 102000,
        "salary_range": (80000, 140000),
    },
]

CAREER_PATHS = {
    "software engineer": [
        {"title": "Junior Developer", "level": "Entry", "timeline_years": "0-2", "required_skills": ["git", "one language", "basic sql"]},
        {"title": "Software Engineer", "level": "Mid", "timeline_years": "2-5", "required_skills": ["system design basics", "testing", "api development"]},
        {"title": "Senior Engineer", "level": "Senior", "timeline_years": "5-8", "required_skills": ["architecture", "mentoring", "performance optimization"]},
        {"title": "Staff / Principal Engineer", "level": "Staff", "timeline_years": "8+", "required_skills": ["technical strategy", "cross-team leadership"]},
    ],
    "data analyst": [
        {"title": "Junior Analyst", "level": "Entry", "timeline_years": "0-2", "required_skills": ["excel", "sql basics", "reporting"]},
        {"title": "Data Analyst", "level": "Mid", "timeline_years": "2-5", "required_skills": ["python", "visualization", "statistics"]},
        {"title": "Senior Analyst", "level": "Senior", "timeline_years": "5+", "required_skills": ["advanced analytics", "stakeholder management"]},
        {"title": "Analytics Manager", "level": "Lead", "timeline_years": "7+", "required_skills": ["team leadership", "data strategy"]},
    ],
    "machine learning engineer": [
        {"title": "ML Intern / Junior", "level": "Entry", "timeline_years": "0-2", "required_skills": ["python", "ml fundamentals", "notebooks"]},
        {"title": "ML Engineer", "level": "Mid", "timeline_years": "2-5", "required_skills": ["model deployment", "feature engineering", "mlops basics"]},
        {"title": "Senior ML Engineer", "level": "Senior", "timeline_years": "5+", "required_skills": ["production ml systems", "research application"]},
    ],
}

COURSES = [
    {"title": "Python for Everybody", "provider": "Coursera", "skill": "python", "url": "https://www.coursera.org/specializations/python", "duration": "8 weeks"},
    {"title": "SQL for Data Science", "provider": "Coursera", "skill": "sql", "url": "https://www.coursera.org/learn/sql-for-data-science", "duration": "4 weeks"},
    {"title": "Machine Learning Specialization", "provider": "Coursera", "skill": "machine learning", "url": "https://www.coursera.org/specializations/machine-learning-introduction", "duration": "12 weeks"},
    {"title": "React - The Complete Guide", "provider": "Udemy", "skill": "react", "url": "https://www.udemy.com/course/react-the-complete-guide-incl-redux/", "duration": "10 weeks"},
    {"title": "AWS Certified Solutions Architect", "provider": "A Cloud Guru", "skill": "aws", "url": "https://acloudguru.com/course/aws-certified-solutions-architect-associate-saa-c03", "duration": "6 weeks"},
    {"title": "Kubernetes Fundamentals", "provider": "Linux Foundation", "skill": "kubernetes", "url": "https://training.linuxfoundation.org/training/introduction-to-kubernetes/", "duration": "4 weeks"},
    {"title": "Figma UI Design Essentials", "provider": "Udemy", "skill": "figma", "url": "https://www.udemy.com/course/figma-ui-ux-design-essentials/", "duration": "6 weeks"},
    {"title": "Agile Product Management", "provider": "LinkedIn Learning", "skill": "agile", "url": "https://www.linkedin.com/learning/agile-product-management", "duration": "3 weeks"},
    {"title": "Docker Mastery", "provider": "Udemy", "skill": "docker", "url": "https://www.udemy.com/course/docker-mastery/", "duration": "5 weeks"},
    {"title": "TypeScript Fundamentals", "provider": "Frontend Masters", "skill": "typescript", "url": "https://frontendmasters.com/courses/typescript-v2/", "duration": "2 weeks"},
]
