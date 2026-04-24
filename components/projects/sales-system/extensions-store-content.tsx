"use client";

import { useMemo, useState } from "react";
import type { CurrentUser } from "./types";
import styles from "./landing-page.module.css";

type StoreCategory = "all" | "ecommerce" | "commerce" | "service" | "industry" | "account" | "ia";

type StoreItem = {
  id: string;
  name: string;
  audience: string;
  category: StoreCategory;
  priceLabel: string;
  free?: boolean;
  accent: string;
};

const categoryLabels: Record<StoreCategory, string> = {
  all: "todos",
  ecommerce: "E-commerce",
  commerce: "Comércio",
  service: "Serviço",
  industry: "Indústria",
  account: "Conta",
  ia: "IA",
};

const storeItems: StoreItem[] = [
  { id: "q-ecommerce", name: "Perguntas do e-commerce", audience: "vendas", category: "ecommerce", priceLabel: "GRÁTIS", free: true, accent: "q" },
  { id: "pos-market", name: "Pós-venda do Mercado Livre", audience: "vendas", category: "commerce", priceLabel: "GRÁTIS", free: true, accent: "m" },
  { id: "sat", name: "SAT-CFe", audience: "vendas", category: "commerce", priceLabel: "GRÁTIS", free: true, accent: "s" },
  { id: "correios", name: "Correios LOG+", audience: "vendas", category: "service", priceLabel: "GRÁTIS", free: true, accent: "c" },
  { id: "sync-1m", name: "+ 1 milhão de Sincronizações de Estoque", audience: "suprimentos", category: "industry", priceLabel: "R$ 700,00", accent: "1" },
  { id: "ann-10k", name: "+ 10 mil Anúncios", audience: "vendas", category: "ecommerce", priceLabel: "R$ 200,00", accent: "10" },
  { id: "sync-10m", name: "+ 10 mil Sincronizações de Estoque", audience: "vendas", category: "industry", priceLabel: "R$ 20,00", accent: "10" },
  { id: "sync-10m2", name: "+ 10 milhões de Sincronizações de Estoque", audience: "vendas", category: "industry", priceLabel: "R$ 7.000,00", accent: "10" },
  { id: "ann-100k", name: "+ 100 mil Anúncios", audience: "vendas", category: "ecommerce", priceLabel: "R$ 1.000,00", accent: "100" },
  { id: "ann-1k", name: "+ 1000 Anúncios", audience: "vendas", category: "ecommerce", priceLabel: "R$ 50,00", accent: "1K" },
  { id: "sync-2m", name: "+ 2 milhões de Sincronizações de Estoque", audience: "vendas", category: "industry", priceLabel: "R$ 1.400,00", accent: "2" },
  { id: "sync-200k", name: "+ 200 mil Sincronizações de Estoque", audience: "vendas", category: "industry", priceLabel: "R$ 200,00", accent: "200" },
  { id: "sync-25k", name: "+ 25 mil Sincronizações de Estoque", audience: "vendas", category: "industry", priceLabel: "R$ 50,00", accent: "25" },
  { id: "sync-250k", name: "+ 250 mil Sincronizações de Estoque", audience: "vendas", category: "industry", priceLabel: "R$ 250,00", accent: "250" },
  { id: "sync-3m", name: "+ 3 milhões de Sincronizações de Estoque", audience: "vendas", category: "industry", priceLabel: "R$ 2.100,00", accent: "3" },
  { id: "sync-4m", name: "+ 4 milhões de Sincronizações de Estoque", audience: "vendas", category: "industry", priceLabel: "R$ 2.800,00", accent: "4" },
  { id: "ann-40m", name: "+ 40 mil Anúncios", audience: "vendas", category: "ecommerce", priceLabel: "R$ 400,00", accent: "40" },
  { id: "ann-5m", name: "+ 5 mil Anúncios", audience: "vendas", category: "ecommerce", priceLabel: "R$ 100,00", accent: "5" },
  { id: "sync-5m", name: "+ 5 milhões de Sincronizações de Estoque", audience: "vendas", category: "industry", priceLabel: "R$ 3.500,00", accent: "5" },
  { id: "sync-50m", name: "+ 50 mil Sincronizações de Estoque", audience: "vendas", category: "industry", priceLabel: "R$ 100,00", accent: "50" },
  { id: "ann-500", name: "+ 500 Anúncios", audience: "vendas", category: "ecommerce", priceLabel: "R$ 25,00", accent: "500" },
  { id: "sync-500k", name: "+ 500 mil Sincronizações de Estoque", audience: "vendas", category: "industry", priceLabel: "R$ 500,00", accent: "500" },
  { id: "ann-60m", name: "+ 60 mil Anúncios", audience: "vendas", category: "ecommerce", priceLabel: "R$ 600,00", accent: "60" },
  { id: "ann-80m", name: "+ 80 mil Anúncios", audience: "vendas", category: "ecommerce", priceLabel: "R$ 800,00", accent: "80" },
  { id: "boa-vista", name: "Boa Vista SCPC", audience: "cadastros", category: "account", priceLabel: "GRÁTIS", free: true, accent: "bv" },
  { id: "calc-volumes", name: "Cálculo Automático de Volumes", audience: "vendas", category: "commerce", priceLabel: "GRÁTIS", free: true, accent: "cv" },
  { id: "google-shopping", name: "Google Shopping", audience: "vendas", category: "ecommerce", priceLabel: "GRÁTIS", free: true, accent: "g" },
  { id: "sync-products", name: "Log sincronização de produtos com E-commerce", audience: "e-commerce", category: "ecommerce", priceLabel: "GRÁTIS", free: true, accent: "lp" },
  { id: "card-machine", name: "Maquininhas de cartão", audience: "financeiro", category: "account", priceLabel: "GRÁTIS", free: true, accent: "mc" },
  { id: "anexos-2-5", name: "+2,5 GB | Anexos", audience: "outros", category: "service", priceLabel: "R$ 108,35", accent: "a" },
  { id: "anexos-500", name: "+500 MB | Anexos", audience: "outros", category: "service", priceLabel: "R$ 27,09", accent: "a" },
  { id: "amazon-ads", name: "Amazon Ads", audience: "outros", category: "ecommerce", priceLabel: "GRÁTIS", free: true, accent: "am" },
  { id: "webhooks", name: "Webhooks", audience: "outros", category: "ia", priceLabel: "GRÁTIS", free: true, accent: "wh" },
];

function StoreIcon({ label }: { label: string }) {
  return <span>{label}</span>;
}

export function ExtensionsStoreContent({ currentUser }: { currentUser: CurrentUser }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<StoreCategory>("all");

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return storeItems.filter((item) => {
      const matchesQuery =
        !normalized ||
        [item.name, item.audience, item.priceLabel].some((value) => value.toLowerCase().includes(normalized));
      const matchesCategory = category === "all" || item.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [category, query]);

  return (
    <main className={styles.extensionsRoot}>
      <section className={styles.extensionsPage}>
        <div className={styles.extensionsHeaderRow}>
          <h1>Loja de extensões</h1>
          <button className={styles.extensionsMyButton} type="button">
            minhas extensões
          </button>
        </div>

        <div className={styles.extensionsSearchRow}>
          <input
            className={styles.extensionsSearchInput}
            placeholder="Busque pela funcionalidade ou dúvida"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <span className={styles.extensionsSearchIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" focusable="false" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
        </div>

        <div className={styles.extensionsFeatureCard}>
          <div className={styles.extensionsFeatureBadge}>GRÁTIS</div>
          <div>
            <h2>Maquininhas de cartão</h2>
            <p>Integre o seu meio de pagamento com mais praticidade.</p>
          </div>
          <button type="button">+ instalar</button>
        </div>

        <div className={styles.extensionsFiltersRow} role="tablist" aria-label="Filtros da loja">
          <span>Filtros:</span>
          {(Object.keys(categoryLabels) as StoreCategory[]).map((itemCategory) => (
            <button
              key={itemCategory}
              className={itemCategory === category ? styles.extensionsFilterActive : styles.extensionsFilter}
              onClick={() => setCategory(itemCategory)}
              type="button"
            >
              {categoryLabels[itemCategory]}
            </button>
          ))}
        </div>

        <section className={styles.extensionsIntro}>
          <h2>Explore o máximo potencial do seu plano</h2>
          <p>Confira as extensões disponíveis para o seu plano Impulsione e obtenha uma solução ainda mais completa para o seu negócio.</p>
        </section>

        <div className={styles.extensionsGrid}>
          {filteredItems.map((item) => (
            <article key={item.id} className={styles.extensionCard}>
              <div className={styles.extensionCardIcon}>
                <StoreIcon label={item.accent} />
              </div>
              <div className={styles.extensionCardBody}>
                <h3>{item.name}</h3>
                <p>{item.audience}</p>
                <button type="button">instalar</button>
              </div>
              <span className={item.free ? styles.extensionPriceFree : styles.extensionPrice}>{item.priceLabel}</span>
            </article>
          ))}
        </div>

        <section className={styles.extensionsUpsell}>
          <h2>Desenvolva o seu negócio com os melhores recursos</h2>
          <p>Aproveite os recursos mais avançados do Sistema ERP, disponíveis com o upgrade de plano e escale a sua operação.</p>
          <div className={styles.extensionsUpsellCard}>
            <div className={styles.extensionsUpsellPreview}>
              <span>+UPGRADE</span>
            </div>
            <div className={styles.extensionsUpsellContent}>
              <h3>Gestão de envios do Fulfillment</h3>
              <p>suprimentos</p>
              <button type="button">detalhes</button>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
