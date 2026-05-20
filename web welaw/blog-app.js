// --- BLOG ENGINE FOR WS ARCHIVES ---

document.addEventListener('DOMContentLoaded', () => {
    let posts = [];
    let currentLang = 'en';
    const contentEl = document.getElementById('archive-content');
    const titlebarEl = document.getElementById('archive-title');
    const i18nBtn = document.getElementById('i18n-switch');
    const langLabel = i18nBtn.querySelector('.lang-label');

    // OS Clock
    const updateTime = () => {
        document.getElementById('os-clock').textContent = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };
    setInterval(updateTime, 1000); updateTime();

    const fetchPosts = async () => {
        try {
            const res = await fetch('posts.json');
            posts = await res.json();
            render();
        } catch (e) {
            console.warn("WS_ARCHIVES: Local fetch blocked by CORS. Using embedded fall-back.");
            // Fall-back data for local preview
            posts = [
                {
                    "id": "ai-lab-program",
                    "date": "2026-03-17",
                    "author": "WS Executive Board",
                    "en": {
                        "title": "Building Your Alternate Infrastructure: The LatAm Tech-Business Bridge",
                        "excerpt": "We build your second AI executive team in 6 months so you can focus on scaling your business.",
                        "content": "<h2>The Alternate Infrastructure Program</h2><p>Our program is straightforward: we actively partner with the best companies for our program for a 6-month AI Lab journey. During the very first month, we deliver fully operational AI agents, immediately reducing your operational workload by at least 25%. From there, we build a personalized roadmap with periodic review and work sessions. By the end of the 6 months, you will have automated at least 70% of your operations, and more importantly, you will know exactly how to deploy, train, retrain, and integrate new agents without depending on anyone else. The AI Lab carries a fixed fee of $1,500 USD per month and includes the creation of custom AI agents, the setup of your orchestration platform, and our hands-on, highly personalized guidance.</p><p>We designed the WS AI Lab to be the first in Latin America capable of creating a complete alternate operational infrastructure in just 6 months. We literally build 'Second AI Directors,' Managers, and Assistants for every area of your business. The best way to explain this is through two of our recent partnerships:</p><h2>The 40-Year Legal Legacy</h2><p>A senior attorney came to us after working for 40 years the exact same way. He was managing over 200 active cases entirely alone. He wanted to rest, but he couldn't afford to hire a new team—training the right person, managing payroll, and overseeing errors was just too overwhelming. So, he joined our program.</p><p>In month one, we built an entire AI Legal Firm for him. We created a Managing Partner AI, specialized AI Attorneys across Commercial, Civil, and Administrative law, plus a drafting and expense assistant. We linked them securely to his Google Drive so they understand his files, collaborate with each other, and share deep memories of every client. We handed this to him ready to operate.</p><p>That's when the real work began. As he started using them, he ran into the friction of managing a 'new firm.' Through multiple hands-on sessions each month, we adjusted the architecture, refining the agents based on his direct feedback, and taught him how to program alongside us. By the end of the program, he has absolute control over his agents. He knows how to train them, scale them, and maintain them. We successfully gave him the tools to build his optimal team, and we moved on to our next client.</p><h2>The Unbreakable Family Business</h2><p>We partnered with a traditional, family-owned furniture retailer. They had many highly siloed departments: Finance handled by a brother, Administration run by the same person for 20 years without formal direction, a Production Engineer, a Logistics team of three coordinating delivery trucks, an external accountant, and Sales—the heart of the operation that needed to know everything.</p><p>During the first month, we built a 'second brain' for every department head. Each received a personalized assistant that responds to voice dictation to handle scheduling, internal communication, memos, and coordination. As the months continued, we analyzed their interactions during our work sessions and kept adding operational capabilities: generating financial reports, reconciling inventory, drafting contracts, handling work orders, and creating delivery receipts.</p><p>What we achieved together was a resilient organism. Today, if someone goes on vacation, a colleague just consults that person's AI assistant, who knows everything. If someone gets sick, anyone with a bit of company knowledge can step in, get up to speed instantly, and keep the work flowing. Everyone knows what they need to do. The agents execute the heavy operational lifting, leaving the vital, revenue-generating tasks to the humans. By the end of the program, no internal crisis can break them, because they built the perfect agentic communication tool alongside us in the AI Lab, and they know exactly how to train and command it.</p>"
                    },
                    "es": {
                        "title": "Construyendo tu Infraestructura Alterna: El Puente Tecno-Comercial en LatAm",
                        "excerpt": "Construimos tu segundo equipo directivo de IA en 6 meses para que tú te enfoques en escalar tu negocio.",
                        "content": "<h2>El Programa de Infraestructura Alterna</h2><p>Nuestro programa es sencillo: solo aceptamos a las mejores compañías para nuestro programa durante un ciclo de 6 meses. El primer mes siempre entregamos agentes listos para trabajar, logrando que tu carga laboral baje al menos un 25% de inmediato, medido directamente con los agentes. A partir de ahí, trazamos un plan personalizado con sesiones periódicas de revisión y trabajo de la mano contigo. Al finalizar los seis meses, tendrás automatizado al menos el 70% de tus operaciones y sabrás montar tu propio sistema, entrenar, reentrenar y sumar nuevos agentes sin depender de nadie. El AI Lab tiene un fee fijo de $1,500 USD mensuales, e incluye la creación de agentes IA personalizados, el montaje de la plataforma de orquestación y nuestro seguimiento intensivo en tu plan de trabajo.</p><p>Hemos desarrollado nuestro AI Lab como el primero en Latinoamérica en crear tu infraestructura alterna completa en solo 6 meses, creando segundos Directores IA para cada área de tu empresa, Gerentes y Asistentes IA operativos. Para explicar mejor en qué consiste, lo contaré a través de dos ejemplos:</p><h2>El Legado Legal de 40 Años</h2><p>Llegó con nosotros un abogado que llevaba trabajando 40 años de la misma manera. Actualmente tenía más de 200 juicios que llevaba él solo; quería descansar pero no podía permitirse tener nueva gente por el desgaste de capacitar, encontrar a la persona adecuada o absorber la nómina. Decidió entrar al programa.</p><p>En el primer mes creamos para él una Firma Legal IA: un Socio Director IA, Abogados IA especializados en Derecho Mercantil, Civil y Administrativo, además de un asistente de redacción, agenda y gastos. Todos con acceso seguro a su propio Google Drive para que se entiendan, colaboren entre ellos y compartan memorias de cada cliente. Se lo entregamos listo para operar.</p><p>Ahí es donde realmente comienza la integración. Al operar, se topó con los problemas típicos de dirigir una 'firma nueva'. A través de múltiples reuniones al mes, realizamos ajustes basados en su plan de trabajo y le enseñamos a programar junto con nosotros. Al final del programa, él tiene control absoluto de sus agentes. Sabe cómo entrenarlos, mantenerlos y hacerlos crecer. Le dimos nuestras herramientas para que siga construyendo el equipo de lo que ya hace, de manera independiente, y nosotros continuamos con el siguiente cliente.</p><h2>La Empresa Familiar Inquebrantable</h2><p>Llegó con nosotros una empresa familiar dedicada a vender muebles, con muchos departamentos desconectados: finanzas a cargo de un hermano, administración llevada por la misma persona desde hace 20 años, un departamento de producción con un ingeniero, una logística con tres personas coordinando entregas, un contador externo y, finalmente, ventas, el corazón de la operación que necesita saber todo.</p><p>El primer mes les construimos un 'segundo cerebro' a cada cabeza de departamento: un asistente personal al que, por medio de dictarle con la voz, le delegan labores de agenda, envío de mensajes internos, memos y coordinación. Continuamos con ellos teniendo varias reuniones al mes. En cada revisión, analizábamos a sus asistentes y seguíamos sumando funcionalidades: hacer reportes, inventarios, escritos, contratos, arqueos, órdenes de trabajo y recibos de entrega.</p><p>Lo que logramos al final es un sistema donde, si alguien se va de vacaciones, solo se le pregunta a su asistente y él lo sabe todo. Si alguien se enferma, cualquier persona que conozca un poco la empresa puede tomar a su asistente, ponerse al día y tener todo el trabajo actualizado. Los agentes IA hacen el trabajo pesado, y el personal se concentra en las labores importantes de verdad; le dejamos las tareas que generan dinero a los humanos. Al final del programa, no los puede mover ninguna crisis, ya que saben cómo entrenar, crear y dirigir la herramienta de comunicación algorítmica perfecta para ellos, porque la desarrollamos juntos en el laboratorio.</p>"
                    }
                },
                {
                    "id": "business-case-autonomous-agents",
                    "date": "2026-03-16",
                    "author": "WS Strategy Unit",
                    "en": {
                        "title": "Why Your Company Needs to Own Its Agent System",
                        "excerpt": "The ROI of custom orchestration vs. closed SaaS platforms.",
                        "content": "<h2>The SaaS Trap</h2><p>Relying on closed SaaS platforms for artificial intelligence usually results in fragmented workflows and data silos. While they offer quick onboarding, they inherently limit your ability to deeply integrate AI into your unique operational fabric.</p><h2>The Value of Custom Orchestration</h2><p>Investing in your own agentic orchestration platform is a paradigm shift. Although it requires an upfront commitment—such as our <a href=\"blog.html?post=ai-lab-program\">AI Lab Program</a> ($1,500/month for 6 months)—the ROI is massive. You gain the ability to deploy bespoke agents that perfectly understand your specific context. More importantly, when you own the underlying architecture, your operational capacity scales infinitely without your software overhead scaling with it.</p>"
                    },
                    "es": {
                        "title": "Por qué tu empresa necesita ser dueña de su sistema de agentes",
                        "excerpt": "El ROI de la orquestación personalizada vs. plataformas SaaS cerradas.",
                        "content": "<h2>La Trampa del SaaS</h2><p>Depender de plataformas SaaS cerradas para inteligencia artificial usualmente resulta en flujos de trabajo fragmentados y silos de datos. Aunque ofrecen un inicio rápido, limitan inherentemente tu capacidad para integrar profundamente la IA en tu tejido operativo único.</p><h2>El Valor de la Orquestación Personalizada</h2><p>Invertir en tu propia plataforma de orquestación agéntica es un cambio de paradigma. Aunque requiere un compromiso inicial—como nuestro <a href=\"blog.html?post=ai-lab-program\">Programa AI Lab</a> ($1,500/mes por 6 meses)—el ROI es masivo. Ganas la capacidad de desplegar agentes a medida que entienden perfectamente tu contexto específico. Más importante aún, cuando eres dueño de la arquitectura subyacente, tu capacidad operativa escala infinitamente sin que tus costos de software escalen con ella.</p>"
                    }
                },
                {
                    "id": "intro-ai-latam",
                    "date": "2026-03-14",
                    "author": "WS Research Hub",
                    "en": {
                        "title": "The Breach: Why LatAm is the Next Frontier for AI Labs",
                        "excerpt": "Analyzing the operational gap in Latin America and how high-fidelity AI agents can close it.",
                        "content": "<h2>The operational gap</h2><p>Latin America has always suffered from a systemic infrastructure vacuum. While the global north optimization focus is on incremental gains, in LatAm, we are solving for zero-to-one infrastructure. Most businesses, even successful ones, spend 80% of their bandwidth on 'administrative noise'—legal hurdles, accounting complexity, and manual operations that have remained unchanged for decades.</p><h2>The AI solution</h2><p>WS Capital identifies this gap as the single largest opportunity for agentic deployment. By implementing networks that assume these roles with 99% precision, we allow the 20% of human talent—the genuine LatAm creativity and grit—to operate at 100% capacity. This isn't just about microchips; it's about freedom to execute.</p>"
                    },
                    "es": {
                        "title": "La Brecha: Por qué LatAm es la Nueva Frontera para los Laboratorios de IA",
                        "excerpt": "Analizando el hueco operativo en Latinoamérica y cómo los agentes de IA pueden cerrarlo.",
                        "content": "<h2>El vacío operativo</h2><p>Latinoamérica siempre ha sufrido de un vacío infraestructural sistémico. Mientras que el norte global se enfoca en mejoras incrementales, en LatAm resolvemos por infraestructura de cero a uno. La mayoría de los negocios gastan el 80% de su capacidad en 'ruido administrativo'—trabas legales, complejidad contable y operaciones manuales que no han cambiado en décadas.</p><h2>La solución IA</h2><p>WS Capital identifica esta brecha como la oportunidad más grande para el despliegue agéntico. Al implementar redes que asumen estos roles con precisión del 99%, permitimos que el 20% del talento humano opere al 100% de su capacidad. No se trata solo de chips; se trata de la libertad para ejecutar.</p>"
                    }
                },
                {
                    "id": "mckinsey-for-all",
                    "date": "2026-03-12",
                    "author": "Data Unit 04",
                    "en": {
                        "title": "Democratizing Elite Data Architectures",
                        "excerpt": "Bringing McKinsey-level strategic research to the independent entrepreneur.",
                        "content": "<h2>Information Asymmetry</h2><p>Historically, high-level strategic data was gate-kept by massive consulting firms and prohibitive price tags. This creates an unfair advantage for incumbents. WS Capital is building a gateway based on open-source intelligence architectures and Andrej Karpathy's LLM research to break this wall.</p><h2>The Open Protocol</h2><p>Our goal is simple: an entrepreneur in a garage in Medellin should have the same research power as a VP in Manhattan. We are mapping global industry patterns into a queryable, high-fidelity knowledge graph accessible to all our partners.</p>"
                    },
                    "es": {
                        "title": "Democratizando la Arquitectura de Datos de Élite",
                        "excerpt": "Llevando la investigación estratégica nivel McKinsey al emprendedor independiente.",
                        "content": "<h2>Asimetría de Información</h2><p>Históricamente, los datos estratégicos de alto nivel estaban bloqueados por grandes consultoras y precios prohibitivos. WS Capital está construyendo un portal basado en arquitecturas de inteligencia open-source e investigación de Karpathy para romper este muro.</p><h2>The Open Protocol</h2><p>Nuestro objetivo es simple: un emprendedor en Medellín debería tener el mismo poder de investigación que un VP en Manhattan. Estamos mapeando patrones industriales globales en un grafo de conocimiento de alta fidelidad accesible para todos nuestros socios.</p>"
                    }
                }
            ];
            render();
        }
    };

    const getParam = (name) => new URLSearchParams(window.location.search).get(name);

    const render = () => {
        const postId = getParam('post');
        if (postId) {
            renderPost(postId);
        } else {
            renderIndex();
        }
    };

    const renderIndex = () => {
        titlebarEl.textContent = currentLang === 'en' ? "ARCHIVES:/ROOT" : "ARCHIVOS:/RAIZ";
        
        let html = `
            <div class="archives-header">
                <h2 class="pixel-heading sm">${currentLang === 'en' ? 'Intelligence Repository' : 'Repositorio de Inteligencia'}</h2>
                <p class="mono-label">${currentLang === 'en' ? 'Select a volume to analyze' : 'Selecciona un volumen para analizar'}</p>
            </div>
            <div class="post-list">
        `;

        posts.forEach(post => {
            const data = post[currentLang];
            html += `
                <article class="post-card" onclick="window.location.search = '?post=${post.id}'">
                    <div class="post-meta">[ DATE: ${post.date} ] [ AUTHOR: ${post.author} ]</div>
                    <div class="post-title">${data.title}</div>
                    <div class="text-dim">${data.excerpt}</div>
                </article>
            `;
        });

        html += `</div>`;
        contentEl.innerHTML = html;
    };

    const renderPost = (id) => {
        const post = posts.find(p => p.id === id);
        if (!post) {
            window.location.search = '';
            return;
        }

        const data = post[currentLang];
        titlebarEl.textContent = `ARCHIVES:/VOL/${post.id.toUpperCase()}`;

        contentEl.innerHTML = `
            <div class="article-reader">
                <a class="back-link" onclick="window.location.search = ''"><- ${currentLang === 'en' ? 'Back to Root' : 'Volver a la Raíz'}</a>
                <div class="post-meta">[ VOLUME RESEARCH: ${post.id} ] [ ARCHIVED: ${post.date} ]</div>
                <h1 class="pixel-heading md">${data.title}</h1>
                <div class="article-content mt-lg">
                    ${data.content}
                </div>
            </div>
        `;
    };

    const modal = document.getElementById('lng-modal');
    const closeBtn = modal.querySelector('.close-modal');

    i18nBtn.addEventListener('click', () => {
        modal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    document.querySelectorAll('.lang-opt').forEach(opt => {
        opt.addEventListener('click', () => {
            currentLang = opt.getAttribute('data-lang');
            langLabel.textContent = currentLang.toUpperCase();
            document.body.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
            render();
            modal.classList.remove('active');
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    fetchPosts();
});
