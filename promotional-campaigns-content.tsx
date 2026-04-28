"use client";

import styles from "./landing-page.module.css";
import type { CurrentUser } from "./types";

type PromotionalCampaignsContentProps = {
  currentUser: CurrentUser;
};

export function PromotionalCampaignsContent({
  currentUser,
}: PromotionalCampaignsContentProps) {
  return (
    <section className={styles.contentSection}>
      <div className={styles.contentHeaderRow}>
        <div>
          <p className={styles.breadcrumb}>
            início <span className={styles.breadcrumbSeparator}>=</span> cadastros{" "}
            <span className={styles.breadcrumbCurrent}>campanhas promocionais</span>
          </p>
        </div>

        <button type="button" className={styles.primaryActionButton}>
          incluir campanha
        </button>
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

      <div className={styles.pageSection}>
        <h1 className={styles.pageTitle}>Campanhas promocionais</h1>

        <div className={styles.toolbar}>
          <div className={styles.searchInputWrapper}>
            <input
              type="text"
              placeholder="Pesquise pela descrição da campanha"
              className={styles.searchInput}
            />
            <span className={styles.searchIcon}>⌕</span>
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

      <footer className={styles.helpFooter}>
        <p className={styles.helpFooterTitle}>Ficou com alguma dúvida?</p>
        <a href="#" className={styles.helpFooterLink}>
          Ajuda do Sistema ERP
        </a>
      </footer>
    </section>
  );
}