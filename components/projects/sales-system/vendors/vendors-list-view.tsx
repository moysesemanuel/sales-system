"use client";

import styles from "../landing-page.module.css";
import { SearchIcon, VendorsTab } from "./vendors-ui";

export function VendorsListView({ onCreate }: { onCreate: () => void }) {
  return (
    <>
      <header className={styles.vendorsTopBar}>
        <div className={styles.vendorsCrumbs}>
          <span>início</span>
          <span>cadastros</span>
          <strong>vendedores</strong>
        </div>
        <button type="button" className={styles.vendorsPrimaryButton} onClick={onCreate}>
          incluir vendedor
        </button>
      </header>

      <section className={styles.guideBanner}>
        <div className={styles.guideBannerLeft}>
          <span className={styles.guideBannerIcon}>✦</span>
          <span className={styles.guideBannerLabel}>Etapa atual</span>
          <strong className={styles.guideBannerTitle}>Configure a emissão da nota fiscal</strong>
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

      <section className={styles.vendorsToolbar}>
        <h1>Vendedores</h1>
        <div className={styles.vendorsSearchWrap}>
          <input type="search" className={styles.vendorsSearchInput} placeholder="Pesquise por nome ou código" />
          <span className={styles.vendorsSearchIcon} aria-hidden="true">
            <SearchIcon />
          </span>
        </div>
      </section>

      <nav className={styles.vendorsTabs} aria-label="Filtros de vendedores">
        <VendorsTab active>ativos com acesso ao sistema</VendorsTab>
        <VendorsTab>todos</VendorsTab>
        <VendorsTab>ativos</VendorsTab>
        <VendorsTab>inativos</VendorsTab>
        <VendorsTab>excluídos</VendorsTab>
      </nav>

      <section className={styles.vendorsEmptyState}>
        <div className={styles.vendorsEmptyCard}>
          <div className={styles.vendorsEmptyContentBox}>
            <div className={styles.vendorsEmptyInnerBox}>
              <div className={styles.vendorsEmptyText}>
                <h2>Você não possui nenhum item cadastrado.</h2>
                <p>Para inserir novos registros você pode clicar em incluir vendedor.</p>
                <button type="button" className={styles.vendorsPrimaryButton} onClick={onCreate}>
                  incluir vendedor
                </button>
              </div>
            </div>
          </div>
          <div className={styles.vendorsEmptyIllustration} aria-hidden="true">
            <span>🐱</span>
            <span className={styles.vendorsEmptyPlug}>🔌</span>
          </div>
        </div>
      </section>

      <footer className={styles.vendorsFooter}>
        <h3>Ficou com alguma dúvida?</h3>
        <a href="/ajuda-do-erp" target="_blank" rel="noreferrer">
          Acesse a ajuda do ERP.
        </a>
      </footer>
    </>
  );
}
