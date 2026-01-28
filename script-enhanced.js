// Enhanced JavaScript for Advanced AI Portfolio

// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        this.applyTheme();
        this.bindEvents();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            icon.className = this.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    bindEvents() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Mobile Navigation
class MobileNavigation {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }

    init() {
        if (this.hamburger && this.navMenu) {
            this.bindEvents();
        }
    }

    bindEvents() {
        this.hamburger.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
    }
}

// Smooth Scrolling
class SmoothScroller {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleClick(e));
        });
    }

    handleClick(e) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// Navbar Scroll Effect
class NavbarController {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        if (this.navbar) {
            window.addEventListener('scroll', () => this.handleScroll());
        }
    }

    handleScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            this.navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            this.navbar.style.backdropFilter = 'blur(20px)';
        } else {
            this.navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            this.navbar.style.backdropFilter = 'blur(10px)';
        }
    }
}

// Enhanced Particle System
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        
        this.resize();
        this.init();
        this.animate();
        this.bindEvents();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        this.particles = [];
        const numParticles = Math.min(
            Math.floor((this.canvas.width * this.canvas.height) / 15000),
            100
        );
        
        for (let i = 0; i < numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                connections: []
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update particles
        this.particles.forEach((particle, i) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
                particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
                particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            }
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                particle.vx += dx * force * 0.0005;
                particle.vy += dy * force * 0.0005;
            }
            
            // Limit velocity
            const maxVel = 2;
            particle.vx = Math.max(-maxVel, Math.min(maxVel, particle.vx));
            particle.vy = Math.max(-maxVel, Math.min(maxVel, particle.vy));
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(102, 126, 234, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        // Draw connections
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const opacity = (120 - distance) / 120 * 0.15;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(102, 126, 234, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            });
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.init();
        });
        
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = -1000;
            this.mouse.y = -1000;
        });
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Typing Animation
class TypingAnimation {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
    }

    start() {
        this.element.innerHTML = '';
        this.type();
    }

    type() {
        if (this.index < this.text.length) {
            this.element.innerHTML += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// Intersection Observer for Animations
class ScrollAnimations {
    constructor() {
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );
        this.init();
    }

    init() {
        const animateElements = document.querySelectorAll(
            '.timeline-item, .project-card, .blog-card, .contact-method, .highlight-item'
        );
        
        animateElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            this.observer.observe(el);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// Project Filtering
class ProjectFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e));
        });
    }

    handleFilter(e) {
        const filter = e.target.dataset.filter;
        
        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Filter projects
        this.projectCards.forEach(card => {
            const category = card.dataset.category;
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
}

// Demo Modal System
class DemoModal {
    constructor() {
        this.modal = document.getElementById('demo-modal');
        this.modalTitle = document.getElementById('modal-title');
        this.modalBody = document.getElementById('modal-body');
        this.init();
    }

    init() {
        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                this.close();
            }
        });
    }

    open(demoType) {
        const demos = {
            'multi-agent': {
                title: 'Multi-Agent Research System Demo',
                content: this.getMultiAgentDemo()
            },
            'mlops-pipeline': {
                title: 'MLOps Pipeline Architecture',
                content: this.getMLOpsDemo()
            },
            'real-time-cv': {
                title: 'Real-time Computer Vision Demo',
                content: this.getComputerVisionDemo()
            },
            'rag-system': {
                title: 'Enterprise RAG System Demo',
                content: this.getRAGDemo()
            },
            'trading-agent': {
                title: 'AI Trading Agent Backtest',
                content: this.getTradingDemo()
            },
            'fraud-detection': {
                title: 'Fraud Detection System Demo',
                content: this.getFraudDemo()
            }
        };

        const demo = demos[demoType];
        if (demo) {
            this.modalTitle.textContent = demo.title;
            this.modalBody.innerHTML = demo.content;
            this.modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    close() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    getMultiAgentDemo() {
        return `
            <div class="demo-content">
                <h4>System Architecture</h4>
                <div class="architecture-diagram">
                    <div class="agent-node">Research Agent</div>
                    <div class="agent-node">Analysis Agent</div>
                    <div class="agent-node">Writing Agent</div>
                    <div class="agent-node">Review Agent</div>
                </div>
                
                <h4>Live Demo</h4>
                <div class="demo-interface">
                    <div class="demo-input">
                        <label>Research Topic:</label>
                        <input type="text" placeholder="Enter research topic..." value="AI Agent Frameworks Comparison">
                        <button class="btn btn-primary">Start Research</button>
                    </div>
                    <div class="demo-output">
                        <div class="agent-status">
                            <span class="status-dot active"></span> Research Agent: Gathering sources...
                        </div>
                        <div class="agent-status">
                            <span class="status-dot"></span> Analysis Agent: Waiting...
                        </div>
                        <div class="agent-status">
                            <span class="status-dot"></span> Writing Agent: Waiting...
                        </div>
                    </div>
                </div>
                
                <h4>Key Features</h4>
                <ul>
                    <li>Autonomous research across multiple sources</li>
                    <li>Intelligent analysis and synthesis</li>
                    <li>Collaborative agent communication</li>
                    <li>Quality assurance and review</li>
                </ul>
            </div>
        `;
    }

    getMLOpsDemo() {
        return `
            <div class="demo-content">
                <h4>Pipeline Overview</h4>
                <div class="pipeline-diagram">
                    <div class="pipeline-stage">Data Ingestion</div>
                    <div class="pipeline-arrow">→</div>
                    <div class="pipeline-stage">Feature Engineering</div>
                    <div class="pipeline-arrow">→</div>
                    <div class="pipeline-stage">Model Training</div>
                    <div class="pipeline-arrow">→</div>
                    <div class="pipeline-stage">Validation</div>
                    <div class="pipeline-arrow">→</div>
                    <div class="pipeline-stage">Deployment</div>
                </div>
                
                <h4>Monitoring Dashboard</h4>
                <div class="metrics-grid">
                    <div class="metric-card">
                        <h5>Model Accuracy</h5>
                        <div class="metric-value">94.2%</div>
                    </div>
                    <div class="metric-card">
                        <h5>Latency</h5>
                        <div class="metric-value">45ms</div>
                    </div>
                    <div class="metric-card">
                        <h5>Throughput</h5>
                        <div class="metric-value">1.2K/sec</div>
                    </div>
                    <div class="metric-card">
                        <h5>Uptime</h5>
                        <div class="metric-value">99.9%</div>
                    </div>
                </div>
                
                <h4>Technologies Used</h4>
                <div class="tech-grid">
                    <span class="tech-badge">Kubernetes</span>
                    <span class="tech-badge">Docker</span>
                    <span class="tech-badge">MLflow</span>
                    <span class="tech-badge">Prometheus</span>
                    <span class="tech-badge">Grafana</span>
                    <span class="tech-badge">Jenkins</span>
                </div>
            </div>
        `;
    }

    getComputerVisionDemo() {
        return `
            <div class="demo-content">
                <h4>Real-time Object Detection</h4>
                <div class="cv-demo">
                    <div class="video-placeholder">
                        <i class="fas fa-video" style="font-size: 3rem; color: #667eea;"></i>
                        <p>Live Camera Feed</p>
                        <div class="detection-overlay">
                            <div class="bounding-box" style="top: 20%; left: 30%; width: 40%; height: 30%;">
                                <span class="detection-label">Person (98.5%)</span>
                            </div>
                            <div class="bounding-box" style="top: 60%; left: 10%; width: 25%; height: 20%;">
                                <span class="detection-label">Car (94.2%)</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <h4>Performance Metrics</h4>
                <div class="performance-stats">
                    <div class="stat">
                        <span class="stat-label">FPS:</span>
                        <span class="stat-value">30</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Accuracy:</span>
                        <span class="stat-value">98.5%</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Latency:</span>
                        <span class="stat-value">33ms</span>
                    </div>
                </div>
                
                <h4>Detected Objects</h4>
                <div class="detection-list">
                    <div class="detection-item">
                        <span class="object-name">Person</span>
                        <span class="confidence">98.5%</span>
                    </div>
                    <div class="detection-item">
                        <span class="object-name">Car</span>
                        <span class="confidence">94.2%</span>
                    </div>
                    <div class="detection-item">
                        <span class="object-name">Traffic Light</span>
                        <span class="confidence">89.7%</span>
                    </div>
                </div>
            </div>
        `;
    }

    getRAGDemo() {
        return `
            <div class="demo-content">
                <h4>Interactive RAG System</h4>
                <div class="rag-interface">
                    <div class="query-section">
                        <label>Ask a Question:</label>
                        <input type="text" placeholder="What are the benefits of transformer architecture?" 
                               value="What are the benefits of transformer architecture?">
                        <button class="btn btn-primary">Search</button>
                    </div>
                    
                    <div class="response-section">
                        <h5>AI Response:</h5>
                        <div class="ai-response">
                            Transformer architecture offers several key benefits: 1) Parallel processing capabilities that significantly speed up training, 2) Better handling of long-range dependencies through self-attention mechanisms, 3) Superior performance on various NLP tasks...
                        </div>
                        
                        <h5>Source Documents:</h5>
                        <div class="source-docs">
                            <div class="source-doc">
                                <span class="doc-title">Attention Is All You Need (Vaswani et al.)</span>
                                <span class="relevance-score">95% relevant</span>
                            </div>
                            <div class="source-doc">
                                <span class="doc-title">BERT: Pre-training of Deep Bidirectional Transformers</span>
                                <span class="relevance-score">87% relevant</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <h4>System Metrics</h4>
                <div class="rag-metrics">
                    <div class="metric">Response Time: <strong>0.8s</strong></div>
                    <div class="metric">Relevance Score: <strong>94%</strong></div>
                    <div class="metric">Documents Searched: <strong>10,247</strong></div>
                </div>
            </div>
        `;
    }

    getTradingDemo() {
        return `
            <div class="demo-content">
                <h4>Trading Performance</h4>
                <div class="trading-chart">
                    <canvas id="trading-chart" width="400" height="200"></canvas>
                </div>
                
                <h4>Strategy Metrics</h4>
                <div class="trading-metrics">
                    <div class="metric-row">
                        <span>Total Return:</span>
                        <span class="positive">+23.4%</span>
                    </div>
                    <div class="metric-row">
                        <span>Sharpe Ratio:</span>
                        <span>0.82</span>
                    </div>
                    <div class="metric-row">
                        <span>Max Drawdown:</span>
                        <span class="negative">-8.2%</span>
                    </div>
                    <div class="metric-row">
                        <span>Win Rate:</span>
                        <span>67%</span>
                    </div>
                </div>
                
                <h4>Recent Trades</h4>
                <div class="trades-list">
                    <div class="trade-item">
                        <span class="symbol">AAPL</span>
                        <span class="action buy">BUY</span>
                        <span class="price">$150.25</span>
                        <span class="pnl positive">+2.3%</span>
                    </div>
                    <div class="trade-item">
                        <span class="symbol">TSLA</span>
                        <span class="action sell">SELL</span>
                        <span class="price">$245.80</span>
                        <span class="pnl positive">+5.7%</span>
                    </div>
                </div>
            </div>
        `;
    }

    getFraudDemo() {
        return `
            <div class="demo-content">
                <h4>Real-time Fraud Detection</h4>
                <div class="fraud-monitor">
                    <div class="transaction-feed">
                        <h5>Live Transaction Feed</h5>
                        <div class="transaction legitimate">
                            <span class="tx-id">#TX789012</span>
                            <span class="amount">$45.67</span>
                            <span class="status safe">SAFE</span>
                            <span class="score">Risk: 0.02</span>
                        </div>
                        <div class="transaction suspicious">
                            <span class="tx-id">#TX789013</span>
                            <span class="amount">$2,450.00</span>
                            <span class="status flagged">FLAGGED</span>
                            <span class="score">Risk: 0.87</span>
                        </div>
                        <div class="transaction legitimate">
                            <span class="tx-id">#TX789014</span>
                            <span class="amount">$12.99</span>
                            <span class="status safe">SAFE</span>
                            <span class="score">Risk: 0.01</span>
                        </div>
                    </div>
                </div>
                
                <h4>Detection Statistics</h4>
                <div class="fraud-stats">
                    <div class="stat-card">
                        <h5>Transactions Today</h5>
                        <div class="big-number">127,543</div>
                    </div>
                    <div class="stat-card">
                        <h5>Fraud Detected</h5>
                        <div class="big-number">23</div>
                    </div>
                    <div class="stat-card">
                        <h5>False Positives</h5>
                        <div class="big-number">2</div>
                    </div>
                    <div class="stat-card">
                        <h5>Accuracy</h5>
                        <div class="big-number">99.8%</div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Contact Form Handler
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Validation
        if (!this.validateForm(data)) {
            return;
        }
        
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call
            await this.simulateSubmission(data);
            
            // Success
            this.showSuccess();
            this.form.reset();
            
        } catch (error) {
            this.showError('Failed to send message. Please try again.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    validateForm(data) {
        const required = ['name', 'email', 'message'];
        const missing = required.filter(field => !data[field]?.trim());
        
        if (missing.length > 0) {
            this.showError(`Please fill in: ${missing.join(', ')}`);
            return false;
        }
        
        if (!this.isValidEmail(data.email)) {
            this.showError('Please enter a valid email address');
            return false;
        }
        
        return true;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    async simulateSubmission(data) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Log form data (in real app, send to server)
        console.log('Form submitted:', data);
    }

    showSuccess() {
        this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
}

// Resume Download Handler
class ResumeDownloader {
    constructor() {
        this.downloadBtn = document.getElementById('download-resume');
        this.init();
    }

    init() {
        if (this.downloadBtn) {
            this.downloadBtn.addEventListener('click', (e) => this.handleDownload(e));
        }
    }

    handleDownload(e) {
        e.preventDefault();
        
        // In a real application, you would have an actual PDF file
        // For demo purposes, we'll create a simple text file
        this.generateResume();
    }

    generateResume() {
        const resumeContent = this.getResumeContent();
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Pavan_AI_Engineer_Resume.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    getResumeContent() {
        return `
PAVAN KUMAR KORLAKUNTA - SENIOR AI ENGINEER & ML EXPERT
======================================================

CONTACT INFORMATION
-------------------
Email: kpkmlengineer@gmail.com
Phone: +1 (346) 495-7852
LinkedIn: [To be updated]
GitHub: [To be updated]
Location: Atlanta, Georgia

PROFESSIONAL SUMMARY
--------------------
Passionate AI Engineer with 3+ years of experience building intelligent systems across the complete 
AI spectrum. Expertise in Machine Learning, Deep Learning, Computer Vision, NLP, Data Science, 
AI Agents, and MLOps. Proven track record of delivering production-ready solutions that drive 
business impact and operational efficiency.

CORE COMPETENCIES
-----------------
• Machine Learning: Classical algorithms, ensemble methods, hyperparameter tuning
• Deep Learning: CNNs, RNNs, Transformers, GANs, transfer learning
• Computer Vision: Image classification, object detection, OCR, image processing
• Natural Language Processing: Text analysis, sentiment analysis, language models
• Data Science: Statistical analysis, data preprocessing, feature engineering, EDA
• AI Agents: Multi-agent systems, LangChain, autonomous systems
• MLOps: Model deployment, monitoring, CI/CD pipelines, containerization
• Programming: Python, R, SQL, JavaScript
• Cloud Platforms: AWS, GCP, Azure
• Tools & Frameworks: TensorFlow, PyTorch, Scikit-learn, OpenCV, Docker, Kubernetes

PROFESSIONAL EXPERIENCE
-----------------------
AI Engineer | Current Role | 2022 - Present
• Developed and deployed 25+ machine learning models across various domains
• Built intelligent document processing system with 94% accuracy using OCR and NLP
• Created predictive analytics dashboard with 92% forecasting accuracy
• Implemented computer vision system for automated quality control (96% accuracy)
• Designed end-to-end ML pipelines with automated model selection and deployment

Junior Data Scientist | Previous Role | 2021 - 2022
• Performed comprehensive data analysis and statistical modeling
• Built classification and regression models for business optimization
• Created data visualization dashboards for stakeholder reporting
• Collaborated with cross-functional teams to deliver data-driven solutions

EDUCATION
---------
[Degree Information - To be updated with your actual education]
Relevant Coursework: Machine Learning, Deep Learning, Statistics, Data Structures, Algorithms

CERTIFICATIONS & TRAINING
--------------------------
• [To be updated with your actual certifications]
• Continuous learning in AI/ML through online courses and workshops
• Active participation in AI/ML communities and conferences

KEY PROJECTS
------------
1. Intelligent Document Processing System
   - OCR-based document extraction and classification
   - Technologies: Python, Tesseract OCR, spaCy, Scikit-learn
   - Impact: 75% reduction in manual processing time

2. Predictive Analytics Dashboard
   - Sales forecasting and customer behavior prediction
   - Technologies: Python, XGBoost, Flask, PostgreSQL
   - Impact: 92% prediction accuracy, 50K+ daily predictions

3. Smart Image Classification System
   - Automated image classification for quality control
   - Technologies: TensorFlow, OpenCV, CNN architectures
   - Impact: 96% accuracy with real-time processing

4. NLP Sentiment Analysis Tool
   - Customer feedback analysis and sentiment classification
   - Technologies: BERT, Transformers, Python, Flask
   - Impact: Automated analysis of 10K+ reviews daily

5. Data Science Portfolio Projects
   - Various ML projects covering regression, classification, clustering
   - Technologies: Python, R, Pandas, NumPy, Matplotlib, Seaborn
   - Focus: End-to-end data science workflow implementation

TECHNICAL SKILLS
-----------------
Programming Languages:
• Python (Advanced) - Primary language for ML/AI development
• R (Intermediate) - Statistical analysis and data visualization
• SQL (Advanced) - Database querying and data manipulation
• JavaScript (Intermediate) - Web development and visualization

Machine Learning & AI:
• Scikit-learn, XGBoost, LightGBM, CatBoost
• TensorFlow, Keras, PyTorch
• OpenCV, PIL, scikit-image
• NLTK, spaCy, Transformers, Hugging Face
• LangChain, OpenAI API, Anthropic

Data Science & Analytics:
• Pandas, NumPy, SciPy
• Matplotlib, Seaborn, Plotly
• Jupyter Notebooks, Google Colab
• Statistical analysis and hypothesis testing

Cloud & DevOps:
• AWS (EC2, S3, Lambda, SageMaker)
• Google Cloud Platform (Compute Engine, AI Platform)
• Docker containerization
• Git version control
• Linux/Unix systems

ACHIEVEMENTS
------------
• Successfully deployed 25+ ML models in production environments
• Achieved 90%+ accuracy across multiple classification projects
• Reduced manual processing time by 75% through automation
• Built scalable systems handling 50K+ daily predictions
• Contributed to open-source ML projects and communities

INTERESTS & ACTIVITIES
----------------------
• Open Source Contributions: Active contributor to ML/AI projects
• Continuous Learning: Regular participation in online courses and workshops
• Technical Writing: Documenting and sharing AI/ML knowledge
• Community Engagement: Participating in AI/ML meetups and conferences
• Research: Staying updated with latest AI/ML research and trends

LANGUAGES
---------
• English (Fluent)
• [Add other languages as applicable]

REFERENCES
----------
Available upon request

---
Portfolio Website: https://pavan6570.github.io/ai-portfolio-website
Last Updated: January 2024
        `.trim();
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            loadTime: 0,
            renderTime: 0,
            interactionTime: 0
        };
        this.init();
    }

    init() {
        this.measureLoadTime();
        this.measureRenderTime();
        this.setupInteractionTracking();
    }

    measureLoadTime() {
        window.addEventListener('load', () => {
            this.metrics.loadTime = performance.now();
            console.log(`Page load time: ${this.metrics.loadTime.toFixed(2)}ms`);
        });
    }

    measureRenderTime() {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                if (entry.entryType === 'paint') {
                    console.log(`${entry.name}: ${entry.startTime.toFixed(2)}ms`);
                }
            });
        });
        observer.observe({ entryTypes: ['paint'] });
    }

    setupInteractionTracking() {
        ['click', 'scroll', 'keydown'].forEach(event => {
            document.addEventListener(event, () => {
                this.metrics.interactionTime = performance.now();
            }, { once: true });
        });
    }
}

// Global Functions for Demo Modals
window.openDemo = function(demoType) {
    if (window.demoModal) {
        window.demoModal.open(demoType);
    }
};

window.closeModal = function() {
    if (window.demoModal) {
        window.demoModal.close();
    }
};

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core systems
    window.themeManager = new ThemeManager();
    window.mobileNav = new MobileNavigation();
    window.smoothScroller = new SmoothScroller();
    window.navbarController = new NavbarController();
    window.scrollAnimations = new ScrollAnimations();
    window.projectFilter = new ProjectFilter();
    window.demoModal = new DemoModal();
    window.contactForm = new ContactForm();
    window.resumeDownloader = new ResumeDownloader();
    window.performanceMonitor = new PerformanceMonitor();
    
    // Initialize particle system
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        window.particleSystem = new ParticleSystem(canvas);
    }
    
    // Initialize typing animation
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        setTimeout(() => {
            const typingAnimation = new TypingAnimation(typingElement, "Hello, I'm", 150);
            typingAnimation.start();
        }, 1000);
    }
    
    // Add loading completion class
    document.body.classList.add('loaded');
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.particleSystem) {
        window.particleSystem.destroy();
    }
});

// Add notification styles
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    }
    
    .notification.success {
        background: linear-gradient(135deg, #4caf50, #45a049);
    }
    
    .notification.error {
        background: linear-gradient(135deg, #f44336, #d32f2f);
    }
    
    .notification.show {
        transform: translateX(0);
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);