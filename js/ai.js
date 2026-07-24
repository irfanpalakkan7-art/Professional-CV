const aiService = {
    summaries: {
        'Software Engineer': [
            'Results-oriented Software Engineer with 5+ years of experience designing, developing, and deploying scalable web applications. Proficient in JavaScript, React, and Node.js. Strong problem-solving skills and a proven track record of optimizing application performance.',
            'Passionate Software Engineer skilled in full-stack development. Experienced in building robust APIs, microservices, and responsive user interfaces. Adept at working in Agile environments and collaborating with cross-functional teams to deliver high-quality software.'
        ],
        'Marketing Professional': [
            'Creative and data-driven Marketing Professional with a proven history of executing successful digital campaigns. Expert in SEO, content marketing, and social media strategy. Skilled in increasing brand awareness and driving customer acquisition.',
            'Strategic Marketing Specialist with strong analytical skills. Experienced in market research, campaign management, and performance tracking. Dedicated to maximizing ROI and enhancing customer engagement through targeted marketing initiatives.'
        ],
        'Business Analyst': [
            'Detail-oriented Business Analyst with expertise in requirements gathering, process modeling, and data analysis. Proven ability to bridge the gap between business needs and technology solutions. Adept at driving operational efficiency and supporting strategic decision-making.',
            'Analytical Business Analyst experienced in evaluating business processes, uncovering areas for improvement, and implementing effective solutions. Strong communication skills and a track record of successfully managing cross-functional projects.'
        ],
        'Graphic Designer': [
            'Creative Graphic Designer with an eye for detail and a passion for visual storytelling. Proficient in Adobe Creative Suite and experienced in developing brand identities, marketing materials, and digital assets. Committed to delivering innovative and impactful design solutions.',
            'Versatile Graphic Designer skilled in translating complex concepts into engaging visual representations. Experienced in web design, typography, and illustration. Dedicated to creating aesthetically pleasing and user-centric designs.'
        ]
    },

    skills: {
        'Software Engineer': 'JavaScript, React, Node.js, Python, Java, SQL, Git, Docker, Kubernetes, AWS, Agile, Problem Solving',
        'Marketing Professional': 'SEO, SEM, Content Marketing, Social Media Marketing, Email Marketing, Google Analytics, Market Research, Communication, Creativity',
        'Business Analyst': 'Requirements Gathering, Process Modeling, Data Analysis, SQL, Tableau, Agile, Scrum, Communication, Problem Solving',
        'Graphic Designer': 'Adobe Creative Suite (Photoshop, Illustrator, InDesign), UI/UX Design, Typography, Branding, Creativity, Attention to Detail'
    },

    responsibilities: {
        'Software Engineer': [
            'Designed, developed, and maintained scalable web applications using React and Node.js.',
            'Collaborated with cross-functional teams to define, design, and ship new features.',
            'Optimized application performance, resulting in a 20% decrease in load times.',
            'Participated in code reviews to ensure code quality and maintainability.'
        ],
         'Marketing Professional': [
             'Developed and executed comprehensive digital marketing campaigns.',
             'Managed social media accounts, increasing follower engagement by 30%.',
             'Conducted market research to identify trends and opportunities.',
             'Analyzed campaign performance using Google Analytics.'
         ],
         'Business Analyst': [
             'Gathered and documented business requirements for new software projects.',
             'Created process models and flowcharts to identify areas for improvement.',
             'Collaborated with stakeholders to ensure solutions met business needs.',
             'Conducted data analysis to support strategic decision-making.'
         ],
         'Graphic Designer': [
             'Created engaging visual content for marketing materials, including brochures, flyers, and social media posts.',
             'Developed brand identities, including logos and color palettes.',
             'Designed user interfaces for web and mobile applications.',
             'Collaborated with clients to understand their design needs and deliver satisfactory results.'
         ]
    },

    async generateSummary(jobTitle) {
        return new Promise(resolve => {
            setTimeout(() => {
                const title = jobTitle || 'Software Engineer';
                const options = this.summaries[title] || this.summaries['Software Engineer'];
                resolve(options[Math.floor(Math.random() * options.length)]);
            }, 1000); // Simulate network latency
        });
    },

    async suggestSkills(jobTitle) {
        return new Promise(resolve => {
            setTimeout(() => {
                const title = jobTitle || 'Software Engineer';
                resolve(this.skills[title] || this.skills['Software Engineer']);
            }, 800);
        });
    },

    async enhanceResponsibilities(jobTitle) {
        return new Promise(resolve => {
            setTimeout(() => {
                 const title = jobTitle || 'Software Engineer';
                 const points = this.responsibilities[title] || this.responsibilities['Software Engineer'];
                 resolve(points.join('\\n'));
            }, 1200);
        });
    }
};
