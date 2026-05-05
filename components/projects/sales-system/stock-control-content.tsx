"use client";

import { useMemo, useState } from "react";
import type { CurrentUser } from "./types";
import styles from "./landing-page.module.css";

type StockTab = "todos" | "simples" | "kits" | "materia-prima";

type StockControlContentProps = {
    currentUser: CurrentUser;
};

function SearchIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            <circle
                cx="8.5"
                cy="8.5"
                r="5.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path
                d="M12.8 12.8 16.5 16.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

function FilterLinesIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            <path
                d="M4 6h12M4 10h12M4 14h12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <circle cx="7" cy="6" r="1.6" fill="currentColor" />
            <circle cx="12.5" cy="10" r="1.6" fill="currentColor" />
            <circle cx="9" cy="14" r="1.6" fill="currentColor" />
        </svg>
    );
}

function FunnelIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            <path
                d="M3.5 4.5h13l-5.1 5.7V15l-2.8 1v-5.8L3.5 4.5Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function StockControlContent({
    currentUser: _currentUser,
}: StockControlContentProps) {
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState<StockTab>("todos");

    const tabs = useMemo(
        () => [
            { id: "todos" as const, label: "todos" },
            { id: "simples" as const, label: "simples" },
            { id: "kits" as const, label: "kits" },
            { id: "materia-prima" as const, label: "matéria-prima" },
        ],
        []
    );

    return (
        <main className={styles.stockControlRoot}>
            <section className={styles.stockControlPage}>
                <header className={styles.stockControlTopBar}>
                    <div className={styles.stockControlCrumbs}>
                        <span>início</span>
                        <span>suprimentos</span>
                        <strong>controle de estoques</strong>
                    </div>

                    <div className={styles.stockControlActions}>
                        <button type="button" className={styles.stockControlInventoryButton}>
                            <span className={styles.stockControlInventoryButtonIcon} aria-hidden="true">
                                <i className="fa fa-th" />
                            </span>
                            inventário de estoque
                        </button>

                        <button type="button" className={styles.stockControlPrimaryButton}>
                            gerenciar produtos
                        </button>

                        <button type="button" className={styles.stockControlGhostButton}>
                            mais ações
                            <span className={styles.stockControlGhostButtonIcon} aria-hidden="true">
                                •••
                            </span>
                        </button>
                    </div>
                </header>

                <section className={styles.guideBanner}>
                    <div className={styles.guideBannerLeft}>
                        <span className={styles.guideBannerIcon}>✦</span>
                        <span className={styles.guideBannerLabel}>Etapa atual</span>
                        <strong className={styles.guideBannerTitle}>
                            Configure a emissão da nota fiscal
                        </strong>
                    </div>

                    <div className={styles.guideBannerRight}>
                        <span className={styles.guideBannerProgressText}>1 de 4</span>
                        <span className={styles.guideBannerProgressTrack}>
                            <span className={styles.vendorsGuideProgressFill} />
                        </span>
                        <button type="button" className={styles.guideBannerLink}>
                            acessar o guia
                        </button>
                    </div>
                </section>

                <section className={styles.stockControlToolbar}>
                    <h1>Controle de estoques</h1>

                    <div className={styles.stockControlSearchRow}>
                        <div className={styles.stockControlSearchWrap}>
                            <input
                                type="text"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                className={styles.stockControlSearchInput}
                                placeholder="Pesquise por nome, código (SKU) ou GTIN/EAN"
                            />

                            <span className={styles.stockControlSearchIcon} aria-hidden="true">
                                <SearchIcon />
                            </span>

                            <button
                                type="button"
                                className={styles.stockControlSearchActionButton}
                                aria-label="Abrir opções de filtro"
                            >
                                <FilterLinesIcon />
                                <span className={styles.stockControlSearchActionChevron}>▾</span>
                            </button>
                        </div>
                    </div>

                    <div className={styles.stockControlFiltersRow}>
                        <button type="button" className={styles.stockControlFilterButton}>
                            <span className={styles.stockControlFilterButtonIcon} aria-hidden="true">
                                <FunnelIcon />
                            </span>
                            filtros
                        </button>
                    </div>

                    <nav className={styles.stockControlTabs} aria-label="Tipos de estoque">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                className={
                                    activeTab === tab.id
                                        ? styles.stockControlTabActive
                                        : styles.stockControlTab
                                }
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </section>

                <section className={styles.stockControlEmptyState}>
                    <article className={styles.stockControlEmptyCard}>
                        <div className={styles.stockControlEmptyContent}>
                            <h2>Sua pesquisa não retornou resultados.</h2>

                            <p>
                                Tente outras opções de pesquisa, tipos de produtos
                                <br />
                                ou remova os filtros.
                            </p>

                            <div className={styles.stockControlEmptyActions}>
                                <button
                                    type="button"
                                    className={styles.stockControlPrimaryButton}
                                >
                                    alterar pesquisa
                                </button>

                                <button
                                    type="button"
                                    className={styles.stockControlTextButton}
                                >
                                    limpar filtros
                                </button>
                            </div>
                        </div>

                    </article>
                </section>
            </section>
        </main>
    );
}