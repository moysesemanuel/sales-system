"use client";

import { useMemo, useState } from "react";
import type { CurrentUser } from "./types";
import styles from "./landing-page.module.css";

type IntegrationCategory = "all" | "marketplaces_hubs" | "ecommerce" | "other";

type IntegrationItem = {
  id: string;
  name: string;
  kindLabel: "Marketplace" | "Hub" | "Plataforma de e-commerce" | "Outra integração";
  category: IntegrationCategory;
  badge?: "BETA";
};

function MagnifierIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M8.7 15.2a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0.75"
      />
      <path
        d="M13.5 13.5 18 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}

function getFaviconUrl(domain: string) {
  const encoded = encodeURIComponent(domain);
  return `https://www.google.com/s2/favicons?domain=${encoded}&sz=64`;
}

const logoDomainById: Record<string, string> = {
  shopee: "shopee.com.br",
  americanas: "americanas.com.br",
  magalu: "magalu.com.br",
  casasbahia: "casasbahia.com.br",
  carrefour: "carrefour.com.br",
  madeiramadeira: "madeiramadeira.com.br",
  aliexpress: "aliexpress.com",
  anymarket: "anymarket.com.br",
  pluga: "pluga.co",
  netshoes: "netshoes.com.br",
  ideris: "ideris.com.br",
  gpa: "gpabr.com",
  kabum: "kabum.com.br",
  wish: "wish.com",
  amazon: "amazon.com.br",
  mercado_livre: "mercadolivre.com.br",
  kwai: "kwai.com",
  beleza_na_web: "belezanaweb.com.br",
  shopify: "shopify.com",
  woocommerce: "woocommerce.com",
  nuvemshop: "nuvemshop.com.br",
};

function IntegrationLogo({ id, name }: { id: string; name: string }) {
  const initial = (name.trim()[0] ?? "?").toUpperCase();
  const domain = logoDomainById[id];
  const logoUrl = domain ? getFaviconUrl(domain) : null;
  return (
    <div className={styles.integrationLogo} aria-hidden="true">
      {logoUrl ? (
        // Decorative logo. If the request fails, the fallback initial stays hidden behind it.
        <img alt="" decoding="async" height={28} loading="lazy" src={logoUrl} width={28} />
      ) : (
        <span>{initial}</span>
      )}
    </div>
  );
}

const categoryLabels: Record<IntegrationCategory, string> = {
  all: "todas as integrações",
  marketplaces_hubs: "marketplaces e hubs",
  ecommerce: "plataformas de e-commerce",
  other: "outras integrações",
};

const categoryHeadings: Record<IntegrationCategory, { title: string; description: string }> = {
  all: {
    title: "Integrações",
    description: "Pesquise e instale conectores para ampliar os canais e automações da sua operação.",
  },
  marketplaces_hubs: {
    title: "Marketplaces e Hubs",
    description:
      "Marketplaces funcionam como um shopping online, onde as empresas podem anunciar seus produtos em lojas conhecidas e abrir novos canais de venda com maior visibilidade, enquanto hubs são conectores que ligam o DaBi Tech ERP com marketplaces.",
  },
  ecommerce: {
    title: "Plataformas de e-commerce",
    description: "Conecte sua loja virtual e sincronize pedidos, catálogo e estoque com o DaBi Tech ERP.",
  },
  other: {
    title: "Outras integrações",
    description: "Conectores adicionais para rotinas específicas, parceiros e automações.",
  },
};

const mockIntegrations: IntegrationItem[] = [
  { id: "shopee", name: "Shopee", kindLabel: "Marketplace", category: "marketplaces_hubs" },
  { id: "americanas", name: "Americanas Marketplace", kindLabel: "Marketplace", category: "marketplaces_hubs" },
  { id: "magalu", name: "Magalu Marketplace", kindLabel: "Marketplace", category: "marketplaces_hubs" },
  { id: "casasbahia", name: "Casas Bahia Marketplace", kindLabel: "Marketplace", category: "marketplaces_hubs" },
  { id: "carrefour", name: "Carrefour", kindLabel: "Marketplace", category: "marketplaces_hubs" },
  { id: "madeiramadeira", name: "MadeiraMadeira", kindLabel: "Marketplace", category: "marketplaces_hubs" },
  { id: "aliexpress", name: "AliExpress", kindLabel: "Marketplace", category: "marketplaces_hubs" },
  { id: "anymarket", name: "Anymarket", kindLabel: "Hub", category: "marketplaces_hubs" },
  { id: "pluga", name: "Pluga.to", kindLabel: "Hub", category: "other" },
  { id: "netshoes", name: "Netshoes", kindLabel: "Marketplace", category: "marketplaces_hubs" },
  { id: "ideris", name: "Ideris", kindLabel: "Hub", category: "marketplaces_hubs" },
  { id: "gpa", name: "Grupo Pão de Açúcar", kindLabel: "Marketplace", category: "marketplaces_hubs" },
  { id: "kabum", name: "Kabum", kindLabel: "Marketplace", category: "marketplaces_hubs" },
  { id: "wish", name: "Wish", kindLabel: "Marketplace", category: "marketplaces_hubs" },
  { id: "amazon", name: "Amazon", kindLabel: "Marketplace", category: "marketplaces_hubs" },
  { id: "mercado_livre", name: "Mercado Livre", kindLabel: "Marketplace", category: "marketplaces_hubs" },
  { id: "kwai", name: "Kwai", kindLabel: "Marketplace", category: "other", badge: "BETA" },
  { id: "beleza_na_web", name: "Beleza na Web", kindLabel: "Marketplace", category: "marketplaces_hubs", badge: "BETA" },
  { id: "shopify", name: "Shopify", kindLabel: "Plataforma de e-commerce", category: "ecommerce" },
  { id: "woocommerce", name: "WooCommerce", kindLabel: "Plataforma de e-commerce", category: "ecommerce" },
  { id: "nuvemshop", name: "Nuvemshop", kindLabel: "Plataforma de e-commerce", category: "ecommerce" },
];

export function IntegrationsContent({ currentUser }: { currentUser: CurrentUser }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<IntegrationCategory>("all");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return mockIntegrations.filter((item) => {
      const matchesCategory = category === "all" ? true : item.category === category;
      const matchesQuery = normalized.length === 0 ? true : item.name.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const heading = categoryHeadings[category];

  return (
    <section className={styles.integrationsRoot} aria-label="Integrações">
      <header className={styles.integrationsHeader}>
        <h1 className={styles.integrationsTitle}>Adicionar integração</h1>

        <div className={styles.integrationsHeaderRow}>
          <div className={styles.integrationsSearchWrap}>
            <input
              className={styles.integrationsSearch}
              placeholder="Pesquise por integrações ou canais de venda"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <span className={styles.integrationsSearchIcon} aria-hidden="true">
              <MagnifierIcon />
            </span>
          </div>

          <div className={styles.integrationsChips} role="tablist" aria-label="Categorias de integrações">
            {(Object.keys(categoryLabels) as IntegrationCategory[]).map((key) => (
              <button
                key={key}
                className={`${styles.dashChip} ${category === key ? styles.integrationsChipActive : ""}`}
                onClick={() => setCategory(key)}
                type="button"
                role="tab"
                aria-selected={category === key}
              >
                {categoryLabels[key]}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className={styles.integrationsIntro}>
        <h2>{heading.title}</h2>
        <p>{heading.description}</p>
      </div>

      <section className={styles.integrationsGrid} aria-label="Lista de integrações">
        {filtered.map((item) => (
          <article key={item.id} className={styles.integrationCard} tabIndex={-1}>
            <IntegrationLogo id={item.id} name={item.name} />

            <div className={styles.integrationMeta}>
              <div className={styles.integrationNameRow}>
                <div className={styles.integrationName}>{item.name}</div>
                {item.badge ? <span className={styles.integrationBadge}>{item.badge}</span> : null}
              </div>
              <div className={styles.integrationKind}>{item.kindLabel}</div>
            </div>

            <button className={styles.integrationInstall} type="button">
              instalar
            </button>
          </article>
        ))}
      </section>

      <div className={styles.integrationsFooterHint} aria-hidden="true">
        {currentUser.name ? "" : ""}
      </div>
    </section>
  );
}
