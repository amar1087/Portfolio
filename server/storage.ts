import { type User, type InsertUser, type PortfolioData, type InsertPortfolioData, type ContactInfo, type InsertContactInfo } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getPortfolioData(): Promise<PortfolioData[]>;
  getPortfolioDataByType(type: string): Promise<PortfolioData[]>;
  createPortfolioData(data: InsertPortfolioData): Promise<PortfolioData>;
  getContactInfo(): Promise<ContactInfo | undefined>;
  createContactInfo(info: InsertContactInfo): Promise<ContactInfo>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private portfolioData: Map<string, PortfolioData>;
  private contactInfo: ContactInfo | undefined;

  constructor() {
    this.users = new Map();
    this.portfolioData = new Map();
    this.initializePortfolioData();
    this.initializeContactInfo();
  }

  private initializeContactInfo() {
    this.contactInfo = {
      id: randomUUID(),
      name: "Amarjeet Kaur",
      title: "Senior Full Stack Developer & Cloud Architect",
      email: "amar1087@gmail.com",
      location: "Delhi, India",
      linkedin: "https://www.linkedin.com/in/amarjeet-kaur-1087",
      website: "https://amarjeetkaur.com",
      bio: "AI Solutions Consultant and Full Stack Developer with 15+ years of expertise in designing intelligent automation systems and scalable web applications. I specialize in AI agent development using CrewAI, LangGraph, and AutoGen, combined with full-stack technologies like Angular, React, Node.js, and AWS cloud services. My experience spans from traditional enterprise solutions to cutting-edge AI implementations, mobile development, and cloud architecture. I excel at bridging the gap between AI capabilities and practical business solutions, delivering systems that enhance productivity and drive innovation."
    };
  }

  private initializePortfolioData() {
    const data: Omit<PortfolioData, 'id'>[] = [
      // Skills
      { type: 'skill', title: 'Angular', category: 'primary', priority: 1, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'React', category: 'primary', priority: 2, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'Node.js', category: 'primary', priority: 3, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'TypeScript', category: 'primary', priority: 4, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'JavaScript', category: 'primary', priority: 5, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'HTML & CSS', category: 'primary', priority: 6, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'PostgreSQL', category: 'primary', priority: 7, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'MongoDB', category: 'primary', priority: 8, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'React Native', category: 'primary', priority: 9, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'Ionic', category: 'primary', priority: 10, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'Python', category: 'primary', priority: 11, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'Java', category: 'primary', priority: 12, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },

      // Cloud & AWS Skills
      { type: 'skill', title: 'AWS', category: 'cloud', priority: 1, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'AWS Lambda', category: 'cloud', priority: 2, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'EC2', category: 'cloud', priority: 3, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'S3', category: 'cloud', priority: 4, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'API Gateway', category: 'cloud', priority: 5, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'DynamoDB', category: 'cloud', priority: 6, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'Jenkins', category: 'cloud', priority: 7, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'CI/CD', category: 'cloud', priority: 8, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },

      // AI & Machine Learning Skills
      { type: 'skill', title: 'CrewAI', category: 'ai', priority: 1, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'LangGraph', category: 'ai', priority: 2, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'AutoGen', category: 'ai', priority: 3, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'OpenAI SDK', category: 'ai', priority: 4, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'Hugging Face', category: 'ai', priority: 5, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'AI Agents', category: 'ai', priority: 6, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },

      // Development Tools & Frameworks
      { type: 'skill', title: 'Jest', category: 'tools', priority: 1, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'Cypress', category: 'tools', priority: 2, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'NgRx', category: 'tools', priority: 3, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'RxJS', category: 'tools', priority: 4, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'Cordova', category: 'tools', priority: 5, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },
      { type: 'skill', title: 'ECharts', category: 'tools', priority: 6, description: null, company: null, location: null, startDate: null, endDate: null, technologies: null, achievements: null },

      // Experience
      {
        type: 'experience',
        title: 'AI Solutions Consultant & Developer',
        company: 'Self-Employed',
        location: 'Remote, Delhi',
        startDate: '2025-03',
        endDate: 'Current',
        description: null,
        category: null,
        priority: 1,
        technologies: ['CrewAI', 'LangGraph', 'Node.js', 'AWS', 'React'],
        achievements: [
          'Collaborated with clients to design and implement custom AI agents using CrewAI and LangGraph to automate business processes and data analysis',
          'Developed and integrated scalable backend services with Node.js and AWS to support AI agent functionality',
          'Built responsive front-end interfaces with React to visualize agent outputs and provide user control panels',
          'Managed project lifecycle using Agile methodologies, from client requirement gathering to deployment on AWS infrastructure'
        ]
      },
      {
        type: 'experience',
        title: 'Senior Full Stack Developer',
        company: 'Forwood Enterprises India Pvt Ltd',
        location: 'Hyderabad',
        startDate: '2023-01',
        endDate: '2024-10',
        description: null,
        category: null,
        priority: 2,
        technologies: ['Angular', 'Node.js', 'AWS', 'Lambda', 'EC2', 'S3', 'API Gateway', 'DynamoDB', 'ECharts'],
        achievements: [
          'Developed multi-language support, dashboard reports, and custom libraries using Angular, Node.js, AWS (Lambda, EC2, S3, API Gateway, DynamoDB), and Micro Frontend architecture',
          'Led frontend performance optimization initiatives, reducing load time by 30% through lazy loading, caching, and bundle optimizations',
          'Enabled 40% faster feature rollout and supported expansion into 5+ new international markets',
          'Designed and implemented complete reporting feature using ECharts, Angular, and AWS services ensuring real-time analytics',
          'Mentored and led a team of developers, promoting best practices in Agile/Scrum methodologies'
        ]
      },
      {
        type: 'experience',
        title: 'Mobile Application Developer',
        company: 'IBM India Pvt Ltd',
        location: 'Noida',
        startDate: '2012-07',
        endDate: '2022-12',
        description: null,
        category: null,
        priority: 3,
        technologies: ['Angular', 'Ionic UI', 'React Native', 'Cordova', 'TensorFlow API', 'Google DialogFlow API'],
        achievements: [
          'Developed hybrid mobile applications using Angular, Ionic UI, React Native, and Cordova',
          'Created mobile applications for major clients including Food Lion Mobile App and Hannaford Mobile App',
          'Designed and developed barcode scanning, chatbot functionality (Google DialogFlow API), and object detection tools (TensorFlow API)',
          'Led development of modules for Lodha Smarter City and Surat Municipal Corporation projects',
          'Implemented best practices for frontend performance, reducing application latency and enhancing UX'
        ]
      },
      {
        type: 'experience',
        title: 'Software Developer',
        company: 'Sify Software Ltd',
        location: 'Delhi',
        startDate: '2011-01',
        endDate: '2012-06',
        description: null,
        category: null,
        priority: 4,
        technologies: ['Java', 'PostgreSQL'],
        achievements: [
          'Developed core modules for the Electronic Product Distribution System (EPDS) using Java and PostgreSQL',
          'Participated in all stages of the software development lifecycle, delivering updates and enhancements aligned with client goals',
          'Saved time and resources by identifying and fixing bugs before product deployment'
        ]
      },

      // Projects
      {
        type: 'project',
        title: 'Apps Platform - Enterprise Solution',
        description: 'Designed and developed a comprehensive Apps Platform for Forwood Safety, featuring multi-tenant architecture, advanced analytics, and real-time data processing capabilities.',
        category: null,
        priority: 1,
        company: 'Forwood Enterprises India Pvt Ltd',
        location: null,
        startDate: '2023',
        endDate: '2024',
        technologies: ['Angular', 'Node.js', 'AWS', 'Micro Frontends', 'ECharts'],
        achievements: null
      },
      {
        type: 'project',
        title: 'Multi-language Dashboard Systems',
        description: 'Developed comprehensive dashboard systems with multi-language support enabling 40% faster feature rollout and expansion into 5+ international markets.',
        category: null,
        priority: 2,
        company: null,
        location: null,
        startDate: null,
        endDate: null,
        technologies: ['Angular', 'AWS', 'Micro Frontends'],
        achievements: null
      },
      {
        type: 'project',
        title: 'Real-time Analytics Platform',
        description: 'Designed and implemented comprehensive reporting system using ECharts, AWS Lambda, OpenSearch, and CloudFront for real-time data visualization.',
        category: null,
        priority: 3,
        company: null,
        location: null,
        startDate: null,
        endDate: null,
        technologies: ['ECharts', 'AWS Lambda', 'OpenSearch'],
        achievements: null
      },
      {
        type: 'project',
        title: 'Enterprise Mobile Applications',
        description: 'Created mobile applications for Food Lion and Hannaford, featuring barcode scanning, chatbot functionality, and object detection capabilities.',
        category: null,
        priority: 4,
        company: null,
        location: null,
        startDate: null,
        endDate: null,
        technologies: ['React Native', 'TensorFlow', 'DialogFlow'],
        achievements: null
      },
      {
        type: 'project',
        title: 'Performance Optimization',
        description: 'Led frontend performance initiatives achieving 30% load time reduction through lazy loading, caching strategies, and bundle optimizations.',
        category: null,
        priority: 5,
        company: null,
        location: null,
        startDate: null,
        endDate: null,
        technologies: ['Lazy Loading', 'Caching', 'Bundle Optimization'],
        achievements: null
      },
      {
        type: 'project',
        title: 'Smart City Solutions',
        description: 'Developed modules for Lodha Smarter City and Surat Municipal Corporation projects, ensuring optimal performance across web and mobile platforms.',
        category: null,
        priority: 6,
        company: null,
        location: null,
        startDate: null,
        endDate: null,
        technologies: ['Ionic', 'Cordova', 'Cross-platform'],
        achievements: null
      },
      {
        type: 'project',
        title: 'EPDS System',
        description: 'Developed core modules for Electronic Product Distribution System using Java and PostgreSQL, participating in complete SDLC from concept to deployment.',
        category: null,
        priority: 7,
        company: null,
        location: null,
        startDate: null,
        endDate: null,
        technologies: ['Java', 'PostgreSQL', 'Enterprise'],
        achievements: null
      },

      // Certifications
      {
        type: 'certification',
        title: 'AWS Certified Solution Architect - Associate',
        description: null,
        company: 'Amazon Web Services',
        location: null,
        startDate: null,
        endDate: '2025-04',
        category: null,
        priority: 1,
        technologies: null,
        achievements: null
      },
      {
        type: 'certification',
        title: 'AWS Certified Developer - Associate',
        description: null,
        company: 'Amazon Web Services',
        location: null,
        startDate: null,
        endDate: null,
        category: null,
        priority: 2,
        technologies: null,
        achievements: null
      },
      {
        type: 'certification',
        title: 'AWS Certified Cloud Practitioner',
        description: null,
        company: 'Amazon Web Services',
        location: null,
        startDate: null,
        endDate: null,
        category: null,
        priority: 3,
        technologies: null,
        achievements: null
      }
    ];

    data.forEach(item => {
      const id = randomUUID();
      this.portfolioData.set(id, { id, ...item });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getPortfolioData(): Promise<PortfolioData[]> {
    return Array.from(this.portfolioData.values()).sort((a, b) => a.priority - b.priority);
  }

  async getPortfolioDataByType(type: string): Promise<PortfolioData[]> {
    return Array.from(this.portfolioData.values())
      .filter(item => item.type === type)
      .sort((a, b) => a.priority - b.priority);
  }

  async createPortfolioData(insertData: InsertPortfolioData): Promise<PortfolioData> {
    const id = randomUUID();
    const data: PortfolioData = { ...insertData, id };
    this.portfolioData.set(id, data);
    return data;
  }

  async getContactInfo(): Promise<ContactInfo | undefined> {
    return this.contactInfo;
  }

  async createContactInfo(insertInfo: InsertContactInfo): Promise<ContactInfo> {
    const id = randomUUID();
    const info: ContactInfo = { ...insertInfo, id };
    this.contactInfo = info;
    return info;
  }
}

export const storage = new MemStorage();
