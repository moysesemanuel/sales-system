"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { CurrentUser } from "./types";
import styles from "./landing-page.module.css";

const productTabs = ["todos", "simples", "kits", "variações", "matéria-prima"] as const;
const productFormTabs = [
  "dados gerais",
  "dados complementares",
  "ficha técnica",
  "anúncios",
  "preços",
  "custos",
  "outros",
] as const;
const productTypeOptions = ["Simples", "Variação", "Kit", "Matéria-prima"];
const spedItemOptions = ["Selecione", "00 - Mercadoria para revenda", "01 - Matéria-prima", "02 - Embalagem"];
const icmsOriginOptions = [
  "0 - Nacional, exceto as indicadas nos códigos 3 a 5",
  "1 - Estrangeira - Importação direta, exceto a indicada no código 6",
  "2 - Estrangeira - Adquirida no mercado interno, exceto a indicada no código 7",
  "3 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 40% e inferior ou igual a 70%",
  "4 - Nacional, cuja produção tenha sido feita em conformidade com os processos produtivos básicos de que tratam as legislações citadas nos Ajustes",
  "5 - Nacional, mercadoria ou bem com Conteúdo de Importação inferior ou igual a 40%",
  "6 - Estrangeira - Importação direta, sem similar nacional, constante em lista da CAMEX",
  "7 - Estrangeira - Adquirida no mercado interno, sem similar nacional, constante em lista da CAMEX",
  "8 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 70%",
];
const unitOptions = ["un", "kg", "g", "m", "cm", "cx", "pct"];
const packagingTypeOptions = ["Pacote / Caixa", "Embalagem personalizada", "Pallet", "Saco"];
const yesNoOptions = ["Sim", "Não"];
const stockTabs = ["Estoque", "Sob encomenda", "Controlar lotes"] as const;

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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

function BackIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M12.5 4.75 7.25 10l5.25 5.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <path d="M5.5 7.5 10 12l4.5-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M9 1.75 10.88 6.1 15.25 8l-4.37 1.9L9 14.25 7.12 9.9 2.75 8l4.37-1.9L9 1.75Z"
        fill="currentColor"
      />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 17.5 14" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M2.9 7c1.55-2.5 3.85-4 5.65-4S12.7 4.5 14.2 7c-1.55 2.5-3.85 4-5.65 4S4.45 9.5 2.9 7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8.55" cy="7" r="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 12.2 13.6 2.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true" focusable="false">
      <circle cx="9" cy="9" r="7.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 8.2v4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9 5.75h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function formatBrazilianPriceInput(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  const numericValue = Number(digits) / 100;
  return numericValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function ProductEmptyStateCat() {
  return (
    <svg viewBox="0 0 240 180" role="img" aria-label="Sua pesquisa não retornou resultados" focusable="false">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M118 32c9-11 23-17 37-14-2 6-1 12 5 18 5 5 12 8 18 8-8 12-19 18-31 18-19 0-34-11-29-30Z"
          fill="#d8dbea"
          stroke="#d8dbea"
        />
        <path
          d="M120 36c-16-4-30 0-41 11-11 11-16 25-15 41 2 27 20 48 49 54 18 4 36 0 51-11 18-13 27-30 26-50-1-13-5-24-13-33"
          fill="#f1f3fb"
          stroke="#d7dcec"
          strokeWidth="3"
        />
        <path d="M92 80 70 58M96 70 82 49M144 80 166 58M139 69 153 48" stroke="#d7dcec" strokeWidth="3" />
        <circle cx="103" cy="108" r="5.5" fill="#10204d" stroke="#10204d" />
        <circle cx="131" cy="108" r="5.5" fill="#10204d" stroke="#10204d" />
        <path d="M112 120c6 4 12 4 18 0" stroke="#10204d" strokeWidth="3" />
        <path d="M103 123c-7 4-14 5-21 3" stroke="#10204d" strokeWidth="2" />
        <path d="M142 124c8 4 15 4 22 2" stroke="#10204d" strokeWidth="2" />
        <path d="M118 127c0 7-2 13-6 17" stroke="#f7a8b9" strokeWidth="4" />
        <path d="M112 144c5 3 10 4 15 4 9 0 16-3 23-8" stroke="#f7a8b9" strokeWidth="4" />
      </g>
      <g transform="translate(162 112)">
        <rect x="0" y="0" width="34" height="34" rx="17" fill="#0f5cff" />
        <circle cx="17" cy="17" r="7" fill="#ffffff" opacity="0.88" />
        <circle cx="17" cy="17" r="3" fill="#0f5cff" />
        <path d="M23 23 32 32" stroke="#0f5cff" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g transform="translate(178 126)">
        <path d="M0 0c10 6 16 16 18 28" stroke="#d7dcec" strokeWidth="3" />
        <path d="M18 28c3 7 8 12 16 14" stroke="#d7dcec" strokeWidth="3" />
      </g>
    </svg>
  );
}

function ProductSearchPill({ children }: { children: ReactNode }) {
  return <button type="button" className={styles.productsSearchPill}>{children}</button>;
}

function ProductTab({ active, children }: { active?: boolean; children: ReactNode }) {
  return (
    <button type="button" className={active ? styles.productsTabActive : styles.productsTab}>
      {children}
    </button>
  );
}

function ProductFormField({
  label,
  hint,
  className,
  children,
}: {
  label: ReactNode;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={className ? `${styles.productsFormField} ${className}` : styles.productsFormField}>
      <span className={styles.productsFormFieldLabel}>{label}</span>
      {children}
      {hint ? <span className={styles.productsFormFieldHint}>{hint}</span> : null}
    </label>
  );
}

function FieldInfoLabel({ label, tooltip }: { label: string; tooltip: string }) {
  return (
    <span className={styles.productsLabelWithInfo}>
      <span>{label}</span>
      <span className={styles.productsInfoTip} tabIndex={0} aria-label={tooltip}>
        <InfoIcon />
        <span className={styles.productsInfoTooltip}>{tooltip}</span>
      </span>
    </span>
  );
}

export function ProductsContent({ currentUser: _currentUser }: { currentUser: CurrentUser }) {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "form">("list");
  const [activeFormTab, setActiveFormTab] = useState<(typeof productFormTabs)[number]>("dados gerais");
  const [salePrice, setSalePrice] = useState("");
  const [promotionalPrice, setPromotionalPrice] = useState("");
  const tabs = useMemo(() => productTabs, []);

  if (view === "form") {
    return (
      <main className={styles.productsRoot}>
        <section className={styles.productsPage}>
          <header className={styles.productsTopBar}>
            <div className={styles.productsCrumbs}>
              <button type="button" className={styles.productsBackButton} onClick={() => setView("list")}>
                <BackIcon />
                voltar
              </button>
              <span>início</span>
              <span>cadastros</span>
              <strong>produtos</strong>
            </div>
          </header>

          <section className={styles.productsFormCard}>
            <h1 className={styles.productsFormTitle}>Novo produto</h1>

            <div className={styles.productsFormTabs} role="tablist" aria-label="Cadastro de produto">
              {productFormTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={tab === activeFormTab ? styles.productsFormTabActive : styles.productsFormTab}
                  onClick={() => setActiveFormTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeFormTab === "dados gerais" ? (
              <>
                <div className={styles.productsAiBanner}>
                  <span className={styles.productsAiBannerTag}>Novo</span>
                  <p className={styles.productsAiBannerText}>
                    Utilize o agente AI da DaBi Tech para
                    <button type="button" className={styles.productsAiBannerInlineButton}>
                      <SparkIcon />
                      sugerir o ncm
                    </button>
                    do produto
                  </p>
                  <button type="button" className={styles.productsAiBannerClose} aria-label="Ocultar">
                    <EyeOffIcon />
                  </button>
                </div>

                <div className={styles.productsFormSection}>
                  <div className={styles.productsFormGridTwo}>
                    <ProductFormField label="Tipo do Produto" hint=" ">
                      <select className={styles.field} defaultValue="Simples">
                        {productTypeOptions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </ProductFormField>
                    <ProductFormField label="Tipo do item SPED" hint="Utilizado na geração do SPED">
                      <select className={styles.field} defaultValue="Selecione">
                        {spedItemOptions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </ProductFormField>
                  </div>

                  <div className={styles.productsFormDivider} />

                  <div className={styles.productsFormGridTwo}>
                    <ProductFormField className={styles.productsFormFieldWide} label="Nome do produto" hint="Necessário para emissão de Nota Fiscal">
                      <input className={styles.field} placeholder="Descrição completa do produto" />
                    </ProductFormField>
                    <ProductFormField label="Código de barras (GTIN)" hint="Global Trade Item Number">
                      <input className={styles.field} placeholder="Código de barras" />
                    </ProductFormField>
                  </div>

                  <div className={styles.productsFormGridThree}>
                    <ProductFormField label="Origem do produto conforme ICMS" hint="Necessário para emissão de Nota Fiscal">
                      <select className={styles.field} defaultValue={icmsOriginOptions[0]}>
                        {icmsOriginOptions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </ProductFormField>
                    <ProductFormField label="Unidade de medida" hint="(Ex: Pc, Kg,...)">
                      <select className={styles.field} defaultValue="un">
                        {unitOptions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </ProductFormField>
                    <ProductFormField label="NCM - Nomenclatura comum do Mercosul" hint="Necessário para emissão de Nota Fiscal">
                      <div className={styles.productsNcmField}>
                        <input className={styles.field} placeholder="Exemplo: 1001.10.10" />
                        <button type="button" className={styles.productsInlineButton}>
                          <SparkIcon />
                          sugerir
                        </button>
                      </div>
                    </ProductFormField>
                  </div>

                  <div className={styles.productsFormGridTwo}>
                    <ProductFormField label="Código (SKU)" hint="Opcional">
                      <input className={styles.field} placeholder="Código (SKU) ou referência" />
                    </ProductFormField>
                    <ProductFormField label="Código CEST" hint="Código Especificador da Substituição Tributária">
                      <input className={styles.field} placeholder="(Exemplo: 01.003.00)" />
                    </ProductFormField>
                  </div>

                  <div className={styles.productsFormGridTwo}>
                    <ProductFormField label="Preço de venda">
                      <div className={styles.productsMoneyField}>
                        <span className={styles.productsMoneyPrefix}>R$</span>
                        <input
                          className={styles.field}
                          inputMode="numeric"
                          onChange={(event) => setSalePrice(formatBrazilianPriceInput(event.target.value))}
                          placeholder="0,00"
                          value={salePrice}
                        />
                      </div>
                    </ProductFormField>
                    <ProductFormField label="Preço promocional">
                      <div className={styles.productsMoneyField}>
                        <span className={styles.productsMoneyPrefix}>R$</span>
                        <input
                          className={styles.field}
                          inputMode="numeric"
                          onChange={(event) => setPromotionalPrice(formatBrazilianPriceInput(event.target.value))}
                          placeholder="0,00"
                          value={promotionalPrice}
                        />
                      </div>
                    </ProductFormField>
                  </div>
                </div>

                <div className={styles.productsFormDivider} />

                <div className={styles.productsPackagingLayout}>
                  <div className={styles.productsPackagingColumn}>
                    <h3 className={styles.productsPackagingTitle}>Dimensões e peso</h3>
                    <div className={styles.productsFormGridTwo}>
                      <ProductFormField label="Peso Líquido">
                        <div className={styles.productsUnitField}>
                          <input className={styles.field} placeholder="Em Kg" />
                          <span className={styles.productsUnitSuffix}>kg</span>
                        </div>
                      </ProductFormField>
                      <ProductFormField label="Peso Bruto">
                        <div className={styles.productsUnitField}>
                          <input className={styles.field} placeholder="Em Kg" />
                          <span className={styles.productsUnitSuffix}>kg</span>
                        </div>
                      </ProductFormField>
                    </div>

                    <div className={styles.productsPackagingGrid}>
                      <ProductFormField label="Tipo da embalagem">
                        <select className={styles.field} defaultValue="Pacote / Caixa">
                          {packagingTypeOptions.map((option) => (
                            <option key={option}>{option}</option>
                          ))}
                        </select>
                      </ProductFormField>
                      <ProductFormField label="Embalagem">
                        <select className={styles.field} defaultValue="Embalagem customizada">
                          <option>Embalagem customizada</option>
                          <option>Embalagem padrão</option>
                        </select>
                      </ProductFormField>
                    </div>

                    <div className={styles.productsFormGridThree}>
                      <ProductFormField label="Largura">
                        <div className={styles.productsUnitField}>
                          <input className={styles.field} placeholder="0,0" />
                          <span className={styles.productsUnitSuffix}>cm</span>
                        </div>
                      </ProductFormField>
                      <ProductFormField label="Altura">
                        <div className={styles.productsUnitField}>
                          <input className={styles.field} placeholder="0,0" />
                          <span className={styles.productsUnitSuffix}>cm</span>
                        </div>
                      </ProductFormField>
                      <ProductFormField label="Comprimento">
                        <div className={styles.productsUnitField}>
                          <input className={styles.field} placeholder="0,0" />
                          <span className={styles.productsUnitSuffix}>cm</span>
                        </div>
                      </ProductFormField>
                    </div>
                  </div>

                  <div className={styles.productsPackagingIllustration}>
                    <img alt="" aria-hidden="true" src="/pacote_caixa.svg" />
                  </div>
                </div>

                <div className={styles.productsFormDivider} />

                <div className={styles.productsSectionTitle}>Estoque</div>

                <div className={styles.productsStockGrid}>
                  <ProductFormField label="Controlar estoque">
                    <select className={styles.field} defaultValue="Sim">
                      {yesNoOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </ProductFormField>
                  <ProductFormField
                    className={styles.productsStockHintField}
                    label="Estoque inicial (Geral)"
                    hint="Informar se deseja lançar o estoque inicial do produto"
                  >
                    <div className={styles.productsUnitField}>
                      <input className={styles.field} placeholder="0" />
                      <span className={styles.productsUnitSuffix}>un</span>
                    </div>
                  </ProductFormField>
                  <ProductFormField
                    className={styles.productsStockHintField}
                    label="Estoque mínimo"
                    hint="Quantidade mínima do produto no estoque"
                  >
                    <div className={styles.productsUnitField}>
                      <input className={styles.field} placeholder="0" />
                      <span className={styles.productsUnitSuffix}>un</span>
                    </div>
                  </ProductFormField>
                  <ProductFormField
                    className={styles.productsStockHintField}
                    label="Estoque máximo"
                    hint="Quantidade máxima do produto no estoque"
                  >
                    <div className={styles.productsUnitField}>
                      <input className={styles.field} placeholder="0" />
                      <span className={styles.productsUnitSuffix}>un</span>
                    </div>
                  </ProductFormField>
                  <ProductFormField label="Sob encomenda">
                    <select className={styles.field} defaultValue="Não">
                      {yesNoOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </ProductFormField>
                  <ProductFormField label="Controlar lotes">
                    <select className={styles.field} defaultValue="Não">
                      {yesNoOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </ProductFormField>
                </div>

                <div className={styles.productsStockGridBottom}>
                  <ProductFormField label="Localização" hint="Localização física no estoque">
                    <input className={styles.field} placeholder="Ex: corredor A" />
                  </ProductFormField>
                  <ProductFormField
                    className={styles.productsStockDaysField}
                    label={<FieldInfoLabel label="Dias para preparação" tooltip="Quantos dias corridos você demora para disponibilizar o produto" />}
                  >
                    <input className={styles.field} placeholder="0" />
                  </ProductFormField>
                </div>

                <div className={styles.productsFormDivider} />

                <footer className={styles.productsFormActions}>
                  <button type="button" className={styles.productsPrimaryButton}>
                    salvar
                  </button>
                  <button type="button" className={styles.productsTextButton}>
                    cancelar
                  </button>
                </footer>
              </>
            ) : (
              <div className={styles.productsFormPlaceholder}>
                <h2>{activeFormTab}</h2>
                <p>Conteúdo desta aba em construção.</p>
              </div>
            )}
          </section>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.productsRoot}>
      <section className={styles.productsPage}>
        <header className={styles.productsTopBar}>
          <div className={styles.productsCrumbs}>
            <span>início</span>
            <span>cadastros</span>
            <strong>produtos</strong>
          </div>
          <div className={styles.productsActions}>
            <button type="button" className={styles.productsPrimaryButton} onClick={() => setView("form")}>
              incluir produto
            </button>
            <button type="button" className={styles.productsGhostButton}>
              ações
            </button>
          </div>
        </header>

        <section className={styles.productsToolbar}>
          <h1>Produtos</h1>
          <div className={styles.productsSearchRow}>
            <input
              className={styles.productsSearchInput}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Pesquise por nome, código (SKU) ou GTIN/EAN"
              type="search"
              value={search}
            />
            <button type="button" className={styles.productsToolButton} aria-label="Buscar">
              <SearchIcon />
            </button>
            <button type="button" className={styles.productsToolButton} aria-label="Filtros">
              <FilterIcon />
            </button>
            <ProductSearchPill>nome</ProductSearchPill>
            <ProductSearchPill>produtos ativos</ProductSearchPill>
            <ProductSearchPill>filtros</ProductSearchPill>
            <button type="button" className={styles.productsClearButton}>
              limpar filtros
            </button>
          </div>
        </section>

        <div className={styles.productsTabs} role="tablist" aria-label="Tipos de produto">
          {tabs.map((tab, index) => (
            <ProductTab key={tab} active={index === 0}>
              {tab}
            </ProductTab>
          ))}
        </div>

        <section className={styles.productsEmptyState}>
          <div className={styles.productsEmptyCard}>
            <div className={styles.productsEmptyCopy}>
              <h2>Sua pesquisa não retornou resultados.</h2>
              <p>Tente outras opções de pesquisa, tipos de produtos ou remova os filtros.</p>
              <div className={styles.productsEmptyActions}>
                <button type="button" className={styles.productsPrimaryButton}>
                  alterar pesquisa
                </button>
                <button type="button" className={styles.productsTextButton}>
                  limpar filtros
                </button>
              </div>
            </div>
            <div className={styles.productsEmptyCatWrap}>
              <ProductEmptyStateCat />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
