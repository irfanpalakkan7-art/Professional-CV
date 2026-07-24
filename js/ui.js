const ui = {
    renderFormSection(step) {
        const content = document.getElementById('editor-content-area');
        content.innerHTML = '';
        
        switch (step) {
            case 'personal':
                content.innerHTML = this.getPersonalForm();
                break;
            case 'education':
                content.innerHTML = this.getListForm('education', 'Education', this.getEducationFields);
                break;
            case 'work':
                content.innerHTML = this.getListForm('work', 'Work Experience', this.getWorkFields);
                break;
            case 'skills':
                content.innerHTML = this.getSkillsForm();
                break;
            case 'projects':
                content.innerHTML = this.getListForm('projects', 'Projects', this.getProjectFields);
                break;
            case 'certifications':
                content.innerHTML = this.getListForm('certifications', 'Certifications', this.getCertFields);
                break;
            default:
                content.innerHTML = `<div class="form-section"><h3>Coming Soon</h3></div>`;
        }

        this.attachFormListeners(step);
    },

    getPersonalForm() {
        const p = store.currentResume.personal;
        return `
            <div class="form-section">
                <div class="form-header">
                    <h2>Personal Information</h2>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Full Name</label>
                        <input type="text" class="form-control" name="fullName" value="${p.fullName || ''}" placeholder="John Doe">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Job Title</label>
                        <input type="text" class="form-control" name="jobTitle" value="${p.jobTitle || ''}" placeholder="Software Engineer">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" name="email" value="${p.email || ''}" placeholder="john@example.com">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Phone</label>
                        <input type="text" class="form-control" name="phone" value="${p.phone || ''}" placeholder="+1 234 567 8900">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Location</label>
                        <input type="text" class="form-control" name="location" value="${p.location || ''}" placeholder="New York, USA">
                    </div>
                    <div class="form-group">
                        <label class="form-label">LinkedIn</label>
                        <input type="text" class="form-control" name="linkedin" value="${p.linkedin || ''}" placeholder="linkedin.com/in/johndoe">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Professional Summary</label>
                    <button type="button" class="ai-button" id="btn-ai-summary" style="margin-bottom: 0.5rem;"><i class="fa-solid fa-wand-magic-sparkles"></i> AI Generate Summary</button>
                    <textarea class="form-control" name="summary" placeholder="A brief summary of your professional background...">${p.summary || ''}</textarea>
                </div>
            </div>
        `;
    },

    getListForm(section, title, fieldsFn) {
        const items = store.currentResume[section] || [];
        return `
            <div class="form-section">
                <div class="form-header">
                    <h2>${title}</h2>
                    <button class="btn btn-outline btn-add-item" data-section="${section}"><i class="fa-solid fa-plus"></i> Add Entry</button>
                </div>
                <div id="${section}-list">
                    ${items.map((item, index) => this.getListItem(section, item, index, fieldsFn)).join('')}
                </div>
            </div>
        `;
    },

    getListItem(section, item, index, fieldsFn) {
        return `
            <div class="entry-card" data-index="${index}">
                <div class="entry-actions">
                    <button class="btn btn-icon btn-danger btn-remove-item" data-section="${section}" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
                </div>
                ${fieldsFn(item, index)}
            </div>
        `;
    },

    getEducationFields(item, index) {
        return `
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Institution</label>
                    <input type="text" class="form-control list-input" data-field="institution" value="${item.institution || ''}">
                </div>
                <div class="form-group">
                    <label class="form-label">Degree</label>
                    <input type="text" class="form-control list-input" data-field="degree" value="${item.degree || ''}">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Field of Study</label>
                    <input type="text" class="form-control list-input" data-field="field" value="${item.field || ''}">
                </div>
                <div class="form-group">
                    <label class="form-label">GPA (Optional)</label>
                    <input type="text" class="form-control list-input" data-field="gpa" value="${item.gpa || ''}">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Start Date</label>
                    <input type="text" class="form-control list-input" data-field="startDate" value="${item.startDate || ''}" placeholder="Sep 2018">
                </div>
                <div class="form-group">
                    <label class="form-label">End Date</label>
                    <input type="text" class="form-control list-input" data-field="endDate" value="${item.endDate || ''}" placeholder="May 2022">
                </div>
            </div>
        `;
    },

    getWorkFields(item, index) {
        return `
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Company Name</label>
                    <input type="text" class="form-control list-input" data-field="company" value="${item.company || ''}">
                </div>
                <div class="form-group">
                    <label class="form-label">Job Title</label>
                    <input type="text" class="form-control list-input" data-field="jobTitle" value="${item.jobTitle || ''}">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Start Date</label>
                    <input type="text" class="form-control list-input" data-field="startDate" value="${item.startDate || ''}" placeholder="Jan 2020">
                </div>
                <div class="form-group">
                    <label class="form-label">End Date</label>
                    <input type="text" class="form-control list-input" data-field="endDate" value="${item.endDate || ''}" placeholder="Present">
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">Responsibilities</label>
                <button type="button" class="ai-button btn-ai-work" data-index="${index}" style="margin-bottom: 0.5rem;"><i class="fa-solid fa-wand-magic-sparkles"></i> AI Enhance</button>
                <textarea class="form-control list-input" data-field="responsibilities">${item.responsibilities || ''}</textarea>
            </div>
        `;
    },

    getSkillsForm() {
        const s = store.currentResume.skills;
        return `
            <div class="form-section">
                <div class="form-header">
                    <h2>Skills</h2>
                    <button type="button" class="ai-button" id="btn-ai-skills"><i class="fa-solid fa-wand-magic-sparkles"></i> Suggest Skills</button>
                </div>
                <div class="form-group">
                    <label class="form-label">Technical Skills (Comma separated)</label>
                    <textarea class="form-control" name="technical">${s.technical || ''}</textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Soft Skills (Comma separated)</label>
                    <textarea class="form-control" name="soft">${s.soft || ''}</textarea>
                </div>
            </div>
        `;
    },

    getProjectFields(item, index) {
        return `
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Project Name</label>
                    <input type="text" class="form-control list-input" data-field="name" value="${item.name || ''}">
                </div>
                <div class="form-group">
                    <label class="form-label">Technologies Used</label>
                    <input type="text" class="form-control list-input" data-field="tech" value="${item.tech || ''}">
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">Description</label>
                <textarea class="form-control list-input" data-field="description">${item.description || ''}</textarea>
            </div>
        `;
    },

    getCertFields(item, index) {
        return `
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Certification Name</label>
                    <input type="text" class="form-control list-input" data-field="name" value="${item.name || ''}">
                </div>
                <div class="form-group">
                    <label class="form-label">Organization</label>
                    <input type="text" class="form-control list-input" data-field="organization" value="${item.organization || ''}">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Issue Date</label>
                    <input type="text" class="form-control list-input" data-field="date" value="${item.date || ''}" placeholder="e.g. Aug 2023">
                </div>
                <div class="form-group">
                    <label class="form-label">Credential ID (Optional)</label>
                    <input type="text" class="form-control list-input" data-field="credentialId" value="${item.credentialId || ''}">
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">Upload Certificate (Image)</label>
                <input type="file" class="form-control file-input" accept="image/*" data-field="image">
                ${item.image ? `<div style="margin-top:0.5rem;"><img src="${item.image}" style="height:50px; border-radius:4px; border:1px solid #ccc;"></div>` : ''}
            </div>
        `;
    },

    attachFormListeners(step) {
        const content = document.getElementById('editor-content-area');
        
        // Handle standard inputs
        const inputs = content.querySelectorAll('input:not(.list-input), textarea:not(.list-input)');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const data = { ...store.currentResume[step] };
                data[e.target.name] = e.target.value;
                store.update(step, data);
            });
        });

        // Handle list inputs
        const listInputs = content.querySelectorAll('.list-input');
        listInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const card = e.target.closest('.entry-card');
                const index = parseInt(card.dataset.index);
                const field = e.target.dataset.field;
                const section = step; // assuming step === section for lists
                
                const list = [...store.currentResume[section]];
                list[index][field] = e.target.value;
                store.update(section, list);
            });
        });

        // Handle file uploads
        const fileInputs = content.querySelectorAll('.file-input');
        fileInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const card = e.target.closest('.entry-card');
                        const index = parseInt(card.dataset.index);
                        const field = e.target.dataset.field;
                        const section = step;
                        const list = [...store.currentResume[section]];
                        
                        // Compress image slightly if large to save localStorage space
                        const img = new Image();
                        img.src = event.target.result;
                        img.onload = () => {
                            const canvas = document.createElement('canvas');
                            const ctx = canvas.getContext('2d');
                            const MAX_WIDTH = 400;
                            const scale = Math.min(MAX_WIDTH / img.width, 1);
                            canvas.width = img.width * scale;
                            canvas.height = img.height * scale;
                            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                            const resizedBase64 = canvas.toDataURL('image/jpeg', 0.8);
                            
                            list[index][field] = resizedBase64;
                            store.update(section, list);
                            ui.renderFormSection(section);
                        };
                    };
                    reader.readAsDataURL(file);
                }
            });
        });

        // Handle Add Item
        const addBtn = content.querySelector('.btn-add-item');
        if (addBtn) {
            addBtn.addEventListener('click', (e) => {
                const section = e.target.closest('button').dataset.section;
                const list = [...store.currentResume[section], {}];
                store.update(section, list);
                this.renderFormSection(section);
            });
        }

        // Handle Remove Item
        const removeBtns = content.querySelectorAll('.btn-remove-item');
        removeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.closest('button').dataset.section;
                const index = parseInt(e.target.closest('button').dataset.index);
                const list = [...store.currentResume[section]];
                list.splice(index, 1);
                store.update(section, list);
                this.renderFormSection(section);
            });
        });

        // Handle AI Buttons
        const aiSummary = document.getElementById('btn-ai-summary');
        if (aiSummary) {
            aiSummary.addEventListener('click', async () => {
                aiSummary.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';
                const summary = await aiService.generateSummary(store.currentResume.personal.jobTitle);
                const textarea = content.querySelector('textarea[name="summary"]');
                textarea.value = summary;
                
                const data = { ...store.currentResume.personal };
                data.summary = summary;
                store.update('personal', data);
                
                aiSummary.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> AI Generate Summary';
            });
        }

        const aiSkills = document.getElementById('btn-ai-skills');
        if (aiSkills) {
            aiSkills.addEventListener('click', async () => {
                aiSkills.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Suggesting...';
                const technical = await aiService.suggestSkills(store.currentResume.personal.jobTitle);
                const textarea = content.querySelector('textarea[name="technical"]');
                textarea.value = technical;
                
                const data = { ...store.currentResume.skills };
                data.technical = technical;
                store.update('skills', data);
                
                aiSkills.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Suggest Skills';
            });
        }

        const aiWorks = content.querySelectorAll('.btn-ai-work');
        aiWorks.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const button = e.target.closest('button');
                const index = parseInt(button.dataset.index);
                button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enhancing...';
                
                const jobTitle = store.currentResume.work[index].jobTitle || store.currentResume.personal.jobTitle;
                const resp = await aiService.enhanceResponsibilities(jobTitle);
                
                const card = button.closest('.entry-card');
                const textarea = card.querySelector('textarea[data-field="responsibilities"]');
                textarea.value = resp;
                
                const list = [...store.currentResume.work];
                list[index].responsibilities = resp;
                store.update('work', list);
                
                button.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> AI Enhance';
            });
        });
    }
};
