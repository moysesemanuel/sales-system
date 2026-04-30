"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./landing-page.module.css";

type DashboardTab = "vendas" | "financas";
type PeriodPreset =
  | "current_month"
  | "today"
  | "last_7_days"
  | "last_30_days"
  | "last_6_months"
  | "last_year"
  | "custom_range";

type PeriodSelection =
  | { preset: Exclude<PeriodPreset, "custom_range"> }
  | { preset: "custom_range"; from: string; to: string };

const periodOptions: { preset: PeriodPreset; label: string }[] = [
  { preset: "current_month", label: "mês atual" },
  { preset: "today", label: "dia atual" },
  { preset: "last_7_days", label: "últimos 7 dias" },
  { preset: "last_30_days", label: "últimos 30 dias" },
  { preset: "last_6_months", label: "últimos 6 meses" },
  { preset: "last_year", label: "último ano" },
  { preset: "custom_range", label: "do intervalo" },
];

type OrderStatusId =
  | "all"
  | "open"
  | "invoiced"
  | "canceled"
  | "approved"
  | "preparing_shipment"
  | "shipped"
  | "delivered"
  | "ready_to_ship"
  | "incomplete_data"
  | "not_delivered";

const orderStatusOptions: { id: Exclude<OrderStatusId, "all">; label: string }[] = [
  { id: "open", label: "Em aberto" },
  { id: "invoiced", label: "Faturado" },
  { id: "canceled", label: "Cancelado" },
  { id: "approved", label: "Aprovado" },
  { id: "preparing_shipment", label: "Preparando envio" },
  { id: "shipped", label: "Enviado" },
  { id: "delivered", label: "Entregue" },
  { id: "ready_to_ship", label: "Pronto para envio" },
  { id: "incomplete_data", label: "Dados incompletos" },
  { id: "not_delivered", label: "Não entregue" },
];

const natureOptions = [
  "(NF-e) Venda de mercadorias de terceiros para consumidor final",
  "Venda de mercadorias de terceiros para consumidor final contribuinte",
  "Venda de mercadorias de terceiros para contribuinte",
  "Devolução de compra para comercialização",
  "Remessa em bonificação, doação ou brinde",
  "Remessa de mercadoria ou bem para conserto ou reparo",
  "Remessa para depósito fechado ou armazém geral",
  "Venda de produção própria para consumidor final",
  "Venda de produção própria para consumidor final contribuinte",
  "Venda de produção própria para contribuinte",
  "Devolução de compra para industrialização",
  "(NFC-e) Venda de mercadorias de terceiros para consumidor final",
] as const;

type SalesFilters = {
  statusIds: Array<(typeof orderStatusOptions)[number]["id"]>;
  natureLabels: Array<(typeof natureOptions)[number]>;
};

function FilterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M4 5h12M6 10h8M8 15h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7 5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM13 10a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM16 15a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M6 3v2M14 3v2M4.5 7.5h11"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5.5 5.5h9A2 2 0 0 1 16.5 7.5v8A2 2 0 0 1 14.5 17.5h-9A2 2 0 0 1 3.5 15.5v-8A2 2 0 0 1 5.5 5.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.85"
      />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M10 6v4l3 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.85"
      />
    </svg>
  );
}

function ChartPlaceholder() {
  return (
    <div className={styles.dashChart}>
      <div className={styles.dashChartValueRow}>
        <span className={styles.dashChartYLabel}>R$ 100</span>
        <span className={styles.dashChartYLabel}>R$ 10</span>
      </div>
      <div className={styles.dashChartPlot}>
        <div className={styles.dashChartLine} />
      </div>
      <div className={styles.dashChartXRow}>
        {["Sex", "Sáb", "Dom", "Seg", "Ter", "Qua", "Qui"].map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}

function MiniBarsPlaceholder() {
  return (
    <div className={styles.dashMiniBars} aria-hidden="true">
      <div className={styles.dashMiniBarsTop}>
        <span>0</span>
        <span>0</span>
      </div>
      <div className={styles.dashMiniBarsPlot}>
        <div className={styles.dashMiniBarsBaseline} />
      </div>
      <div className={styles.dashMiniBarsX}>
        {["Sex", "Sáb", "Dom", "Seg", "Ter", "Qua", "Qui"].map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}

function FinanceCashflowPlaceholder() {
  return (
    <div className={styles.dashFinanceCashflow} aria-hidden="true">
      <div className={styles.dashFinanceCashflowPlot}>
        <div className={styles.dashFinanceCashflowAxisLabel}>0</div>
        <div className={styles.dashFinanceCashflowLine} />
      </div>
      <div className={styles.dashFinanceCashflowX}>
        {["Saldo Atual", "30 dias", "60 dias", "90 dias"].map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}

function FinanceReceivablesPayablesPlaceholder() {
  const labels = [
    "+30 dias atrás",
    "30 dias atrás",
    "15 dias atrás",
    "7 dias atrás",
    "Hoje",
    "7 dias",
    "15 dias",
    "30 dias",
    "+30 dias",
  ];

  return (
    <div className={styles.dashFinanceTimeline} aria-hidden="true">
      <div className={styles.dashFinanceTimelineTop}>R$ 50</div>
      <div className={styles.dashFinanceTimelinePlot}>
        <div className={styles.dashFinanceCashflowAxisLabel}>0</div>
        <div className={styles.dashFinanceCashflowLine} />
      </div>
      <div className={styles.dashFinanceTimelineX}>
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}

export function DashboardContent({
  onRefresh,
  isRefreshing,
}: {
  onRefresh: () => void;
  isRefreshing: boolean;
}) {
  const [tab, setTab] = useState<DashboardTab>("vendas");
  const [lastUpdatedAt, setLastUpdatedAt] = useState(() => Date.now() - 60_000);
  const [selectedUF, setSelectedUF] = useState<string | null>(null);
  const isFinance = tab === "financas";
  const wasRefreshingRef = useRef(false);

   useEffect(() => {
    import("brazil-map");
  }, []);
  
  const [period, setPeriod] = useState<PeriodSelection>({ preset: "last_7_days" });
  const [draftPeriod, setDraftPeriod] = useState<PeriodSelection>({ preset: "last_7_days" });
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);
  const periodWrapRef = useRef<HTMLDivElement | null>(null);
  const allStatusIds = useMemo(() => orderStatusOptions.map((option) => option.id), []);
  const allNatureLabels = useMemo(() => [...natureOptions], []);
  const [filters, setFilters] = useState<SalesFilters>({
    statusIds: allStatusIds,
    natureLabels: allNatureLabels,
  });
  const [draftFilters, setDraftFilters] = useState<SalesFilters>({
    statusIds: allStatusIds,
    natureLabels: allNatureLabels,
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isNatureOpen, setIsNatureOpen] = useState(false);
  const filtersWrapRef = useRef<HTMLDivElement | null>(null);

  const updatedLabel = useMemo(() => {
    const diffMs = Math.max(0, Date.now() - lastUpdatedAt);
    if (diffMs < 60_000) return "atualizado agora";
    const minutes = Math.round(diffMs / 60_000);
    return `atualizado a ${minutes}m`;
  }, [lastUpdatedAt]);

  function handleRefresh() {
    onRefresh();
  }

  useEffect(() => {
    if (wasRefreshingRef.current && !isRefreshing) {
      setLastUpdatedAt(Date.now());
    }
    wasRefreshingRef.current = isRefreshing;
  }, [isRefreshing]);

  useEffect(() => {
    if (!isPeriodOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (periodWrapRef.current?.contains(target)) return;
      setIsPeriodOpen(false);
      setDraftPeriod(period);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsPeriodOpen(false);
        setDraftPeriod(period);
      }
    };
    document.addEventListener("pointerdown", onPointerDown, { capture: true });
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, { capture: true } as any);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isPeriodOpen, period]);

  useEffect(() => {
    if (!isFiltersOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (filtersWrapRef.current?.contains(target)) return;
      setIsFiltersOpen(false);
      setDraftFilters(filters);
      setIsStatusOpen(false);
      setIsNatureOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFiltersOpen(false);
        setDraftFilters(filters);
        setIsStatusOpen(false);
        setIsNatureOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown, { capture: true });
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, { capture: true } as any);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isFiltersOpen, filters]);

  const periodLabel = useMemo(() => {
    if (period.preset === "custom_range") return "do intervalo";
    return periodOptions.find((option) => option.preset === period.preset)?.label ?? "Período";
  }, [period]);

  return (
    <div className={styles.dashRoot}>
      <header className={styles.dashHeader}>
        <h1 className={styles.dashTitle}>Dashboard de {isFinance ? "finanças" : "vendas"}</h1>
        <nav className={styles.dashTabs} aria-label="Tabs do dashboard">
          <button
            className={tab === "vendas" ? styles.dashTabActive : styles.dashTab}
            type="button"
            onClick={() => setTab("vendas")}
          >
            vendas
          </button>
          <button
            className={tab === "financas" ? styles.dashTabActive : styles.dashTab}
            type="button"
            onClick={() => setTab("financas")}
          >
            finanças
          </button>
        </nav>
      </header>

      <div className={styles.dashBody}>
        {isFinance ? (
          <section className={styles.dashControlsFinance} aria-label="Atualização">
            <button
              className={styles.dashChipUpdated}
              type="button"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <ClockIcon />
              <span>{isRefreshing ? "atualizando..." : updatedLabel}</span>
            </button>
          </section>
        ) : (
          <section className={styles.dashControls} aria-label="Filtros">
            <div className={styles.dashChips}>
              <div className={styles.dashPeriodWrap} ref={periodWrapRef}>
                <button
                  className={styles.dashChip}
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={isPeriodOpen}
                  onClick={() => {
                    setIsPeriodOpen((current) => !current);
                    setDraftPeriod(period);
                    setIsFiltersOpen(false);
                    setIsStatusOpen(false);
                    setIsNatureOpen(false);
                  }}
                >
                  <CalendarIcon />
                  <span>{periodLabel}</span>
                </button>

                {isPeriodOpen ? (
                  <div className={styles.dashDropdown} role="menu" aria-label="Período">
                    <div className={styles.dashDropdownHeader}>Período</div>
                    <div className={styles.dashDropdownChips}>
                      {periodOptions.map((option) => {
                        const isActive = draftPeriod.preset === option.preset;
                        return (
                          <button
                            key={option.preset}
                            type="button"
                            role="menuitem"
                            className={isActive ? styles.dashDropdownChipActive : styles.dashDropdownChip}
                            onClick={() => {
                              if (option.preset === "custom_range") {
                                setDraftPeriod((current) =>
                                  current.preset === "custom_range"
                                    ? current
                                    : { preset: "custom_range", from: "", to: "" }
                                );
                                return;
                              }
                              setDraftPeriod({ preset: option.preset as Exclude<PeriodPreset, "custom_range"> });
                            }}
                          >
                            <span>{option.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {draftPeriod.preset === "custom_range" ? (
                      <div className={styles.dashDropdownRange}>
                        <label className={styles.dashDateRow}>
                          <span className={styles.dashDatePill}>De</span>
                          <input
                            className={styles.dashDateInput}
                            type="date"
                            value={draftPeriod.from}
                            onChange={(event) =>
                              setDraftPeriod((current) =>
                                current.preset === "custom_range"
                                  ? { ...current, from: event.target.value }
                                  : current
                              )
                            }
                          />
                        </label>
                        <label className={styles.dashDateRow}>
                          <span className={styles.dashDatePill}>Até</span>
                          <input
                            className={styles.dashDateInput}
                            type="date"
                            value={draftPeriod.to}
                            onChange={(event) =>
                              setDraftPeriod((current) =>
                                current.preset === "custom_range"
                                  ? { ...current, to: event.target.value }
                                  : current
                              )
                            }
                          />
                        </label>
                      </div>
                    ) : null}

                    <div className={styles.dashDropdownFooter}>
                      <button
                        className={styles.dashDropdownCancel}
                        type="button"
                        onClick={() => {
                          setDraftPeriod(period);
                          setIsPeriodOpen(false);
                        }}
                      >
                        Cancelar
                      </button>
                      <button
                        className={styles.dashDropdownApply}
                        type="button"
                        onClick={() => {
                          setPeriod(draftPeriod);
                          setIsPeriodOpen(false);
                          onRefresh();
                        }}
                      >
                        Aplicar
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className={styles.dashFiltersWrap} ref={filtersWrapRef}>
                <button
                  className={styles.dashChip}
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={isFiltersOpen}
                  onClick={() => {
                    setIsFiltersOpen((current) => !current);
                    setIsPeriodOpen(false);
                    setDraftFilters(filters);
                    setIsStatusOpen(false);
                    setIsNatureOpen(false);
                  }}
                >
                  <FilterIcon />
                  <span>Filtros</span>
                </button>

                {isFiltersOpen ? (
                  <div className={styles.dashDropdownFilters} role="menu" aria-label="Filtros">
                    <button
                      type="button"
                      role="menuitem"
                      className={styles.dashDropdownSectionToggle}
                      onClick={() => setIsStatusOpen((current) => !current)}
                    >
                      <span>Situação do pedido</span>
                      <span className={styles.dashDropdownChevron}>{isStatusOpen ? "▴" : "▾"}</span>
                    </button>
                    {isStatusOpen ? (
                      <div className={styles.dashDropdownPanel}>
                        <button
                          type="button"
                          className={styles.dashCheckboxRow}
                          onClick={() => {
                            setDraftFilters((current) => ({
                              ...current,
                              statusIds:
                                current.statusIds.length === allStatusIds.length ? [] : allStatusIds,
                            }));
                          }}
                        >
                          <span
                            className={
                              draftFilters.statusIds.length === allStatusIds.length
                                ? styles.dashCheckboxBoxChecked
                                : draftFilters.statusIds.length > 0
                                  ? styles.dashCheckboxBoxIndeterminate
                                  : styles.dashCheckboxBox
                            }
                            aria-hidden="true"
                          />
                          <span>Selecionar todas</span>
                        </button>
                        {orderStatusOptions.map((option) => {
                          const checked = draftFilters.statusIds.includes(option.id);
                          return (
                            <button
                              key={option.id}
                              type="button"
                              className={styles.dashCheckboxRow}
                              onClick={() => {
                                setDraftFilters((current) => ({
                                  ...current,
                                  statusIds: checked
                                    ? current.statusIds.filter((id) => id !== option.id)
                                    : [...current.statusIds, option.id],
                                }));
                              }}
                            >
                              <span
                                className={checked ? styles.dashCheckboxBoxChecked : styles.dashCheckboxBox}
                                aria-hidden="true"
                              />
                              <span>{option.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    ) : null}

                    <button
                      type="button"
                      role="menuitem"
                      className={styles.dashDropdownSectionToggle}
                      onClick={() => setIsNatureOpen((current) => !current)}
                    >
                      <span>Naturezas de operação do pedido</span>
                      <span className={styles.dashDropdownChevron}>{isNatureOpen ? "▴" : "▾"}</span>
                    </button>
                    {isNatureOpen ? (
                      <div className={styles.dashDropdownPanel}>
                        <button
                          type="button"
                          className={styles.dashCheckboxRow}
                          onClick={() => {
                            setDraftFilters((current) => ({
                              ...current,
                              natureLabels:
                                current.natureLabels.length === allNatureLabels.length ? [] : allNatureLabels,
                            }));
                          }}
                        >
                          <span
                            className={
                              draftFilters.natureLabels.length === allNatureLabels.length
                                ? styles.dashCheckboxBoxChecked
                                : draftFilters.natureLabels.length > 0
                                  ? styles.dashCheckboxBoxIndeterminate
                                  : styles.dashCheckboxBox
                            }
                            aria-hidden="true"
                          />
                          <span>Selecionar todas</span>
                        </button>
                        {natureOptions.map((label) => {
                          const checked = draftFilters.natureLabels.includes(label);
                          return (
                            <button
                              key={label}
                              type="button"
                              className={styles.dashCheckboxRow}
                              onClick={() => {
                                setDraftFilters((current) => ({
                                  ...current,
                                  natureLabels: checked
                                    ? current.natureLabels.filter((value) => value !== label)
                                    : [...current.natureLabels, label],
                                }));
                              }}
                            >
                              <span
                                className={checked ? styles.dashCheckboxBoxChecked : styles.dashCheckboxBox}
                                aria-hidden="true"
                              />
                              <span className={styles.dashCheckboxLabel}>{label}</span>
                            </button>
                          );
                        })}
                      </div>
                    ) : null}

                    <div className={styles.dashDropdownFooter}>
                      <button
                        className={styles.dashDropdownCancel}
                        type="button"
                        onClick={() => {
                          setDraftFilters(filters);
                          setIsFiltersOpen(false);
                          setIsStatusOpen(false);
                          setIsNatureOpen(false);
                        }}
                      >
                        Cancelar
                      </button>
                      <button
                        className={styles.dashDropdownApply}
                        type="button"
                        onClick={() => {
                          setFilters(draftFilters);
                          setIsFiltersOpen(false);
                          setIsStatusOpen(false);
                          setIsNatureOpen(false);
                          onRefresh();
                        }}
                      >
                        Aplicar
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
              <button
                className={styles.dashChipGhostButton}
                type="button"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <ClockIcon />
                <span>{isRefreshing ? "atualizando..." : updatedLabel}</span>
              </button>
            </div>
            <button className={styles.dashControlIcon} type="button" aria-label="Mais filtros">
              <FilterIcon />
            </button>
          </section>
        )}

        <section className={styles.dashGrid} aria-label="Cards do dashboard">
        {isFinance ? (
          <>
            <article className={`${styles.dashCardWide} ${isRefreshing ? styles.dashCardLoading : ""}`}>
              <header className={styles.dashCardHeaderWide}>
                <h2>Visão geral</h2>
              </header>
              <div className={styles.dashFinanceOverviewRow}>
                <div className={styles.dashFinanceKpi}>
                  <span className={styles.dashFinanceKpiValue}>R$ 0,00</span>
                  <span className={styles.dashFinanceKpiLabel}>saldo atual</span>
                </div>
                <div className={styles.dashFinanceKpi}>
                  <span className={styles.dashFinanceKpiValue}>R$ 0,00</span>
                  <span className={styles.dashFinanceKpiLabel}>contas a pagar</span>
                </div>
                <div className={styles.dashFinanceKpi}>
                  <span className={styles.dashFinanceKpiValue}>R$ 0,00</span>
                  <span className={styles.dashFinanceKpiLabel}>contas a receber</span>
                </div>
                <div className={styles.dashFinanceKpi}>
                  <span className={styles.dashFinanceKpiValue}>0</span>
                  <span className={styles.dashFinanceKpiLabel}>contas vencendo hoje</span>
                </div>
                <div className={styles.dashFinanceKpi}>
                  <span className={styles.dashFinanceKpiValue}>—</span>
                  <span className={styles.dashFinanceKpiLabel}>conta com maior saldo</span>
                </div>
              </div>
            </article>

            <article className={`${styles.dashCard} ${styles.dashCardStack} ${isRefreshing ? styles.dashCardLoading : ""}`}>
              <header className={styles.dashCardHeader}>
                <h2>Saldo atual de contas</h2>
                <p>R$ 0,00</p>
              </header>
              <div className={styles.dashCardBody}>
                <p className={styles.dashEmpty}>
                  Sem dados para essa combinação de filtros,
                  <br />
                  tente outra.
                </p>
                <div className={styles.dashGhostArt} />
              </div>
              <button className={styles.dashCardLink} type="button">
                acessar caixa
              </button>
            </article>

            <article className={`${styles.dashCard} ${styles.dashCardStack} ${isRefreshing ? styles.dashCardLoading : ""}`}>
              <header className={styles.dashCardHeaderSimple}>
                <h2>Fluxo de caixa</h2>
              </header>
              <FinanceCashflowPlaceholder />
              <button className={styles.dashCardLink} type="button">
                expandir detalhes
              </button>
            </article>

            <article className={`${styles.dashCardWide} ${isRefreshing ? styles.dashCardLoading : ""}`}>
              <header className={styles.dashCardHeaderWide}>
                <h2>Contas a receber e a pagar</h2>
              </header>
              <FinanceReceivablesPayablesPlaceholder />
              <button className={styles.dashCardLink} type="button">
                expandir detalhes
              </button>
            </article>
          </>
        ) : (
          <>
            <article className={`${styles.dashCard} ${isRefreshing ? styles.dashCardLoading : ""}`}>
              <header className={styles.dashCardHeader}>
                <h2>Total das vendas</h2>
                <p>R$ 0,00</p>
              </header>
              <ChartPlaceholder />
              <button className={styles.dashCardLink} type="button">
                expandir detalhes
              </button>
            </article>

            <article className={`${styles.dashCard} ${isRefreshing ? styles.dashCardLoading : ""}`}>
              <header className={styles.dashCardHeader}>
                <h2>Ticket médio</h2>
                <p>R$ 0,00</p>
              </header>
              <ChartPlaceholder />
              <button className={styles.dashCardLink} type="button">
                expandir detalhes
              </button>
            </article>

            <article className={`${styles.dashCardWide} ${isRefreshing ? styles.dashCardLoading : ""}`}>
              <header className={styles.dashCardHeaderWide}>
                <h2>Visão geral</h2>
              </header>
              <div className={styles.dashSummaryRow}>
                <div className={styles.dashKpi}>
                  <span className={styles.dashKpiValue}>0</span>
                  <span className={styles.dashKpiLabel}>pedidos</span>
                </div>
                <div className={styles.dashKpi}>
                  <span className={styles.dashKpiValue}>0</span>
                  <span className={styles.dashKpiLabel}>vendas em e-commerce</span>
                </div>
                <div className={styles.dashKpi}>
                  <span className={styles.dashKpiValue}>0</span>
                  <span className={styles.dashKpiLabel}>vendas físicas</span>
                </div>
                <div className={styles.dashKpi}>
                  <span className={styles.dashKpiValue}>R$ 0,00</span>
                  <span className={styles.dashKpiLabel}>valor total</span>
                </div>
                <div className={styles.dashKpi}>
                  <span className={styles.dashKpiValue}>0</span>
                  <span className={styles.dashKpiLabel}>nf-e emitidas</span>
                </div>
                <div className={styles.dashKpi}>
                  <span className={styles.dashKpiValue}>—</span>
                  <span className={styles.dashKpiLabel}>integração em alta</span>
                </div>
              </div>
            </article>

            <article className={`${styles.dashCard} ${isRefreshing ? styles.dashCardLoading : ""}`}>
              <header className={styles.dashCardHeaderSimple}>
                <h2>Pedidos por integrações</h2>
              </header>
              <p className={styles.dashEmpty}>
                Sem dados para essa combinação de filtros, tente outra.
              </p>
              <button className={styles.dashCardLink} type="button">
                expandir detalhes
              </button>
            </article>

            <article className={`${styles.dashCard} ${styles.dashCardMap} ${isRefreshing ? styles.dashCardLoading : ""}`}>
              <header className={styles.dashCardHeaderSimple}>
                <h2>Pedidos por estado</h2>
              </header>
              <div className={styles.dashMapWrap}>
                <BrazilMapWidget selectedUF={selectedUF} onSelectUF={setSelectedUF} />
                <div className={styles.dashMapHint}>
                  {selectedUF ? (
                    <>
                      Selecionado: <strong>{selectedUF}</strong>{" "}
                      {ufNames[selectedUF] ? `(${ufNames[selectedUF]})` : null}
                    </>
                  ) : (
                    "Clique em um estado para filtrar."
                  )}
                </div>
              </div>
              <button className={styles.dashCardLink} type="button">
                expandir detalhes
              </button>
            </article>

            <article className={`${styles.dashCard} ${styles.dashCardStack} ${isRefreshing ? styles.dashCardLoading : ""}`}>
              <header className={styles.dashCardHeaderSimple}>
                <h2>Funil de assuntos no CRM</h2>
                <p className={styles.dashCardSubtitle}>Assuntos com ações pendentes</p>
              </header>
              <p className={styles.dashEmpty}>
                Sua pesquisa não retornou resultados.
                <br />
                Tente outras opções de filtros.
              </p>
              <button className={styles.dashCardLink} type="button">
                ver assuntos
              </button>
            </article>

            <article className={`${styles.dashCard} ${styles.dashCardStack} ${isRefreshing ? styles.dashCardLoading : ""}`}>
              <header className={styles.dashCardHeaderSimple}>
                <h2>Produtos mais vendidos</h2>
              </header>
              <p className={styles.dashEmpty}>
                Sua pesquisa não retornou resultados.
                <br />
                Tente outras opções de filtros.
              </p>
              <button className={styles.dashCardLink} type="button">
                expandir detalhes
              </button>
            </article>

            <article className={`${styles.dashCard} ${styles.dashCardStack} ${isRefreshing ? styles.dashCardLoading : ""}`}>
              <header className={styles.dashCardHeaderSimple}>
                <h2>Horários com mais vendas</h2>
              </header>
              <div className={styles.dashCardBody}>
                <p className={styles.dashEmpty}>
                  Sem dados para essa combinação de filtros,
                  <br />
                  tente outra.
                </p>
                <div className={styles.dashGhostArt} />
              </div>
              <button className={styles.dashCardLink} type="button">
                expandir detalhes
              </button>
            </article>

            <article className={`${styles.dashCard} ${styles.dashCardStack} ${isRefreshing ? styles.dashCardLoading : ""}`}>
              <header className={styles.dashCardHeaderSimple}>
                <h2>Vendas X Devoluções</h2>
              </header>
              <MiniBarsPlaceholder />
              <button className={styles.dashCardLink} type="button">
                expandir detalhes
              </button>
            </article>
          </>
        )}
        </section>
      </div>
    </div>
  );
}

const ufNames: Record<string, string> = {
  AC: "Acre",
  AL: "Alagoas",
  AP: "Amapá",
  AM: "Amazonas",
  BA: "Bahia",
  CE: "Ceará",
  DF: "Distrito Federal",
  ES: "Espírito Santo",
  GO: "Goiás",
  MA: "Maranhão",
  MT: "Mato Grosso",
  MS: "Mato Grosso do Sul",
  MG: "Minas Gerais",
  PA: "Pará",
  PB: "Paraíba",
  PR: "Paraná",
  PE: "Pernambuco",
  PI: "Piauí",
  RJ: "Rio de Janeiro",
  RN: "Rio Grande do Norte",
  RS: "Rio Grande do Sul",
  RO: "Rondônia",
  RR: "Roraima",
  SC: "Santa Catarina",
  SP: "São Paulo",
  SE: "Sergipe",
  TO: "Tocantins",
};

function BrazilMapWidget({
  selectedUF,
  onSelectUF,
}: {
  selectedUF: string | null;
  onSelectUF: (uf: string | null) => void;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handler = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (typeof detail !== "string") return;
      onSelectUF(detail);
    };

    node.addEventListener("onStateSelected", handler as EventListener);
    return () => node.removeEventListener("onStateSelected", handler as EventListener);
  }, [onSelectUF]);

  return (
    <brazil-component
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      className={styles.dashBrazilComponent}
      hidden-states
      aria-label="Mapa do Brasil"
      title={selectedUF ? `Selecionado: ${selectedUF}` : "Mapa do Brasil"}
    />
  );
}
