# 💖 Nossa História Juntos

Um site feito com amor para contar a nossa história de namoro — com contagem de tempo em tempo real, galeria de fotos, linha do tempo, cápsula do tempo, mural de recados e muito mais. Totalmente responsivo, instalável como app (PWA) e com visual encantador.

## ✨ Funcionalidades

- ⏳ **Contador em tempo real** — anos, meses, dias, horas, minutos e segundos juntos, além do total de dias e frases carinhosas.
- 📸 **Galeria de fotos** estilo polaroid, com visualização ampliada (lightbox).
- 📜 **Timeline "Nossa História"** — linha do tempo interativa e animada com os momentos do casal.
- ⏳ **Cápsula do Tempo** — cartas que só podem ser abertas em datas futuras (com contagem regressiva).
- 🎉 **Modo surpresa** — em datas especiais (mêsversário e aniversário de namoro), o site abre com uma comemoração e confete. Pode ser testado com `?surpresa=1` na URL.
- 💌 **Mural de Recados** — mensagens persistentes salvas no banco de dados (Supabase).
- 🎯 **Quiz pessoal** do casal.
- 💗 **Animações** — corações no clique, chuva de corações ambiente e efeitos de entrada ao rolar.
- 🎵 **Player do Spotify** com a música do casal.
- 📱 **PWA** — instalável na tela inicial do celular e funcional offline.
- 📱 **Layout responsivo**, ideal para celulares.

## 🛠 Tecnologias usadas

- [React](https://reactjs.org/) (Create React App)
- [Supabase](https://supabase.com/) — banco de dados do Mural de Recados
- [date-fns](https://date-fns.org/) — manipulação de datas
- [Bootstrap](https://getbootstrap.com/) / [React-Bootstrap](https://react-bootstrap.github.io/)
- CSS customizado + Google Fonts (Dancing Script, Playfair Display)
- PWA (manifest + service worker)

## 📁 Estrutura do Projeto

```
/public
├── img/                    # Fotos do casal (imagem1.jpg ... imagem6.jpg)
├── manifest.json           # Configuração do PWA
└── service-worker.js       # Cache offline do PWA

/src
├── components/
│   ├── ContagemTempo.js    # Componente principal (junta tudo)
│   ├── GaleriaFotos.js     # Galeria polaroid + lightbox
│   ├── Timeline.js         # Linha do tempo "Nossa História"
│   ├── CapsulaDoTempo.js   # Cartas que abrem em datas futuras
│   ├── Surpresa.js         # Modo surpresa em datas especiais
│   ├── Confetti.js         # Confete em canvas (sem dependências)
│   ├── MuralRecados.js     # Mural de recados (Supabase)
│   ├── Quiz.js             # Quiz do casal
│   ├── Reveal.js           # Wrapper de animação ao rolar
│   └── HeartBackground.js  # Corações no fundo
├── hooks/
│   └── useScrollReveal.js  # Hook de animação ao entrar na tela
├── lib/
│   └── supabaseClient.js   # Cliente Supabase
├── App.js
└── index.js

/supabase
└── migrations/
    └── 001_recados.sql     # Tabela + segurança (RLS) do Mural de Recados
```

## 🚀 Como rodar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/Nicks744/tempo-juntos.git
   cd tempo-juntos
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente (veja a seção abaixo).

4. Inicie o servidor:
   ```bash
   npm start
   ```

5. Acesse em `http://localhost:3000`.

## 🔐 Variáveis de ambiente (Supabase)

O Mural de Recados usa o Supabase. Copie o arquivo `.env.example` para `.env` e preencha:

```bash
REACT_APP_SUPABASE_URL=https://SEU-PROJETO.supabase.co
REACT_APP_SUPABASE_ANON_KEY=sb_publishable_xxxxxxxxxxxxxxxxxxxx
```

> Use a chave **publishable** / **anon** (segura no navegador com RLS ligado). **Nunca** use a chave *secret* no frontend. O arquivo `.env` está no `.gitignore` e não deve ser versionado.

O site funciona normalmente sem o Supabase configurado — apenas o Mural de Recados exibe um aviso de "não conectado".

## 🗄 Configuração do banco (Supabase)

No painel do Supabase, vá em **SQL Editor** e execute o script [`supabase/migrations/001_recados.sql`](supabase/migrations/001_recados.sql). Ele cria a tabela `recados` e configura o Row Level Security:

- Qualquer visitante pode **ler** e **deixar** recados.
- Ninguém pode **editar** ou **apagar** recados pelo site (apenas pelo painel do Supabase).

## ☁️ Deploy (Vercel)

O projeto é publicado no Vercel a partir da branch `main`. Lembre-se de cadastrar as variáveis de ambiente (`REACT_APP_SUPABASE_URL` e `REACT_APP_SUPABASE_ANON_KEY`) no ambiente **Production** do Vercel e refazer o deploy.

## 📷 Adicionando suas fotos

Coloque as imagens em `public/img/` com os nomes `imagem1.jpg` até `imagem6.jpg`. Para adicionar mais, edite a lista `listaDeFotos` em [`src/components/ContagemTempo.js`](src/components/ContagemTempo.js).

## ✏️ Personalizando

- **Data de início do namoro:** `dataInicio` em `ContagemTempo.js`.
- **Timeline:** edite a lista `eventos` em `Timeline.js`.
- **Cápsula do Tempo:** edite a lista `cartas` em `CapsulaDoTempo.js`.
- **Quiz:** edite as `questions` em `Quiz.js`.
- **Mensagem final:** `mensagemParagrafos` em `ContagemTempo.js`.

## 📄 Licença

Este projeto foi feito com carinho 💗 e é de uso pessoal. Fique à vontade para se inspirar e criar o seu!

---

Feito com 💘 por Lucas Nicolas
