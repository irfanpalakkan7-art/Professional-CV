const templates = {
    renderList(items, renderer) {
        if (!items || items.length === 0) return '';
        return items.map(renderer).join('');
    },

    commonCSS(data) {
        return `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&family=Roboto+Mono:wght@400;500&family=Montserrat:wght@300;400;500;600;700&display=swap');
                
                .resume-doc {
                    font-family: ${data.settings.fontFamily || 'Inter'}, sans-serif;
                    font-size: ${data.settings.fontSize || '14px'};
                    color: #333;
                    line-height: 1.5;
                    box-sizing: border-box;
                }
                .resume-doc * { box-sizing: border-box; }
                .resume-doc h1, .resume-doc h2, .resume-doc h3, .resume-doc h4 { margin: 0; color: ${data.settings.color || '#2563eb'}; }
                .resume-doc p { margin: 0 0 0.5rem 0; }
                .resume-doc ul { margin: 0 0 0.5rem 0; padding-left: 1.5rem; }
                
                .section-title {
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    border-bottom: 2px solid ${data.settings.color || '#2563eb'};
                    padding-bottom: 0.25rem;
                    margin-bottom: 1rem;
                    margin-top: 1.5rem;
                    font-size: 1.2em;
                }
                .item-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.25rem; }
                .item-title { font-weight: 600; font-size: 1.1em; color: #111; }
                .item-subtitle { font-style: italic; color: #555; }
                .item-date { font-size: 0.9em; color: #666; font-weight: 500; }
                
                .layout-2col { display: flex; gap: 2rem; }
                .col-main { flex: 2; }
                .col-side { flex: 1; }
            </style>
        `;
    },

    // 1. Corporate Executive
    template1(data) {
        return `
            ${this.commonCSS(data)}
            <div class="resume-doc" style="padding: 3rem 4rem;">
                <div style="text-align: center; border-bottom: 2px solid #ccc; padding-bottom: 1rem; margin-bottom: 2rem;">
                    <h1 style="font-size: 2.5em; margin-bottom: 0.5rem; color: #111;">${data.personal.fullName}</h1>
                    <h3 style="font-weight: 400; color: #555; margin-bottom: 0.5rem;">${data.personal.jobTitle}</h3>
                    <div style="font-size: 0.9em; color: #666; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
                        ${data.personal.email ? `<span>${data.personal.email}</span>` : ''}
                        ${data.personal.phone ? `<span>• ${data.personal.phone}</span>` : ''}
                        ${data.personal.location ? `<span>• ${data.personal.location}</span>` : ''}
                    </div>
                </div>
                ${this.renderCoreSections(data)}
            </div>
        `;
    },

    // 2. Modern Professional (Two Column)
    template2(data) {
        return `
            ${this.commonCSS(data)}
            <div class="resume-doc">
                <div style="background: ${data.settings.color}; color: white; padding: 3rem 4rem; display: flex; align-items: center; justify-content: space-between;">
                    <div>
                        <h1 style="font-size: 2.8em; color: white; margin-bottom: 0.5rem;">${data.personal.fullName}</h1>
                        <h3 style="font-weight: 300; font-size: 1.4em; color: rgba(255,255,255,0.8);">${data.personal.jobTitle}</h3>
                    </div>
                </div>
                <div class="layout-2col" style="padding: 2rem 4rem;">
                    <div class="col-main">${this.renderMainColumn(data)}</div>
                    <div class="col-side">${this.renderSideColumn(data)}</div>
                </div>
            </div>
        `;
    },

    // 3. ATS Friendly
    template3(data) {
        return `
            ${this.commonCSS(data)}
            <div class="resume-doc" style="padding: 2.5rem 3rem; font-family: 'Times New Roman', serif;">
                <div style="text-align: center;">
                    <h1 style="font-size: 2em; margin-bottom: 0.25rem; color: #000;">${data.personal.fullName}</h1>
                    <div style="font-size: 1em; color: #000; margin-bottom: 1rem;">
                        ${data.personal.location} | ${data.personal.phone} | ${data.personal.email}
                    </div>
                </div>
                ${this.renderATSSections(data)}
            </div>
        `;
    },

    // 4. Minimalist
    template4(data) {
        return `
            ${this.commonCSS(data)}
            <div class="resume-doc" style="padding: 4rem; font-family: 'Montserrat', sans-serif;">
                <h1 style="font-size: 3em; font-weight: 300; color: #111; margin-bottom: 0.2rem;">${data.personal.fullName}</h1>
                <h3 style="color: #888; font-weight: 300; letter-spacing: 2px; margin-bottom: 2rem;">${data.personal.jobTitle}</h3>
                ${this.renderMinimalSections(data)}
            </div>
        `;
    },

    // 5. Creative Designer
    template5(data) {
        return `
            ${this.commonCSS(data)}
            <div class="resume-doc" style="padding: 3rem; border: 8px solid ${data.settings.color}; height: 100%;">
                <div style="display: flex; gap: 2rem;">
                    <div style="flex: 1; border-right: 2px solid ${data.settings.color}; padding-right: 2rem;">
                        <h1 style="font-size: 4em; line-height: 1; color: ${data.settings.color}; margin-bottom: 1rem;">${data.personal.fullName.split(' ').join('<br>')}</h1>
                        <h3 style="color: #111; margin-bottom: 2rem;">${data.personal.jobTitle}</h3>
                        ${this.renderSideColumn(data)}
                    </div>
                    <div style="flex: 2;">${this.renderMainColumn(data)}</div>
                </div>
            </div>
        `;
    },

    // 6. Software Engineer
    template6(data) {
        return `
            ${this.commonCSS(data)}
            <div class="resume-doc" style="padding: 3rem; font-family: 'Roboto Mono', monospace; font-size: 0.9em;">
                <h1 style="color: ${data.settings.color};">${data.personal.fullName}_</h1>
                <h3 style="color: #666; margin-bottom: 1rem;">// ${data.personal.jobTitle}</h3>
                ${this.renderCoreSections(data, true)}
            </div>
        `;
    },

    // 7. Business Analyst
    template7(data) {
        return `
            ${this.commonCSS(data)}
            <div class="resume-doc" style="padding: 3rem;">
                <div style="background: #f4f4f5; padding: 2rem; border-radius: 8px; margin-bottom: 2rem;">
                    <h1 style="color: #111;">${data.personal.fullName}</h1>
                    <div style="color: ${data.settings.color}; font-weight: 600;">${data.personal.jobTitle}</div>
                </div>
                ${this.renderCoreSections(data)}
            </div>
        `;
    },

    // 8. Marketing Professional
    template8(data) {
        return `
            ${this.commonCSS(data)}
            <div class="resume-doc" style="padding: 0;">
                <div style="background: ${data.settings.color}; padding: 4rem 3rem 2rem 3rem; color: white; border-bottom-right-radius: 50px;">
                    <h1 style="color: white; font-size: 3em;">${data.personal.fullName}</h1>
                    <h3>${data.personal.jobTitle}</h3>
                </div>
                <div style="padding: 2rem 3rem;">${this.renderCoreSections(data)}</div>
            </div>
        `;
    },

    // 9. Academic CV
    template9(data) {
        return `
            ${this.commonCSS(data)}
            <div class="resume-doc" style="padding: 3rem; font-family: 'Playfair Display', serif;">
                <h1 style="text-align: center; border-bottom: 1px solid #000; padding-bottom: 1rem; margin-bottom: 2rem;">${data.personal.fullName}</h1>
                ${this.renderCoreSections(data)}
            </div>
        `;
    },

    // 10. Elegant Professional
    template10(data) {
        return `
            ${this.commonCSS(data)}
            <div class="resume-doc" style="padding: 3rem 4rem;">
                <div style="text-align: center; margin-bottom: 3rem;">
                    <h1 style="font-family: 'Playfair Display', serif; font-size: 2.8em; color: ${data.settings.color};">${data.personal.fullName}</h1>
                    <h3 style="letter-spacing: 3px; font-weight: 300; text-transform: uppercase;">${data.personal.jobTitle}</h3>
                </div>
                ${this.renderCoreSections(data)}
            </div>
        `;
    },

    // --- Helpers ---
    renderCoreSections(data, isMono = false) {
        return `
            ${data.personal.summary ? `
                <div>
                    <h2 class="section-title">Summary</h2>
                    <p>${data.personal.summary}</p>
                </div>
            ` : ''}
            ${data.work.length > 0 ? `
                <div>
                    <h2 class="section-title">Experience</h2>
                    ${this.renderList(data.work, w => `
                        <div style="margin-bottom: 1.5rem;">
                            <div class="item-header">
                                <span class="item-title">${w.jobTitle} ${isMono ? `@ ${w.company}` : ''}</span>
                                <span class="item-date">${w.startDate} - ${w.currentJob ? 'Present' : w.endDate}</span>
                            </div>
                            ${!isMono ? `<div class="item-subtitle" style="margin-bottom: 0.5rem;">${w.company}</div>` : ''}
                            ${w.responsibilities ? `<ul>${w.responsibilities.split('\n').filter(Boolean).map(r => `<li>${r}</li>`).join('')}</ul>` : ''}
                        </div>
                    `)}
                </div>
            ` : ''}
            ${data.education.length > 0 ? `
                <div>
                    <h2 class="section-title">Education</h2>
                    ${this.renderList(data.education, e => `
                        <div style="margin-bottom: 1rem;">
                            <div class="item-header">
                                <span class="item-title">${e.degree} in ${e.field}</span>
                                <span class="item-date">${e.startDate} - ${e.endDate}</span>
                            </div>
                            <div class="item-subtitle">${e.institution} ${e.gpa ? `| GPA: ${e.gpa}` : ''}</div>
                        </div>
                    `)}
                </div>
            ` : ''}
            ${data.skills.technical || data.skills.soft ? `
                <div>
                    <h2 class="section-title">Skills</h2>
                    ${data.skills.technical ? `<p><strong>Technical:</strong> ${data.skills.technical}</p>` : ''}
                    ${data.skills.soft ? `<p><strong>Soft Skills:</strong> ${data.skills.soft}</p>` : ''}
                </div>
            ` : ''}
            ${data.projects && data.projects.length > 0 ? `
                <div>
                    <h2 class="section-title">Projects</h2>
                    ${this.renderList(data.projects, p => `
                        <div style="margin-bottom: 1rem;">
                            <div class="item-header">
                                <span class="item-title">${p.name}</span>
                            </div>
                            ${p.tech ? `<div class="item-subtitle" style="margin-bottom: 0.25rem;">${p.tech}</div>` : ''}
                            ${p.description ? `<p style="font-size: 0.95em;">${p.description}</p>` : ''}
                        </div>
                    `)}
                </div>
            ` : ''}
            ${data.certifications && data.certifications.length > 0 ? `
                <div>
                    <h2 class="section-title">Certifications</h2>
                    ${this.renderList(data.certifications, c => `
                        <div style="margin-bottom: 0.5rem; display: flex; gap: 10px; align-items: flex-start;">
                            ${c.image ? `<img src="${c.image}" style="height: 40px; width: auto; border-radius: 4px; border: 1px solid #ccc;">` : ''}
                            <div style="flex: 1;">
                                <div class="item-header">
                                    <span class="item-title">${c.name}</span>
                                    <span class="item-date">${c.date}</span>
                                </div>
                                <div class="item-subtitle">${c.organization} ${c.credentialId ? `| ID: ${c.credentialId}` : ''}</div>
                            </div>
                        </div>
                    `)}
                </div>
            ` : ''}
        `;
    },

    renderMainColumn(data) {
        return this.renderCoreSections({ ...data, skills: { technical: '', soft: '', languages: '' }, education: [] });
    },

    renderSideColumn(data) {
        return `
            ${data.skills.technical || data.skills.soft ? `
                <div style="margin-bottom: 2rem;">
                    <h2 class="section-title">Skills</h2>
                    ${data.skills.technical ? `<div style="margin-bottom: 1rem;"><strong>Technical</strong><br>${data.skills.technical}</div>` : ''}
                    ${data.skills.soft ? `<div><strong>Soft</strong><br>${data.skills.soft}</div>` : ''}
                </div>
            ` : ''}
            ${data.education.length > 0 ? `
                <div>
                    <h2 class="section-title">Education</h2>
                    ${this.renderList(data.education, e => `
                        <div style="margin-bottom: 1rem;">
                            <div style="font-weight: 600;">${e.degree}</div>
                            <div style="color: #555;">${e.field}</div>
                            <div style="color: #888; font-size: 0.9em;">${e.institution}</div>
                        </div>
                    `)}
                </div>
            ` : ''}
        `;
    },

    renderATSSections(data) {
        return `
            <style>
                .section-title { border-bottom: 1px solid #000; color: #000; font-size: 1.1em; padding-bottom: 2px; margin-bottom: 0.5rem; }
            </style>
            ${this.renderCoreSections(data)}
        `;
    },

    renderMinimalSections(data) {
        return `
            <style>
                .section-title { border: none; font-weight: 300; font-size: 1.5em; margin-bottom: 1.5rem; color: #111; }
            </style>
            ${this.renderCoreSections(data)}
        `;
    },

    get(id, data) {
        if (this[id.replace('-', '')]) {
            return this[id.replace('-', '')](data);
        }
        return this.template1(data);
    }
};
