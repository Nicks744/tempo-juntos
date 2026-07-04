-- =============================================================
-- Mural de Recados — tabela + segurança (RLS)
-- Cole este script no Supabase: SQL Editor > New query > Run.
-- =============================================================

create table if not exists public.recados (
    id          bigint generated always as identity primary key,
    nome        text not null default 'Anônimo' check (char_length(nome) <= 40),
    mensagem    text not null check (char_length(mensagem) between 1 and 500),
    created_at  timestamptz not null default now()
);

-- Índice para listar os mais recentes rapidamente
create index if not exists recados_created_at_idx
    on public.recados (created_at desc);

-- Liga o Row Level Security (nada é acessível até criarmos políticas)
alter table public.recados enable row level security;

-- Concede acesso base à API (necessário porque desligamos o "expose new tables").
-- O RLS acima ainda controla QUAIS linhas cada um pode ver/inserir.
grant select, insert on public.recados to anon, authenticated;

-- Qualquer visitante pode LER os recados
drop policy if exists "recados_leitura_publica" on public.recados;
create policy "recados_leitura_publica"
    on public.recados
    for select
    to anon, authenticated
    using (true);

-- Qualquer visitante pode DEIXAR um recado (insert)
drop policy if exists "recados_insercao_publica" on public.recados;
create policy "recados_insercao_publica"
    on public.recados
    for insert
    to anon, authenticated
    with check (true);

-- Observação: não criamos políticas de UPDATE nem DELETE de propósito.
-- Assim, ninguém consegue editar ou apagar recados pelo site (só você,
-- pelo painel do Supabase). Isso protege o mural contra alterações.
