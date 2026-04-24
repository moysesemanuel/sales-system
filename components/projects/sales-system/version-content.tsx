"use client";

import { DaBiTechLogo } from "@/components/shared/dabi-tech-logo";
import type { CurrentUser } from "./types";
import styles from "./landing-page.module.css";

type ReleaseNote = {
  title: string;
  chips: string[];
  summary: string;
  bullets?: string[];
  callout?: string;
};

const releaseNotes: ReleaseNote[] = [
  {
    title: "Novas entradas e notas fiscais",
    chips: ["Fiscal", "ERP", "Notas"],
    summary:
      "Atualizamos o fluxo de criação e revisão de documentos fiscais para reduzir retrabalho e dar mais visibilidade ao que está sendo emitido.",
    bullets: [
      "Nova organização do fluxo de notas para facilitar revisão antes da emissão.",
      "Ajustes no espelho de documentos para leitura mais rápida em tela cheia.",
      "Melhorias de performance ao navegar por lotes maiores de registros.",
    ],
    callout: "Agora fica mais fácil revisar, conferir e emitir sem sair do contexto da operação.",
  },
  {
    title: "Integrações com múltiplas empresas",
    chips: ["Integrações", "Conta", "Multiempresa"],
    summary:
      "Conectamos novos pontos do ERP para suportar empresas com mais de uma operação ativa e simplificar a navegação entre canais.",
    bullets: [
      "Ajustes na experiência para alternar entre empresas sem perder o contexto atual.",
      "Melhorias em validações de cadastro para integrações com origem externa.",
      "Fluxo mais claro para acompanhar status e pendências de cada integração.",
    ],
  },
  {
    title: "IBS e CBS no espelho da nota",
    chips: ["Fiscal", "Tributação"],
    summary:
      "O espelho fiscal foi adaptado para refletir novas regras de exibição e leitura, deixando os campos mais fáceis de conferir.",
    bullets: [
      "Campos reorganizados para facilitar a leitura tributária.",
      "Informações críticas ganharam mais destaque no documento.",
      "A visualização agora conversa melhor com a rotina de conferência.",
    ],
    callout: "Mais clareza para operar sem quebrar o ritmo da emissão.",
  },
  {
    title: "Redução de chamados e novos filtros",
    chips: ["Suporte", "Filtros", "Operação"],
    summary:
      "Pequenos ajustes de UX ajudam a reduzir dúvidas e tornar os filtros mais previsíveis durante o uso diário.",
    bullets: [
      "Campos com feedback visual mais claro.",
      "Filtros com comportamento mais consistente entre telas.",
      "Melhor indicação do que está sendo filtrado em cada etapa.",
    ],
  },
  {
    title: "Faturamento automático por canal de venda",
    chips: ["Vendas", "Automação"],
    summary:
      "Fluxos automáticos foram refinados para encaixar melhor no cenário de canais e evitar etapas repetidas no faturamento.",
    callout: "O objetivo aqui é tirar clique manual de onde o ERP já pode resolver sozinho.",
  },
  {
    title: "Shopee e Amazon",
    chips: ["Marketplace", "Integração"],
    summary:
      "Ajustamos rotinas de integração para recebimento e envio de notas em canais com maior volume de pedidos.",
    bullets: [
      "Rotinas de envio automático de documentos revisadas.",
      "Mapeamentos manuais ficaram mais previsíveis.",
      "O acompanhamento de status ganhou mais consistência.",
    ],
  },
  {
    title: "Magalu, Novo Hub e melhorias gerais",
    chips: ["Hub", "Preços", "Anúncios"],
    summary:
      "A versão também traz ajustes menores, porém importantes, em precificação, anúncios, importações e consistência visual.",
    bullets: [
      "Nova tag visual em pedidos específicos.",
      "Módulos de anúncios e preços com leitura mais limpa.",
      "Melhorias diversas em telas de apoio e relatórios.",
    ],
  },
];

function SparkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M10 2.5 11.8 8.2 17.5 10 11.8 11.8 10 17.5 8.2 11.8 2.5 10 8.2 8.2 10 2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ReleaseArt() {
  return (
    <div className={styles.versionArt} aria-hidden="true">
      <div className={styles.versionArtCloud} />
      <div className={styles.versionArtLaptop} />
      <div className={styles.versionArtPlant} />
      <div className={styles.versionArtRing} />
      <div className={styles.versionArtDot} />
      <div className={styles.versionArtDrop} />
    </div>
  );
}

export function VersionContent({ currentUser }: { currentUser: CurrentUser }) {
  return (
    <section className={styles.versionRoot}>
      <header className={styles.versionHero}>
        <div className={styles.versionHeroCopy}>
          <div className={styles.versionSparkRow}>
            <span className={styles.versionSpark} aria-hidden="true">
              <SparkIcon />
            </span>
            <span className={styles.versionSparkText}>DaBi Tech ERP</span>
          </div>

          <h1>Boas-vindas a nossa última atualização</h1>
          <p>
            Essa página vai concentrar as notas de versão, melhorias e mudanças importantes do ERP.
            Por enquanto, estamos deixando a estrutura bem próxima do print para servir como base.
          </p>

          <div className={styles.versionMetaRow}>
            <div>
              <span>versão</span>
              <strong>3.0.6</strong>
            </div>
            <div>
              <span>data</span>
              <strong>24 de abril de 2026</strong>
            </div>
          </div>
        </div>

        <ReleaseArt />
      </header>

      <article className={styles.versionLeadCard}>
        <div className={styles.versionLeadBadge}>Atualização em destaque</div>
        <h2>Nossa última atualização reorganiza a leitura fiscal, integrações e rotinas de operação.</h2>
        <p>
          O foco desta versão foi reduzir ruído visual, simplificar conferências e manter os fluxos mais
          previsíveis para quem usa o ERP no dia a dia.
        </p>
      </article>

      <section className={styles.versionTimeline} aria-label="Notas da versão">
        {releaseNotes.map((note) => (
          <article key={note.title} className={styles.versionSection}>
            <div className={styles.versionSectionHeader}>
              <div className={styles.versionSectionTitleRow}>
                <span className={styles.versionSectionMarker} aria-hidden="true">
                  <SparkIcon />
                </span>
                <h2>{note.title}</h2>
              </div>
              <div className={styles.versionChips}>
                {note.chips.map((chip) => (
                  <span key={chip} className={styles.versionChip}>
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <p className={styles.versionSummary}>{note.summary}</p>

            {note.bullets ? (
              <ul className={styles.versionBulletList}>
                {note.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}

            {note.callout ? <div className={styles.versionCallout}>{note.callout}</div> : null}
          </article>
        ))}
      </section>

      <section className={styles.versionFooter}>
        <p className={styles.versionFooterIntro}>
          Sinta-se à vontade para entrar em contato conosco. Opine sobre a nova versão, reporte problemas, envie
          ideias ou sugira melhorias.
        </p>

        <nav className={styles.versionFooterLinks} aria-label="Canais DaBi Tech">
          <a href="#">blog da DaBi Tech</a>
          <a href="#">facebook</a>
          <a href="#">telegram</a>
          <a href="#">instagram</a>
          <a href="#">linkedin</a>
          <a href="#">youtube</a>
        </nav>

        <div className={styles.versionFooterColumns}>
          <div className={styles.versionFooterBlock}>
            <h3>atendimento</h3>
            <p>seg. à sex. das 8h30 às 17h30 ligue 54 3055.8200</p>
            <a href="#">ou abra um chamado.</a>
          </div>

          <div className={styles.versionFooterBlock}>
            <h3>localização</h3>
            <p>rua xingu, 1190, são bento, são leopoldo - rs, 95703-108.</p>
            <a href="#">ver mapa.</a>
          </div>
        </div>

        <div className={styles.versionFooterBrand}>
          <DaBiTechLogo className={styles.versionFooterLogo} />
        </div>
      </section>

      <div className={styles.versionUserAnchor} aria-hidden="true">
        {currentUser.name}
      </div>
    </section>
  );
}
