/* ==========================================================================
   Mohamed Abdulhamid Tahawy - Portfolio Interactive Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Typing Effect in Hero
  const typingElement = document.getElementById('typingText');
  const phrases = [
    'Enterprise RAG & Autonomous Agent Pipelines',
    'Low-Latency Telemetry & Network Threat Intelligence (~200ms)',
    'Multimodal Vision-to-Language Deep Learning',
    'Quantitative Algorithmic Systems (89.5% Win Rate)',
    'Scalable MLOps & AWS Cloud Architecture (MLA-C01)'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 70;
  const deletingSpeed = 40;
  const pauseEnd = 2000;

  function typeEffect() {
    if (!typingElement) return;
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 500;
    }

    setTimeout(typeEffect, delay);
  }

  typeEffect();

  // 2. Navbar Scroll Style & Active Link Tracking
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header blur/bg toggle
    if (scrollPos > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (scrollPos > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // Active link highlighting
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // 3. Mobile Navigation Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinksContainer = document.getElementById('navLinks');

  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
      mobileToggle.classList.toggle('open');
    });

    // Close mobile menu on clicking any link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
        mobileToggle.classList.remove('open');
      });
    });
  }

  // 4. Project Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 5. Terminal Simulator Logic
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalSendBtn = document.getElementById('terminalSendBtn');

  const terminalCommands = {
    help: () => `Available commands:
  • <span style="color:var(--cyan-accent)">whoami</span>       : Display engineer profile summary
  • <span style="color:var(--cyan-accent)">skills</span>       : List core technical competencies & stack
  • <span style="color:var(--cyan-accent)">projects</span>     : Show featured AI & Machine Learning projects
  • <span style="color:var(--cyan-accent)">certs</span>        : List verified industry certifications (MLA-C01, AI, etc.)
  • <span style="color:var(--cyan-accent)">contact</span>      : Display direct contact channels & links
  • <span style="color:var(--cyan-accent)">hire</span>         : Why hire Mohamed Abdulhamid Tahawy?
  • <span style="color:var(--cyan-accent)">resume</span>       : Download the latest Master CV PDF
  • <span style="color:var(--cyan-accent)">clear</span>        : Clear the terminal console output`,

    whoami: () => `Mohamed Abdulhamid Tahawy
AI & Machine Learning Engineer | AWS Certified MLA-C01
B.Sc. in Computer Science & AI (Grade: Very Good)
Technical Instructor & Lead at NTI (90h curriculum delivered to 50+ engineers).`,

    skills: () => `<span style="color:var(--cyan-accent)">[Generative AI]</span> : Enterprise RAG, ChromaDB, Gemini API, Multi-Turn Agents, ReAct.
<span style="color:var(--purple-accent)">[Computer Vision]</span> : YOLOv8, OCR (Tesseract/OpenCV), Image Captioning, CCTV Analytics.
<span style="color:var(--blue-accent)">[Deep Learning]</span> : PyTorch, TensorFlow, Scikit-learn, Model Quantization, Anomaly Detection.
<span style="color:var(--emerald-accent)">[Cloud & MLOps]</span> : AWS (MLA-C01), Docker, FastAPI, Linux VPS, Nginx, PM2, Git.`,

    projects: () => `1. <span style="color:var(--cyan-accent)">FlowWatch-AI</span> : Real-Time Threat Intelligence (~200ms detection latency, Streamlit).
2. <span style="color:var(--cyan-accent)">EduBot</span>        : Scanned Textbook OCR-to-Vector RAG Engine (ChromaDB, Gemini API).
3. <span style="color:var(--cyan-accent)">Trading Bot</span>   : Automated MT5 Algorithmic Engine (89.5% win rate, 24/7 VPS).
4. <span style="color:var(--cyan-accent)">I-Monitor</span>     : Multimodal Vision-to-Language Assistive System (COCO 2017).
5. <span style="color:var(--cyan-accent)">Bank Chatbot</span>  : Bilingual Enterprise Assistant with dynamic JSON stateful memory.`,

    certs: () => `• 🏅 AWS Certified Machine Learning Engineer - Associate (MLA-C01, 2026)
• 🏅 AWS Certified AI Practitioner (Oct 2025)
• 🏅 AWS Certified Cloud Practitioner (Feb 2025)
• 🏅 Huawei HCCDA - AI (Oct 2025)
• 🏅 NVIDIA Deep Learning Institute (DLI) (Sep 2025)
• 🏅 DEPI AWS ML Engineer & Team Leader Honor (182h)`,

    contact: () => `Email    : <a href="mailto:mohamed7tahawy@gmail.com">mohamed7tahawy@gmail.com</a>
Phone    : +20 1016483150
LinkedIn : <a href="https://linkedin.com/in/mohamedtahawy" target="_blank">linkedin.com/in/mohamedtahawy</a>
GitHub   : <a href="https://github.com/MohammedTahawy" target="_blank">github.com/MohammedTahawy</a>
Location : Cairo / Giza, Egypt (Available Remote Worldwide)`,

    hire: () => `<span style="color:#22c55e">✓ Certified AWS ML Engineer (MLA-C01) with production deployment experience.</span>
<span style="color:#22c55e">✓ Proven track record with sub-second ML pipelines (~200ms) & high-yield algorithms.</span>
<span style="color:#22c55e">✓ Technical leadership & clear communication (mentored 50+ engineers at NTI).</span>
<span style="color:#22c55e">✓ Autonomous ownership from data modeling to containerized cloud deployment.</span>`,

    resume: () => {
      window.open('Mohamed Abdulhamid Tahawy CV.pdf', '_blank');
      return `Opening Master Resume: Mohamed Abdulhamid Tahawy CV.pdf...`;
    },

    clear: () => {
      terminalOutput.innerHTML = '';
      return '';
    }
  };

  window.runCommand = function (cmd) {
    if (!terminalOutput) return;

    // Append prompt line
    const promptLine = document.createElement('div');
    promptLine.className = 't-line';
    promptLine.innerHTML = `<span class="t-prompt">tahawy@ai-workstation:~$</span> <span class="t-cmd">${escapeHtml(cmd)}</span>`;
    terminalOutput.appendChild(promptLine);

    const cleanCmd = cmd.trim().toLowerCase();

    if (cleanCmd === 'clear') {
      terminalOutput.innerHTML = '';
    } else if (terminalCommands[cleanCmd]) {
      const respLine = document.createElement('div');
      respLine.className = 't-line t-resp';
      respLine.innerHTML = terminalCommands[cleanCmd]();
      terminalOutput.appendChild(respLine);
    } else if (cleanCmd === '') {
      // Empty
    } else {
      const errLine = document.createElement('div');
      errLine.className = 't-line t-resp';
      errLine.innerHTML = `<span style="color:#ef4444">zsh: command not found: ${escapeHtml(cleanCmd)}. Type <span style="color:var(--cyan-accent)">help</span> for available commands.</span>`;
      terminalOutput.appendChild(errLine);
    }

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  };

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value;
        if (val.trim()) {
          runCommand(val);
          terminalInput.value = '';
        }
      }
    });
  }

  if (terminalSendBtn && terminalInput) {
    terminalSendBtn.addEventListener('click', () => {
      const val = terminalInput.value;
      if (val.trim()) {
        runCommand(val);
        terminalInput.value = '';
      }
    });
  }

  // Helper escape
  function escapeHtml(string) {
    return String(string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // 6. Certificate Lightbox Modal
  window.openCertModal = function (imgSrc, title) {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('certModalImg');
    const modalTitle = document.getElementById('certModalTitle');

    if (imgSrc.toLowerCase().endsWith('.pdf')) {
      window.open(imgSrc, '_blank');
      return;
    }

    modalImg.src = imgSrc;
    modalTitle.textContent = title;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeCertModal = function () {
    const modal = document.getElementById('certModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCertModal();
    }
  });

  // 7. Click to Copy Email
  window.copyToClipboard = function (text, btnElement) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied to clipboard: ${text}`);
      const tooltip = btnElement.querySelector('.copy-tooltip');
      if (tooltip) {
        const originalText = tooltip.textContent;
        tooltip.textContent = 'Copied!';
        setTimeout(() => {
          tooltip.textContent = originalText;
        }, 2000);
      }
    }).catch(err => {
      console.error('Clipboard copy failed:', err);
    });
  };

  // 8. Toast Notification Utility
  window.showToast = function (message) {
    const container = document.getElementById('toast');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--cyan-accent)"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  // 9. Contact Form Submission
  window.handleFormSubmit = function (e) {
    e.preventDefault();
    const name = document.getElementById('senderName').value;
    const email = document.getElementById('senderEmail').value;
    const subject = document.getElementById('senderSubject').value;
    const message = document.getElementById('senderMessage').value;

    const mailtoUrl = `mailto:mohamed7tahawy@gmail.com?subject=${encodeURIComponent(`[Portfolio Inquiry] ${subject} - from ${name}`)}&body=${encodeURIComponent(`Sender: ${name} (${email})\n\nMessage:\n${message}`)}`;

    showToast('Redirecting to your email client to send message...');
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 600);
  };
});
