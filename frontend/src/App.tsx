import React, { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { Sun, Moon, Briefcase, Mail, Linkedin, Github, ArrowRight, Code, Server, Database, Menu, X } from 'lucide-react';
import heroImage from './assets/20190827_140626_cropped.jpg';
import projectsBillCalculatorProImage from './assets/projects-bill-calculator-pro-screenshot.png';
// import projectsCulinaryCompassImage from './assets/projects-culinary-compass-screenshot.png';
import projectsGenieWeatherImage from './assets/projects-genie-weather-screenshot.png';
import projectsLinkFolioImage from './assets/projects-link-folio-screenshot.png';
// import projectsContactFormApiImage from './assets/projects-contact-form-api-database-screenshot.png';
import projectsHolidayPlannerAppImage from './assets/projects-holiday-planner-app.png';

// --- TYPE DEFINITIONS ---
// We define the "shape" of our data to help TypeScript catch errors.
type Project = {
    title: string;
    problemSolved?: string[]; // optional field to describe the problem the project solves
    description: string;    
    tags: string[];
    image?: string; // image is optional
    liveUrl: string;
    codeUrl: string;
    imagePosition?: string;
    featured?: boolean; // optional field to indicate if this is a featured project
    featuredImagePosition?: string; // optional field for featured project image positioning
};

type NavLink = {
    href: string;
    label: string;
};

type HeaderProps = {
    darkMode: boolean;
    toggleDarkMode: () => void;
    navLinks: NavLink[];
    mobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
};

type SkillCategoryProps = {
    icon: React.ReactNode;
    title: string;
    skills: string[];
};

// --- DATA ---
const projects = [
    {   // --- Holiday Planner ---
        title: "Holiday Planner - AI-Powered Travel Planning",
        problemSolved: ["API orchestration + progressive loading", "Standardized errors + retry rules (502/503/504)", "IATA resolution (Amadeus + overrides)"],
        description: "A full-stack travel planner that lets users search and compare holiday destinations with AI-generated guides, live flight prices and real weather data. The app calls Gemini for structured trip suggestions, Imagen for destination visuals, and a flights API for “Live prices (beta)” and Google Flights deep links, all wrapped in a brochure-style React UI.",        
        tags: ["React", "Tailwind CSS", "Node.js", "Express", "Google Gemini & Imagen", "Amadeus (test)", "Open-Meteo", "GitHub Pages", "Render"],
        featured: true,
        image: projectsHolidayPlannerAppImage,
        imagePosition: "object-[99%_1%]",
        featuredImagePosition:"",
        liveUrl: "https://claytoncrispim.github.io/holiday-planner-app/",
        codeUrl: "https://github.com/claytoncrispim/holiday-planner-app",
    },
    {   // --- Link Folio ---
        title: "Link Folio",
        description: "A complete, single-user \"link-in-bio\" style application. After registering and logging in, a user can manage a personal list of links on a secure dashboard. This project was built from the ground up to demonstrate a full range of full-stack development skills, from database design and secure API creation to building a dynamic, interactive frontend with React.",
        problemSolved: ["Auth", "CRUD", "Postgres", "Deployed"],
        tags: ["Node.js", "Express", "PostgreSQL", "Prisma", "JWT", "bcrypt", "React", "Vite", "TypeScript", "React Router", "Tailwind CSS"],
        image: projectsLinkFolioImage,
        liveUrl: "https://link-folio-nu.vercel.app/",
        codeUrl: "https://github.com/claytoncrispim/link-folio",
        featured: false,
    },
    {   // --- Genie Weather ---
        title: "Genie Weather",
        problemSolved: ["API-driven UI states", "Geolocation API", "Gemini API integration"],
        description: "A sleek, dynamic weather application that uses generative AI to provide current forecasts, 5-day outlooks, and personalized advice on what to wear and what to do.",        
        tags: ["Node.js", "Express","React", "Vite", "Tailwind CSS", "Gemini API", "Geolocation API"],
        image: projectsGenieWeatherImage,
        liveUrl: "https://claytoncrispim.github.io/genie-weather/",
        codeUrl: "https://github.com/claytoncrispim/genie-weather",
        featured: false,
    },
    {   // --- Contact Form API & Database ---
        title: "Contact Form API & Database",
        problemSolved: ["Secure API", "Data validation", "Postgres integration"],
        description: "A secure and robust backend API designed to handle contact form submissions. This project features a Python-based FastAPI server that performs data validation using Pydantic models. All submissions are securely saved to a PostgreSQL database, demonstrating a complete, professional data pipeline including secure password management and prevention of SQL injection attacks.",
        tags: ["Python", "FastAPI", "PostgreSQL", "SQL", "Psycopg2", "Docker"],
        image: "https://raw.githubusercontent.com/claytoncrispim/python-api-project/refs/heads/main/img/fastapi_docs.png",
        liveUrl: "https://github.com/claytoncrispim/python-api-project",
        codeUrl: "https://github.com/claytoncrispim/python-api-project",
        featured: false,
    },
    // {   // --- Culinary Compass ---
    //     title: "Culinary Compass",
    //     description: "An AI-powered travel guide that generates culinary recommendations, local etiquette tips, and beautiful, AI-created images of signature dishes for any city or country in the world.",
    //     tags: ["React", "Vite", "Tailwind CSS", "Gemini API", "Imagen 3 API"],
    //     image: projectsCulinaryCompassImage,
    //     imagePosition: "object-[74%_26%]",
    //     liveUrl: "https://claytoncrispim.github.io/culinary-compass/",
    //     codeUrl: "https://github.com/claytoncrispim/culinary-compass",
    // },
    
    {   // --- Bill Calculator Pro ---
        title: "Bill Calculator Pro",
        problemSolved: ["Dynamic UI", "Calculations", "localStorage"],
        description: "An intuitive and responsive single-page application designed to help users easily manage, track, and calculate their monthly bills in a visually organized way.",
        tags: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "localStorage"],
        image: projectsBillCalculatorProImage,
        liveUrl: "https://claytoncrispim.github.io/bill-calculator-pro/",
        codeUrl: "https://github.com/claytoncrispim/bill-calculator-pro",
        featured: false,
    },
];

// --- COMPONENTS ---

/**
 * Renders a single project card with an image, title, tags, description, and links.
 * Only used for non-featured projects. Featured projects have their own larger card component.
 */

// Filter projects to only include non-featured ones for this section
const ProjectCard = ({ project }: { project: Project }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
        <img src={project.image} alt={project.title} className={`w-full h-48 object-cover ${project.imagePosition || "object-top"}`} />
        <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag: string) => (
                    <span key={tag} className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">{tag}</span>
                ))}
            </div>
            {project.problemSolved && (
                <>
                    <p>What problem it solved:</p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4">
                        {project.problemSolved.map((problem, index) => (
                            <span key={index}>
                                {/* If the problem is not the last one, add a "+" separator */}
                                {problem} {index < (project.problemSolved?.length ?? 0) - 1 ? "+ " : ""}
                            </span>
                        ))}
                    </ul>
                </>
            )}
            <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
            <div className="flex space-x-4">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Live Demo</a>
                <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">View Code</a>
            </div>
        </div>
    </div>
);

/**
 * The main application component. It manages the overall state (like dark mode) and lays out all the sections of the portfolio.
 */
export default function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(!darkMode);
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    const navLinks: NavLink[] = [
        { href: '#about', label: 'About' },
        { href: '#projects', label: 'Projects' },
        { href: '#skills', label: 'Skills' },
        { href: '#contact', label: 'Contact' },
    ];

    return (
        <div className={`bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300`}>
            <Header 
                darkMode={darkMode} 
                toggleDarkMode={toggleDarkMode} 
                navLinks={navLinks}
                mobileMenuOpen={mobileMenuOpen}
                toggleMobileMenu={toggleMobileMenu}
            />
            <main className="container mx-auto px-6 md:px-12 lg:px-24">
                <HeroSection />
                <AboutSection />
                <FeaturedProjectsSection />
                <ProjectsSection />
                <SkillsSection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
}

/**
 * Renders the sticky header navigation bar, including the logo, navigation links, dark mode toggle, and mobile menu functionality.
 */
const Header = ({ darkMode, toggleDarkMode, navLinks, mobileMenuOpen, toggleMobileMenu }: HeaderProps) => (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 py-4 flex justify-between items-center">
            <a href="#" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Clayton Crispim</a>
            <nav className="hidden md:flex items-center space-x-6">
                {navLinks.map((link: NavLink) => (
                    <a key={link.href} href={link.href} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{link.label}</a>
                ))}
            </nav>
            <div className="flex items-center space-x-4">
                <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                <a href="/Clayton_Crispim_CV.pdf" target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors shadow">
                    Resume <Briefcase className="ml-2 h-4 w-4" />
                </a>
                <button onClick={toggleMobileMenu} className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>
        </div>
        {mobileMenuOpen && (
            <div className="md:hidden bg-white dark:bg-gray-800 py-4 px-6">
                <nav className="flex flex-col space-y-4">
                    {navLinks.map((link: NavLink) => (
                        <a key={link.href} href={link.href} onClick={toggleMobileMenu} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{link.label}</a>
                    ))}
                    <a href="/Clayton_Crispim_CV.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors shadow">
                        Resume <Briefcase className="ml-2 h-4 w-4" />
                    </a>
                </nav>
            </div>
        )}
    </header>
);

/**
 * Renders the main hero section with the profile picture, headline, and call-to-action buttons.
 */
const HeroSection = () => (
    <section id="home" className="py-24 md:py-32 flex flex-col items-center text-center">
        <img src={heroImage} alt="Clayton Crispim" className="rounded-full w-32 h-32 mb-6 border-4 border-white dark:border-gray-800 shadow-lg"/>
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
            Hi, I'm Clayton Crispim. <br />
            <span className="text-indigo-600  md:text-4xl dark:text-indigo-400">A Junior Full-Stack Developer (React, Node/Express).</span>
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
            I build responsive React UIs and practical Node/Express APIs. I focus on clean UX (loading/error/empty states), reliable integrations, and maintainable code.
        </p>
        <p className="max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
            Available for small React + Node fixes: API integrations, endpoints, and UI state improvements.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#projects" className="bg-indigo-600 text-white px-8 py-3 rounded-md font-semibold text-lg hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                View My Work
            </a>
            <a href="#contact" className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-8 py-3 rounded-md font-semibold text-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300">
                Get In Touch <ArrowRight className="inline ml-2" />
            </a>
        </div>
    </section>
);

/**
 * Renders the "About Me" section with a personal summary and a developer illustration.
 */
const AboutSection = () => (
    <section id="about" className="py-20 md:py-28 bg-white dark:bg-gray-800 rounded-xl shadow-lg my-12">
        <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-2/3 space-y-4 text-lg text-gray-700 dark:text-gray-300">
                    <p>I’m a junior full-stack developer based in Dublin, focused on building modern web apps with React and Node/Express. I enjoy improving UX details (loading, error handling, edge cases) and wiring real APIs into reliable features.</p>
                    <p>Recently, I’ve been shipping projects like Holiday Planner (multi-step API flow + retries + standardized errors), Link-Folio (auth + CRUD + PostgreSQL), and Genie Weather (API-driven UI states). I’m looking for junior opportunities and small fixed-scope freelance work where I can ship fast and keep learning.</p>                    
                </div>
                <div className="md:w-1/3 flex justify-center">
                    <img src="/dev-illustration.svg" alt="Developer Illustration" className="rounded-lg shadow-2xl w-full max-w-sm"/>
                </div>
            </div>
        </div>
    </section>
);

/**
 * Renders the "My Work" section, which maps over the projects array and displays a ProjectCard for each one. ONLY NON-FEATURED PROJECTS ARE DISPLAYED HERE. Featured projects have their own section with larger cards.
 */
const ProjectsSection = () => (
    <section id="projects" className="py-20 md:py-28">
         <h2 className="text-3xl font-bold text-center mb-12">My Work</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.filter(project => !project.featured).map((project: Project, index: number) => (
                <ProjectCard key={index} project={project} />
            ))}
        </div>
    </section>
);

/**
 * Renders the "Featured Projects" section, which displays a larger card for each featured project.
 * Featured Projects
 */
 
 // Main Featured Projects section
const FeaturedProjectsSection = () => {
    const featuredProjects = projects.slice(0, 2); // Just an example to take the first 2 projects as featured
    return (
        <section id="featured-projects" className="py-20 md:py-28 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-lg my-12">
            <div className="container mx-auto px-6 md:px-12">
                <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
                <div className="grid place-items-center gap-8">
                    {featuredProjects.filter(project => project.featured).map((project: Project, index: number) => (
                        <FeaturedProjectCard key={index} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}

// Featured Project Card - larger and more detailed than the regular ProjectCard
const FeaturedProjectCard = ({ project }: { project: Project }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 w-full max-w-4xl">
        <img src={project.image} alt={project.title} className={`w-full h-96 object-cover ${project.featuredImagePosition || "object-top"}`} />
        <div className="p-8">
            <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
            <div className="flex flex-wrap gap-3 mb-6">
                {project.tags.map((tag: string) => (
                    <span key={tag} className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 text-sm font-semibold px-3 py-1 rounded-full">{tag}</span>
                ))}
            </div>
            {project.problemSolved && (
                <>
                    <p className="text-lg font-semibold mb-2">What problem it solved:</p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6">
                        {project.problemSolved.map((problem, index) => (
                            <li key={index}>{problem}</li>
                        ))}
                    </ul>
                </>
            )}
            <p className="text-gray-600 dark:text-gray-400 mb-6">{project.description}</p>
            <div className="flex space-x-6">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline text-lg">Live Demo</a>
                <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline text-lg">View Code</a>
            </div>
        </div>
    </div>
);

/**
 * Renders the "Technologies I Use" section, organizing skills into categories like Frontend, Backend, and Databases.
 */
const SkillsSection = () => {
    const skillsData =  [
        { title: "Frontend", icon: <Code className="h-8 w-8 mx-auto mb-2 text-indigo-500"/>, skills: ["JavaScript (ES6+)", "TypeScript", "React", "Next.js", "HTML5", "CSS3", "Tailwind CSS"] },
        { title: "Backend", icon: <Server className="h-8 w-8 mx-auto mb-2 text-indigo-500"/>, skills: ["Node.js", "Express", "Python", "REST APIs"] },
        { title: "Databases", icon: <Database className="h-8 w-8 mx-auto mb-2 text-indigo-500"/>, skills: ["PostgreSQL", "SQL", "MySQL"] },
    ];
    return (
        <section id="skills" className="py-20 md:py-28 bg-white dark:bg-gray-800 rounded-xl shadow-lg my-12">
            <div className="container mx-auto px-6 md:px-12">
                <h2 className="text-3xl font-bold text-center mb-12">Technologies I Use</h2>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    {skillsData.map((category) => (
                        <SkillCategory 
                            key={category.title} 
                            icon={category.icon} 
                            title={category.title} 
                            skills={category.skills} 
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

/**
 * A reusable component to display a single category of skills with an icon, title, and a list of technologies.
 */
const SkillCategory = ({ icon, title, skills }: SkillCategoryProps) => (
    <div className="p-6 rounded-lg">
        {icon}
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <ul className="space-y-2">
            {skills.map((skill: string) => <li key={skill} className="text-gray-600 dark:text-gray-400">{skill}</li>)}
        </ul>
    </div>
);

/**
 * Renders the "Get In Touch" section, including a contact form that sends data to the serverless backend.
 */
const ContactSection = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle');
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('sending');
        setResponseMessage('');
        
        try {
            // --- THIS IS THE FIX ---
            // We add the trailing slash to match what Vercel expects.
            const apiUrl = `/api/contact`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                setStatus('success');
                setResponseMessage(data.message);
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
                setResponseMessage(data.message || 'An error occurred.');
            }
        } catch (error) {
            setStatus('error');
            setResponseMessage('Something went wrong. Please try again.');
        }
    };
    return (
        <section id="contact" className="py-20 md:py-28">
            <div className="text-center">
                <h2 className="text-3xl font-bold">Get In Touch</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-xl mx-auto">Have a question or want to work together? Leave your details and I'll get back to you.</p>
            </div>
            <div className="mt-12 max-w-xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                        <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                        <textarea name="message" id="message" rows={4} required value={formData.message} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                    </div>
                    <div>
                        <button type="submit" disabled={status === 'sending'} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
                            {status === 'sending' ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                </form>
                {status === 'success' && <p className="mt-4 text-center text-green-600">{responseMessage}</p>}
                {status === 'error' && <p className="mt-4 text-center text-red-600">{responseMessage}</p>}
            </div>
        </section>
    );
};

/**
 * Renders the footer with social media links and copyright information.
 */
const Footer = () => (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-6 md:px-12 text-center text-gray-600 dark:text-gray-400">
            <div className="flex justify-center space-x-6 mb-4">
                <a href="https://github.com/claytoncrispim" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400"><Github /></a>
                <a href="https://www.linkedin.com/in/claytoncrispim/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400"><Linkedin /></a>
                <a href="mailto:claytonrpcrispim@outlook.com" className="hover:text-indigo-600 dark:hover:text-indigo-400"><Mail /></a>
            </div>
            <p>&copy; {new Date().getFullYear()} Clayton Crispim. All Rights Reserved.</p>
        </div>
    </footer>
);