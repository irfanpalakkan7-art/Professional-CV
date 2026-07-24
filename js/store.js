const defaultResumeData = {
    id: null,
    title: 'Untitled Resume',
    lastModified: null,
    templateId: 'template-1',
    settings: {
        fontFamily: 'Inter',
        color: '#2563eb',
        fontSize: '14px'
    },
    personal: {
        fullName: '',
        jobTitle: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        portfolio: '',
        github: '',
        summary: ''
    },
    education: [],
    work: [],
    skills: {
        technical: '',
        soft: '',
        languages: ''
    },
    projects: [],
    certifications: [],
    achievements: '',
    interests: ''
};

const store = {
    currentResume: JSON.parse(JSON.stringify(defaultResumeData)),
    resumes: [],
    history: [],
    historyIndex: -1,

    init() {
        const savedResumes = localStorage.getItem('procv_resumes');
        if (savedResumes) {
            this.resumes = JSON.parse(savedResumes);
        }
    },

    saveAll() {
        localStorage.setItem('procv_resumes', JSON.stringify(this.resumes));
    },

    createNew() {
        this.currentResume = JSON.parse(JSON.stringify(defaultResumeData));
        this.currentResume.id = 'cv_' + Date.now();
        this.currentResume.lastModified = new Date().toISOString();
        this.resumes.push(this.currentResume);
        this.saveAll();
        this.clearHistory();
        this.saveHistory();
    },

    load(id) {
        const resume = this.resumes.find(r => r.id === id);
        if (resume) {
            this.currentResume = JSON.parse(JSON.stringify(resume));
            this.clearHistory();
            this.saveHistory();
        }
    },

    delete(id) {
        this.resumes = this.resumes.filter(r => r.id !== id);
        this.saveAll();
    },

    update(section, data) {
        if (section === 'root') {
            this.currentResume = { ...this.currentResume, ...data };
        } else {
            this.currentResume[section] = data;
        }
        this.currentResume.lastModified = new Date().toISOString();
        
        // Update in resumes list
        const index = this.resumes.findIndex(r => r.id === this.currentResume.id);
        if (index !== -1) {
            this.resumes[index] = JSON.parse(JSON.stringify(this.currentResume));
            this.saveAll();
        }
        
        this.saveHistory();
        
        // Trigger event
        window.dispatchEvent(new CustomEvent('resume-updated'));
    },

    saveHistory() {
        // Remove future history if we made a new change after undoing
        if (this.historyIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.historyIndex + 1);
        }
        this.history.push(JSON.parse(JSON.stringify(this.currentResume)));
        if (this.history.length > 50) this.history.shift(); // Max 50 history states
        this.historyIndex = this.history.length - 1;
    },

    clearHistory() {
        this.history = [];
        this.historyIndex = -1;
    },

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.currentResume = JSON.parse(JSON.stringify(this.history[this.historyIndex]));
            
            const index = this.resumes.findIndex(r => r.id === this.currentResume.id);
            if (index !== -1) {
                this.resumes[index] = JSON.parse(JSON.stringify(this.currentResume));
                this.saveAll();
            }
            
            window.dispatchEvent(new CustomEvent('resume-updated'));
            return true;
        }
        return false;
    },

    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.currentResume = JSON.parse(JSON.stringify(this.history[this.historyIndex]));
            
            const index = this.resumes.findIndex(r => r.id === this.currentResume.id);
            if (index !== -1) {
                this.resumes[index] = JSON.parse(JSON.stringify(this.currentResume));
                this.saveAll();
            }
            
            window.dispatchEvent(new CustomEvent('resume-updated'));
            return true;
        }
        return false;
    }
};

store.init();
