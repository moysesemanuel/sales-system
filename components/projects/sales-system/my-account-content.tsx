"use client";

import { useEffect, useMemo, useState } from "react";
import type { CurrentUser } from "./types";
import styles from "./landing-page.module.css";

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        opacity="0.85"
      />
      <path
        d="M10 8.8v5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10 6.2h.01"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M6.2 9V7.3a3.8 3.8 0 1 1 7.6 0V9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6.3 9h7.4A2 2 0 0 1 15.7 11v4.2A2 2 0 0 1 13.7 17H6.3a2 2 0 0 1-2-1.8V11a2 2 0 0 1 2-2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        opacity="0.9"
      />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M11 4h5v5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 11 16 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 5H6.5A2.5 2.5 0 0 0 4 7.5v7A2.5 2.5 0 0 0 6.5 17h7a2.5 2.5 0 0 0 2.5-2.5V13"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}

function RocketIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M11.2 2.7c2.4-.5 5.1.5 6.2 1.6 1.1 1.1 2.1 3.8 1.6 6.2-.6 2.9-3 6.2-6.9 6.9l-2.9-2.9c.7-3.9 4-6.3 6.9-6.9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <path
        d="M9.2 8.6 4 13.8V17h3.2l5.2-5.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.8 6.2h.01"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BarcodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 7v10M7 7v10M10 7v10M13 7v10M16 7v10M19 7v10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M3.5 6.5h17M3.5 17.5h17"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.45"
      />
    </svg>
  );
}

function CardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M3.5 6.5h13A2 2 0 0 1 18.5 8.5v6A2 2 0 0 1 16.5 16.5h-13A2 2 0 0 1 1.5 14.5v-6A2 2 0 0 1 3.5 6.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        opacity="0.9"
      />
      <path
        d="M2.5 9.2h15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        opacity="0.55"
      />
    </svg>
  );
}

function ProgressBar({
  label,
  valueLabel,
  percent,
}: {
  label: string;
  valueLabel: string;
  percent: number;
}) {
  const normalized = Math.max(0, Math.min(100, percent));

  return (
    <div className={styles.accountProgress}>
      <div className={styles.accountProgressTop}>
        <span className={styles.accountProgressLabel}>{label}</span>
        <span className={styles.accountProgressValue}>{valueLabel}</span>
      </div>
      <div className={styles.accountProgressTrack} aria-hidden="true">
        <div className={styles.accountProgressFill} style={{ width: `${normalized}%` }} />
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: "info";
}) {
  return (
    <div className={styles.accountMetric}>
      <div className={styles.accountMetricLabel}>
        <span>{label}</span>
        {hint === "info" ? <InfoIcon className={styles.accountInfoIcon} /> : null}
      </div>
      <div className={styles.accountMetricValue}>{value}</div>
    </div>
  );
}

function formatISODate(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function MyAccountContent({
  currentUser,
  onBack,
}: {
  currentUser: CurrentUser;
  onBack?: () => void;
}) {
  type AccountTab = "account" | "billing" | "payment" | "payment_details";

  const [activeTab, setActiveTab] = useState<AccountTab>("account");
  const lastAccess = useMemo(() => formatISODate(new Date(Date.now() - 24 * 60 * 60 * 1000)), []);

  const initialBilling = useMemo(
    () => ({
      corporateName: "57.936.721 MOYSES EMANUEL COSTA SILVA",
      personType: "Pessoa Jurídica",
      document: "57.936.721/0001-25",
      taxRegime: "Simples Nacional",
      stateRegistration: "",
      stateExempt: true,
      email: "mecs.cwb@gmail.com",
      phone: "",
      address: "RUA FREDERICO MAURER",
      number: "2787",
      addressHint: "Endereço Geral (Exemplo: Rua Assis Brasil)",
      complement: "CASA 4",
      district: "BOQUEIRAO",
      zip: "81.670-020",
      city: "Curitiba",
      uf: "PR",
    }),
    [],
  );

  const [billing, setBilling] = useState(initialBilling);

  const [isCardPanelOpen, setIsCardPanelOpen] = useState(false);
  const initialCard = useMemo(
    () => ({
      number: "",
      holder: "",
      expiry: "",
      cvv: "",
    }),
    [],
  );
  const [cardDraft, setCardDraft] = useState(initialCard);

  useEffect(() => {
    if (activeTab !== "payment" && isCardPanelOpen) {
      setIsCardPanelOpen(false);
    }
  }, [activeTab, isCardPanelOpen]);

  return (
    <div className={styles.accountRoot}>
      <header className={styles.accountHeader}>
        <div className={styles.accountTopbar}>
          <div className={styles.accountTopbarLeft}>
            <button
              className={styles.accountBackButton}
              onClick={() => (onBack ? onBack() : window.history.back())}
              type="button"
            >
              <span className={styles.accountBackIcon} aria-hidden="true">
                ←
              </span>
              voltar
            </button>
            <div className={styles.accountBreadcrumb} aria-label="Migalhas de pão">
              <span className={styles.accountBreadcrumbDim}>início</span>
              <span className={styles.accountBreadcrumbSep} aria-hidden="true">
                /
              </span>
              <span className={styles.accountBreadcrumbStrong}>minha conta</span>
            </div>
          </div>

          <div className={styles.accountTopbarRight}>
            <button className={styles.accountActionChip} type="button">
              indique e ganhe
            </button>
            <button className={styles.accountActionChipPrimary} type="button">
              upgrade de plano
            </button>
            <button className={styles.accountActionChip} type="button">
              ações <span className={styles.accountEllipsis} aria-hidden="true">•••</span>
            </button>
          </div>
        </div>

        <h1 className={styles.accountPageTitle}>Dados sobre a minha conta do Sistema ERP</h1>

        <nav className={styles.accountTabs} aria-label="Seções da conta">
          <button
            className={activeTab === "account" ? styles.accountTabActive : styles.accountTab}
            onClick={() => setActiveTab("account")}
            type="button"
          >
            dados da conta
          </button>
          <button
            className={activeTab === "billing" ? styles.accountTabActive : styles.accountTab}
            onClick={() => setActiveTab("billing")}
            type="button"
          >
            dados de cobrança
          </button>
          <button
            className={activeTab === "payment" ? styles.accountTabActive : styles.accountTab}
            onClick={() => setActiveTab("payment")}
            type="button"
          >
            forma de pagamento
          </button>
          <button className={styles.accountTabDisabled} disabled type="button">
            detalhes de pagamento
          </button>
        </nav>
      </header>

      <section className={styles.accountStack}>
        {activeTab === "payment" ? (
          <div className={`${styles.accountPaymentLayout} ${isCardPanelOpen ? styles.accountPaymentLayoutOpen : ""}`}>
            <div className={styles.accountPaymentMain}>
              <div className={styles.accountPaymentRoot}>
                <div className={styles.accountKpiRow}>
                  <div className={styles.accountKpi}>
                    <div className={styles.accountKpiLabel}>Status da conta</div>
                    <div className={styles.accountKpiValue}>Conta ativa</div>
                  </div>
                  <div className={styles.accountKpi}>
                    <div className={styles.accountKpiLabel}>Plano</div>
                    <div className={styles.accountKpiValue}>Impulsione</div>
                  </div>
                </div>

                <div className={styles.accountSectionDivider} aria-hidden="true" />

                <div className={styles.accountPaymentIntro}>
                  <h2>Você está com acesso ativo ao ERP</h2>
                  <p>Gerencie sua operação com os recursos liberados para a sua conta.</p>
                </div>

                <p className={styles.accountPaymentParagraph}>
                  Aqui você acompanha os dados da sua conta, a forma de pagamento e as informações do plano vigente.
                </p>

                <p className={styles.accountPaymentParagraph}>
                  Se quiser alterar a forma de pagamento ou revisar o plano, use as ações abaixo:
                </p>

                <button className={styles.accountPlanCta} type="button">
                  <span className={styles.accountPlanCtaIcon}>
                    <RocketIcon />
                  </span>
                  escolher plano
                </button>

                <div className={styles.accountPaymentHelp}>
                  Como{" "}
                  <a className={styles.accountLinkInline} href="#">
                    encerrar minha conta?
                  </a>
                </div>

                <div className={styles.accountSectionDivider} aria-hidden="true" />

                <div className={styles.accountPaymentSectionTitle}>Forma de pagamento</div>

                <div className={styles.accountPayMethod}>
                  <div className={styles.accountPayIconBox}>
                    <BarcodeIcon />
                  </div>
                  <div className={styles.accountPayText}>
                    <div className={styles.accountPayTitle}>Boleto</div>
                    <div className={styles.accountPaySubtitle}>Dia de vencimento: 10</div>
                  </div>
                </div>

                <div className={styles.accountPaymentSectionTitle}>Outras formas de pagamento</div>

                <p className={styles.accountPaymentParagraph}>
                  Optando pelo cartão de crédito, a aprovação de pagamento é automática e garante maior praticidade à sua rotina.
                </p>

                <button
                  className={styles.accountPayOptionButton}
                  onClick={() => setIsCardPanelOpen(true)}
                  type="button"
                >
                  <span className={styles.accountPayOptionIcon}>
                    <CardIcon />
                  </span>
                  <span className={styles.accountPayOptionLabel}>cartão de crédito</span>
                  <span className={styles.accountPayOptionBadge}>recomendado</span>
                </button>
              </div>
            </div>

            {isCardPanelOpen ? (
              <aside className={styles.accountRightPanel} aria-label="Dados do cartão de crédito">
                <header className={styles.accountRightHeader}>
                  <div className={styles.accountRightHeaderCopy}>
                    <h2>Dados cartão de crédito</h2>
                    <p>Informe os dados do cartão de crédito</p>
                  </div>
                  <button
                    className={styles.accountRightClose}
                    onClick={() => setIsCardPanelOpen(false)}
                    type="button"
                  >
                    fechar <span className={styles.accountRightCloseX} aria-hidden="true">×</span>
                  </button>
                </header>

                <div className={styles.accountRightBody}>
                  <div className={styles.accountField}>
                    <label className={styles.accountLabel}>Nº do cartão</label>
                    <div className={styles.accountSecureField}>
                      <input
                        className={styles.accountInput}
                        inputMode="numeric"
                        placeholder="0000 0000 0000 0000"
                        value={cardDraft.number}
                        onChange={(event) => setCardDraft((prev) => ({ ...prev, number: event.target.value }))}
                      />
                      <span className={styles.accountSecureIcon} aria-hidden="true">
                        <LockIcon />
                      </span>
                    </div>
                  </div>

                  <div className={styles.accountField}>
                    <label className={styles.accountLabel}>Nome do titular do cartão</label>
                    <input
                      className={styles.accountInput}
                      placeholder="Conforme aparece no cartão"
                      value={cardDraft.holder}
                      onChange={(event) => setCardDraft((prev) => ({ ...prev, holder: event.target.value }))}
                    />
                  </div>

                  <div className={styles.accountGrid2}>
                    <div className={styles.accountField}>
                      <label className={styles.accountLabel}>
                        Data de vencimento <InfoIcon className={styles.accountInfoIcon} />
                      </label>
                      <input
                        className={styles.accountInput}
                        inputMode="numeric"
                        placeholder="00/00"
                        value={cardDraft.expiry}
                        onChange={(event) => setCardDraft((prev) => ({ ...prev, expiry: event.target.value }))}
                      />
                    </div>

                    <div className={styles.accountField}>
                      <label className={styles.accountLabel}>
                        Código de segurança <InfoIcon className={styles.accountInfoIcon} />
                      </label>
                      <div className={styles.accountSecureField}>
                        <input
                          className={styles.accountInput}
                          inputMode="numeric"
                          placeholder="CVV"
                          value={cardDraft.cvv}
                          onChange={(event) => setCardDraft((prev) => ({ ...prev, cvv: event.target.value }))}
                        />
                        <span className={styles.accountSecureIcon} aria-hidden="true">
                          <LockIcon />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <footer className={styles.accountRightFooter}>
                  <button
                    className={styles.accountSaveButton}
                    onClick={() => {
                      // Mock: futuramente conecta em API/Prisma.
                      setIsCardPanelOpen(false);
                    }}
                    type="button"
                  >
                    salvar
                  </button>
                  <button
                    className={styles.accountCancelButton}
                    onClick={() => {
                      setCardDraft(initialCard);
                      setIsCardPanelOpen(false);
                    }}
                    type="button"
                  >
                    cancelar
                  </button>
                </footer>
              </aside>
            ) : null}
          </div>
        ) : null}

        {activeTab === "billing" ? (
          <article className={styles.accountCard}>
            <div className={styles.accountBillingIntro}>
              <h2>Dados de cobrança utilizados pelo DaBi Tech ERP</h2>
              <p>Os dados abaixo são utilizados pelo DaBi Tech ERP para gerar os boletos e as notas de serviço.</p>
            </div>

            <div className={styles.accountBillingForm}>
              <div className={styles.accountField}>
                <label className={styles.accountLabel}>Razão Social</label>
                <input
                  className={styles.accountInput}
                  value={billing.corporateName}
                  onChange={(event) => setBilling((prev) => ({ ...prev, corporateName: event.target.value }))}
                />
              </div>

              <div className={styles.accountGrid2}>
                <div className={styles.accountField}>
                  <label className={styles.accountLabel}>Tipo da Pessoa</label>
                  <select
                    className={styles.accountSelect}
                    value={billing.personType}
                    onChange={(event) => setBilling((prev) => ({ ...prev, personType: event.target.value }))}
                  >
                    <option value="Pessoa Jurídica">Pessoa Jurídica</option>
                    <option value="Pessoa Física">Pessoa Física</option>
                  </select>
                </div>

                <div className={styles.accountField}>
                  <label className={styles.accountLabel}>CNPJ</label>
                  <input
                    className={styles.accountInput}
                    value={billing.document}
                    onChange={(event) => setBilling((prev) => ({ ...prev, document: event.target.value }))}
                  />
                </div>
              </div>

              <div className={styles.accountGrid3}>
                <div className={styles.accountField}>
                  <label className={styles.accountLabel}>Código de regime tributário</label>
                  <select
                    className={styles.accountSelect}
                    value={billing.taxRegime}
                    onChange={(event) => setBilling((prev) => ({ ...prev, taxRegime: event.target.value }))}
                  >
                    <option value="Simples Nacional">Simples Nacional</option>
                    <option value="Lucro Presumido">Lucro Presumido</option>
                    <option value="Lucro Real">Lucro Real</option>
                    <option value="MEI">MEI</option>
                  </select>
                </div>

                <div className={styles.accountField}>
                  <label className={styles.accountLabel}>Inscrição Estadual</label>
                  <input
                    className={styles.accountInput}
                    disabled={billing.stateExempt}
                    value={billing.stateRegistration}
                    onChange={(event) => setBilling((prev) => ({ ...prev, stateRegistration: event.target.value }))}
                    placeholder={billing.stateExempt ? "" : "Digite a inscrição estadual"}
                  />
                </div>

                <label className={styles.accountCheckbox}>
                  <input
                    type="checkbox"
                    checked={billing.stateExempt}
                    onChange={(event) =>
                      setBilling((prev) => ({
                        ...prev,
                        stateExempt: event.target.checked,
                        stateRegistration: event.target.checked ? "" : prev.stateRegistration,
                      }))
                    }
                  />
                  <span>IE Isento</span>
                </label>
              </div>

              <div className={styles.accountGrid2}>
                <div className={styles.accountField}>
                  <label className={styles.accountLabel}>E-mail</label>
                  <input
                    className={styles.accountInput}
                    value={billing.email}
                    onChange={(event) => setBilling((prev) => ({ ...prev, email: event.target.value }))}
                  />
                </div>

                <div className={styles.accountField}>
                  <label className={styles.accountLabel}>Fone</label>
                  <input
                    className={styles.accountInput}
                    value={billing.phone}
                    onChange={(event) => setBilling((prev) => ({ ...prev, phone: event.target.value }))}
                  />
                </div>
              </div>

              <div className={styles.accountSectionTitle}>Endereço de cobrança</div>

              <div className={styles.accountGrid2Wide}>
                <div className={styles.accountField}>
                  <label className={styles.accountLabel}>Endereço</label>
                  <input
                    className={styles.accountInput}
                    value={billing.address}
                    onChange={(event) => setBilling((prev) => ({ ...prev, address: event.target.value }))}
                  />
                  <div className={styles.accountHint}>{billing.addressHint}</div>
                </div>

                <div className={styles.accountField}>
                  <label className={styles.accountLabel}>Número</label>
                  <input
                    className={styles.accountInput}
                    value={billing.number}
                    onChange={(event) => setBilling((prev) => ({ ...prev, number: event.target.value }))}
                  />
                </div>
              </div>

              <div className={styles.accountGrid2}>
                <div className={styles.accountField}>
                  <label className={styles.accountLabel}>Complemento</label>
                  <input
                    className={styles.accountInput}
                    value={billing.complement}
                    onChange={(event) => setBilling((prev) => ({ ...prev, complement: event.target.value }))}
                  />
                </div>

                <div className={styles.accountField}>
                  <label className={styles.accountLabel}>Bairro</label>
                  <input
                    className={styles.accountInput}
                    value={billing.district}
                    onChange={(event) => setBilling((prev) => ({ ...prev, district: event.target.value }))}
                  />
                </div>
              </div>

              <div className={styles.accountGrid3Address}>
                <div className={styles.accountField}>
                  <label className={styles.accountLabel}>CEP</label>
                  <input
                    className={styles.accountInput}
                    value={billing.zip}
                    onChange={(event) => setBilling((prev) => ({ ...prev, zip: event.target.value }))}
                  />
                </div>

                <div className={styles.accountField}>
                  <label className={styles.accountLabel}>Cidade</label>
                  <input
                    className={styles.accountInput}
                    value={billing.city}
                    onChange={(event) => setBilling((prev) => ({ ...prev, city: event.target.value }))}
                  />
                </div>

                <div className={styles.accountField}>
                  <label className={styles.accountLabel}>UF</label>
                  <select
                    className={styles.accountSelect}
                    value={billing.uf}
                    onChange={(event) => setBilling((prev) => ({ ...prev, uf: event.target.value }))}
                  >
                    {[
                      "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
                    ].map((uf) => (
                      <option key={uf} value={uf}>
                        {uf}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </article>
        ) : null}

        {activeTab === "account" ? (
          <>
            <article className={styles.accountCard}>
              <header className={styles.accountCardHeader}>
                <h2>Uso geral do sistema</h2>
              </header>

              <div className={styles.accountGrid4}>
                <Metric label="Espaço para dados" value="0,0Mb" />
                <Metric label="Espaço para anexos" value="0,0Mb" />
                <Metric label="Usuários" value="01" />
                <Metric label="Ecommerce" value="00" />
              </div>
            </article>

            <article className={styles.accountCard}>
              <header className={styles.accountCardHeaderRow}>
                <h2>Consulta de dados</h2>
                <a className={styles.accountLink} href="#">
                  Saiba mais
                </a>
              </header>

              <div className={styles.accountGrid4}>
                <Metric label="Período" value="24 meses" hint="info" />
                <Metric label="Período adicional" value="0 Meses" />
                <Metric label="Consulta disponível desde" value="23/04/2024" hint="info" />
                <ProgressBar label="Período utilizado" valueLabel="0 de 24 meses" percent={0} />
              </div>
            </article>

            <article className={styles.accountCard}>
              <header className={styles.accountCardHeaderRow}>
                <h2>Consumo de anúncios</h2>
                <a className={styles.accountLink} href="#">
                  Saiba mais
                </a>
              </header>

              <div className={styles.accountGrid4}>
                <Metric label="Limite do plano" value="10.000" />
                <Metric label="Limite adicional" value="0" />
                <Metric label="Anúncios cadastrados no ERP" value="0" />
                <ProgressBar
                  label=""
                  valueLabel="0 de 10.000 anúncios 0.00% de uso"
                  percent={0}
                />
              </div>

          <p className={styles.accountNote}>
            Loja, Ecommerce e Hub do DaBi Tech ERP possuem anúncios ilimitados.
          </p>
        </article>

            <article className={styles.accountCard}>
              <header className={styles.accountCardHeaderRow}>
                <h2>Sincronizações de estoque</h2>
                <a className={styles.accountLink} href="#">
                  Saiba mais
                </a>
              </header>

              <div className={styles.accountGrid4}>
                <Metric label="Limite mensal (plano + adicional)" value="600.000" />
                <Metric label="Consumo no mês" value="0" />
                <ProgressBar label="" valueLabel="0 de 600.000" percent={0} />
                <div className={styles.accountSpacer} aria-hidden="true" />

                <Metric label="Limite do plano" value="600.000" />
                <Metric label="Limite adicional" value="0" />

                <div className={styles.accountInlineBlock}>
                  <a className={styles.accountInlineLink} href="#">
                    Contrato de limite adicional*{" "}
                    <ExternalLinkIcon className={styles.accountInlineIcon} />
                  </a>
                  <div className={styles.accountInlineValue}>Automático</div>
                </div>

                <div className={styles.accountInlineBlock}>
                  <div className={styles.accountInlineMuted}>Histórico de consumo</div>
                  <a className={styles.accountInlineLink} href="#">
                    Consultar
                  </a>
                </div>
              </div>

              <p className={styles.accountNote}>
                * Se preferir, você pode desativar a contratação automática de adicionais em{" "}
                <a className={styles.accountLinkInline} href="#">
                  Configurações da Conta
                </a>
                .
              </p>
            </article>

            <article className={styles.accountCard}>
              <header className={styles.accountCardHeader}>
                <h2>Meu plano</h2>
              </header>

              <div className={styles.accountGrid4}>
                <Metric label="Plano atual" value="Impulsione" />
                <Metric label="Valor/ano" value="3.348,00" />
                <Metric label="Periodicidade" value="Anual" />
                <Metric label="Situação" value="Ativa" />

                <Metric label="Quantidade de acessos" value="1" />
                <Metric label="Último acesso" value={lastAccess} />
                <Metric label="Último pagamento" value="–" />
                <div className={styles.accountMetric}>
                  <div className={styles.accountMetricLabel}>Conta</div>
                  <div className={styles.accountMetricValue}>{currentUser.email}</div>
                </div>
              </div>
            </article>
          </>
        ) : null}
      </section>

      {activeTab === "billing" ? (
        <footer className={styles.accountFooterBar}>
          <button
            className={styles.accountSaveButton}
            onClick={() => {
              // Mock: futuramente conecta em API/Prisma.
            }}
            type="button"
          >
            salvar
          </button>
          <button
            className={styles.accountCancelButton}
            onClick={() => setBilling(initialBilling)}
            type="button"
          >
            cancelar
          </button>
        </footer>
      ) : null}
    </div>
  );
}
