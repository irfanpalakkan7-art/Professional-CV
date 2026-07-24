const app = {
    init() {
        this.renderLanding();
        this.renderDashboard();
        editor.init();

        this.bindEvents();
        
        // Initial route
        const hash = window.location.hash.replace('#', '') || 'landing';
        this.navigateTo(hash);
        
        this.initTheme();
    },

    bindEvents() {
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const view = e.target.closest('.nav-link').dataset.view;
                this.navigateTo(view);
            });
        });

        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('procv_theme', newTheme);
            
            const icon = document.querySelector('#theme-toggle i');
            icon.className = newTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        });
    },

    initTheme() {
        const savedTheme = localStorage.getItem('procv_theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
        const icon = document.querySelector('#theme-toggle i');
        icon.className = savedTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    },

    navigateTo(view) {
        // Update URL
        window.history.pushState(null, '', '#' + view);

        // Update Nav
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.view === view) {
                link.classList.add('active');
            }
        });

        // Hide all views
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

        // Show target view
        const target = document.getElementById('view-' + view);
        if (target) {
            target.classList.add('active');
        }

        // Special logic per view
        if (view === 'dashboard') {
            this.refreshDashboard();
        } else if (view === 'editor') {
            if (!store.currentResume.id) {
                store.createNew();
            }
            editor.open();
        }
    },

    renderLanding() {
        const main = document.getElementById('main-content');
        main.innerHTML += `
            <div id="view-landing" class="view">
                <section class="hero">
                    <div class="hero-content">
                        <h1 class="hero-title">Build a <span>Professional CV</span> in Minutes</h1>
                        <p class="hero-subtitle">Create standout resumes with AI-powered suggestions, premium templates, and ATS-friendly formatting.</p>
                        <div class="hero-actions">
                            <button class="btn btn-primary" style="font-size: 1.1rem; padding: 1rem 2rem;" onclick="app.navigateTo('editor')">Create My Resume</button>
                            <button class="btn btn-outline" style="font-size: 1.1rem; padding: 1rem 2rem;" onclick="app.navigateTo('dashboard')">View Dashboard</button>
                        </div>
                    </div>
                    <div class="hero-visual">
                        <div class="hero-card">
                            <div style="height: 20px; width: 60%; background: var(--primary); margin-bottom: 20px; border-radius: 4px;"></div>
                            <div style="height: 10px; width: 40%; background: var(--border); margin-bottom: 40px; border-radius: 4px;"></div>
                            
                            <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                                <div style="height: 60px; width: 60px; background: var(--primary-light); border-radius: 50%;"></div>
                                <div style="flex: 1;">
                                    <div style="height: 10px; width: 100%; background: var(--border); margin-bottom: 10px; border-radius: 4px;"></div>
                                    <div style="height: 10px; width: 80%; background: var(--border); margin-bottom: 10px; border-radius: 4px;"></div>
                                    <div style="height: 10px; width: 90%; background: var(--border); border-radius: 4px;"></div>
                                </div>
                            </div>
                            
                            <div style="height: 10px; width: 100%; background: var(--border); margin-bottom: 10px; border-radius: 4px;"></div>
                            <div style="height: 10px; width: 90%; background: var(--border); margin-bottom: 10px; border-radius: 4px;"></div>
                            <div style="height: 10px; width: 95%; background: var(--border); border-radius: 4px;"></div>
                        </div>
                    </div>
                </section>

                <section class="features-section">
                    <h2 class="section-title">Premium Features</h2>
                    <p class="section-subtitle">Everything you need to land your dream job.</p>
                    <div class="features-grid">
                        <div class="feature-card">
                            <div class="feature-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
                            <h3 class="feature-title">AI-Powered Writing</h3>
                            <p class="feature-desc">Overcome writer's block with intelligent suggestions for summaries and responsibilities based on your job title.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon"><i class="fa-solid fa-file-pdf"></i></div>
                            <h3 class="feature-title">Professional Templates</h3>
                            <p class="feature-desc">Choose from beautifully designed, ATS-friendly templates that grab recruiters' attention.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon"><i class="fa-solid fa-shield-halved"></i></div>
                            <h3 class="feature-title">Real-time Preview</h3>
                            <p class="feature-desc">See exactly how your resume looks as you type. What you see is exactly what you get when you download.</p>
                        </div>
                    </div>
                </section>
            </div>
        `;
    },

    renderDashboard() {
        const main = document.getElementById('main-content');
        main.innerHTML += `
            <div id="view-dashboard" class="view">
                <div class="dashboard-container">
                    <div class="dashboard-header">
                        <h1>My Resumes</h1>
                        <button class="btn btn-primary" onclick="store.createNew(); app.navigateTo('editor');"><i class="fa-solid fa-plus"></i> New Resume</button>
                    </div>
                    <div class="resume-grid" id="dashboard-grid">
                        <!-- Populated dynamically -->
                    </div>
                </div>
            </div>
        `;
    },

    refreshDashboard() {
        const grid = document.getElementById('dashboard-grid');
        grid.innerHTML = '';
        
        if (store.resumes.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 4rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border);">
                    <div style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;"><i class="fa-regular fa-folder-open"></i></div>
                    <h3>No Resumes Yet</h3>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">Create your first professional resume now.</p>
                    <button class="btn btn-primary" onclick="store.createNew(); app.navigateTo('editor');">Get Started</button>
                </div>
            `;
            return;
        }

        store.resumes.forEach(resume => {
            const date = new Date(resume.lastModified).toLocaleDateString();
            const card = document.createElement('div');
            card.className = 'resume-card';
            card.innerHTML = `
                <div class="resume-card-preview">
                    <i class="fa-solid fa-file-lines" style="font-size: 4rem; color: var(--border);"></i>
                </div>
                <div class="resume-card-content">
                    <h3 class="resume-card-title">${resume.title}</h3>
                    <div class="resume-card-meta">Last modified: ${date}</div>
                    <div class="resume-card-actions">
                        <button class="btn btn-outline" onclick="app.editResume('${resume.id}')"><i class="fa-solid fa-pen"></i> Edit</button>
                        <button class="btn btn-icon btn-danger" onclick="app.deleteResume('${resume.id}')" title="Delete"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    },

    editResume(id) {
        store.load(id);
        this.navigateTo('editor');
    },

    deleteResume(id) {
        if(confirm('Are you sure you want to delete this resume?')) {
            store.delete(id);
            this.refreshDashboard();
        }
    }
};

// Start application
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
