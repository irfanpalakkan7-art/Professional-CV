const editor = {
    init() {
        const main = document.getElementById('main-content');
        main.innerHTML += `
            <div id="view-editor" class="view editor-layout">
                <div class="editor-main">
                    <div class="editor-header">
                        <div style="display: flex; gap: 0.5rem;">
                            <button class="btn btn-outline" id="btn-undo" title="Undo"><i class="fa-solid fa-rotate-left"></i></button>
                            <button class="btn btn-outline" id="btn-redo" title="Redo"><i class="fa-solid fa-rotate-right"></i></button>
                        </div>
                        <div style="display: flex; gap: 1rem; align-items: center;">
                            <input type="text" id="resume-title" value="Untitled Resume" style="border:1px solid var(--border); background:var(--bg-card); padding:0.5rem; border-radius:4px; font-size:1.1rem; font-weight:600; width:200px;" />
                            <button class="btn btn-primary" onclick="app.navigateTo('dashboard')">Save & Exit</button>
                        </div>
                    </div>
                    
                    <div class="editor-tabs" id="editor-tabs">
                        <div class="step-item active" data-step="personal"><i class="fa-solid fa-user"></i> Personal</div>
                        <div class="step-item" data-step="education"><i class="fa-solid fa-graduation-cap"></i> Education</div>
                        <div class="step-item" data-step="work"><i class="fa-solid fa-briefcase"></i> Experience</div>
                        <div class="step-item" data-step="skills"><i class="fa-solid fa-layer-group"></i> Skills</div>
                        <div class="step-item" data-step="projects"><i class="fa-solid fa-code"></i> Projects</div>
                        <div class="step-item" data-step="certifications"><i class="fa-solid fa-certificate"></i> Certifications</div>
                    </div>
                    
                    <div class="editor-content" id="editor-content-area">
                        <!-- Forms injected here -->
                    </div>
                </div>
                
                <div class="editor-preview-container">
                    <div class="editor-preview">
                        <div class="preview-toolbar">
                            <div style="display:flex; gap:0.5rem; align-items: center;">
                                <button class="btn btn-outline" id="btn-change-template"><i class="fa-solid fa-palette"></i> Template</button>
                                <input type="color" id="theme-color" value="${store.currentResume.settings.color}" title="Theme Color" style="height: 38px; border-radius: 4px; border: 1px solid var(--border); padding: 0 5px; cursor: pointer;">
                            </div>
                            <button class="btn btn-success" id="btn-download-pdf"><i class="fa-solid fa-download"></i> Download PDF</button>
                        </div>
                        <div class="preview-container">
                            <div class="resume-page" id="resume-preview-page">
                                <!-- Preview injected here -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Template Modal -->
            <div class="modal" id="template-modal">
                <div class="modal-content">
                    <button class="close-modal"><i class="fa-solid fa-xmark"></i></button>
                    <h2>Choose a Template</h2>
                    <div class="template-grid">
                        <div class="template-item active" data-id="template1">
                            <div style="height:150px; background:#f0f0f0; display:flex; align-items:center; justify-content:center; border:1px solid #ddd; font-size: 0.9em; text-align: center;">Template 1<br>Corporate</div>
                        </div>
                        <div class="template-item" data-id="template2">
                            <div style="height:150px; background:#f0f0f0; display:flex; align-items:center; justify-content:center; border:1px solid #ddd; font-size: 0.9em; text-align: center;">Template 2<br>Modern</div>
                        </div>
                        <div class="template-item" data-id="template3">
                            <div style="height:150px; background:#f0f0f0; display:flex; align-items:center; justify-content:center; border:1px solid #ddd; font-size: 0.9em; text-align: center;">Template 3<br>ATS Friendly</div>
                        </div>
                        <div class="template-item" data-id="template4">
                            <div style="height:150px; background:#f0f0f0; display:flex; align-items:center; justify-content:center; border:1px solid #ddd; font-size: 0.9em; text-align: center;">Template 4<br>Minimalist</div>
                        </div>
                        <div class="template-item" data-id="template5">
                            <div style="height:150px; background:#f0f0f0; display:flex; align-items:center; justify-content:center; border:1px solid #ddd; font-size: 0.9em; text-align: center;">Template 5<br>Creative</div>
                        </div>
                        <div class="template-item" data-id="template6">
                            <div style="height:150px; background:#f0f0f0; display:flex; align-items:center; justify-content:center; border:1px solid #ddd; font-size: 0.9em; text-align: center;">Template 6<br>Software</div>
                        </div>
                        <div class="template-item" data-id="template7">
                            <div style="height:150px; background:#f0f0f0; display:flex; align-items:center; justify-content:center; border:1px solid #ddd; font-size: 0.9em; text-align: center;">Template 7<br>Analyst</div>
                        </div>
                        <div class="template-item" data-id="template8">
                            <div style="height:150px; background:#f0f0f0; display:flex; align-items:center; justify-content:center; border:1px solid #ddd; font-size: 0.9em; text-align: center;">Template 8<br>Marketing</div>
                        </div>
                        <div class="template-item" data-id="template9">
                            <div style="height:150px; background:#f0f0f0; display:flex; align-items:center; justify-content:center; border:1px solid #ddd; font-size: 0.9em; text-align: center;">Template 9<br>Academic</div>
                        </div>
                        <div class="template-item" data-id="template10">
                            <div style="height:150px; background:#f0f0f0; display:flex; align-items:center; justify-content:center; border:1px solid #ddd; font-size: 0.9em; text-align: center;">Template 10<br>Elegant</div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.bindEvents();
        window.addEventListener('resume-updated', () => this.updatePreview());
    },

    bindEvents() {
        // Sidebar navigation
        const steps = document.querySelectorAll('.step-item');
        steps.forEach(step => {
            step.addEventListener('click', (e) => {
                steps.forEach(s => s.classList.remove('active'));
                const el = e.target.closest('.step-item');
                el.classList.add('active');
                ui.renderFormSection(el.dataset.step);
            });
        });

        // Title sync
        const titleInput = document.getElementById('resume-title');
        if (titleInput) {
            titleInput.addEventListener('change', (e) => {
                store.update('root', { title: e.target.value });
            });
        }

        // Color sync
        const colorInput = document.getElementById('theme-color');
        if (colorInput) {
            colorInput.addEventListener('change', (e) => {
                const settings = { ...store.currentResume.settings, color: e.target.value };
                store.update('root', { settings });
            });
        }

        // Undo/Redo
        document.getElementById('btn-undo').addEventListener('click', () => {
            if (store.undo()) {
                ui.renderFormSection(document.querySelector('.step-item.active').dataset.step);
                titleInput.value = store.currentResume.title;
                colorInput.value = store.currentResume.settings.color;
            }
        });
        document.getElementById('btn-redo').addEventListener('click', () => {
            if (store.redo()) {
                ui.renderFormSection(document.querySelector('.step-item.active').dataset.step);
                titleInput.value = store.currentResume.title;
                colorInput.value = store.currentResume.settings.color;
            }
        });

        // PDF Download
        document.getElementById('btn-download-pdf').addEventListener('click', () => {
            this.downloadPDF();
        });

        // Template Modal
        const modal = document.getElementById('template-modal');
        document.getElementById('btn-change-template').addEventListener('click', () => {
            modal.classList.add('active');
        });
        document.querySelector('.close-modal').addEventListener('click', () => {
            modal.classList.remove('active');
        });

        const templateItems = document.querySelectorAll('.template-item');
        templateItems.forEach(item => {
            item.addEventListener('click', (e) => {
                templateItems.forEach(i => i.classList.remove('active'));
                const el = e.target.closest('.template-item');
                el.classList.add('active');
                store.update('root', { templateId: el.dataset.id });
                modal.classList.remove('active');
            });
        });
    },

    updatePreview() {
        const previewPage = document.getElementById('resume-preview-page');
        if (previewPage) {
            const html = templates.get(store.currentResume.templateId, store.currentResume);
            previewPage.innerHTML = html;
        }
    },

    downloadPDF() {
        const element = document.getElementById('resume-preview-page');
        const opt = {
            margin:       0,
            filename:     `${store.currentResume.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`,
            image:        { type: 'jpeg', quality: 1.0 },
            html2canvas:  { scale: 4, useCORS: true, letterRendering: true },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        const btn = document.getElementById('btn-download-pdf');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';
        btn.disabled = true;

        html2pdf().set(opt).from(element).save().then(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        });
    },

    open() {
        ui.renderFormSection('personal');
        document.getElementById('resume-title').value = store.currentResume.title;
        document.getElementById('theme-color').value = store.currentResume.settings.color;
        
        // Sync active template item
        document.querySelectorAll('.template-item').forEach(i => i.classList.remove('active'));
        const activeTpl = document.querySelector(`.template-item[data-id="${store.currentResume.templateId}"]`);
        if(activeTpl) activeTpl.classList.add('active');

        this.updatePreview();
    }
};
