"use client";

import { useEffect, useRef, useState } from "react";
import type { CurrentUser } from "../types";
import styles from "../landing-page.module.css";
import {
  correiosPackagingTemplates,
  packagingTypeOptions,
  type PackagingItem,
  type PackagingType,
} from "./constants";
import { PackagingDrawer } from "./packaging-drawer";
import { SearchIcon } from "./packaging-ui";

export function PackagingContent({ currentUser: _currentUser }: { currentUser: CurrentUser }) {
  const listTopRef = useRef<HTMLDivElement>(null);
  const activeMenuRef = useRef<HTMLDivElement | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCorreiosConfirmOpen, setIsCorreiosConfirmOpen] = useState(false);
  const [isPackagingFilterOpen, setIsPackagingFilterOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const [packageType, setPackageType] = useState<PackagingType>(packagingTypeOptions[0]);
  const [packagingFilter, setPackagingFilter] = useState<PackagingType | "sem filtro">("sem filtro");

  const [items, setItems] = useState<PackagingItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeMenuItemId, setActiveMenuItemId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const getDimensionsLabel = (item: PackagingItem) => {
    if (item.type === "Pacote / Caixa") {
      return `${item.width} x ${item.length} x ${item.height ?? "0,0"} cm`;
    }
    return `${item.width} x ${item.length} cm`;
  };

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredItems = items.filter((item) => {
    const matchesType =
      packagingFilter === "sem filtro" || item.type === packagingFilter;

    const matchesSearch =
      !normalizedSearchTerm ||
      item.description.toLowerCase().includes(normalizedSearchTerm) ||
      item.type.toLowerCase().includes(normalizedSearchTerm) ||
      getDimensionsLabel(item).toLowerCase().includes(normalizedSearchTerm) ||
      String(item.weight).toLowerCase().includes(normalizedSearchTerm);

    return matchesType && matchesSearch;
  });

  const packagingFilterLabel =
    packagingFilter === "sem filtro" ? "por embalagem" : packagingFilter.toLowerCase();

  const hasPackagingFilter = packagingFilter !== "sem filtro" || searchTerm.trim().length > 0;

  const allSelected = filteredItems.length > 0 && selectedIds.length === filteredItems.length;



  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds([]);
      return;
    }

    setSelectedIds(filteredItems.map((item) => item.id));
  };

  const toggleOne = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]
    );
  };

  const handleRequestDeleteSelected = () => {
    if (!selectedIds.length) return;
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDeleteSelected = () => {
    if (!selectedIds.length) return;

    setItems((current) => current.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
    setActiveMenuItemId(null);
    setIsDeleteConfirmOpen(false);
  };

  const handleCancelDeleteSelected = () => {
    setIsDeleteConfirmOpen(false);
  };

  const hasAnyDefault = items.some((item) => Boolean(item.isDefault));

  const handleSavePackaging = (payload: Omit<PackagingItem, "id">) => {
    const id = `pack-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const nextItem: PackagingItem = { id, ...payload };
    setItems((current) => [...current, nextItem]);
    setSelectedIds([]);
    setIsDrawerOpen(false);
  };

  const handleConfirmCorreios = () => {
    const generated = correiosPackagingTemplates.map((template, index) => ({
      ...template,
      id: `correios-${Date.now()}-${index}`,
      isDefault: false,
    }));
    setItems((current) => [...current, ...generated]);
    setSelectedIds([]);
    setIsCorreiosConfirmOpen(false);
  };

  const handleCancelCorreios = () => {
    setIsCorreiosConfirmOpen(false);
  };

  const handleScrollTop = () => {
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (!isCorreiosConfirmOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleCancelCorreios();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isCorreiosConfirmOpen]);

  useEffect(() => {
    if (!activeMenuItemId) return;
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (activeMenuRef.current && !activeMenuRef.current.contains(target)) {
        setActiveMenuItemId(null);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [activeMenuItemId]);

  useEffect(() => {
    if (!isPackagingFilterOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest("[data-packaging-filter]")) {
        setIsPackagingFilterOpen(false);
      }
    };

    useEffect(() => {
      if (!selectedIds.length) {
        setIsDeleteConfirmOpen(false);
      }
    }, [selectedIds]);

    useEffect(() => {
      if (!isDeleteConfirmOpen) return;

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          event.preventDefault();
          handleCancelDeleteSelected();
        }
      };

      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }, [isDeleteConfirmOpen]);

    useEffect(() => {
      if (!selectedIds.length) {
        setIsDeleteConfirmOpen(false);
      }
    }, [selectedIds]);

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [isPackagingFilterOpen]);

  const toggleDefault = (id: string) => {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, isDefault: !item.isDefault } : item))
    );
    setActiveMenuItemId(null);
  };

  return (
    <main className={styles.packagingRoot}>
      <section className={styles.packagingPage}>
        <div ref={listTopRef} />
        <header className={styles.packagingTopBar}>
          <div className={styles.packagingCrumbs}>
            <span>início</span>
            <span>cadastros</span>
            <strong>embalagens</strong>
          </div>
          <div className={styles.packagingActions}>
            <button
              type="button"
              className={styles.packagingGhostButton}
              onClick={() => setIsCorreiosConfirmOpen(true)}
            >
              <span className={styles.packagingGhostButtonIcon} aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    d="M3.5 8h13v9a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2V8Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    opacity="0.85"
                  />
                  <path
                    d="M2.5 8h15M10 8v11"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                  <path
                    d="M6.2 5.9c-.9-.9-1-2.2-.2-2.9.8-.7 2.1-.5 3 .4L10 4.5l1-1.1c.9-.9 2.2-1.1 3-.4.8.7.7 2-.2 2.9L12.5 7H7.5L6.2 5.9Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                    opacity="0.85"
                  />
                </svg>
              </span>

              criar embalagens Correios
            </button>
            <button type="button" className={styles.packagingPrimaryButton} onClick={() => setIsDrawerOpen(true)}>
              incluir embalagem
            </button>
          </div>
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

        <section className={styles.packagingToolbar}>
          <h1>Embalagens de produtos</h1>
          <div className={styles.packagingSearchRow}>
            <div className={styles.packagingSearchWrap}>
              <input
                type="search"
                className={styles.packagingSearchInput}
                placeholder="Pesquisa..."
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setSelectedIds([]);
                }}
              />
              <span className={styles.packagingSearchIcon} aria-hidden="true">
                <SearchIcon />
              </span>
            </div>
            <div className={styles.packagingFilterGroup}>
              <div className={styles.packagingFilterWrap} data-packaging-filter>
                <button
                  type="button"
                  className={
                    hasPackagingFilter
                      ? styles.packagingFilterChipActive
                      : styles.packagingFilterChip
                  }
                  onClick={() => setIsPackagingFilterOpen((current) => !current)}
                >
                  {packagingFilterLabel}
                </button>

                {isPackagingFilterOpen ? (
                  <div className={styles.packagingFilterPopover}>
                    <span className={styles.packagingFilterPopoverTitle}>Tipo da embalagem</span>

                    <div className={styles.packagingFilterOptions}>
                      <button
                        type="button"
                        className={
                          packagingFilter === "sem filtro"
                            ? styles.packagingFilterOptionActive
                            : styles.packagingFilterOption
                        }
                        onClick={() => {
                          setPackagingFilter("sem filtro");
                          setSearchTerm("");
                          setSelectedIds([]);
                          setIsPackagingFilterOpen(false);
                        }}
                      >
                        sem filtro
                      </button>

                      {packagingTypeOptions.map((type) => (
                        <button
                          key={type}
                          type="button"
                          className={
                            packagingFilter === type
                              ? styles.packagingFilterOptionActive
                              : styles.packagingFilterOption
                          }
                          onClick={() => {
                            setPackagingFilter(type);
                            setSelectedIds([]);
                            setIsPackagingFilterOpen(false);
                          }}
                        >
                          {type.toLowerCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              {hasPackagingFilter ? (
                <button
                  type="button"
                  className={styles.packagingClearFiltersButton}
                  onClick={() => {
                    setPackagingFilter("sem filtro");
                    setSearchTerm("");
                    setSelectedIds([]);
                    setIsPackagingFilterOpen(false);
                  }}
                >
                  <i className="fal fa-minus-circle" aria-hidden="true" />
                  limpar filtros
                </button>
              ) : null}
            </div>
          </div>
        </section>

        {filteredItems.length ? (
          <section className={styles.packagingListSection}>
            <div className={styles.packagingTableWrap}>
              <table className={styles.packagingTable}>
                <thead>
                  <tr>
                    <th aria-label="Selecionar">
                      <input type="checkbox" checked={allSelected} onChange={toggleAll} />
                    </th>
                    <th>Descrição</th>
                    <th>Tipo</th>
                    <th>Dimensões</th>
                    <th>Peso</th>
                    {hasAnyDefault ? <th>Padrão</th> : null}
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(item.id)}
                          onChange={() => toggleOne(item.id)}
                        />
                      </td>
                      <td>
                        <div className={styles.packagingDescriptionCell}>
                          <div
                            ref={activeMenuItemId === item.id ? activeMenuRef : null}
                            className={styles.packagingRowMenuWrap}
                          >
                            <button
                              type="button"
                              className={activeMenuItemId === item.id ? styles.packagingRowMenuTriggerActive : styles.packagingRowMenuTrigger}
                              onClick={() =>
                                setActiveMenuItemId((current) => (current === item.id ? null : item.id))
                              }
                              aria-label="Ações da embalagem"
                            >
                              <span />
                              <span />
                              <span />
                            </button>

                            {activeMenuItemId === item.id ? (
                              <div className={styles.packagingRowMenuPopover}>
                                <button type="button" className={styles.packagingRowMenuCurrent}>
                                  <span className={styles.packagingRowMenuCurrentDot}>
                                    <span />
                                    <span />
                                    <span />
                                  </span>
                                  <span>{item.description}</span>
                                </button>
                                <button
                                  type="button"
                                  className={styles.packagingRowMenuAction}
                                  onClick={() => toggleDefault(item.id)}
                                >
                                  <span className={styles.packagingRowMenuActionIcon} aria-hidden="true">
                                    {item.isDefault ? (
                                      <i className="fa fa-ban" />
                                    ) : (
                                      <span className={styles.packagingRowMenuActionTagCircle}>
                                        <i className="fa fa-tag" />
                                      </span>
                                    )}
                                  </span>
                                  {item.isDefault ? "desmarcar como padrão" : "marcar como padrão"}
                                </button>
                              </div>
                            ) : null}
                          </div>
                          <span>{item.description}</span>
                        </div>
                      </td>
                      <td>{item.type}</td>
                      <td>{getDimensionsLabel(item)}</td>
                      <td>{item.weight} Kg</td>
                      {hasAnyDefault ? (
                        <td>
                          {item.isDefault ? (
                            <span className={styles.packagingDefaultTag}>embalagem padrão</span>
                          ) : null}
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <footer className={styles.packagingCountFooter}>
              {isDeleteConfirmOpen ? (
                <div className={styles.packagingFooterConfirm}>
                  <div className={styles.packagingFooterConfirmContent}>
                    <h3>Confirmação</h3>
                    <p>Confirma exclusão das embalagens selecionadas?</p>
                  </div>

                  <div className={styles.packagingFooterConfirmActions}>
                    <button
                      type="button"
                      className={styles.packagingPrimaryButton}
                      onClick={handleConfirmDeleteSelected}
                    >
                      confirmar
                    </button>

                    <button
                      type="button"
                      className={styles.packagingBottomCancel}
                      onClick={handleCancelDeleteSelected}
                    >
                      cancelar
                    </button>

                    <span className={styles.packagingBottomEsc}>ESC</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className={styles.packagingFooterLeft}>
                    {selectedIds.length > 0 ? (
                      <div className={styles.packagingFooterSelection}>
                        <span className={styles.packagingBulkArrow} aria-hidden="true">
                          ↵
                        </span>

                        <span className={styles.packagingBulkCount}>
                          {selectedIds.length} selecionadas
                        </span>

                        <button
                          type="button"
                          className={styles.packagingBulkDeleteButton}
                          onClick={handleRequestDeleteSelected}
                        >
                          <i className="fa fa-trash" aria-hidden="true" />
                          excluir embalagens
                        </button>
                      </div>
                    ) : null}
                  </div>

                  <button
                    type="button"
                    className={styles.packagingFooterScrollTopButton}
                    onClick={handleScrollTop}
                  >
                    <span className={styles.packagingCountFooterLabel}>
                      <span className={styles.packagingCountFooterCount}>{filteredItems.length}</span>
                      <span>embalagens</span>
                    </span>

                    <span className={styles.packagingCountFooterArrow} aria-hidden="true">
                      ↑
                    </span>
                  </button>
                </>
              )}
            </footer>
          </section>
        ) : (
          <section className={styles.packagingEmptyState}>
            <div className={styles.packagingEmptyCard}>
              <div className={styles.packagingEmptyContentBox}>
                <div className={styles.packagingEmptyInnerBox}>
                  <div className={styles.packagingEmptyText}>
                    <h2>Sua pesquisa não retornou resultados.</h2>
                    <p>Tente outras opções de pesquisa, tipos de embalagens ou remova os filtros.</p>
                    <div className={styles.packagingEmptyActions}>
                      <button type="button" className={styles.packagingPrimaryButton}>
                        alterar pesquisa
                      </button>
                      <button type="button" className={styles.packagingTextButton}
                        onClick={() => {
                          setPackagingFilter("sem filtro");
                          setSelectedIds([]);
                          setIsPackagingFilterOpen(false);
                        }}
                      >
                        limpar filtros
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.packagingEmptyIllustration} aria-hidden="true">
                <span>🐱</span>
                <span className={styles.packagingEmptyLens}>🔎</span>
              </div>
            </div>
          </section>
        )}

      </section>

      <PackagingDrawer
        isOpen={isDrawerOpen}
        packageType={packageType}
        onChangePackageType={setPackageType}
        onSave={handleSavePackaging}
        onClose={() => setIsDrawerOpen(false)}
      />

      {isCorreiosConfirmOpen ? (
        <aside className={styles.packagingBottomSheet} role="dialog" aria-modal="true" aria-label="Confirmação">
          <h3>Confirmação</h3>
          <p>Tem certeza que deseja criar as embalagens padrões disponibilizadas pelos Correios?</p>
          <div className={styles.packagingBottomSheetActions}>
            <button type="button" className={styles.packagingPrimaryButton} onClick={handleConfirmCorreios}>
              confirmar
            </button>
            <button type="button" className={styles.packagingBottomCancel} onClick={handleCancelCorreios}>
              cancelar
            </button>
            <span className={styles.packagingBottomEsc}>ESC</span>
          </div>
        </aside>
      ) : null}
    </main>
  );
}
