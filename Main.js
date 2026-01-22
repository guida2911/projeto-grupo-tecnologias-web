(() => {
  'use strict';

  /**
   * Art Space – JavaScript “backend” (client-only)
   *
   * Features:
   *  - Login + Register (localStorage)
   *  - Navigation between pages
   *  - Add cards (Museu / Expo / Espet) persisted in localStorage
   *  - Search (suggestions + jump + dim non-matches)
   *  - Likes + Tickets saved per user and shown in Logged.html
   *
   * This is a front-end demo. Do not use for real authentication.
   */

  const APP_NAME = 'artspace';

  const KEY = {
    users: `${APP_NAME}_users`,
    session: `${APP_NAME}_session`,
    cards: (type) => `${APP_NAME}_cards_${type}`,
    userData: (username) => `${APP_NAME}_userdata_${username}`,
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const nowIso = () => new Date().toISOString();

  const safeJsonParse = (value, fallback) => {
    try {
      if (value == null) return fallback;
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  };

  const store = {
    get(key, fallback) {
      return safeJsonParse(localStorage.getItem(key), fallback);
    },
    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    del(key) {
      localStorage.removeItem(key);
    },
  };

  const sessionStore = {
    get(fallback) {
      return safeJsonParse(sessionStorage.getItem(KEY.session), fallback);
    },
    set(value) {
      sessionStorage.setItem(KEY.session, JSON.stringify(value));
    },
    del() {
      sessionStorage.removeItem(KEY.session);
    },
  };

  const auth = {
    ensureDefaults() {
      const existing = store.get(KEY.users, null);
      if (Array.isArray(existing) && existing.length) return;

      // Demo accounts
      store.set(KEY.users, [
        { username: 'admin', password: 'admin' },
        { username: 'user', password: 'user' },
      ]);
    },

    currentUser() {
      const s = sessionStore.get(null);
      return s && typeof s.username === 'string' ? s.username : null;
    },

    isLoggedIn() {
      return !!auth.currentUser();
    },

    login(username, password) {
      const users = store.get(KEY.users, []);
      const found = users.find(
        (u) => u.username === username && u.password === password
      );
      if (!found) return { ok: false, message: 'Nome ou password inválidos.' };
      sessionStore.set({ username: found.username, loggedAt: nowIso() });
      return { ok: true, message: `Sessão iniciada: ${found.username}` };
    },

    logout() {
      sessionStore.del();
    },

    register(username, confirmUsername, password, confirmPassword) {
      if (!username || !password) {
        return { ok: false, message: 'Preencha nome e password.' };
      }
      if (username !== confirmUsername) {
        return { ok: false, message: 'Os nomes não coincidem.' };
      }
      if (password !== confirmPassword) {
        return { ok: false, message: 'As passwords não coincidem.' };
      }

      const users = store.get(KEY.users, []);
      const exists = users.some((u) => u.username === username);
      if (exists) {
        return { ok: false, message: 'Já existe uma conta com esse nome.' };
      }

      users.push({ username, password });
      store.set(KEY.users, users);

      // Auto-login
      sessionStore.set({ username, loggedAt: nowIso() });

      return { ok: true, message: 'Conta criada com sucesso.' };
    },
  };

  const userData = {
    defaults() {
      return { likes: [], comments: [], tickets: [] };
    },

    load(username) {
      if (!username) return userData.defaults();
      return store.get(KEY.userData(username), userData.defaults());
    },

    save(username, data) {
      if (!username) return;
      store.set(KEY.userData(username), data);
    },

    addLike(username, like) {
      const data = userData.load(username);
      const already = data.likes.some((l) => l.type === like.type && l.id === like.id);
      if (already) return { ok: true, already: true };
      data.likes.push({ ...like, createdAt: nowIso() });
      userData.save(username, data);
      return { ok: true, already: false };
    },

    addComment(username, comment) {
      const data = userData.load(username);
      data.comments.push({ ...comment, createdAt: nowIso() });
      userData.save(username, data);
      return { ok: true };
    },

    addTicket(username, ticket) {
      const data = userData.load(username);
      data.tickets.push({ ...ticket, createdAt: nowIso() });
      userData.save(username, data);
      return { ok: true };
    },
  };

  const cards = {
    list(type) {
      return store.get(KEY.cards(type), []);
    },

    save(type, list) {
      store.set(KEY.cards(type), list);
    },

    add(type, card) {
      const list = cards.list(type);
      list.push(card);
      cards.save(type, list);
      return card;
    },
  };

  const nav = {
    to(targetFile, hash = '') {
      try {
        const url = new URL(targetFile, window.location.href);
        if (hash) url.hash = hash.startsWith('#') ? hash : `#${hash}`;
        window.location.href = url.toString();
      } catch {
        // fallback
        window.location.href = targetFile;
      }
    },
  };

  const ui = {
    state: {
      pageType: null, // museu | expo | espet | main | logged
      activeItem: null, // {type,id,title}
      addContextByModalId: new Map(), // modalId -> { afterEl }
      stylesInjected: false,
      searchIndex: [],
    },

    notify(message) {
      const existing = document.getElementById('appNotify');
      if (existing) existing.remove();

      const box = document.createElement('div');
      box.id = 'appNotify';
      box.textContent = message;
      box.setAttribute('role', 'status');
      box.style.position = 'fixed';
      box.style.left = '50%';
      box.style.top = '16px';
      box.style.transform = 'translateX(-50%)';
      box.style.zIndex = '9999';
      box.style.maxWidth = 'min(720px, calc(100vw - 32px))';
      box.style.padding = '10px 14px';
      box.style.borderRadius = '12px';
      box.style.backdropFilter = 'blur(10px)';
      box.style.background = 'rgba(20,20,20,.85)';
      box.style.color = '#fff';
      box.style.boxShadow = '0 12px 30px rgba(0,0,0,.35)';
      box.style.fontFamily = 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif';
      box.style.fontSize = '14px';
      document.body.appendChild(box);

      window.setTimeout(() => {
        if (box && box.parentNode) box.parentNode.removeChild(box);
      }, 2500);
    },

    injectBaseStyles() {
      if (ui.state.stylesInjected) return;
      ui.state.stylesInjected = true;

      const style = document.createElement('style');
      style.id = 'appInjectedStyles';
      style.textContent = `
        .app-actions { display:flex; gap:10px; flex-wrap:wrap; margin-top: 14px; }
        .app-actions .btn { border-radius: 999px; padding: 6px 12px; }
        .app-dynamicCard {
          width: min(1100px, calc(100vw - 44px));
          margin: 44px auto;
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 22px;
          align-items: center;
        }
        .app-dynamicCard .app-media img{
          width: 100%;
          height: 320px;
          object-fit: cover;
          border-radius: 18px;
          box-shadow: 0 14px 40px rgba(0,0,0,.35);
        }
        .app-dynamicCard .app-text{
          padding: 18px 18px;
          border-radius: 18px;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.12);
          backdrop-filter: blur(10px);
        }
        .app-dynamicCard .app-text h1{
          margin: 0 0 10px 0;
          font-size: clamp(22px, 2.2vw, 34px);
        }
        .app-dynamicCard .app-text p{
          margin: 0 0 10px 0;
          line-height: 1.5;
        }
        @media (max-width: 900px){
          .app-dynamicCard{ grid-template-columns: 1fr; }
          .app-dynamicCard .app-media img{ height: 240px; }
        }
        .app-searchResults{
          width: min(520px, calc(100vw - 44px));
          margin: 10px auto 0 auto;
          padding: 10px;
          border-radius: 16px;
          background: rgba(10,10,10,.75);
          border: 1px solid rgba(255,255,255,.14);
          backdrop-filter: blur(10px);
          box-shadow: 0 14px 40px rgba(0,0,0,.35);
        }
        .app-searchResults .app-searchItem{
          width: 100%;
          text-align: left;
          background: transparent;
          border: 0;
          color: #fff;
          padding: 10px 10px;
          border-radius: 12px;
          cursor: pointer;
          font-family: inherit;
          font-size: 14px;
        }
        .app-searchResults .app-searchItem:hover{ background: rgba(255,255,255,.08); }
        .app-searchResults .app-searchMeta{ opacity:.8; font-size:12px; margin-top:2px; }
        .app-dim{ opacity:.25; filter: grayscale(.2); transition: opacity .15s ease; }
        .app-likeActive{ outline: 2px solid rgba(255,255,255,.5); }
        .app-loggedWrap{
          width: min(900px, calc(100vw - 44px));
          margin: 20px auto;
        }
        .app-authGrid{
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          align-items: start;
          margin-top: 16px;
        }
        .app-authCard{
          padding: 16px;
          border-radius: 16px;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.14);
          backdrop-filter: blur(10px);
        }
        .app-authCard h2{ margin:0 0 10px 0; font-size:18px; }
        .app-authCard label{ display:block; margin:10px 0 6px 0; font-size:12px; opacity:.9; }
        .app-authCard input{
          width:100%;
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,.16);
          background: rgba(0,0,0,.25);
          color:#fff;
          outline: none;
        }
        .app-authCard button{
          margin-top: 12px;
          width: 100%;
          padding: 10px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,.16);
          background: rgba(255,255,255,.12);
          color:#fff;
          cursor:pointer;
        }
        .app-authCard button:hover{ background: rgba(255,255,255,.16); }
        .app-list{
          list-style: none;
          padding: 0;
          margin: 10px 0 0 0;
        }
        .app-list li{
          padding: 10px 12px;
          border-radius: 12px;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.12);
          margin-bottom: 10px;
        }
        .app-list small{ display:block; opacity:.8; margin-top:4px; }
      `;
      document.head.appendChild(style);
    },

    detectPage() {
      const file = (window.location.pathname.split('/').pop() || '').toLowerCase();
      if (!file || file === '/' || file.startsWith('index')) return 'main';
      if (file.includes('main')) return 'main';
      if (file.includes('museu')) return 'museu';
      if (file.includes('expo')) return 'expo';
      if (file.includes('espet')) return 'espet';
      if (file.includes('logged')) return 'logged';
      return 'main';
    },

    normalizeDuplicateAddModals() {
      // Pages contain repeated #addModal and repeated input IDs. We make each modal unique at runtime.
      const modals = $$('.modal#addModal, .modal[id="addModal"]');
      if (!modals.length) return;

      modals.forEach((modal, idx) => {
        const newModalId = `addModal-${idx + 1}`;
        const oldId = modal.id;
        modal.id = newModalId;

        // Update aria-labelledby if present
        const label = modal.querySelector('#addModalLabel');
        if (label) {
          const newLabelId = `addModalLabel-${idx + 1}`;
          label.id = newLabelId;
          modal.setAttribute('aria-labelledby', newLabelId);
        }

        // Find the corresponding button in the same slider
        const slider = modal.closest('.slider') || modal.parentElement;
        if (slider) {
          const btn =
            slider.querySelector(`button[data-bs-target="#${oldId}"]`) ||
            slider.querySelector(`button[data-target="#${oldId}"]`) ||
            slider.querySelector('button#addModalBtn') ||
            slider.querySelector('button[data-bs-toggle="modal"]');

          if (btn) {
            btn.setAttribute('data-bs-target', `#${newModalId}`);
            btn.removeAttribute('data-target');
            btn.dataset.appModalId = newModalId;

            // Save insertion context: after the container where the slider sits
            const container = btn.closest('div[id^="container"]');
            ui.state.addContextByModalId.set(newModalId, {
              afterEl: container || null,
            });

            // Disable if not logged
            if (!auth.isLoggedIn()) {
              btn.addEventListener('click', (e) => {
                e.preventDefault();
                ui.notify('Precisa de iniciar sessão para adicionar.');
                nav.to('Logged.html');
              });
            }
          }
        }

        // Attach confirm handler
        const confirmBtn =
          modal.querySelector('.modal-footer .btn.btn-dark') ||
          modal.querySelector('.modal-footer button.btn-dark') ||
          modal.querySelector('button[type="button"].btn.btn-dark');

        if (confirmBtn) {
          confirmBtn.dataset.appModalId = newModalId;
          confirmBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            await ui.handleAddConfirm(modal, newModalId);
          });
        }
      });
    },

    buildItemIndex() {
      const items = [];

      const containerEls = $$('div[id^="container"]');
      containerEls.forEach((el) => {
        const title = (el.querySelector('h1')?.textContent || '').trim();
        const bodyText = (el.textContent || '').replace(/\s+/g, ' ').trim();

        if (!title) return;

        const id = el.getAttribute('id') || `builtin-${items.length + 1}`;
        el.dataset.appItemId = id;
        el.dataset.appItemTitle = title;
        el.classList.add('app-item');

        items.push({ id, title, text: bodyText, el, kind: 'builtin' });
      });

      const dynamicEls = $$('.app-dynamicCard');
      dynamicEls.forEach((el) => {
        const title = (el.querySelector('h1')?.textContent || '').trim();
        const bodyText = (el.textContent || '').replace(/\s+/g, ' ').trim();
        if (!title) return;

        const id = el.dataset.appItemId || `dynamic-${items.length + 1}`;
        el.dataset.appItemId = id;
        el.dataset.appItemTitle = title;
        el.classList.add('app-item');

        items.push({ id, title, text: bodyText, el, kind: 'dynamic' });
      });

      ui.state.searchIndex = items;
    },

    initSearch() {
      const input = $('#searchText');
      const holder = $('.searchSpace');
      if (!input || !holder) return;

      ui.buildItemIndex();

      const renderResults = (query) => {
        holder.innerHTML = '';
        if (!query) {
          ui.state.searchIndex.forEach((it) => it.el.classList.remove('app-dim'));
          return;
        }

        const q = query.toLowerCase();

        const matches = ui.state.searchIndex
          .filter((it) => (it.title + ' ' + it.text).toLowerCase().includes(q))
          .slice(0, 7);

        ui.state.searchIndex.forEach((it) => {
          const hit = (it.title + ' ' + it.text).toLowerCase().includes(q);
          it.el.classList.toggle('app-dim', !hit);
        });

        if (!matches.length) return;

        const box = document.createElement('div');
        box.className = 'app-searchResults';

        matches.forEach((m) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'app-searchItem';
          btn.innerHTML = `<div><strong>${escapeHtml(m.title)}</strong></div><div class="app-searchMeta">Clique para ir</div>`;
          btn.addEventListener('click', () => {
            const target = document.getElementById(m.id) || m.el;
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            input.blur();
          });
          box.appendChild(btn);
        });

        holder.appendChild(box);
      };

      const debounced = debounce((val) => renderResults(val), 140);

      input.addEventListener('input', (e) => debounced(e.target.value || ''));
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          input.value = '';
          renderResults('');
        }
      });
    },

    addActionButtonsToItems() {
      const addButtonsTo = (textContainer, itemEl) => {
        if (!textContainer || textContainer.querySelector('.app-actions')) return;

        const actionWrap = document.createElement('div');
        actionWrap.className = 'app-actions';

        const likeBtn = document.createElement('button');
        likeBtn.type = 'button';
        likeBtn.className = 'btn btn-outline-light app-likeBtn';
        likeBtn.textContent = 'Like';
        likeBtn.addEventListener('click', () => {
          const username = auth.currentUser();
          if (!username) {
            ui.notify('Precisa de iniciar sessão para dar Like.');
            nav.to('Logged.html');
            return;
          }

          const item = ui.extractItemInfo(itemEl);
          const res = userData.addLike(username, item);
          if (res.already) {
            ui.notify('Já tinha dado Like.');
          } else {
            ui.notify('Like guardado.');
            likeBtn.classList.add('app-likeActive');
          }
        });

        const commentBtn = document.createElement('button');
        commentBtn.type = 'button';
        commentBtn.className = 'btn btn-outline-light app-commentBtn';
        commentBtn.textContent = 'Comment';
        commentBtn.addEventListener('click', () => {
          const username = auth.currentUser();
          if (!username) {
            ui.notify('Precisa de iniciar sessão para comentar.');
            nav.to('Logged.html');
            return;
          }
          const text = window.prompt('Escreva o seu comentário:');
          if (!text) return;
          const item = ui.extractItemInfo(itemEl);
          userData.addComment(username, { ...item, text });
          ui.notify('Comentário guardado.');
        });

        actionWrap.appendChild(likeBtn);
        actionWrap.appendChild(commentBtn);

        textContainer.appendChild(actionWrap);
      };

      const containers = $$('div[id^="container"]');
      containers.forEach((container) => {
        const textBox =
          container.querySelector('[class$="Texto"]') ||
          container.querySelector('.museu1Texto, .expo1Texto, .espet1Texto') ||
          container.querySelector('div');
        addButtonsTo(textBox, container);
      });

      const dynamic = $$('.app-dynamicCard');
      dynamic.forEach((card) => {
        const textBox = card.querySelector('.app-text');
        addButtonsTo(textBox, card);
      });
    },

    extractItemInfo(itemEl) {
      const id = itemEl?.dataset?.appItemId || itemEl?.id || `item-${Math.random().toString(16).slice(2)}`;
      const title = (itemEl?.dataset?.appItemTitle || itemEl?.querySelector('h1')?.textContent || 'Item').trim();
      return { type: ui.state.pageType || 'unknown', id, title };
    },

    wireTicketModal() {
      const modal = document.getElementById('ticketModal');
      const form = document.getElementById('ticketForm');
      if (!modal || !form) return;

      document.addEventListener('click', (e) => {
        const target = e.target;
        if (!(target instanceof Element)) return;

        const isTicketTrigger =
          target.matches('[data-bs-target="#ticketModal"]') ||
          target.closest('[data-bs-target="#ticketModal"]') ||
          target.matches('.ticketBtn') ||
          target.closest('.ticketBtn');

        if (!isTicketTrigger) return;

        const itemEl = target.closest('.app-item') || target.closest('div[id^="container"]') || target.closest('.app-dynamicCard');
        if (!itemEl) return;

        ui.state.activeItem = ui.extractItemInfo(itemEl);
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = auth.currentUser();
        if (!username) {
          ui.notify('Precisa de iniciar sessão para comprar tickets.');
          nav.to('Logged.html');
          return;
        }

        const fd = new FormData(form);
        const ticket = {
          item: ui.state.activeItem || { type: ui.state.pageType || 'unknown', id: 'unknown', title: 'Unknown' },
          firstname: String(fd.get('firstname') || ''),
          lastname: String(fd.get('lastname') || ''),
          email: String(fd.get('email') || ''),
          time: String(fd.get('time') || ''),
          day: String(fd.get('day') || ''),
          tickets: String(fd.get('tickets') || ''),
        };

        userData.addTicket(username, ticket);
        ui.notify('Ticket guardado na sua área pessoal.');

        try {
          if (window.bootstrap?.Modal) {
            const instance = window.bootstrap.Modal.getInstance(modal) || new window.bootstrap.Modal(modal);
            instance.hide();
          }
        } catch {
          // ignore
        }

        form.reset();
      });
    },

    async handleAddConfirm(modalEl, modalId) {
      const username = auth.currentUser();
      if (!username) {
        ui.notify('Precisa de iniciar sessão para adicionar.');
        nav.to('Logged.html');
        return;
      }

      const titleInput = modalEl.querySelector('input[type="text"]');
      const fileInput = modalEl.querySelector('input[type="file"]');
      const textArea = modalEl.querySelector('textarea');

      const title = (titleInput?.value || '').trim();
      const description = (textArea?.value || '').trim();
      const file = fileInput?.files?.[0] || null;

      if (!title || !description || !file) {
        ui.notify('Preencha título, texto e imagem.');
        return;
      }

      const imageDataUrl = await readFileAsDataUrl(file);

      const card = {
        id: `c_${Date.now()}_${Math.random().toString(16).slice(2)}`,
        title,
        description,
        imageDataUrl,
        createdAt: nowIso(),
        createdBy: username,
      };

      const type = ui.state.pageType || 'museu';
      cards.add(type, card);
      ui.renderCard(type, card, modalId);

      try {
        if (window.bootstrap?.Modal) {
          const instance = window.bootstrap.Modal.getInstance(modalEl) || new window.bootstrap.Modal(modalEl);
          instance.hide();
        }
      } catch {
        // ignore
      }

      if (titleInput) titleInput.value = '';
      if (textArea) textArea.value = '';
      if (fileInput) fileInput.value = '';

      ui.notify('Card adicionado.');
    },

    renderSavedCards(type) {
      const list = cards.list(type);
      if (!list.length) return;
      list.forEach((card) => ui.renderCard(type, card, null, { silent: true }));
    },

    renderCard(type, card, modalId, opts = {}) {
      const section = document.querySelector('main section:last-of-type') || document.querySelector('main') || document.body;
      const ticketModal = document.getElementById('ticketModal');

      const el = document.createElement('div');
      el.className = 'app-dynamicCard app-item';
      el.dataset.appItemId = card.id;
      el.dataset.appItemTitle = card.title;
      el.id = card.id;

      el.innerHTML = `
        <div class="app-media">
          <img src="${card.imageDataUrl}" alt="${escapeHtml(card.title)}">
        </div>
        <div class="app-text">
          <h1>${escapeHtml(card.title)}</h1>
          <p>${escapeHtml(card.description).replace(/\n/g, '<br>')}</p>
          <p><u>Added by:</u> ${escapeHtml(card.createdBy || 'user')}</p>
          <button type="button" class="btn btn-outline-light ticketBtn" data-bs-toggle="modal" data-bs-target="#ticketModal">Buy Tickets</button>
        </div>
      `;

      const ctx = modalId ? ui.state.addContextByModalId.get(modalId) : null;
      const afterEl = ctx?.afterEl || null;

      if (afterEl && afterEl.parentElement) {
        afterEl.insertAdjacentElement('afterend', el);
      } else if (ticketModal && ticketModal.parentElement) {
        ticketModal.parentElement.insertBefore(el, ticketModal);
      } else {
        section.appendChild(el);
      }

      ui.addActionButtonsToItems();
      ui.buildItemIndex();

      if (!opts.silent) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },

    initLoggedPage() {
      ui.injectBaseStyles();

      const main = document.querySelector('main');
      if (!main) return;

      const username = auth.currentUser();

      const setTopBar = () => {
        const titleBtn = document.getElementById('searchTitle');
        if (titleBtn) titleBtn.onclick = () => nav.to('Main.html');
      };

      if (!username) {
        main.innerHTML = `
          <div class="app-loggedWrap">
            <div style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
              <button id="searchTitle" type="button" style="all:unset; cursor:pointer; font-size:18px; font-weight:700;">Art Space</button>
              <h1 style="margin:0; font-size:22px;">Login</h1>
            </div>

            <div class="app-authGrid">
              <section class="app-authCard">
                <h2>Entrar</h2>
                <form id="appLoginForm">
                  <label for="appLoginUser">Username</label>
                  <input id="appLoginUser" autocomplete="username" required>
                  <label for="appLoginPass">Password</label>
                  <input id="appLoginPass" type="password" autocomplete="current-password" required>
                  <button type="submit">Login</button>
                </form>
              </section>

              <section class="app-authCard">
                <h2>Criar conta</h2>
                <form id="appRegisterForm">
                  <label for="appRegUser">Username</label>
                  <input id="appRegUser" required>
                  <label for="appRegUser2">Confirm Username</label>
                  <input id="appRegUser2" required>
                  <label for="appRegPass">Password</label>
                  <input id="appRegPass" type="password" required>
                  <label for="appRegPass2">Confirm Password</label>
                  <input id="appRegPass2" type="password" required>
                  <button type="submit">Register</button>
                </form>
              </section>
            </div>

            <p style="opacity:.85; margin-top:12px;">Contas demo: <strong>admin/admin</strong> e <strong>user/user</strong>.</p>
          </div>
        `;

        setTopBar();

        $('#appLoginForm')?.addEventListener('submit', (e) => {
          e.preventDefault();
          const u = String($('#appLoginUser')?.value || '').trim();
          const p = String($('#appLoginPass')?.value || '').trim();
          const res = auth.login(u, p);
          ui.notify(res.message);
          if (res.ok) window.location.reload();
        });

        $('#appRegisterForm')?.addEventListener('submit', (e) => {
          e.preventDefault();
          const u1 = String($('#appRegUser')?.value || '').trim();
          const u2 = String($('#appRegUser2')?.value || '').trim();
          const p1 = String($('#appRegPass')?.value || '').trim();
          const p2 = String($('#appRegPass2')?.value || '').trim();
          const res = auth.register(u1, u2, p1, p2);
          ui.notify(res.message);
          if (res.ok) window.location.reload();
        });

        return;
      }

      const data = userData.load(username);

      main.classList.add('app-loggedWrap');

      main.innerHTML = `
        <section style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
          <button id="searchTitle" type="button" style="all:unset; cursor:pointer; font-size:18px; font-weight:700;">Art Space</button>
          <div style="display:flex; align-items:center; gap:10px;">
            <h1 style="margin:0; font-size:22px;">Personal Area</h1>
            <button id="appLogout" type="button" style="padding:8px 12px; border-radius:999px; border:1px solid rgba(255,255,255,.16); background:rgba(255,255,255,.12); color:#fff; cursor:pointer;">Logout</button>
          </div>
        </section>

        <section style="display:flex; align-items:center; gap:14px; margin-top:16px;">
          <img src="/EXTRA/login.png" alt="Imagem de perfil" style="width:64px; height:64px; border-radius:999px; object-fit:cover; border:1px solid rgba(255,255,255,.2);">
          <div>
            <div style="font-weight:700; font-size:18px;">@${escapeHtml(username)}</div>
            <div style="opacity:.85; font-size:13px;">Dados guardados localmente neste navegador.</div>
          </div>
        </section>

        <section style="margin-top:16px;">
          <h2 style="margin:0; font-size:18px;">Likes</h2>
          ${renderList(data.likes, (l) => `${escapeHtml(l.title)} <small>${escapeHtml(l.type)} • ${formatDate(l.createdAt)}</small>`)}
        </section>

        <section style="margin-top:16px;">
          <h2 style="margin:0; font-size:18px;">Comments</h2>
          ${renderList(data.comments, (c) => `${escapeHtml(c.title)} — ${escapeHtml(c.text)} <small>${escapeHtml(c.type)} • ${formatDate(c.createdAt)}</small>`)}
        </section>

        <section style="margin-top:16px;">
          <h2 style="margin:0; font-size:18px;">Tickets</h2>
          ${renderList(data.tickets, (t) => `${escapeHtml(t.item?.title || 'Item')} — ${escapeHtml(t.tickets)} ticket(s), ${escapeHtml(t.day)} (${escapeHtml(t.time)}) <small>${escapeHtml(t.item?.type || '')} • ${formatDate(t.createdAt)}</small>`)}
        </section>
      `;

      setTopBar();

      $('#appLogout')?.addEventListener('click', () => {
        auth.logout();
        ui.notify('Sessão terminada.');
        window.location.reload();
      });
    },

    initListingPage(type) {
      ui.injectBaseStyles();
      ui.state.pageType = type;

      ui.normalizeDuplicateAddModals();
      ui.renderSavedCards(type);
      ui.initSearch();
      ui.wireTicketModal();
      ui.addActionButtonsToItems();
      ui.buildItemIndex();
    },

    initMainPage() {
      ui.state.pageType = 'main';
    },
  };

  function debounce(fn, ms) {
    let t = null;
    return (...args) => {
      if (t) window.clearTimeout(t);
      t = window.setTimeout(() => fn(...args), ms);
    };
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatDate(iso) {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      return d.toLocaleString();
    } catch {
      return String(iso);
    }
  }

  function renderList(items, renderItem) {
    if (!Array.isArray(items) || items.length === 0) {
      return '<p style="opacity:.85; margin-top:8px;">(vazio)</p>';
    }
    return `<ul class="app-list">${items
      .slice()
      .reverse()
      .map((it) => `<li>${renderItem(it)}</li>`)
      .join('')}</ul>`;
  }

  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Falha a ler imagem.'));
      reader.onload = () => resolve(String(reader.result || ''));
      reader.readAsDataURL(file);
    });
  }

  // Expose navigation functions used by inline onclick attributes
  window.Main = () => nav.to('Main.html');
  window.MainPage = window.Main;
  window.Museu = () => nav.to('Museu.html');
  window.Expo = () => nav.to('Expo.html');
  window.Espet = () => nav.to('Espet.html');
  window.Logged = () => nav.to('Logged.html');

  // Optional: card image click handlers present in HTML (avoid “function not defined”)
  const makeOpenTicket = (containerId) => () => {
    const el = document.getElementById(containerId);
    if (!el) return;
    ui.state.activeItem = ui.extractItemInfo(el);
    const btn = el.querySelector('[data-bs-target="#ticketModal"], .ticketBtn');
    if (btn) btn.click();
  };

  for (let i = 1; i <= 10; i++) {
    window[`Museum${i}`] = makeOpenTicket(`container${i}`);
    window[`Expo${i}`] = makeOpenTicket(`container${i}`);
    window[`Espet${i}`] = makeOpenTicket(`container${i}`);
  }

  document.addEventListener('DOMContentLoaded', () => {
    auth.ensureDefaults();

    const page = ui.detectPage();
    ui.state.pageType = page;

    if (page === 'logged') {
      ui.initLoggedPage();
      return;
    }

    if (page === 'museu' || page === 'expo' || page === 'espet') {
      ui.initListingPage(page);
      return;
    }

    ui.initMainPage();
  });
})();
