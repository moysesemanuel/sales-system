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

type ActiveReportPage =
  | "list"
  | "product-prices"
  | "supply-reports"
  | "sales-reports"
  | "finance-reports"
  | "service-reports";

type OtherReportSection = {
  id: Exclude<ActiveReportPage, "list" | "product-prices">;
  title: string;
  icon: "box" | "cart" | "money" | "tool";
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

const otherReportsSections: OtherReportSection[] = [
  {
    id: "supply-reports",
    title: "Suprimentos",
    icon: "box",
  },
  {
    id: "sales-reports",
    title: "Vendas",
    icon: "cart",
  },
  {
    id: "finance-reports",
    title: "Finanças",
    icon: "money",
  },
  {
    id: "service-reports",
    title: "Serviços",
    icon: "tool",
  },
];

function ReportsDrawerSectionIcon({
  kind,
}: {
  kind: OtherReportSection["icon"];
}) {
  switch (kind) {
    case "box":
      return (
        <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
          <path
            d="M10 2.8 16 5.8v8.4L10 17.2l-6-3V5.8l6-3Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M4 5.8 10 9l6-3.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M10 9v8.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case "cart":
      return (
        <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
          <path
            d="M3 4h2l1.3 6.2h7.2L15 6.5H6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="8" cy="15.2" r="1.2" fill="currentColor" />
          <circle cx="13.5" cy="15.2" r="1.2" fill="currentColor" />
        </svg>
      );

    case "money":
      return (
        <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
          <path
            d="M10 3.2v13.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M13.2 6.1c0-1.2-1.2-2.1-3-2.1s-3 .9-3 2.1c0 1.3 1.2 1.9 3 2.3 1.8.4 3 1 3 2.4 0 1.3-1.2 2.3-3 2.3s-3.2-.9-3.2-2.3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case "tool":
      return (
        <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
          <path
            d="M12.8 3.5a3.4 3.4 0 0 0-4.2 4.2l-4.5 4.5 1.9 1.9 4.5-4.5a3.4 3.4 0 0 0 4.2-4.2l-1.8 1.8-1.8-.4-.4-1.8 2.1-1.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      );

    default:
      return null;
  }
}

function ReportsDrawerArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path
        d="M6.5 10h7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M10.8 6.7 14.2 10l-3.4 3.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GenericReportsCategoryPage({
  title,
  onBack,
}: {
  title: string;
  onBack: () => void;
}) {
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
            <strong>{title.toLowerCase()}</strong>
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

        <section className={styles.reportDetailHeader}>
          <h2>Relatórios de {title}</h2>
        </section>

        <section className={styles.reportDetailBody}>
          <p className={styles.reportPlaceholderText}>
            Essa área será montada depois com os filtros e campos específicos de{" "}
            {title.toLowerCase()}.
          </p>
        </section>
      </section>
    </main>
  );
}

export function ReportsContent({
  currentUser: _currentUser,
}: {
  currentUser: CurrentUser;
}) {
  const [activeGroupId, setActiveGroupId] = useState(reportGroups[0]?.id ?? "");
  const [activeReportPage, setActiveReportPage] =
    useState<ActiveReportPage>("list");

  const [isCustomReportDrawerOpen, setIsCustomReportDrawerOpen] =
    useState(false);
  const [isOtherReportsDrawerOpen, setIsOtherReportsDrawerOpen] =
    useState(false);

  const [reportName, setReportName] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [reportType, setReportType] = useState("contatos");

  const activeGroup = reportGroups.find((group) => group.id === activeGroupId);
  const filteredReports = reports.filter(
    (report) => report.groupId === activeGroupId
  );

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

  if (activeReportPage === "supply-reports") {
    return (
      <GenericReportsCategoryPage
        title="Suprimentos"
        onBack={() => setActiveReportPage("list")}
      />
    );
  }

  if (activeReportPage === "sales-reports") {
    return (
      <GenericReportsCategoryPage
        title="Vendas"
        onBack={() => setActiveReportPage("list")}
      />
    );
  }

  if (activeReportPage === "finance-reports") {
    return (
      <GenericReportsCategoryPage
        title="Finanças"
        onBack={() => setActiveReportPage("list")}
      />
    );
  }

  if (activeReportPage === "service-reports") {
    return (
      <GenericReportsCategoryPage
        title="Serviços"
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
            <button
              type="button"
              className={styles.reportsGhostButton}
              onClick={() => setIsOtherReportsDrawerOpen(true)}
            >
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

        <section className={styles.reportsHeader}>
          <h1>Relatórios de Cadastros</h1>
          <p>
            Gere e analise relatórios para acompanhar o desempenho de suas
            operações
          </p>
        </section>

        <section className={styles.reportsCustomCard}>
          <div className={styles.reportsCustomIllustration} aria-hidden="true">
            <img
              src="/relatorios_personalizados.svg"
              alt="Relatórios personalizados"
              className={styles.reportsCustomIllustrationImage}
            />
          </div>

          <div className={styles.reportsCustomText}>
            <h2>
              Adicione e ordene os dados do seu relatório para ter uma análise
              de cadastros mais assertiva e eficiente para seu negócio
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
                  <span className={styles.reportsListItemTitle}>
                    {report.title}
                  </span>
                  <span className={styles.reportsListItemDescription}>
                    {report.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </section>

      {isOtherReportsDrawerOpen ? (
        <aside className={styles.reportsDrawerOverlay} aria-hidden="true">
          <section
            className={styles.otherReportsDrawer}
            role="dialog"
            aria-modal="true"
            aria-label="Outros Relatórios"
          >
            <header className={styles.otherReportsDrawerHeader}>
              <div>
                <h2>Outros Relatórios</h2>
                <p>Relatórios disponíveis:</p>
              </div>

              <button
                type="button"
                className={styles.otherReportsDrawerClose}
                onClick={() => setIsOtherReportsDrawerOpen(false)}
              >
                fechar
                <span aria-hidden="true">×</span>
              </button>
            </header>

            <div className={styles.otherReportsDrawerList}>
              {otherReportsSections.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={styles.otherReportsDrawerItem}
                  onClick={() => {
                    setIsOtherReportsDrawerOpen(false);
                    setActiveReportPage(item.id);
                  }}
                >
                  <span className={styles.otherReportsDrawerItemIcon}>
                    <ReportsDrawerSectionIcon kind={item.icon} />
                  </span>

                  <span className={styles.otherReportsDrawerItemText}>
                    {item.title}
                  </span>

                  <span className={styles.otherReportsDrawerItemArrow}>
                    <ReportsDrawerArrowIcon />
                  </span>
                </button>
              ))}
            </div>
          </section>
        </aside>
      ) : null}

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
                  Você está criando um novo relatório baseado nas informações de
                  seus contatos. Defina um título que corresponda à análise que
                  deseja realizar.
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
                    onChange={(event) =>
                      setReportDescription(event.target.value)
                    }
                  />
                  <span>{reportDescription.length}/150</span>
                </div>
              </label>

              <label className={styles.reportsDrawerField}>
                <span>Tipo de relatório</span>
                <select
                  value={reportType}
                  onChange={(event) => setReportType(event.target.value)}
                >
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
  const [groupByTag, setGroupByTag] = useState("grupo");
  const [subGroupByTag, setSubGroupByTag] = useState("grupo");
  const [category, setCategory] = useState("");
  const [priceList, setPriceList] = useState("padrao");
  const [showCost, setShowCost] = useState("nao");
  const [supplier, setSupplier] = useState("");
  const [brand, setBrand] = useState("");
  const [product, setProduct] = useState("");
  const [productTags, setProductTags] = useState("sem-filtro");
  const [onlyPromotionProducts, setOnlyPromotionProducts] = useState(false);
  const [showProductImage, setShowProductImage] = useState(false);

  const handleGenerateReport = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log({
      groupByTag,
      subGroupByTag,
      category,
      priceList,
      showCost,
      supplier,
      brand,
      product,
      productTags,
      onlyPromotionProducts,
      showProductImage,
    });
  };

  return (
    <main className={styles.reportsRoot}>
      <section className={styles.reportsPage}>
        <header className={styles.reportsTopBar}>
          <div className={styles.reportsCrumbs}>
            <button
              type="button"
              className={styles.reportsBackButton}
              onClick={onBack}
            >
              <i className="fa fa-arrow-left" aria-hidden="true" />
              Voltar
            </button>

            <span>início</span>
            <span>cadastros</span>

            <button
              type="button"
              className={styles.reportsCrumbButton}
              onClick={onBack}
            >
              relatórios
            </button>

            <strong>preços de produtos</strong>
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

        <section className={styles.reportDetailHeader}>
          <h2>Relatório de Preços de Produtos</h2>
        </section>

        <section className={styles.reportDetailBody}>
          <form
            className={styles.reportProductPriceForm}
            onSubmit={handleGenerateReport}
          >
            <div className={styles.reportFiltersGrid}>
              <div className={styles.reportField}>
                <label htmlFor="groupByTag">Agrupar por tag de produtos</label>
                <select
                  id="groupByTag"
                  className={styles.reportSelect}
                  value={groupByTag}
                  onChange={(event) => setGroupByTag(event.target.value)}
                >
                  <option value="S">Selecione</option>
                  <option value="G">Grupo</option>
                  <option value="M">Marca</option>
                </select>
              </div>

              <div className={styles.reportField}>
                <label htmlFor="subGroupByTag">
                  Subagrupar por tag de produtos
                </label>
                <select
                  id="subGroupByTag"
                  className={styles.reportSelect}
                  value={subGroupByTag}
                  onChange={(event) => setSubGroupByTag(event.target.value)}
                >
                  <option value="S">Selecione</option>
                  <option value="G">Grupo</option>
                  <option value="M">Marca</option>
                </select>
              </div>

              <div
                className={`${styles.reportField} ${styles.reportSearchField}`}
              >
                <label htmlFor="category">Categoria</label>
                <input
                  id="category"
                  className={styles.reportInput}
                  type="text"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                />

                <div className={styles.reportSearchActions}>
                  <button
                    type="button"
                    className={styles.reportIconButton}
                    aria-label="Pesquisar categoria"
                  >
                    <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
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
                  </button>

                  <span
                    className={styles.packagingDrawerCloseIcon}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 16 16" fill="none" focusable="false">
                      <path
                        d="M4 4l8 8M12 4l-8 8"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <div className={styles.reportGridEmptyCell} aria-hidden="true" />

              <div className={styles.reportField}>
                <label htmlFor="priceList">Lista de preços</label>
                <div className={styles.reportSelectWrap}>
                  <select
                    id="priceList"
                    className={styles.reportSelect}
                    value={priceList}
                    onChange={(event) => setPriceList(event.target.value)}
                  >
                    <option value="padrao">Padrão</option>
                  </select>
                </div>
              </div>

              <div className={styles.reportField}>
                <label htmlFor="showCost">Exibir custo</label>
                <select
                  id="showCost"
                  className={styles.reportSelect}
                  value={showCost}
                  onChange={(event) => setShowCost(event.target.value)}
                >
                  <option value="nao">Não</option>
                  <option value="compra">Custo de compra</option>
                  <option value="medio">Custo Médio</option>
                </select>
              </div>

              <div className={styles.reportField}>
                <label htmlFor="supplier">Fornecedor</label>
                <input
                  id="supplier"
                  className={styles.reportInput}
                  type="text"
                  placeholder="Razão social ou o nome fantasia"
                  value={supplier}
                  onChange={(event) => setSupplier(event.target.value)}
                />
              </div>

              <div className={styles.reportField}>
                <label htmlFor="brand">Marca</label>
                <input
                  id="brand"
                  className={styles.reportInput}
                  type="text"
                  placeholder="Pesquise pelo nome da marca"
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                />
              </div>

              <div className={styles.reportField}>
                <label htmlFor="product">Produto</label>
                <input
                  id="product"
                  className={styles.reportInput}
                  type="text"
                  placeholder="Parte da descrição ou código (SKU)"
                  value={product}
                  onChange={(event) => setProduct(event.target.value)}
                />
              </div>

              <div className={styles.reportField}>
                <label htmlFor="productTags">Tags dos produtos</label>
                <div className={styles.reportSelectWrap}>
                  <select
                    id="productTags"
                    className={styles.reportSelect}
                    value={productTags}
                    onChange={(event) => setProductTags(event.target.value)}
                  >
                    <option value="sem-filtro">Sem filtro por tags</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.reportChecks}>
              <label className={styles.reportCheckLabel}>
                <input
                  type="checkbox"
                  checked={onlyPromotionProducts}
                  onChange={(event) =>
                    setOnlyPromotionProducts(event.target.checked)
                  }
                />
                <span>Exibir apenas produtos em promoção</span>
              </label>

              <label className={styles.reportCheckLabel}>
                <input
                  type="checkbox"
                  checked={showProductImage}
                  onChange={(event) =>
                    setShowProductImage(event.target.checked)
                  }
                />
                <span>Exibir imagem dos produtos</span>
              </label>
            </div>

            <button type="submit" className={styles.reportGenerateButton}>
              gerar
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}