document.addEventListener('DOMContentLoaded', function () {
  const rootElement = document.documentElement;
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuIcon = document.getElementById('mobileMenuIcon');
  const navLinksContainer = document.getElementById('navLinks');
  const navLinks = document.querySelectorAll('.nav-link');
  const contactForm = document.getElementById('contactForm');
  const formNotification = document.getElementById('formNotification');
  const nameInput = document.getElementById('contactName');
  const messageInput = document.getElementById('contactMessage');
  const messageError = document.getElementById('contactMessageError');
  const publicToggle = document.getElementById('publicToggle');
  const charCounter = document.getElementById('charCounter');
  const submitBtn = document.getElementById('submitBtn');
  const confirmModal = document.getElementById('confirmModal');
  const confirmCancelBtn = document.getElementById('confirmCancelBtn');
  const confirmSubmitBtn = document.getElementById('confirmSubmitBtn');
  const recentQuestionsList = document.getElementById('recentQuestionsList');
  const recentCount = document.getElementById('recentCount');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const currentYearSpan = document.getElementById('currentYear');
  const galleryItems = document.querySelectorAll('.gallery-card');
  const modalBackdrop = document.getElementById('galleryModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  function applyTheme(theme) {
    rootElement.setAttribute('data-theme', theme);
    localStorage.setItem('abdi_portfolio_theme', theme);
    if (theme === 'light') {
      if (themeIcon) themeIcon.textContent = 'dark_mode';
      if (themeText) themeText.textContent = 'Dark';
    } else {
      if (themeIcon) themeIcon.textContent = 'light_mode';
      if (themeText) themeText.textContent = 'Light';
    }
  }

  const savedTheme = localStorage.getItem('abdi_portfolio_theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
      const current = rootElement.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', function () {
      navLinksContainer.classList.toggle('mobile-open');
      const isOpen = navLinksContainer.classList.contains('mobile-open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (mobileMenuIcon) {
        mobileMenuIcon.textContent = isOpen ? 'close' : 'menu';
      }
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navLinksContainer && navLinksContainer.classList.contains('mobile-open')) {
        navLinksContainer.classList.remove('mobile-open');
        if (mobileMenuBtn) {
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
        if (mobileMenuIcon) {
          mobileMenuIcon.textContent = 'menu';
        }
      }
    });
  });

  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', function () {
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });

    if (scrollTopBtn) {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  galleryItems.forEach(function (card) {
    card.addEventListener('click', function () {
      const img = card.querySelector('.gallery-image');
      const title = card.querySelector('.gallery-title');
      const desc = card.querySelector('.gallery-desc');

      if (img && modalImg) {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
      }
      if (title && modalTitle) {
        modalTitle.textContent = title.textContent;
      }
      if (desc && modalDesc) {
        modalDesc.textContent = desc.textContent;
      }
      if (modalBackdrop) {
        modalBackdrop.classList.add('open');
      }
    });
  });

  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('open');
    }
    if (confirmModal) {
      confirmModal.classList.remove('open');
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', function (e) {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  if (confirmCancelBtn) {
    confirmCancelBtn.addEventListener('click', function () {
      if (confirmModal) {
        confirmModal.classList.remove('open');
      }
    });
  }

  if (confirmModal) {
    confirmModal.addEventListener('click', function (e) {
      if (e.target === confirmModal) {
        confirmModal.classList.remove('open');
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function formatDisplayDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString();
  }

  function renderQuestionHTML(q) {
    const replyHTML = q.reply
      ? '<div class="recent-q-reply"><div class="recent-q-reply-badge">Abdi replied:</div><div class="recent-q-text">' + escapeHtml(q.reply) + '</div></div>'
      : '';
    return (
      '<div class="recent-question-card">' +
      '<div class="recent-q-header">' +
      '<div class="recent-q-name">' + escapeHtml(q.name || 'Anonymous') + '</div>' +
      '<div class="recent-q-date">' + formatDisplayDate(q.createdAt) + '</div>' +
      '</div>' +
      '<p class="recent-q-text">' + escapeHtml(q.question) + '</p>' +
      replyHTML +
      '</div>'
    );
  }

  function loadRecentQuestions() {
    if (!recentQuestionsList) return;
    fetch('https://storebox.abdipr.workers.dev/ask')
      .then(function (res) {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(function (res) {
        if (res.data && Array.isArray(res.data)) {
          const publicQuestions = res.data.filter(function (q) {
            return q && q.isPublic;
          });
          if (recentCount) {
            recentCount.textContent = '(' + publicQuestions.length + ')';
          }
          if (publicQuestions.length === 0) {
            recentQuestionsList.innerHTML = '<div style="font-size: 12.5px; color: var(--text-muted); text-align: center; padding: 14px;">No public questions yet. Be the first!</div>';
            return;
          }
          let html = '';
          publicQuestions.forEach(function (q) {
            html += renderQuestionHTML(q);
          });
          recentQuestionsList.innerHTML = html;
        } else {
          recentQuestionsList.innerHTML = '<div style="font-size: 12.5px; color: var(--text-muted); text-align: center; padding: 14px;">No public questions yet.</div>';
        }
      })
      .catch(function () {
        if (recentQuestionsList) {
          recentQuestionsList.innerHTML = '<div style="font-size: 12.5px; color: var(--text-muted); text-align: center; padding: 14px;">Could not load recent questions.</div>';
        }
      });
  }

  loadRecentQuestions();

  if (messageInput && charCounter) {
    messageInput.addEventListener('input', function () {
      const len = messageInput.value.length;
      charCounter.textContent = len + '/1000';
      if (messageError) {
        messageError.textContent = '';
        messageError.classList.remove('visible');
      }
      messageInput.classList.remove('invalid');
      if (formNotification) {
        formNotification.className = 'form-notification';
        formNotification.textContent = '';
      }
    });
  }

  function executeSubmit() {
    if (confirmModal) {
      confirmModal.classList.remove('open');
    }

    const cleanText = messageInput ? messageInput.value.trim() : '';
    if (!cleanText) return;

    const authorName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Anonymous';
    const isPublic = publicToggle ? Boolean(publicToggle.checked) : true;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
    }

    const payload = {
      name: authorName,
      question: cleanText,
      isPublic: isPublic
    };

    fetch('https://storebox.abdipr.workers.dev/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        return res.json().then(function (data) {
          if (!res.ok || !data.success) {
            throw new Error(data.error || 'Failed to submit');
          }
          return data;
        });
      })
      .then(function (data) {
        if (formNotification) {
          formNotification.className = 'form-notification success';
          formNotification.innerHTML = '<strong>Message sent.</strong> Thank you for your message!';
        }
        if (submitBtn) {
          submitBtn.textContent = 'Sent!';
        }

        if (isPublic && recentQuestionsList) {
          const newQHTML = renderQuestionHTML({
            id: data.id || Date.now().toString(),
            name: payload.name,
            question: payload.question,
            createdAt: new Date().toISOString(),
            reply: null
          });
          const currentEmpty = recentQuestionsList.querySelector('div');
          if (currentEmpty && currentEmpty.textContent.indexOf('No public questions') !== -1) {
            recentQuestionsList.innerHTML = newQHTML;
          } else {
            recentQuestionsList.insertAdjacentHTML('afterbegin', newQHTML);
          }
          if (recentCount) {
            const currentCount = parseInt(recentCount.textContent.replace(/\D/g, ''), 10) || 0;
            recentCount.textContent = '(' + (currentCount + 1) + ')';
          }
        }

        setTimeout(function () {
          if (nameInput) nameInput.value = '';
          if (messageInput) messageInput.value = '';
          if (charCounter) charCounter.textContent = '0/1000';
          if (publicToggle) publicToggle.checked = true;
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Question';
          }
        }, 2200);
      })
      .catch(function () {
        if (formNotification) {
          formNotification.className = 'form-notification error';
          formNotification.textContent = 'Failed to submit question. Please try again.';
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Question';
        }
      });
  }

  if (confirmSubmitBtn) {
    confirmSubmitBtn.addEventListener('click', executeSubmit);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const cleanText = messageInput ? messageInput.value.trim() : '';

      if (!cleanText) {
        if (messageError) {
          messageError.textContent = 'Please enter your message.';
          messageError.classList.add('visible');
        }
        if (messageInput) messageInput.classList.add('invalid');
        return;
      }

      const words = cleanText.split(/\s+/).filter(Boolean);
      if (words.length <= 3) {
        if (messageError) {
          messageError.textContent = 'Please add more words :)';
          messageError.classList.add('visible');
        }
        if (messageInput) messageInput.classList.add('invalid');
        return;
      }

      if (messageError) {
        messageError.textContent = '';
        messageError.classList.remove('visible');
      }
      if (messageInput) messageInput.classList.remove('invalid');

      const isPublic = publicToggle ? Boolean(publicToggle.checked) : true;

      if (isPublic) {
        if (confirmModal) {
          confirmModal.classList.add('open');
        } else {
          executeSubmit();
        }
      } else {
        executeSubmit();
      }
    });
  }

  function initSpotlightCards() {
    const cards = document.querySelectorAll('.spotlight-card');
    if (!cards.length) return;

    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cardData = [];
    const pointer = { x: 0, y: 0, active: false };
    const proximity = 80;
    const spotlightSize = 250;
    let raf = 0;
    let last = 0;

    cards.forEach(function (card) {
      let light = card.querySelector('.spotlight-card__light');
      let edge = card.querySelector('.spotlight-card__edge');

      if (!light) {
        light = document.createElement('span');
        light.className = 'spotlight-card__light';
        light.setAttribute('aria-hidden', 'true');
        card.prepend(light);
      }

      if (!edge) {
        edge = document.createElement('span');
        edge.className = 'spotlight-card__edge';
        edge.setAttribute('aria-hidden', 'true');
        card.appendChild(edge);
      }

      const item = {
        card: card,
        light: light,
        edge: edge,
        x: 0,
        y: 0,
        presence: 0,
        flare: 0,
        pressed: false,
        visible: true
      };

      card.addEventListener('pointerdown', function () {
        item.pressed = true;
        wake();
      });

      cardData.push(item);
    });

    window.addEventListener('pointerup', function () {
      cardData.forEach(function (item) {
        item.pressed = false;
      });
      wake();
    });

    function wake() {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    }

    function tick(now) {
      raf = 0;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      let anyActive = false;
      const isLightMode = rootElement.getAttribute('data-theme') === 'light';

      cardData.forEach(function (item) {
        if (!item.visible) return;

        const rect = item.card.getBoundingClientRect();
        let tx = item.x;
        let ty = item.y;
        let target = 0;

        if (pointer.active) {
          tx = pointer.x - rect.left;
          ty = pointer.y - rect.top;
          const gap = Math.hypot(Math.max(0, -tx, tx - rect.width), Math.max(0, -ty, ty - rect.height));
          if (gap === 0) {
            target = 1;
          } else if (gap < proximity) {
            target = Math.pow(1 - gap / proximity, 2);
          }
        }

        if (item.presence < 0.02 && target > 0) {
          item.x = tx;
          item.y = ty;
        }

        const follow = reduceMotion ? 1 : 1 - Math.exp(-dt / 0.08);
        item.x += (tx - item.x) * follow;
        item.y += (ty - item.y) * follow;

        const fade = reduceMotion ? 1 : 1 - Math.exp(-dt / (target > item.presence ? 0.09 : 0.28));
        item.presence += (target - item.presence) * fade;
        if (Math.abs(target - item.presence) < 0.002) item.presence = target;

        const press = item.pressed && !reduceMotion ? 1 : 0;
        item.flare += (press - item.flare) * (1 - Math.exp(-dt / (press ? 0.05 : 0.25)));
        if (Math.abs(press - item.flare) < 0.002) item.flare = press;

        if (item.presence > 0.001) {
          anyActive = true;
          const boost = 1 + 0.65 * item.flare;
          const currentSize = (spotlightSize * (1 + 0.2 * item.flare)).toFixed(1);
          const edgeSize = (spotlightSize * 0.65 * (1 + 0.2 * item.flare)).toFixed(1);
          const xPos = item.x.toFixed(1);
          const yPos = item.y.toFixed(1);

          if (isLightMode) {
            item.light.style.background = 'radial-gradient(circle ' + currentSize + 'px at ' + xPos + 'px ' + yPos + 'px, rgba(51, 93, 221, ' + (0.13 * boost).toFixed(3) + ') 0%, rgba(51, 93, 221, ' + (0.04 * boost).toFixed(3) + ') 45%, transparent 75%)';
            item.edge.style.background = 'radial-gradient(circle ' + edgeSize + 'px at ' + xPos + 'px ' + yPos + 'px, rgba(51, 93, 221, ' + (0.75 * boost).toFixed(3) + ') 0%, rgba(51, 93, 221, ' + (0.28 * boost).toFixed(3) + ') 40%, transparent 80%)';
            item.light.style.opacity = Math.min(1, item.presence * 0.85).toFixed(3);
            item.edge.style.opacity = Math.min(1, item.presence * 0.9).toFixed(3);
          } else {
            item.light.style.background = 'radial-gradient(circle ' + currentSize + 'px at ' + xPos + 'px ' + yPos + 'px, rgba(51, 93, 221, ' + (0.22 * boost).toFixed(3) + ') 0%, rgba(51, 93, 221, ' + (0.07 * boost).toFixed(3) + ') 45%, transparent 75%)';
            item.edge.style.background = 'radial-gradient(circle ' + edgeSize + 'px at ' + xPos + 'px ' + yPos + 'px, rgba(120, 155, 255, ' + (0.85 * boost).toFixed(3) + ') 0%, rgba(51, 93, 221, ' + (0.45 * boost).toFixed(3) + ') 40%, transparent 80%)';
            item.light.style.opacity = Math.min(1, item.presence * 0.95).toFixed(3);
            item.edge.style.opacity = Math.min(1, item.presence * 0.95).toFixed(3);
          }
        } else {
          item.light.style.opacity = '0';
          item.edge.style.opacity = '0';
        }
      });

      if (anyActive || pointer.active) {
        raf = requestAnimationFrame(tick);
      }
    }

    window.addEventListener('pointermove', function (e) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
      wake();
    });

    document.addEventListener('pointerleave', function () {
      pointer.active = false;
      wake();
    });

    window.addEventListener('scroll', function () {
      if (pointer.active) wake();
    }, { passive: true });

    if (window.IntersectionObserver) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          const matched = cardData.find(function (item) {
            return item.card === entry.target;
          });
          if (matched) {
            matched.visible = entry.isIntersecting;
            if (matched.visible) wake();
          }
        });
      });

      cardData.forEach(function (item) {
        observer.observe(item.card);
      });
    }

    wake();
  }

  initSpotlightCards();
});