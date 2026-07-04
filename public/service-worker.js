/* Service worker simples: permite instalar o site como app e usá-lo offline.
 * Estratégia: network-first com fallback para cache (bom para um app que
 * muda pouco, mas que deve funcionar mesmo sem internet). */
const CACHE = 'tempo-juntos-v1';
const ESSENCIAIS = ['./', './index.html', './manifest.json', './favicon.ico'];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) => cache.addAll(ESSENCIAIS)).catch(() => {})
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((chaves) =>
            Promise.all(chaves.filter((c) => c !== CACHE).map((c) => caches.delete(c)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    // Só lida com GET do mesmo domínio (evita interferir no Spotify, fontes, etc.)
    if (event.request.method !== 'GET') return;
    const url = new URL(event.request.url);
    if (url.origin !== self.location.origin) return;

    event.respondWith(
        fetch(event.request)
            .then((resposta) => {
                const clone = resposta.clone();
                caches.open(CACHE).then((cache) => cache.put(event.request, clone)).catch(() => {});
                return resposta;
            })
            .catch(() =>
                caches.match(event.request).then((emCache) => emCache || caches.match('./index.html'))
            )
    );
});
