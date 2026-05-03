"use client";

import { useState } from "react";
import type { CurrentUser } from "../types";
import styles from "../landing-page.module.css";

type ReportGroup = {
  id: string;
  name: string;
};

type ReportItem = {
  id: string;
  groupId: string;
  title: string;
  description: string;
  href: string;
};

const reportGroups: ReportGroup[] = [
  {
    id: "products",
    name: "Produtos",
  },
];

const reports: ReportItem[] = [
  {
    id: "product-prices",
    groupId: "products",
    title: "Relatório de Preços dos Produtos",
    description: "Impressão da lista de preços agrupada por tags.",
    href: "relatorio_produtos_lista_precos",
  },
];

export function ReportsContent({ currentUser: _currentUser }: { currentUser: CurrentUser }) {
  const [activeGroupId, setActiveGroupId] = useState(reportGroups[0]?.id ?? "");
  const [activeReportPage, setActiveReportPage] = useState<"list" | "product-prices">("list");

  const [isCustomReportDrawerOpen, setIsCustomReportDrawerOpen] = useState(false);
  const [reportName, setReportName] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [reportType, setReportType] = useState("contatos");

  const activeGroup = reportGroups.find((group) => group.id === activeGroupId);
  const filteredReports = reports.filter((report) => report.groupId === activeGroupId);

  const canCreateCustomReport = reportName.trim().length > 0;

  const handleCreateCustomReport = () => {
    if (!canCreateCustomReport) return;

    console.log({
      reportName,
      reportDescription,
      reportType,
    });

    setReportName("");
    setReportDescription("");
    setReportType("contatos");
    setIsCustomReportDrawerOpen(false);
  };

  if (activeReportPage === "product-prices") {
    return (
      <ProductPricesReportContent
        currentUser={_currentUser}
        onBack={() => setActiveReportPage("list")}
      />
    );
  }

  return (
    <main className={styles.reportsRoot}>
      <section className={styles.reportsPage}>
        <header className={styles.reportsTopBar}>
          <div className={styles.reportsCrumbs}>
            <span>início</span>
            <span>cadastros</span>
            <strong>relatorios</strong>
          </div>

          <div className={styles.reportsActions}>
            <button type="button" className={styles.reportsGhostButton}>
              <i className="fal fa-file-alt" aria-hidden="true" />
              outros relatórios
            </button>

            <button
              type="button"
              className={styles.reportsPrimaryButton}
              onClick={() => setIsCustomReportDrawerOpen(true)}
            >
              <i className="fa fa-plus" aria-hidden="true" />
              relatório personalizado
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

        <section className={styles.reportsHeader}>
          <h1>Relatórios de Cadastros</h1>
          <p>Gere e analise relatórios para acompanhar o desempenho de suas operações</p>
        </section>

        <section className={styles.reportsCustomCard}>
          <div className={styles.reportsCustomIllustration} aria-hidden="true">
            <div className={styles.reportsIllustrationPerson} />
            <div className={styles.reportsIllustrationPanel}>
              <span>valor</span>
              <span>frete</span>
            </div>
          </div>

          <div className={styles.reportsCustomText}>
            <h2>
              Adicione e ordene os dados do seu relatório para ter uma análise de cadastros mais
              assertiva e eficiente para seu negócio
            </h2>
          </div>

          <button
            type="button"
            className={styles.reportsCustomButton}
            onClick={() => setIsCustomReportDrawerOpen(true)}
          >
            <span className={styles.reportsCustomButtonIcon}>
              <i className="fa fa-plus" aria-hidden="true" />
            </span>
            relatórios personalizados
          </button>
        </section>

        <section className={styles.reportsListLayout}>
          <aside className={styles.reportsSidebar}>
            {reportGroups.map((group) => (
              <button
                key={group.id}
                type="button"
                className={
                  activeGroupId === group.id
                    ? styles.reportsSidebarItemActive
                    : styles.reportsSidebarItem
                }
                onClick={() => setActiveGroupId(group.id)}
              >
                {group.name}
              </button>
            ))}
          </aside>

          <div className={styles.reportsListContent}>
            <h2>{activeGroup?.name}</h2>

            <div className={styles.reportsList}>
              {filteredReports.map((report) => (
                <button
                  key={report.id}
                  type="button"
                  className={styles.reportsListItem}
                  onClick={() => {
                    if (report.id === "product-prices") {
                      setActiveReportPage("product-prices");
                    }
                  }}
                >
                  <span className={styles.reportsListItemTitle}>{report.title}</span>
                  <span className={styles.reportsListItemDescription}>{report.description}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </section>

      {isCustomReportDrawerOpen ? (
        <aside className={styles.reportsDrawerOverlay} aria-hidden="true">
          <section
            className={styles.reportsDrawer}
            role="dialog"
            aria-modal="true"
            aria-label="Criar relatório personalizado"
          >
            <header className={styles.reportsDrawerHeader}>
              <div>
                <h2>Criar um novo relatório de contato personalizado</h2>
                <p>
                  Você está criando um novo relatório baseado nas informações de seus contatos.
                  Defina um título que corresponda à análise que deseja realizar.
                </p>
              </div>

              <button
                type="button"
                className={styles.reportsDrawerClose}
                onClick={() => setIsCustomReportDrawerOpen(false)}
              >
                fechar
                <span aria-hidden="true">×</span>
              </button>
            </header>

            <div className={styles.reportsDrawerForm}>
              <label className={styles.reportsDrawerField}>
                <span>Nome do relatório</span>
                <div className={styles.reportsDrawerInputWrap}>
                  <input
                    type="text"
                    value={reportName}
                    maxLength={75}
                    onChange={(event) => setReportName(event.target.value)}
                    autoFocus
                  />
                  <span>{reportName.length}/75</span>
                </div>
              </label>

              <label className={styles.reportsDrawerField}>
                <span>Descrição do relatório</span>
                <div className={styles.reportsDrawerInputWrap}>
                  <input
                    type="text"
                    value={reportDescription}
                    maxLength={150}
                    onChange={(event) => setReportDescription(event.target.value)}
                  />
                  <span>{reportDescription.length}/150</span>
                </div>
              </label>

              <label className={styles.reportsDrawerField}>
                <span>Tipo de relatório</span>
                <select value={reportType} onChange={(event) => setReportType(event.target.value)}>
                  <option value="contatos">contatos</option>
                  <option value="produtos">produtos</option>
                  <option value="vendas">vendas</option>
                </select>
              </label>
            </div>

            <footer className={styles.reportsDrawerFooter}>
              <button
                type="button"
                className={styles.reportsPrimaryButton}
                disabled={!canCreateCustomReport}
                onClick={handleCreateCustomReport}
              >
                criar novo relatório
              </button>
            </footer>
          </section>
        </aside>
      ) : null}
    </main>
  );
}

function ProductPricesReportContent({
  currentUser: _currentUser,
  onBack,
}: {
  currentUser: CurrentUser;
  onBack: () => void;
}) {
  const [groupByTag, setGroupByTag] = useState("");
  const [subGroupByTag, setSubGroupByTag] = useState("");
  const [category, setCategory] = useState("");
  const [priceList, setPriceList] = useState("padrao");
  const [showCost, setShowCost] = useState("nao");
  const [onlyPromotionProducts, setOnlyPromotionProducts] = useState(false);
  const [showProductImage, setShowProductImage] = useState(false);

  const handleGenerateReport = () => {
    console.log({
      groupByTag,
      subGroupByTag,
      category,
      priceList,
      showCost,
      onlyPromotionProducts,
      showProductImage,
    });
  };

  return (
    <main className={styles.reportsRoot}>
      <section className={styles.reportsPage}>
        <header className={styles.reportsTopBar}>
          <div className={styles.reportsCrumbs}>
            <button type="button" className={styles.reportsBackButton} onClick={onBack}>
              <i className="fa fa-arrow-left" aria-hidden="true" />
              Voltar
            </button>

            <span>início</span>
            <span>cadastros</span>

            <button type="button" className={styles.reportsCrumbButton} onClick={onBack}>
              relatórios
            </button>

            <strong>preços de produtos</strong>
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

        <section className={styles.reportDetailHeader}>
          <h1>Relatório de Preços de Produtos</h1>
        </section>

        <section className={styles.reportDetailBody}>
          <form className={styles.reportFiltersForm}>
            <div className={styles.reportFiltersGrid}>
              <label className={styles.reportField}>
                <span>Agrupar por tag de produtos</span>
                <select value={groupByTag} onChange={(event) => setGroupByTag(event.target.value)}>
                  <option value="">Selecione</option>
                  <option value="grupo">Grupo</option>
                  <option value="marca">Marca</option>
                  <option value="colecao">Coleção</option>
                </select>
              </label>

              <label className={styles.reportField}>
                <span>Subagrupar por tag de produtos</span>
                <select
                  value={subGroupByTag}
                  onChange={(event) => setSubGroupByTag(event.target.value)}
                >
                  <option value="">Selecione</option>
                  <option value="grupo">Grupo</option>
                  <option value="marca">Marca</option>
                  <option value="colecao">Coleção</option>
                </select>
              </label>

              <label className={styles.reportField}>
                <span>Categoria</span>

                <div className={styles.reportCategoryInputGroup}>
                  <input type="text" value={category} readOnly />

                  <button
                    type="button"
                    title="Buscar categorias"
                    onClick={() => setCategory("Categoria selecionada")}
                  >
                    <i className="fa fa-search" aria-hidden="true" />
                  </button>

                  <button type="button" title="Limpar categoria" onClick={() => setCategory("")}>
                    <i className="fa fa-remove" aria-hidden="true" />
                  </button>
                </div>
              </label>

              <label className={styles.reportField}>
                <span>Lista de preços</span>
                <select value={priceList} onChange={(event) => setPriceList(event.target.value)}>
                  <option value="padrao">Padrão</option>
                  <option value="varejo">Varejo</option>
                  <option value="atacado">Atacado</option>
                </select>
              </label>

              <label className={styles.reportField}>
                <span>Exibir custo</span>
                <select value={showCost} onChange={(event) => setShowCost(event.target.value)}>
                  <option value="nao">Não</option>
                  <option value="sim">Sim</option>
                </select>
              </label>
            </div>

            <div className={styles.reportCheckboxGroup}>
              <label className={styles.reportCheckbox}>
                <input
                  type="checkbox"
                  checked={onlyPromotionProducts}
                  onChange={(event) => setOnlyPromotionProducts(event.target.checked)}
                />
                <span className={styles.reportCheckboxBox} />
                <span>Exibir apenas produtos em promoção</span>
              </label>

              <label className={styles.reportCheckbox}>
                <input
                  type="checkbox"
                  checked={showProductImage}
                  onChange={(event) => setShowProductImage(event.target.checked)}
                />
                <span className={styles.reportCheckboxBox} />
                <span>Exibir imagem dos produtos</span>
              </label>
            </div>

            <footer className={styles.reportControls}>
              <button
                type="button"
                className={styles.reportsPrimaryButton}
                onClick={handleGenerateReport}
              >
                Gerar
              </button>
            </footer>
          </form>
        </section>
      </section>
    </main>
  );
}