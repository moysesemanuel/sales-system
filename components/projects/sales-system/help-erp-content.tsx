"use client";

import { useEffect, useRef, useState } from "react";
import { DaBiTechLogo } from "@/components/shared/dabi-tech-logo";
import type { CurrentUser } from "./types";
import styles from "./landing-page.module.css";

type HelpCategory = {
  title: string;
  icon: string;
  items: string[];
  accent: string;
};

const helpCategories: HelpCategory[] = [
  {
    title: "ERP",
    icon: "◌",
    accent: "helpAccentRed",
    items: [
      "FAQ - Hub do ERP",
      "Aplicativos API V3 - Configurações e Utilização",
      "Histórico de dados da conta: consulta e armazenamento",
    ],
  },
  {
    title: "Agentes de IA",
    icon: "✦",
    accent: "helpAccentBlue",
    items: [
      "Como acessar os Agentes da DaBi Tech",
      "Boas Práticas ao interagir com os Agentes de IA",
    ],
  },
  {
    title: "Envios",
    icon: "➜",
    accent: "helpAccentSky",
    items: [
      "Etiqueta Reversa",
      "Como integrar Envios da DaBi Tech",
      "Como posso imprimir minhas etiquetas?",
      "Como abrir um chamado para o time de atendimento",
    ],
  },
  {
    title: "Crédito",
    icon: "$",
    accent: "helpAccentViolet",
    items: [
      "Como simular e contratar a antecipação de recebíveis",
      "Quais são os custos da antecipação de recebíveis",
      "Vantagens e dúvidas frequentes sobre o Crédito da DaBi Tech",
    ],
  },
  {
    title: "Conta Digital",
    icon: "◔",
    accent: "helpAccentGreen",
    items: ["Tarifas cobradas", "Permissões e ações", "Como conciliar contas a pagar com o buscador de boletos"],
  },
  {
    title: "Ecommerce",
    icon: "▣",
    accent: "helpAccentOrange",
    items: [
      "Novidades em Ecommerce - Edição 01",
      "Primeiros passos",
      "Melhore a experiência do cliente e dispare suas vendas!",
      "Recursos nativos que impulsionam suas vendas",
    ],
  },
  {
    title: "Loja",
    icon: "◫",
    accent: "helpAccentGold",
    items: [
      "Como cancelar a assinatura do plano",
      "Como abrir um chamado para o time de atendimento",
      "Como funcionam as tabelas de frete da DaBi Tech",
    ],
  },
  {
    title: "Novidades",
    icon: "✹",
    accent: "helpAccentBlue",
    items: ["Como funciona o Plano PDV", "Como integrar sua maquininha de cartão ao Plano PDV"],
  },
];

const videoCards = [
  {
    title: "Migração de Regime Tributário",
    subtitle: "Migração do regime tributário no ERP da DaBi Tech para 2026",
  },
  {
    title: "Extrair XML da Nota Fiscal",
    subtitle: "Extração de dados para contabilidade",
  },
  {
    title: "Plano PDV",
    subtitle: "Plano PDV da DaBi Tech: sistema eficiente para sua loja física",
  },
];

const productDropdownItems = helpCategories.map((category) => ({
  title: category.title,
  accent: category.accent,
  icon: category.icon,
}));

function HelpCardIcon({ label, accent }: { label: string; accent: string }) {
  return (
    <div className={`${styles.helpCategoryIcon} ${styles[accent as keyof typeof styles]}`}>
      <span>{label}</span>
    </div>
  );
}

function VideoThumb({ title }: { title: string }) {
  return (
    <div className={styles.helpVideoThumb} aria-hidden="true">
      <div className={styles.helpVideoThumbTag}>DaBi Tech</div>
      <div className={styles.helpVideoThumbPlay}>▶</div>
      <div className={styles.helpVideoThumbTitle}>{title}</div>
    </div>
  );
}

export function HelpErpContent({ currentUser }: { currentUser: CurrentUser }) {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const productsMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocumentClick(event: MouseEvent) {
      if (!productsMenuRef.current) return;
      if (!productsMenuRef.current.contains(event.target as Node)) {
        setIsProductsOpen(false);
      }
    }

    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsProductsOpen(false);
      }
    }

    document.addEventListener("click", onDocumentClick);
    document.addEventListener("keydown", onEscape);

    return () => {
      document.removeEventListener("click", onDocumentClick);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  return (
    <main className={styles.helpRoot}>
      <header className={styles.helpTopBar}>
        <div className={styles.helpTopBarInner}>
          <div className={styles.helpTopBrand}>
            <DaBiTechLogo className={styles.helpTopLogo} />
            <span className={styles.helpTopDivider} aria-hidden="true" />
            <nav className={styles.helpTopNav} aria-label="Navegação da ajuda">
              <a href="#">Central de Ajuda</a>
              <div className={styles.helpProductsMenu} ref={productsMenuRef}>
                <button
                  aria-expanded={isProductsOpen}
                  aria-haspopup="menu"
                  className={styles.helpProductsTrigger}
                  onClick={() => setIsProductsOpen((value) => !value)}
                  type="button"
                >
                  Produtos
                  <span aria-hidden="true">▾</span>
                </button>
                {isProductsOpen ? (
                  <div className={styles.helpProductsDropdown} role="menu">
                    <div className={styles.helpProductsDropdownTitle}>Produtos</div>
                    <ul>
                      {productDropdownItems.map((item) => (
                        <li key={item.title}>
                          <button className={styles.helpProductsDropdownItem} type="button">
                            <span
                              className={`${styles.helpCategoryIcon} ${styles[item.accent as keyof typeof styles]}`}
                            >
                              <span>{item.icon}</span>
                            </span>
                            <span>{item.title}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
              <a href="#">Ir para o site da DaBi</a>
            </nav>
          </div>
          <button className={styles.helpTopButton} type="button">
            Meus chamados
          </button>
        </div>
      </header>

      <section className={styles.helpHero}>
        <div className={styles.helpHeroCopy}>
          <h1>Como podemos ajudar?</h1>
          <div className={styles.helpSearchWrap}>
            <input className={styles.helpSearchInput} placeholder="Pesquise por conteúdos, tutoriais e vídeos" />
            <span className={styles.helpSearchIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" focusable="false" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
                <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
          </div>
          <div className={styles.helpHotRow}>
            <span>Mais buscados:</span>
            <a href="#">Correções de anúncios</a>
            <a href="#">Aplicativos API V3</a>
            <a href="#">Como integrar sua maquininha de cartão ao ERP</a>
          </div>
        </div>
      </section>

      <section className={styles.helpCardsSection}>
        <div className={styles.helpSectionInner}>
          <div className={styles.helpCategories}>
            {helpCategories.map((category) => (
              <article key={category.title} className={styles.helpCategoryCard}>
                <HelpCardIcon label={category.icon} accent={category.accent} />
                <h2>{category.title}</h2>
                <span className={styles.helpCategoryRule} aria-hidden="true" />
                <ul>
                  {category.items.map((item) => (
                    <li key={item}>
                      <a href="#">{item}</a>
                    </li>
                  ))}
                </ul>
                <a className={styles.helpCategoryFooter} href="#">
                  Tudo sobre {category.title} →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.helpVideoSection}>
        <div className={styles.helpSectionInner}>
          <div className={styles.helpVideoSectionHeader}>
            <h2>Impulsione seus resultados com nossos vídeos</h2>
            <div className={styles.helpVideoArrows}>
              <button type="button">←</button>
              <button type="button">→</button>
            </div>
          </div>

          <div className={styles.helpVideoGrid}>
            {videoCards.map((video) => (
              <article key={video.title} className={styles.helpVideoCard}>
                <VideoThumb title={video.title} />
                <div className={styles.helpVideoCopy}>
                  <h3>{video.title}</h3>
                  <p>{video.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.helpFooterSection}>
        <div className={styles.helpSectionInner}>
          <footer className={styles.helpFooter}>
            <div className={styles.helpFooterBrandBlock}>
              <DaBiTechLogo className={styles.helpFooterLogo} />
              <p>A plataforma do ERP DaBi Tech para acelerar sua operação com mais clareza, automação e escala.</p>
            </div>

            <div className={styles.helpFooterLinksGrid}>
              <div>
                <strong>DaBi Tech para quem</strong>
                <a href="#">Vende em marketplace</a>
                <a href="#">Tem uma loja virtual</a>
                <a href="#">Tem loja física</a>
                <a href="#">Atua como distribuidor</a>
                <a href="#">Presta serviços</a>
              </div>
              <div>
                <strong>Produtos</strong>
                <a href="#">Sistema ERP</a>
                <a href="#">Conta Digital</a>
                <a href="#">HUB de Integração</a>
                <a href="#">Sistema PDV</a>
                <a href="#">E-commerce</a>
              </div>
              <div>
                <strong>Atendimento</strong>
                <a href="#">Central de ajuda</a>
                <a href="#">Perguntas frequentes</a>
                <a href="#">Rastreie sua compra</a>
                <a href="#">Tratamento de dados pessoais</a>
              </div>
            </div>

            <div className={styles.helpFooterMeta}>
              <div className={styles.helpFooterMetaLine}>
                <div className={styles.helpFooterSocialRow} aria-label="Redes sociais">
                  <a href="#" aria-label="Instagram">ig</a>
                  <a href="#" aria-label="LinkedIn">in</a>
                  <a href="#" aria-label="Facebook">f</a>
                  <a href="#" aria-label="YouTube">yt</a>
                </div>

                <div className={styles.helpFooterLegalRow}>
                  <a href="#">termos de uso</a>
                  <a href="#">política de privacidade</a>
                  <a href="#">código de conduta e ética</a>
                  <a href="#">encarregado de dados pessoais</a>
                  <a href="#">canal de denúncias</a>
                </div>
              </div>
              <div className={styles.helpFooterAddress}>Avenida João Gualberto, nº 1.698, Curitiba/PR, CEP 80030-001.</div>
            </div>

            <div className={styles.helpFooterUser}>{currentUser.name}</div>
          </footer>
        </div>
      </section>
    </main>
  );
}
