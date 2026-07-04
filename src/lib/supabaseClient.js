import { createClient } from '@supabase/supabase-js';

/*
 * Cliente Supabase compartilhado.
 * As chaves vêm de variáveis de ambiente (arquivo .env, fora do git).
 * A chave usada é a "publishable"/"anon" — segura no navegador com RLS ligado.
 */
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Só cria o cliente se as variáveis existirem, para o site não quebrar sem elas.
export const supabase =
    supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Útil para os componentes mostrarem um aviso amigável se faltar configuração.
export const supabaseConfigurado = Boolean(supabase);
