"use client";

import { useState } from "react";
import type { CurrentUser } from "./types";
import styles from "./landing-page.module.css";

type PlanCard = {
  name: string;
  monthly: string;
  annual: string;
  highlight?: boolean;
  current?: boolean;
  ctaLabel: string;
  baseFeatures: string[];
  highlightTitle?: string;
  highlightFeatures?: string[];
};

function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M12.5 4.5 7 10l5.5 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlanCheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="m5.5 10.5 2.8 2.8 6.2-6.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BulletIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M4 10h12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10 4 16 10 10 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Star4Icon() {
  return (
    <svg width="22" height="22" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M10 2.5 11.9 8.1 17.5 10 11.9 11.9 10 17.5 8.1 11.9 2.5 10 8.1 8.1 10 2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

const planCards: PlanCard[] = [
  {
    name: "Avance",
    monthly: "59,00",
    annual: "588,00",
    ctaLabel: "escolher plano",
    baseFeatures: [
      "Vendas ilimitadas",
      "Usuários ilimitados",
      "Armazenamento ilimitado",
      "Importação automática de pedidos",
      "2.000 anúncios",
      "12 meses de consulta aos dados",
      "150k sincronizações de estoque / mês",
    ],
    highlightTitle: "Recursos em destaque:",
    highlightFeatures: [
      "Emissão de NF-e, NFC-e e NFS-e",
      "Gestão de estoque",
      "Cotação de frete",
      "Controle de expedição",
      "Controle de estoque",
      "Vendedores",
      "PDV (frente de caixa)",
      "Ordens de serviço",
      "Contratos de serviço",
      "Relatórios personalizados",
      "Integração com +40 marketplaces",
      "Treinamento coletivo",
    ],
  },
  {
    name: "Construa",
    monthly: "159,00",
    annual: "1.548,00",
    ctaLabel: "escolher plano",
    baseFeatures: [
      "Vendas ilimitadas",
      "Usuários ilimitados",
      "Armazenamento ilimitado",
      "Importação automática de pedidos",
      "5.000 anúncios",
      "24 meses de consulta aos dados",
      "300k sincronizações de estoque / mês",
    ],
    highlightTitle: "Recursos em destaque:",
    highlightFeatures: [
      "Multiempresa",
      "Emissão de boletos e cobranças",
      "Conciliação bancária",
      "CRM",
      "Devoluções de venda",
      "Google Shopping",
      "Relatório de fluxo de caixa",
      "Demonstrativo de resultados (DRE)",
      "PDV com abertura e fechamento de caixa",
      "Desconto para gerente e fechamento de caixa",
      "Integração com Gateway de Pagamento",
      "Gerenciamento de lotes e validade",
    ],
  },
  {
    name: "Impulsione",
    monthly: "349,00",
    annual: "3.348,00",
    ctaLabel: "plano atual",
    current: true,
    baseFeatures: [
      "Vendas ilimitadas",
      "Usuários ilimitados",
      "Armazenamento ilimitado",
      "Importação automática de pedidos",
      "10.000 anúncios",
      "24 meses de consulta aos dados",
      "600k sincronizações de estoque / mês",
    ],
    highlightTitle: "Recursos em destaque:",
    highlightFeatures: [
      "Separação e embalagem em lote",
      "Calculadora de preços",
      "Planejamento de compras",
      "Picking and Packing",
      "Relatório margem de contribuição",
      "Relatório performance de vendas",
      "Pedidos sob encomenda",
      "Sped fiscal",
      "Separação e expedição de pedidos",
      "Controle de produção",
      "Campanhas promocionais",
      "Impressão automática de DANFE e etiqueta de envio",
    ],
  },
  {
    name: "Domine",
    monthly: "849,00",
    annual: "8.148,00",
    ctaLabel: "escolher plano",
    highlight: true,
    baseFeatures: [
      "Vendas ilimitadas",
      "Usuários ilimitados",
      "Armazenamento ilimitado",
      "Importação automática de pedidos",
      "20.000 anúncios",
      "36 meses de consulta aos dados",
      "900k sincronizações de estoque / mês",
    ],
    highlightTitle: "Recursos em destaque:",
    highlightFeatures: [
      "Suporte em até 5 min",
      "Linha telefônica exclusiva",
      "Gerente de contas",
      "Maior limite de requisições de API",
    ],
  },
];

function PlanCardFeatures({ features }: { features: string[] }) {
  return (
    <ul className={styles.upgradeFeatureList}>
      {features.map((feature) => (
        <li key={feature}>
          <span className={styles.upgradeFeatureIcon} aria-hidden="true">
            <PlanCheckIcon />
          </span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}

function PlanCardSection({
  title,
  features,
}: {
  title?: string;
  features: string[];
}) {
  if (features.length === 0) {
    return null;
  }

  return (
    <section className={styles.upgradePlanSection}>
      {title ? <div className={styles.upgradePlanSectionTitle}>{title}</div> : null}
      <PlanCardFeatures features={features} />
    </section>
  );
}

export function UpgradePlanContent({ currentUser }: { currentUser: CurrentUser }) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  return (
    <section className={styles.upgradeRoot}>
      <header className={styles.upgradeHeader}>
        <div className={styles.upgradeHeaderTop}>
          <div className={styles.upgradeBreadcrumbWrap}>
            <button className={styles.upgradeBackButton} type="button">
              <span className={styles.upgradeBackIcon} aria-hidden="true">
                <BackIcon />
              </span>
              voltar
            </button>
            <div className={styles.upgradeBreadcrumb} aria-label="Migalhas de pão">
              <span className={styles.upgradeBreadcrumbDim}>início</span>
              <span className={styles.upgradeBreadcrumbSep} aria-hidden="true">
                /
              </span>
              <span className={styles.upgradeBreadcrumbStrong}>upgrade de plano</span>
            </div>
          </div>

          <button className={styles.upgradeHeaderAction} type="button">
            alterar pagamento
          </button>
        </div>

        <div className={styles.upgradeStageBar}>
          <div className={styles.upgradeStageTitle}>
            <span className={styles.upgradeStageMarker} aria-hidden="true">
              <BulletIcon />
            </span>
            <span>Etapa atual</span>
            <strong>Centralize seus produtos e estoque</strong>
          </div>

          <div className={styles.upgradeStageProgress}>
            <span>0 de 4</span>
            <div className={styles.upgradeStageTrack} aria-hidden="true">
              <div className={styles.upgradeStageFill} />
            </div>
            <a className={styles.upgradeStageLink} href="#">
              acessar o guia
            </a>
          </div>
        </div>
      </header>

      <section className={styles.upgradeOverview}>
        <h1 className={styles.upgradeTitle}>Upgrade de plano</h1>

        <div className={styles.upgradeSummaryGrid}>
          <div>
            <span>Plano atual</span>
            <strong>Impulsione</strong>
          </div>
          <div>
            <span>Valor</span>
            <strong>R$ 3.348,00</strong>
          </div>
          <div>
            <span>Periodicidade</span>
            <strong>{billingCycle === "monthly" ? "Mensal" : "Anual"}</strong>
          </div>
          <div>
            <span>Forma de pagamento</span>
            <strong>Boleto</strong>
          </div>
        </div>

        <div className={styles.upgradePeriodSwitch} aria-label="Periodicidade">
          <button
            className={billingCycle === "monthly" ? styles.upgradePeriodChipActive : styles.upgradePeriodChip}
            onClick={() => setBillingCycle("monthly")}
            type="button"
          >
            mensal
          </button>
          <button
            className={billingCycle === "annual" ? styles.upgradePeriodChipActive : styles.upgradePeriodChip}
            onClick={() => setBillingCycle("annual")}
            type="button"
          >
            anual
          </button>
        </div>
      </section>

      <section className={styles.upgradePlansGrid} aria-label="Planos disponíveis">
        {planCards.map((plan) => (
          <article
            key={plan.name}
            className={`${styles.upgradePlanCard} ${plan.current ? styles.upgradePlanCardCurrent : ""} ${
              plan.highlight ? styles.upgradePlanCardHighlight : ""
            }`}
          >
            <div className={styles.upgradePlanHeader}>
              <div className={styles.upgradePlanName}>{plan.name}</div>
              {plan.highlight ? (
                <span className={styles.upgradePlanStar} aria-hidden="true">
                  <Star4Icon />
                </span>
              ) : null}
            </div>

            <div className={styles.upgradePlanPriceBlock}>
              {billingCycle === "monthly" ? (
                <div className={styles.upgradePlanPrice}>
                  <span className={styles.upgradePlanPriceCurrency}>R$</span> {plan.monthly} / mês
                </div>
              ) : (
                <>
                  <div className={styles.upgradePlanPriceTop}>R$ {plan.annual} em até 12x de</div>
                  <div className={styles.upgradePlanPrice}>
                    <span className={styles.upgradePlanPriceCurrency}>R$</span> {plan.monthly}
                  </div>
                </>
              )}
            </div>

            <button
              className={plan.current ? styles.upgradePlanButtonCurrent : styles.upgradePlanButton}
              type="button"
              disabled={plan.current}
            >
              {plan.ctaLabel}
            </button>

            <div className={styles.upgradePlanDivider} aria-hidden="true" />

            <PlanCardSection features={plan.baseFeatures} />

            {plan.highlightFeatures ? (
              <>
                <div className={styles.upgradePlanDivider} aria-hidden="true" />
                <PlanCardSection title={plan.highlightTitle} features={plan.highlightFeatures} />
              </>
            ) : null}
          </article>
        ))}
      </section>

      <section className={styles.upgradeFooterLinks}>
        <div className={styles.upgradeFooterLinkBlock}>
          <a className={styles.upgradeFooterLink} href="#">
            Compare os planos
          </a>
          <p>Confira com detalhes as funcionalidades e benefícios antes de escolher o plano ideal para sua empresa.</p>
        </div>

        <div className={styles.upgradeFooterLinkBlock}>
          <a className={styles.upgradeFooterLink} href="#">
            Ainda tem dúvidas?
          </a>
          <p>Acesse nosso artigo com as perguntas frequentes e informações essenciais para ajudar na sua escolha.</p>
        </div>
      </section>

      <section className={styles.upgradePromoCard}>
        <div className={styles.upgradePromoBadge}>
          <div className={styles.upgradePromoBadgeLabel}>Plano</div>
          <div className={styles.upgradePromoBadgeName}>Protagonize</div>
        </div>

        <div className={styles.upgradePromoContent}>
          <h2>Para grandes empresas que buscam uma solução mais completa e exclusiva</h2>
          <p>Todos os recursos dos planos anteriores, mais:</p>

          <div className={styles.upgradePromoColumns}>
            <ul className={styles.upgradePromoList}>
              <li>Escalabilidade de anúncios e dados</li>
              <li>Histórico ampliado para consulta de dados</li>
              <li>Maior capacidade de sincronização de estoque</li>
            </ul>

            <ul className={styles.upgradePromoList}>
              <li>Taxas reduzidas no Ecommerce da DaBi Tech</li>
              <li>Mentoria personalizada com especialistas por 90 dias</li>
              <li>Recursos sem limites (vendas, usuários e mais)</li>
            </ul>
          </div>
        </div>

        <button className={styles.upgradePromoButton} type="button">
          agendar com especialista
        </button>
      </section>

      <section className={styles.upgradeActivationNote}>
        <h3>Ativar Conta</h3>
        <p>
          Sua conta no ERP da DaBi Tech está em período de demonstração. Caso você queira, pode ativá-la agora
          clicando no link <a href="#">Assine Agora</a>.
        </p>
        <p>
          Após a ativação da conta será gerado um boleto com o valor de sua primeira mensalidade e o mesmo será
          enviado para o seu e-mail.
        </p>
      </section>

      <div className={styles.upgradeUserAnchor} aria-hidden="true">
        {currentUser.name}
      </div>
    </section>
  );
}
