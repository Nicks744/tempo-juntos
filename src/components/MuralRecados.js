import React, { useState, useEffect, useCallback } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { supabase, supabaseConfigurado } from '../lib/supabaseClient';
import './MuralRecados.css';

const MAX_MSG = 500;

const MuralRecados = () => {
    const [recados, setRecados] = useState([]);
    const [nome, setNome] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [carregando, setCarregando] = useState(true);
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState('');

    const carregarRecados = useCallback(async () => {
        if (!supabaseConfigurado) {
            setCarregando(false);
            return;
        }
        setCarregando(true);
        const { data, error } = await supabase
            .from('recados')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(100);

        if (error) {
            setErro('Não consegui carregar os recados agora.');
        } else {
            setRecados(data || []);
            setErro('');
        }
        setCarregando(false);
    }, []);

    useEffect(() => {
        carregarRecados();
    }, [carregarRecados]);

    const enviarRecado = async (e) => {
        e.preventDefault();
        const texto = mensagem.trim();
        if (!texto) return;

        setEnviando(true);
        setErro('');

        const novo = {
            nome: nome.trim() || 'Anônimo',
            mensagem: texto,
        };

        const { data, error } = await supabase
            .from('recados')
            .insert(novo)
            .select()
            .single();

        if (error) {
            setErro('Ops, não consegui enviar. Tenta de novo?');
        } else {
            // Adiciona no topo sem precisar recarregar tudo
            setRecados((atuais) => [data, ...atuais]);
            setMensagem('');
            setNome('');
        }
        setEnviando(false);
    };

    return (
        <div className="mural-container">
            <h2 className="subtitulo">Mural de Recados 💌</h2>
            <p className="mural-legenda">Deixe aqui um pedacinho do seu coração.</p>

            {!supabaseConfigurado ? (
                <p className="mural-aviso">
                    O mural ainda não está conectado. (Configure as chaves do Supabase no arquivo <code>.env</code>.)
                </p>
            ) : (
                <>
                    <form className="mural-form" onSubmit={enviarRecado}>
                        <input
                            className="mural-input"
                            type="text"
                            placeholder="Seu nome (opcional)"
                            value={nome}
                            maxLength={40}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <textarea
                            className="mural-textarea"
                            placeholder="Escreva um recado com carinho..."
                            value={mensagem}
                            maxLength={MAX_MSG}
                            rows={3}
                            onChange={(e) => setMensagem(e.target.value)}
                            required
                        />
                        <div className="mural-form-rodape">
                            <span className="mural-contador">
                                {mensagem.length}/{MAX_MSG}
                            </span>
                            <button
                                className="mural-botao"
                                type="submit"
                                disabled={enviando || !mensagem.trim()}
                            >
                                {enviando ? 'Enviando...' : 'Deixar recado 💛'}
                            </button>
                        </div>
                    </form>

                    {erro && <p className="mural-erro">{erro}</p>}

                    <div className="mural-lista">
                        {carregando ? (
                            <p className="mural-vazio">Carregando recados...</p>
                        ) : recados.length === 0 ? (
                            <p className="mural-vazio">Seja o primeiro a deixar um recado 💗</p>
                        ) : (
                            recados.map((r) => (
                                <div key={r.id} className="mural-card">
                                    <p className="mural-card-msg">{r.mensagem}</p>
                                    <div className="mural-card-rodape">
                                        <span className="mural-card-nome">— {r.nome}</span>
                                        <span className="mural-card-data">
                                            {formatDistanceToNow(new Date(r.created_at), {
                                                addSuffix: true,
                                                locale: ptBR,
                                            })}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default MuralRecados;
