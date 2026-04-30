"use client";

import { useId, useState } from "react";
import styles from "./landing-page.module.css";
import type { CurrentUser } from "./types";

type PromotionalCampaignsContentProps = {
  currentUser: CurrentUser;
};

function ArrowLeftIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12.8 4.6 7.4 10l5.4 5.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M6 3.8v2.2M14 3.8v2.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M4.2 6.3h11.6a1.8 1.8 0 0 1 1.8 1.8v8A1.9 1.9 0 0 1 15.7 18H4.3A1.9 1.9 0 0 1 2.4 16V8.1a1.8 1.8 0 0 1 1.8-1.8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0.9"
      />
      <path
        d="M2.8 8.7h14.4"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0.35"
      />
    </svg>
  );
}

function PercentBadge() {
  return (
    <span className={styles.percentBadge} aria-hidden="true">
      %
    </span>
  );
}

export function PromotionalCampaignsContent({
  currentUser,
}: PromotionalCampaignsContentProps) {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  const todayIso = today.toISOString().slice(0, 10);

  const [mode, setMode] = useState<"list" | "create">("list");
  const roundingModeName = useId();
  const roundingRuleName = useId();

  const [formState, setFormState] = useState({
    name: "",
    startDate: "",
    endDate: "",
    discountPercent: "",
    useSmartRounding: true,
    roundingMode: "cents" as "cents" | "last_decimal",
    roundingRule: "99" as "99" | "00" | "9" | "0",
  });

  return (
    <section className={styles.contentSection}>
      <div className={styles.contentHeaderRow}>
        <div className={styles.headerLeft}>
          {mode === "create" ? (
            <button
              type="button"
              className={styles.backPillButton}
              onClick={() => setMode("list")}
            >
              <ArrowLeftIcon />
              voltar
            </button>
          ) : null}
          <p className={styles.breadcrumb}>
            início <span className={styles.breadcrumbSeparator}>=</span> cadastros{" "}
            <span className={styles.breadcrumbCurrent}>campanhas promocionais</span>
          </p>
        </div>

        {mode === "list" ? (
          <button
            type="button"
            className={styles.primaryActionButton}
            onClick={() => setMode("create")}
            aria-label={`Incluir campanha (usuário: ${currentUser.name})`}
          >
            incluir campanha
          </button>
        ) : null}
      </div>

      <div className={styles.guideBanner}>
        <div className={styles.guideBannerLeft}>
          <span className={styles.guideBannerIcon}>✦</span>
          <span className={styles.guideBannerLabel}>Etapa atual</span>
          <strong className={styles.guideBannerTitle}>
            Centralize seus produtos e estoque
          </strong>
        </div>

        <div className={styles.guideBannerRight}>
          <span className={styles.guideBannerProgressText}>0 de 4</span>
          <div className={styles.guideBannerProgressTrack}>
            <div className={styles.guideBannerProgressFill} />
          </div>
          <button type="button" className={styles.guideBannerLink}>
            acessar o guia
          </button>
        </div>
      </div>

      {mode === "list" ? (
        <div className={styles.pageSection}>
          <h1 className={styles.pageTitle}>Campanhas promocionais</h1>

          <div className={styles.toolbar}>
            <div className={styles.searchInputWrapper}>
              <input
                type="text"
                placeholder="Pesquise pela descrição da campanha"
                className={styles.searchInput}
              />
              <button
                type="button"
                className={styles.searchIconButton}
                aria-label="Buscar campanha"
              >
                <SearchIcon />
              </button>
            </div>

            <div className={styles.filterPills}>
              <button type="button" className={styles.filterPillActive}>
                campanhas criadas
              </button>
              <button type="button" className={styles.filterPill}>
                por período
              </button>
            </div>
          </div>

          <div className={styles.emptyStateWrapper}>
            <div className={styles.emptyStateCard}>
              <div className={styles.emptyStateText}>
                <h2 className={styles.emptyStateTitle}>
                  Não existem campanhas promocionais cadastradas
                </h2>

                <p className={styles.emptyStateDescription}>
                  Crie uma nova campanha promocional para visualizá-la aqui
                </p>
              </div>

              <div className={styles.emptyStateIllustration}>🐱</div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.pageSection}>
          <h1 className={styles.pageTitle}>Criar Campanha</h1>
          <div className={styles.pageDivider} />

          <form
            className={styles.campaignForm}
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <section className={styles.formSection}>
              <h2 className={styles.formSectionTitle}>Detalhes</h2>

              <div className={styles.formGrid}>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Nome da campanha</span>
                  <input
                    className={styles.fieldInput}
                    type="text"
                    value={formState.name}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, name: event.target.value }))
                    }
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Data de início</span>
                  <div
                    className={styles.dateField}
                    data-has-value={formState.startDate ? "true" : "false"}
                  >
                    <input
                      className={styles.fieldInput}
                      type="date"
                      min={todayIso}
                      value={formState.startDate}
                      onChange={(event) =>
                        setFormState((prev) => {
                          const nextStartDate = event.target.value;
                          const nextEndDate =
                            prev.endDate && nextStartDate && prev.endDate < nextStartDate
                              ? ""
                              : prev.endDate;

                          return {
                            ...prev,
                            startDate: nextStartDate,
                            endDate: nextEndDate,
                          };
                        })
                      }
                    />
                    <span className={styles.dateFieldIcon} aria-hidden="true">
                      <CalendarIcon />
                    </span>
                  </div>
                </label>

                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Data de término</span>
                  <div
                    className={styles.dateField}
                    data-has-value={formState.endDate ? "true" : "false"}
                  >
                    <input
                      className={styles.fieldInput}
                      type="date"
                      min={formState.startDate || todayIso}
                      value={formState.endDate}
                      onChange={(event) =>
                        setFormState((prev) => ({ ...prev, endDate: event.target.value }))
                      }
                    />
                    <span className={styles.dateFieldIcon} aria-hidden="true">
                      <CalendarIcon />
                    </span>
                  </div>
                </label>
              </div>
            </section>

            <div className={styles.sectionDivider} />

            <section className={styles.formSection}>
              <h2 className={styles.formSectionTitle}>Valores</h2>

              <label className={styles.field}>
                <span className={styles.fieldLabel}>Desconto em %</span>
                <div className={styles.fieldInputWithBadge}>
                  <input
                    className={styles.fieldInput}
                    type="number"
                    inputMode="decimal"
                    placeholder="Desconto em percentual"
                    value={formState.discountPercent}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        discountPercent: event.target.value,
                      }))
                    }
                  />
                  <PercentBadge />
                </div>
              </label>

              <label className={styles.toggleRow}>
                <span className={styles.toggleLabel}>
                  Utilizar arredondamento inteligente
                </span>
                <span className={styles.toggleControl}>
                  <input
                    className={styles.toggleInput}
                    type="checkbox"
                    checked={formState.useSmartRounding}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        useSmartRounding: event.target.checked,
                      }))
                    }
                  />
                  <span className={styles.toggleTrack} aria-hidden="true">
                    <span className={styles.toggleThumb} />
                  </span>
                </span>
              </label>

              {formState.useSmartRounding ? (
                <>
                  <div className={styles.formSubsection}>
                    <h3 className={styles.formSubsectionTitle}>
                      Forma de aplicação do arredondamento
                    </h3>

                    <div className={styles.optionCards}>
                      <label
                        className={`${styles.optionCard} ${
                          formState.roundingMode === "cents"
                            ? styles.optionCardChecked
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name={roundingModeName}
                          value="cents"
                      checked={formState.roundingMode === "cents"}
                      onChange={() =>
                        setFormState((prev) => ({
                          ...prev,
                          roundingMode: "cents",
                          roundingRule:
                            prev.roundingRule === "9" || prev.roundingRule === "0"
                              ? "99"
                              : prev.roundingRule,
                        }))
                      }
                    />
                        <span className={styles.optionCardRadio} aria-hidden="true" />
                        <div className={styles.optionCardBody}>
                          <p className={styles.optionCardTitle}>Considerar centavos</p>
                          <p className={styles.optionCardDescription}>
                            Ao considerar os centavos, as duas últimas casas decimais
                            poderão ser arredondadas. Ex: R$ 0,XX
                          </p>
                        </div>
                      </label>

                      <label
                        className={`${styles.optionCard} ${
                          formState.roundingMode === "last_decimal"
                            ? styles.optionCardChecked
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name={roundingModeName}
                          value="last_decimal"
                      checked={formState.roundingMode === "last_decimal"}
                      onChange={() =>
                        setFormState((prev) => ({
                          ...prev,
                          roundingMode: "last_decimal",
                          roundingRule:
                            prev.roundingRule === "99" || prev.roundingRule === "00"
                              ? "9"
                              : prev.roundingRule,
                        }))
                      }
                    />
                        <span className={styles.optionCardRadio} aria-hidden="true" />
                        <div className={styles.optionCardBody}>
                          <p className={styles.optionCardTitle}>
                            Considerar último decimal
                          </p>
                          <p className={styles.optionCardDescription}>
                            Ao considerar o último decimal, apenas uma casa decimal
                            poderá ser arredondada. Ex: R$ 0,X
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className={styles.formSubsection}>
                    <h3 className={styles.formSubsectionTitle}>
                      Regra de arredondamento
                    </h3>

                    <div className={styles.radioList}>
                      <span className={styles.fieldLabel}>Arredondar para</span>
                      <label className={styles.radioRow}>
                        <input
                          type="radio"
                          name={roundingRuleName}
                          value={formState.roundingMode === "cents" ? "99" : "9"}
                          checked={
                            formState.roundingMode === "cents"
                              ? formState.roundingRule === "99"
                              : formState.roundingRule === "9"
                          }
                          onChange={() =>
                            setFormState((prev) => ({
                              ...prev,
                              roundingRule: prev.roundingMode === "cents" ? "99" : "9",
                            }))
                          }
                        />
                        <span className={styles.radioLabel}>
                          {formState.roundingMode === "cents"
                            ? "Substituir centavos por 99"
                            : "Substituir último decimal por 9"}
                        </span>
                      </label>

                      <label className={styles.radioRow}>
                        <input
                          type="radio"
                          name={roundingRuleName}
                          value={formState.roundingMode === "cents" ? "00" : "0"}
                          checked={
                            formState.roundingMode === "cents"
                              ? formState.roundingRule === "00"
                              : formState.roundingRule === "0"
                          }
                          onChange={() =>
                            setFormState((prev) => ({
                              ...prev,
                              roundingRule: prev.roundingMode === "cents" ? "00" : "0",
                            }))
                          }
                        />
                        <span className={styles.radioLabel}>
                          {formState.roundingMode === "cents"
                            ? "Substituir centavos por 00"
                            : "Substituir último decimal por 0"}
                        </span>
                      </label>
                    </div>
                  </div>
                </>
              ) : null}
            </section>

            <div className={styles.campaignFormFooter}>
              <button type="submit" className={styles.primaryActionButton}>
                salvar e selecionar anúncios
              </button>
            </div>
          </form>
        </div>
      )}

      <footer className={styles.helpFooter}>
        <p className={styles.helpFooterTitle}>Ficou com alguma dúvida?</p>
        <a href="#" className={styles.helpFooterLink}>
          Ajuda do Sistema ERP
        </a>
      </footer>
    </section>
  );
}
