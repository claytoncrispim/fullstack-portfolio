import React, { useState, useEffect } from 'react';
import { Sun, Moon, Briefcase, Mail, Linkedin, Github, ArrowRight, Code, Server, Database, Menu, X } from 'lucide-react';

// We are defining data separately for projects
    const projects = [
        {
            title: "Bill Calculator Pro",
            description: "An intuitive and responsive single-page application designed to help users easily manage, track, and calculate their monthly bills in a visually organized way.",
            tags: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "ES6+", "localStorage"],
            image: "/projects-bill-calculator-pro-screenshot.png",
            liveUrl: "https://claytoncrispim.github.io/bill-calculator-pro/",
            codeUrl: "https://github.com/claytoncrispim/bill-calculator-pro.git",
        },
        {
            title: "Project Two",
            description: "A short description of your project. What problem does it solve and what was your role?",
            tags: ["TypeScript", "Next.js", "MongoDB"],
            image: "https://placehold.co/600x400/A5B4FC/1F2937?text=Project+Two",
            liveUrl: "#",
            codeUrl: "#",
        },
        {
            title: "Project Three",
            description: "A short description of your project. What problem does it solve and what was your role?",
            tags: ["Python", "Flask", "PostgreSQL"],
            image: "https://placehold.co/600x400/FBCFE8/1F2937?text=Project+Three",
            liveUrl: "#",
            codeUrl: "#",
        },
    ];

// ProjectCard Component
// It takes a project object as prop and displays it
const ProjectCard = ({ project }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
        <img src={project.image} alt={project.title} className="w-full h-48 object-cover object-top" />
        <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                    <span key={tag} className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">{tag}</span>
                ))}
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
            <div className="flex space-x-4">
                <a href={project.liveUrl} className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Live Demo</a>
                <a href={project.codeUrl} className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">View Code</a>
            </div>
        </div>
    </div>
);

// Main App Component
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

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const navLinks = [
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
                <ProjectsSection />
                <SkillsSection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
}

// Header Component
const Header = ({ darkMode, toggleDarkMode, navLinks, mobileMenuOpen, toggleMobileMenu }) => {
    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm">
            <div className="container mx-auto px-6 md:px-12 lg:px-24 py-4 flex justify-between items-center">
                <a href="#" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Clayton Crispim</a>
                <nav className="hidden md:flex items-center space-x-6">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{link.label}</a>
                    ))}
                </nav>
                <div className="flex items-center space-x-4">
                    <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                    <a href="#" className="hidden md:inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors shadow">
                        Resume <Briefcase className="ml-2 h-4 w-4" />
                    </a>
                    {/* Mobile Menu Button */}
                    <button onClick={toggleMobileMenu} className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-800 py-4 px-6">
                    <nav className="flex flex-col space-y-4">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href} onClick={toggleMobileMenu} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{link.label}</a>
                        ))}
                        <a href="https://www.linkedin.com/in/claytoncrispim/" className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors shadow">
                            Resume <Briefcase className="ml-2 h-4 w-4" />
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
};


// Hero Section Component
const HeroSection = () => (
    <section id="home" className="py-24 md:py-32 flex flex-col items-center text-center">
        {/* <img src="https://imgur.com/a/b0aW2Lg" alt="Clayton Crispim" className="rounded-full w-32 h-32 mb-6 border-4 border-white dark:border-gray-800 shadow-lg"/> */}
        <img src="/20190827_140626_cropped.jpg" alt="Clayton Crispim" className="rounded-full w-32 h-32 mb-6 border-4 border-white dark:border-gray-800 shadow-lg"/>
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
            Hi, I'm Clayton Crispim. <br />
            <span className="text-indigo-600 dark:text-indigo-400">A Full-Stack Developer.</span>
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
            I specialize in crafting elegant front-end experiences and building robust, scalable backend systems. Turning complex problems into simple, beautiful code is my passion.
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

// About Section Component
const AboutSection = () => (
    <section id="about" className="py-20 md:py-28 bg-white dark:bg-gray-800 rounded-xl shadow-lg my-12">
        <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-2/3 space-y-4 text-lg text-gray-700 dark:text-gray-300">
                    <p>
                        Hello! I'm a passionate full-stack developer with a love for building things for the web. My journey into technology started with a simple "Hello, World!" and has since grown into a full-fledged passion for creating intuitive, dynamic, and impactful web applications.
                    </p>
                    <p>
                        I thrive on the challenge of solving complex problems and I'm committed to the principle of continuous learning. Whether it's architecting a backend API or perfecting the user interface, I'm dedicated to writing clean, efficient, and maintainable code.
                    </p>
                    <p>
                        When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee.
                    </p>
                </div>
                <div className="md:w-1/3 flex justify-center">
                    <img src="https://placehold.co/400x400/93C5FD/1E293B?text=Illustration" alt="Developer Illustration" className="rounded-lg shadow-2xl w-full max-w-sm"/>
                </div>
            </div>
        </div>
    </section>
);


// Projects Section Component
// 1. We use the projects array defined at the top.
// 2. We use the ProjectCard component to render each project.
const ProjectsSection = () => {
    return (
        <section id="projects" className="py-20 md:py-28">
             <h2 className="text-3xl font-bold text-center mb-12">My Work</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
            </div>
        </section>
    )
};

// Skills Section Component
const SkillsSection = () => {
    // Skills data
    const skillsData =  [
        {
            title: "Frontend",
            icon: <Code className="h-8 w-8 mx-auto mb-2 text-indigo-500"/>,
            skills: ["JavaScript (ES6+)", "TypeScript", "React", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
        },
        {
            title: "Backend",
            icon: <Server className="h-8 w-8 mx-auto mb-2 text-indigo-500"/>,
            // skills: ["Node.js", "Express", "Python", "Flask", "REST APIs", "GraphQL"],
            skills: ["Node.js", "Express", "Python", "REST APIs"],
        },
        // {
        //     title: "Databases",
        //     icon: <Database className="h-8 w-8 mx-auto mb-2 text-indigo-500"/>,
        //     skills: ["MongoDB", "PostgreSQL", "Firebase", "MySQL"],
        // },
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

const SkillCategory = ({ icon, title, skills }) => (
    <div className="p-6 rounded-lg">
        {icon}
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <ul className="space-y-2">
            {skills.map(skill => <li key={skill} className="text-gray-600 dark:text-gray-400">{skill}</li>)}
        </ul>
    </div>
);


// Contact Section Component
const ContactSection = () => (
    <section id="contact" className="py-20 md:py-28">
        <div className="text-center">
            <h2 className="text-3xl font-bold">Get In Touch</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-xl mx-auto">
                I'm currently open to new opportunities. If you have a project in mind or just want to say hi, feel free to reach out!
            </p>
            <a href="mailto:your.email@example.com" className="mt-8 inline-block bg-indigo-600 text-white text-lg font-semibold px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg">
                Say Hello <Mail className="inline ml-2"/>
            </a>
        </div>
    </section>
);


// Footer Component
const Footer = () => (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-6 md:px-12 text-center text-gray-600 dark:text-gray-400">
            <div className="flex justify-center space-x-6 mb-4">
                <a href="https://github.com/claytoncrispim" className="hover:text-indigo-600 dark:hover:text-indigo-400"><Github /></a>
                <a href="https://www.linkedin.com/in/claytoncrispim/" className="hover:text-indigo-600 dark:hover:text-indigo-400"><Linkedin /></a>
                <a href="mailto:claytonrpcrispim@gmail.com" className="hover:text-indigo-600 dark:hover:text-indigo-400"><Mail /></a>
            </div>
            <p>&copy; {new Date().getFullYear()} Clayton Crispim. All Rights Reserved.</p>
        </div>
    </footer>
);
