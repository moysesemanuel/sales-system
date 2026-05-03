"use client";

import { useState } from "react";
import type { CurrentUser } from "../types";
import styles from "../landing-page.module.css";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <path d="M10 4.5v11M4.5 10h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function CategoriesProductsContent({ currentUser: _currentUser }: { currentUser: CurrentUser }) {
  const [isGroupDrawerOpen, setIsGroupDrawerOpen] = useState(false);
  const [isAttributesDrawerOpen, setIsAttributesDrawerOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const [attributeName, setAttributeName] = useState("");

  return (
    <main className={styles.categoriesProductsRoot}>
      <section className={styles.categoriesProductsPage}>
        <header className={styles.categoriesProductsTopBar}>
          <div className={styles.categoriesProductsCrumbs}>
            <span>início</span>
            <span>cadastros</span>
            <strong>categorias dos produtos</strong>
          </div>
          <div className={styles.categoriesProductsActions}>
            <button
              type="button"
              className={styles.categoriesProductsGhostButton}
              onClick={() => {
                setIsGroupDrawerOpen(false);
                setIsAttributesDrawerOpen(true);
              }}
            >
              informar atributos
            </button>
            <button
              type="button"
              className={styles.categoriesProductsPrimaryButton}
              onClick={() => {
                setIsAttributesDrawerOpen(false);
                setIsGroupDrawerOpen(true);
              }}
            >
              incluir grupo de categorias
            </button>
          </div>
        </header>

        <section className={styles.guideBanner}>
          <div className={styles.guideBannerLeft}>
            <span className={styles.guideBannerIcon}>✦</span>
            <span className={styles.guideBannerLabel}>Etapa atual</span>
            <strong className={styles.guideBannerTitle}>Centralize seus produtos e estoque</strong>
          </div>
          <div className={styles.guideBannerRight}>
            <span className={styles.guideBannerProgressText}>0 de 4</span>
            <span className={styles.guideBannerProgressTrack}>
              <span className={styles.guideBannerProgressFill} />
            </span>
            <button type="button" className={styles.guideBannerLink}>
              acessar o guia
            </button>
          </div>
        </section>

        <section className={styles.categoriesProductsToolbar}>
          <h1>Categorias dos produtos</h1>
          <div className={styles.categoriesProductsSearchWrap}>
            <input
              type="search"
              className={styles.categoriesProductsSearchInput}
              placeholder="Pesquise por descrição"
            />
            <span className={styles.categoriesProductsSearchIcon} aria-hidden="true">
              <SearchIcon />
            </span>
          </div>
        </section>

        <section className={styles.categoriesProductsEmptyState}>
          <div className={styles.categoriesProductsEmptyCard}>
            <div className={styles.categoriesProductsEmptyText}>
              <h2>Você não possui nenhum item cadastrado.</h2>
              <p>Para inserir novos registros você pode clicar em incluir grupo de categorias.</p>
              <button
                type="button"
                className={styles.categoriesProductsPrimaryButton}
                onClick={() => {
                  setIsAttributesDrawerOpen(false);
                  setIsGroupDrawerOpen(true);
                }}
              >
                incluir grupo de categorias
              </button>
            </div>
            <div className={styles.categoriesProductsEmptyIllustration} aria-hidden="true">
              <span>🐱</span>
              <span className={styles.categoriesProductsPlug}>🔌</span>
            </div>
          </div>
        </section>

        <footer className={styles.categoriesProductsFooter}
          style={{ display: "flex", flexDirection: "column", alignItems: "left", gap: "8px" }}
        >
          <p style={{ fontSize: "15px", margin: 0 }}>Ficou com alguma dúvida?</p>
          <a href="/ajuda-do-erp" style={{ fontSize: "15px"}} target="_blank" rel="noreferrer">
            Acesse a ajuda do ERP.
          </a>
        </footer>
      </section>

      {isGroupDrawerOpen ? (
        <aside className={styles.categoriesGroupDrawer} role="dialog" aria-modal="true" aria-label="Grupo de categorias">
          <header className={styles.categoriesGroupDrawerHeader}>
            <h2>Grupo de categorias</h2>
            <button
              type="button"
              className={styles.categoriesGroupDrawerClose}
              aria-label="Fechar"
              onClick={() => setIsGroupDrawerOpen(false)}
            >
              ×
            </button>
          </header>

          <div className={styles.categoriesGroupDrawerBody}>
            <label className={styles.categoriesGroupDrawerField}>
              <span>Descrição do grupo</span>
              <input
                type="text"
                className={styles.categoriesGroupDrawerInput}
                placeholder="Digite a descrição do grupo"
              />
            </label>
          </div>

          <footer className={styles.categoriesGroupDrawerFooter}>
            <button type="button" className={styles.categoriesProductsPrimaryButton}>
              salvar
            </button>
            <button
              type="button"
              className={styles.textButton}
              onClick={() => setIsGroupDrawerOpen(false)}
            >
              cancelar
            </button>
          </footer>
        </aside>
      ) : null}

      {isAttributesDrawerOpen ? (
        <aside className={styles.categoriesGroupDrawer} role="dialog" aria-modal="true" aria-label="Informar atributos">
          <header className={styles.categoriesGroupDrawerHeader}>
            <h2>Informar atributos para categoria</h2>
            <button
              type="button"
              className={styles.categoriesDrawerCloseTextButton}
              onClick={() => setIsAttributesDrawerOpen(false)}
            >
              fechar
              <span className={styles.categoriesDrawerCloseCircle} aria-hidden="true">
                ×
              </span>
            </button>
          </header>

          <div className={styles.categoriesGroupDrawerBody}>
            <label className={styles.categoriesGroupDrawerField}>
              <span>Categoria</span>
              <div className={styles.categoriesDrawerSearchField}>
                <input
                  type="text"
                  className={styles.categoriesGroupDrawerInput}
                  value={categorySearch}
                  onChange={(event) => setCategorySearch(event.target.value)}
                />
                <span className={styles.categoriesDrawerSearchIcon} aria-hidden="true">
                  <SearchIcon />
                </span>
                <button
                  type="button"
                  className={styles.categoriesDrawerClearButton}
                  aria-label="Limpar categoria"
                  onClick={() => setCategorySearch("")}
                >
                  ×
                </button>
              </div>
            </label>

            <label className={styles.categoriesDrawerCheckbox}>
              <input type="checkbox" />
              <span>Estender atributos para categorias filhas;</span>
            </label>

            <div className={styles.categoriesDrawerAttributeBlock}>
              <div className={styles.categoriesDrawerAttributeHeader}>
                <span>Atributos</span>
                <span>Valor</span>
              </div>

              <div className={styles.categoriesDrawerAttributeRow}>
                <input
                  type="text"
                  className={styles.categoriesGroupDrawerInput}
                  placeholder="Pesquise pelo nome do atributo"
                  value={attributeName}
                  onChange={(event) => setAttributeName(event.target.value)}
                />
                <div className={styles.categoriesDrawerAttributeValueWrap}>
                  <button type="button" className={styles.categoriesDrawerSaveTextButton}>
                    salvar
                  </button>
                  <button
                    type="button"
                    className={styles.categoriesDrawerSaveIconButton}
                    aria-label="Salvar atributo"
                  >
                    <span className={styles.categoriesDrawerSaveIconCircle} aria-hidden="true">
                      <i className="fa fa-fw fa-ban" />
                    </span>
                  </button>
                </div>
              </div>

              <button type="button" className={styles.categoriesDrawerAddAttributeButton}>
                <span className={styles.categoriesDrawerAddIconCircle} aria-hidden="true">
                  <i className="fa fa-fw fa-plus" />
                </span>
                adicionar atributo
              </button>
            </div>
          </div>

          <footer className={styles.categoriesGroupDrawerFooter}>
            <button type="button" className={styles.categoriesProductsPrimaryButton}>
              aplicar
            </button>
            <button
              type="button"
              className={styles.textButton}
              onClick={() => setIsAttributesDrawerOpen(false)}
            >
              cancelar
            </button>
          </footer>
        </aside>
      ) : null}
    </main>
  );
}
