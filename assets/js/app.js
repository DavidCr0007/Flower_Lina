        (() => {
            'use strict';

            /* =====================================================================
               CONFIGURACIÓN — todo lo que se edita está aquí
               ===================================================================== */
            const CONFIG = {
                nombre: "Lina",
                edad: 23,                              // null para ocultarla
                titulo: "¡Feliz cumpleaños!",
                dedicatoria: "Para mi 10",
                cancion: "audio/bff.m4a",              // audio optimizado para una carga más rápida
                volumenMusica: 0.65,                    // volumen interno: 0.50–0.75 (65% recomendado)
                fotos: [                               // entre 7 y 15; si falta un archivo se muestra un marco vacío
                    "Imagenes/Foto_1.jpg", "Imagenes/Foto_2.jpg", "Imagenes/Foto_3.jpg", "Imagenes/Foto_4.jpg", "Imagenes/Foto_5.jpg",
                    "Imagenes/Foto_6.jpg", "Imagenes/Foto_7.jpg", "Imagenes/Foto_8.jpg", "Imagenes/Foto_9.jpg", "Imagenes/Foto_10.jpg",
                    "Imagenes/Foto_11.jpg", "Imagenes/Foto_12.jpg", "Imagenes/Foto_13.jpg", "Imagenes/Foto_14.jpg", "Imagenes/Foto_15.jpg",
                    "Imagenes/Foto_16.jpg", "Imagenes/Foto_17.jpg"
                ],
                revelarFotosAlTocar: true,              // primer toque revela; el siguiente amplía la foto
                carta: {
                    encabezado: "Querida Lina:",
                    parrafos: [
                        "[Escribe aquí el primer párrafo de tu carta.]",
                        "[Cada párrafo va entre comillas y separado por una coma.]",
                        "[Puedes agregar todos los que quieras; el pergamino se desplaza si el texto es largo.]"
                    ],
                    despedida: "Con cariño,",
                    firma: "[Tu nombre]"
                }
            };

            // Recursos florales del proyecto. Se usan directamente en el jardín.
            const FLORES = {
                girasol1: 'Flores/Girasol_1.png',
                girasol2: 'Flores/Girasol_2.png',
                girasol3: 'Flores/Girasol_3.png',
                ramo: 'Flores/Ramo.png',
                rosa: 'Flores/Rosa.png',
                tulipan: 'Flores/tulipan.png'
            };

            /* =====================================================================
               Utilidades
               ===================================================================== */
            const $ = s => document.querySelector(s);
            const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
            const f2 = n => Math.round(n * 100) / 100;
            const P = (...a) => a.map(f2).join(' ');

            /* =====================================================================
               Flores en SVG
               ===================================================================== */
            function girasol(cx, cy, r) {
                let s = `<g transform="translate(${cx} ${cy})">`, N = 20;
                for (let k = 0; k < N; k++) s += `<ellipse cx="0" cy="${f2(-r * .72)}" rx="${f2(r * .17)}" ry="${f2(r * .36)}" fill="#B8923A" transform="rotate(${f2(k * 360 / N + 9)})"/>`;
                for (let k = 0; k < N; k++) s += `<ellipse cx="0" cy="${f2(-r * .76)}" rx="${f2(r * .17)}" ry="${f2(r * .38)}" fill="#D1B365" transform="rotate(${f2(k * 360 / N)})"/>`;
                s += `<circle r="${f2(r * .46)}" fill="#5B4630"/><circle r="${f2(r * .34)}" fill="#7A5A35"/>`;
                for (let k = 1; k <= 46; k++) {
                    const rr = r * .44 * Math.sqrt(k / 46), a = k * 2.39996;
                    s += `<circle cx="${f2(rr * Math.cos(a))}" cy="${f2(rr * Math.sin(a))}" r="${f2(r * .028)}" fill="#3B2E20"/>`;
                }
                return s + '</g>';
            }

            function rosa(cx, cy, r) {
                let d = 'M0 0';
                for (let t = 0; t <= 6 * Math.PI; t += .25) {
                    const rr = r * .08 + r * .72 * (t / (6 * Math.PI));
                    d += `L${f2(rr * Math.cos(t))} ${f2(rr * Math.sin(t))}`;
                }
                return `<g transform="translate(${cx} ${cy})">
    <circle r="${f2(r)}" fill="#A8556A"/><circle r="${f2(r * .86)}" fill="#C47E8E"/>
    <path d="${d}" fill="none" stroke="#743B4D" stroke-width="${f2(r * .07)}" stroke-linecap="round" opacity=".85"/>
    <path d="M${P(-r * .62, -r * .35)} Q${P(-r * .2, -r * .95, r * .5, -r * .6)}" fill="none" stroke="#E0AEB8" stroke-width="${f2(r * .09)}" stroke-linecap="round" opacity=".7"/>
  </g>`;
            }

            function tulipan(cx, cy, w, h, rot) {
                return `<g transform="translate(${cx} ${cy}) rotate(${rot})">
    <path d="M0 0 C${P(-w * .62, -h * .1, -w * .55, -h * .8, -w * .2, -h)} C${P(-w * .08, -h * .65, -w * .04, -h * .3, 0, 0)}Z" fill="#6F3547"/>
    <path d="M0 0 C${P(w * .62, -h * .1, w * .55, -h * .8, w * .2, -h)} C${P(w * .08, -h * .65, w * .04, -h * .3, 0, 0)}Z" fill="#6F3547"/>
    <path d="M${P(-w * .32, -h * .04)} C${P(-w * .38, -h * .6, -w * .16, -h * .98, 0, -h * 1.08)} C${P(w * .16, -h * .98, w * .38, -h * .6, w * .32, -h * .04)} Q0 ${f2(h * .08)} ${P(-w * .32, -h * .04)}Z" fill="#A8556A"/>
  </g>`;
            }

            const tallo = (x, y, tx, ty, ancho = 4) => {
                const dy = ty - y;
                return `<path d="M${P(x, y)} C${P(x, y + dy * .5, tx, ty - dy * .3, tx, ty)}" fill="none" stroke="#526F49" stroke-width="${ancho}" stroke-linecap="round"/>`;
            };
            const hoja = (cx, cy, l, rot) =>
                `<path d="M0 0 C${P(l * .3, -l * .35, l * .75, -l * .3, l, 0)} C${P(l * .75, l * .3, l * .3, l * .35, 0, 0)}Z" fill="#6E8B5E" transform="translate(${cx} ${cy}) rotate(${rot})"/>`;
            const crece = (html, d, s) => `<g class="crece" style="--d:${d}s"><g class="mece" style="--s:${s}s">${html}</g></g>`;

            function girasolCompleto(cx, cy, r, tx, ty, d, s) {
                const mx = (cx + tx) / 2, my = (cy + ty) / 2;
                return crece(
                    tallo(cx, cy + r * .9, tx, ty, 6) +
                    hoja(mx, my, 34, -30) + hoja(mx, my + 26, 34, 210) +
                    girasol(cx, cy, r), d, s);
            }

            function florDeReferencia(src, x, baseY, w, h, d, s, rot = 0) {
                const y = baseY - h;
                const cx = f2(x + w / 2), cy = f2(y + h);
                return crece(
                    `<image class="flor-referencia" href="${src}" x="${x}" y="${y}" width="${w}" height="${h}" ` +
                    `preserveAspectRatio="xMidYMid meet" transform="rotate(${rot} ${cx} ${cy})"/>`, d, s
                );
            }

            function balon(cx, cy, r) {
                let pts = '', rayas = '';
                for (let k = 0; k < 5; k++) {
                    const a = (-90 + 72 * k) * Math.PI / 180;
                    pts += `${f2(r * .42 * Math.cos(a))},${f2(r * .42 * Math.sin(a))} `;
                    rayas += `<line x1="${f2(r * .42 * Math.cos(a))}" y1="${f2(r * .42 * Math.sin(a))}" x2="${f2(r * .95 * Math.cos(a))}" y2="${f2(r * .95 * Math.sin(a))}" stroke="#1F2933" stroke-width="1.3"/>`;
                }
                return `<g transform="translate(${cx} ${cy})">
    <ellipse cx="0" cy="${f2(r * 1.02)}" rx="${f2(r * .9)}" ry="${f2(r * .18)}" fill="rgba(0,0,0,.15)"/>
    <circle r="${r}" fill="#fff" stroke="#1F2933" stroke-width="1.5"/>${rayas}
    <polygon points="${pts}" fill="#1F2933"/></g>`;
            }

            const TROMPETA = `<svg viewBox="0 0 190 130" aria-hidden="true">
  <path d="M18 58 H131" fill="none" stroke="#B8923A" stroke-width="12" stroke-linecap="round"/>
  <path d="M42 58 C31 13 105 13 94 58" fill="none" stroke="#D6B66A" stroke-width="7" stroke-linecap="round"/>
  <path d="M126 47 L175 18 Q184 63 175 108 L126 72 Z" fill="#B8923A" stroke="#806526" stroke-width="3" stroke-linejoin="round"/>
  <path d="M140 45 L166 30 Q170 61 166 91 L140 76 Z" fill="#D6B66A" opacity=".72"/>
  <g fill="#806526"><circle cx="61" cy="58" r="5"/><circle cx="76" cy="58" r="5"/><circle cx="91" cy="58" r="5"/></g>
  <path d="M76 68 H121 L115 113 L99 103 L83 113 Z" fill="#6E8B5E" stroke="#B8923A" stroke-width="3" stroke-linejoin="round"/>
  <path d="M91 86 L96 77 L101 86 L106 75 L111 86 V94 H91 Z" fill="#E0C889"/>
  <path d="M22 51 L29 43 L35 51" fill="none" stroke="#F4ECD8" stroke-width="3" stroke-linecap="round"/>
</svg>`;

            /* =====================================================================
               Construcción de la escena
               ===================================================================== */
            $('#gate-flor').innerHTML = girasol(100, 100, 82);
            $('#gate-titulo').textContent = `Para ${CONFIG.nombre}`;
            $('#t1').textContent = CONFIG.titulo;
            $('#t2').textContent = CONFIG.nombre;
            if (CONFIG.edad) $('#edad b').textContent = CONFIG.edad; else $('#edad').remove();
            $('#dedicatoria').textContent = CONFIG.dedicatoria;
            document.querySelectorAll('.trompeta').forEach(t => t.innerHTML = TROMPETA);

            const ramo = `<image class="ramo-asset" href="${FLORES.ramo}" x="12" y="170" width="376" height="503" preserveAspectRatio="xMidYMid meet"/>`;

            $('#escena').innerHTML = `
  <path d="M0 700 V670 Q50 656 110 668 T230 664 T340 668 T400 662 V700Z" fill="#8BA47A"/>
  <path d="M0 700 V684 Q70 674 140 684 T280 682 T400 680 V700Z" fill="#6E8B5E"/>
  <path d="M0 681 Q74 670 140 681 T280 679 T400 677" fill="none" stroke="rgba(244,236,216,.52)" stroke-width="3"/>
  <ellipse cx="200" cy="665" rx="118" ry="13" fill="rgba(23,58,87,.16)"/>
  ${florDeReferencia(FLORES.girasol1, -62, 664, 206, 307, .3, -.5, -3)}
  ${florDeReferencia(FLORES.girasol2, 252, 660, 198, 295, .5, -1.5, 3)}
  ${florDeReferencia(FLORES.girasol3, 115, 658, 170, 253, .7, -2.5)}
  ${florDeReferencia(FLORES.tulipan, 22, 662, 128, 191, .9, -3, -7)}
  ${florDeReferencia(FLORES.rosa, 254, 663, 128, 191, 1, -3.5, 6)}
  ${balon(72, 664, 18)}
  <g id="ramo" role="button" tabindex="0" aria-label="Abrir la carta">
    ${ramo}
  </g>
  <g id="pista" pointer-events="none">
    <circle class="pulso" cx="200" cy="450" r="100" fill="none" stroke="#fff" stroke-width="4"/>
    <rect x="135" y="316" width="130" height="30" rx="15" fill="#fff" opacity=".92"/>
    <text x="200" y="336" text-anchor="middle" font-size="15" font-weight="700" fill="#173A57">Toca el ramo</text>
  </g>`;

            /* Fotos al fondo del jardín, en anillo alrededor del ramo */
            const nF = CONFIG.fotos.length;
            const ancho = nF > 10 ? 'clamp(64px,17vmin,120px)' : 'clamp(74px,21vmin,150px)';
            CONFIG.fotos.forEach((src, i) => {
                /* arco de 220° por encima del ramo; con más de 9 fotos se alternan dos anillos */
                const a = (-200 + (nF > 1 ? i * 220 / (nF - 1) : 110)) * Math.PI / 180;
                const dentro = nF > 9 && i % 2;
                const rx = dentro ? 31 : 43, ry = dentro ? 25 : 34;
                const d = document.createElement('button');
                d.type = 'button';
                d.className = 'pol';
                d.dataset.indice = String(i + 1);
                if (CONFIG.revelarFotosAlTocar) {
                    d.classList.add('por-descubrir');
                    d.dataset.pista = 'Toca para descubrir';
                    d.setAttribute('aria-label', `Descubrir foto ${i + 1}`);
                } else {
                    d.setAttribute('aria-label', `Ampliar foto ${i + 1}`);
                }
                d.style.cssText = `left:${f2(50 + rx * Math.cos(a))}%;top:${f2(55 + ry * Math.sin(a))}%;--w:${ancho};--i:${i};--r:${(i * 37) % 13 - 6}deg`;
                const img = new Image();
                img.alt = `Foto ${i + 1}`;
                img.onerror = () => {
                    const ph = document.createElement('span');
                    ph.className = 'ph-i'; ph.textContent = `foto ${i + 1}`;
                    img.replaceWith(ph); d.classList.remove('por-descubrir');
                    d.classList.add('ph'); d.disabled = true;
                    d.setAttribute('aria-label', `Foto ${i + 1} no disponible`);
                };
                img.src = src;
                d.appendChild(img);
                $('#fotos').appendChild(d);
            });

            /* Pétalos cayendo */
            const colPetalos = ['#A8556A', '#C47E8E', '#B8923A', '#8D5B5D'];
            for (let i = 0; i < 14; i++) {
                const p = document.createElement('i');
                p.className = 'petalo';
                p.style.cssText = `left:${f2(Math.random() * 100)}%;background:${colPetalos[i % 4]};--dx:${f2((Math.random() - .5) * 120)}px;` +
                    `animation-duration:${f2(9 + Math.random() * 8)}s;animation-delay:${f2(-Math.random() * 14)}s;` +
                    `width:${f2(8 + Math.random() * 7)}px;height:${f2(10 + Math.random() * 8)}px`;
                $('#petalos').appendChild(p);
            }

            /* Carta */
            const cont = $('#contenido'); let k = 0;
            const add = (tag, txt, cls) => {
                const e = document.createElement(tag);
                e.textContent = txt; if (cls) e.className = cls;
                e.style.setProperty('--k', k++); cont.appendChild(e);
            };
            add('h2', CONFIG.carta.encabezado);
            CONFIG.carta.parrafos.forEach(t => add('p', t));
            add('p', CONFIG.carta.despedida, 'cierre');
            add('p', CONFIG.carta.firma, 'firma');
            add('div', '10', 'sello');

            /* =====================================================================
               Confeti (canvas)
               ===================================================================== */
            const cv = $('#confeti'), cx = cv.getContext('2d');
            let partes = [], raf = 0;
            const ajusta = () => {
                const d = window.devicePixelRatio || 1;
                cv.width = innerWidth * d; cv.height = innerHeight * d;
                cx.setTransform(d, 0, 0, d, 0, 0);
            };
            addEventListener('resize', ajusta); ajusta();
            const COLS = ['#3E6E8E', '#F4ECD8', '#B8923A', '#A8556A', '#8D5B5D', '#6E8B5E'];

            function estallido(x, y, dir = 0, n = 90) {
                const N = reducido ? Math.min(n, 25) : n;
                for (let i = 0; i < N; i++) {
                    const a = -Math.PI / 2 + dir + (Math.random() - .5) * 1.1, v = 6 + Math.random() * 9;
                    partes.push({
                        x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, w: 5 + Math.random() * 6, h: 3 + Math.random() * 4,
                        r: Math.random() * 6.28, vr: (Math.random() - .5) * .4, c: COLS[i % COLS.length], vida: 0
                    });
                }
                if (!raf) raf = requestAnimationFrame(paso);
            }
            function paso() {
                cx.clearRect(0, 0, innerWidth, innerHeight);
                partes = partes.filter(p => p.y < innerHeight + 20 && p.vida < 260);
                for (const p of partes) {
                    p.vy += .28; p.vx *= .99; p.vy *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.vida++;
                    cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r); cx.fillStyle = p.c;
                    cx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); cx.restore();
                }
                raf = partes.length ? requestAnimationFrame(paso) : 0;
            }

            /* =====================================================================
               Sonido: fanfarria sintetizada (no requiere archivo) y canción
               ===================================================================== */
            let ctx = null;
            function iniciaAudio() {
                try {
                    const AC = window.AudioContext || window.webkitAudioContext;
                    if (AC) { ctx = new AC(); ctx.resume(); }
                } catch (e) { ctx = null; }
            }
            function nota(freq, t0, dur, vol = .2) {
                const g = ctx.createGain(), f = ctx.createBiquadFilter();
                f.type = 'bandpass';
                f.Q.value = 1.1;
                f.frequency.setValueAtTime(850, t0);
                f.frequency.linearRampToValueAtTime(2200, t0 + .045);
                f.frequency.linearRampToValueAtTime(1500, t0 + dur);
                g.gain.setValueAtTime(0, t0);
                g.gain.linearRampToValueAtTime(vol, t0 + .025);
                g.gain.exponentialRampToValueAtTime(Math.max(.02, vol * .62), t0 + Math.min(.12, dur * .5));
                g.gain.setValueAtTime(Math.max(.02, vol * .62), Math.max(t0 + .13, t0 + dur - .08));
                g.gain.linearRampToValueAtTime(0, t0 + dur);
                f.connect(g); g.connect(ctx.destination);
                [['sawtooth', 0, 1], ['square', 5, .36], ['triangle', 1200, .22]].forEach(([tipo, detune, nivel]) => {
                    const o = ctx.createOscillator();
                    const mezcla = ctx.createGain();
                    o.type = tipo; o.frequency.value = freq; o.detune.value = detune;
                    mezcla.gain.value = nivel; o.connect(mezcla); mezcla.connect(f);
                    o.start(t0); o.stop(t0 + dur + .02);
                });
            }
            function fanfarria() {
                if (!ctx) return;
                const t = ctx.currentTime + .05;
                // Cuatro llamadas de trompeta y un acorde final, sincronizados con los estandartes.
                [[392, .9, .22], [493.88, 1.3, .22], [587.33, 1.7, .22], [783.99, 2.1, .34]].forEach(([f, d, l]) => nota(f, t + d, l, .2));
                [[523.25, 2.1, .34], [659.25, 2.1, .34]].forEach(([f, d, l]) => nota(f, t + d, l, .13));
            }

            const musica = new Audio(CONFIG.cancion);
            musica.loop = true; musica.preload = 'metadata';
            const btnMusica = $('#musica');
            // El navegador no puede leer ni modificar el volumen físico del dispositivo.
            // `volume` define la ganancia de la aplicación y el sistema la combina con su volumen actual.
            const volumenMusica = Math.min(.75, Math.max(.5, Number(CONFIG.volumenMusica) || .65));
            let sonando = false, audioDisponible = Boolean(CONFIG.cancion);
            musica.addEventListener('error', () => {
                audioDisponible = false;
                sonando = false;
                btnMusica.hidden = true;
            });
            function actualizaBotonMusica() {
                const accion = musica.muted ? 'Activar' : 'Silenciar';
                btnMusica.setAttribute('aria-label', `${accion} la música`);
                btnMusica.setAttribute('title', `${accion} la música`);
            }
            function iniciaMusica() {
                if (!audioDisponible || sonando) return;
                sonando = true; musica.volume = 0;
                musica.play().then(() => {
                    btnMusica.hidden = false;
                    actualizaBotonMusica();
                    let v = 0;
                    const t = setInterval(() => {
                        v = Math.min(volumenMusica, v + .05);
                        musica.volume = v;
                        if (v >= volumenMusica) clearInterval(t);
                    }, 120);
                }).catch(() => { sonando = false; });
            }
            btnMusica.addEventListener('click', () => {
                musica.muted = !musica.muted;
                btnMusica.classList.toggle('off', musica.muted);
                actualizaBotonMusica();
            });

            /* =====================================================================
               Flujo: apertura → intro → jardín → carta
               ===================================================================== */
            const etapas = ['gate', 'intro', 'jardin'].map(id => $('#' + id));
            const ir = id => etapas.forEach(e => e.classList.toggle('activa', e.id === id));
            const espera = (ms, fn) => setTimeout(fn, reducido ? 0 : ms);

            function rafaga(sel) {
                const r = $(sel).getBoundingClientRect(), izq = sel.includes('izq');
                estallido(izq ? r.right - r.width * .06 : r.left + r.width * .06, r.top + r.height * .12, izq ? .45 : -.45);
            }

            let iniciado = false;
            function abrirRegalo() {
                if (iniciado) return;
                iniciado = true;
                iniciaAudio(); ir('intro'); fanfarria();
                espera(950, () => { rafaga('.trompeta.izq'); rafaga('.trompeta.der'); });
                espera(1750, () => { rafaga('.trompeta.izq'); rafaga('.trompeta.der'); });
                // La secuencia de trompetas termina a los 2.5 s (.7 s + 4 × .45 s).
                espera(2500, () => {
                    iniciaMusica();
                    estallido(innerWidth / 2, innerHeight * .8, 0, 120);
                });
                espera(4600, () => { ir('jardin'); estallido(innerWidth / 2, innerHeight * .8, 0, 70); });
            }
            const gate = $('#gate');
            gate.addEventListener('click', abrirRegalo);
            gate.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrirRegalo(); }
            });

            const carta = $('#carta'), pergamino = $('#pergamino'), papel = $('#papel');
            carta.setAttribute('aria-label', `Carta para ${CONFIG.nombre}`);
            let timerScroll = 0, focoCarta = null;
            function abrirCarta() {
                focoCarta = document.activeElement;
                carta.inert = false;
                carta.classList.add('on');
                requestAnimationFrame(() => requestAnimationFrame(() => pergamino.classList.add('abierta')));
                clearTimeout(timerScroll);
                timerScroll = setTimeout(() => papel.classList.add('scroll'), 1700);
                $('#pista').classList.add('oculta');
                estallido(innerWidth / 2, innerHeight * .62, 0, 60);
                $('#cerrar').focus();
            }
            function cerrarCarta() {
                if (!carta.classList.contains('on')) return;
                carta.classList.remove('on');
                pergamino.classList.remove('abierta'); papel.classList.remove('scroll');
                papel.scrollTop = 0;
                carta.inert = true;
                focoCarta?.focus();
            }
            const elRamo = $('#ramo');
            elRamo.addEventListener('click', abrirCarta);
            elRamo.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrirCarta(); } });
            $('#cerrar').addEventListener('click', cerrarCarta);
            carta.addEventListener('click', e => { if (e.target === carta) cerrarCarta(); });
            /* Ampliar una foto al tocarla */
            const visor = $('#visor'), imagenVisor = visor.querySelector('img');
            let focoVisor = null;
            function abrirVisor(imagen) {
                focoVisor = document.activeElement;
                imagenVisor.src = imagen.currentSrc || imagen.src;
                imagenVisor.alt = imagen.alt;
                visor.inert = false;
                visor.classList.add('on');
                $('#cerrar-visor').focus();
            }
            function cerrarVisor() {
                if (!visor.classList.contains('on')) return;
                visor.classList.remove('on');
                imagenVisor.removeAttribute('src');
                visor.inert = true;
                focoVisor?.focus();
            }
            addEventListener('keydown', e => {
                if (e.key !== 'Escape') return;
                if (visor.classList.contains('on')) cerrarVisor();
                else cerrarCarta();
            });
            $('#fotos').addEventListener('click', e => {
                const foto = e.target.closest('.pol');
                if (!foto || foto.disabled) return;
                if (foto.classList.contains('por-descubrir')) {
                    foto.classList.remove('por-descubrir');
                    foto.classList.add('revelada');
                    foto.setAttribute('aria-label', `Ampliar foto ${foto.dataset.indice}`);
                    return;
                }
                const im = foto.querySelector('img');
                if (!im) return;
                abrirVisor(im);
            });
            $('#cerrar-visor').addEventListener('click', cerrarVisor);
            visor.addEventListener('click', e => { if (e.target === visor) cerrarVisor(); });
        })();
