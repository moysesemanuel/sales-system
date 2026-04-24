"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { CurrentUser } from "./types";
import styles from "./landing-page.module.css";

type ContactFormTab = "dados gerais" | "dados complementares" | "anexos" | "observações";

const contactTypeOptions = [
  "Cliente",
  "Fornecedor",
  "Transportador",
  "Outro",
  "Criar novo tipo de contato",
];

const ufOptions = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

const tributaryRegimeOptions = [
  "Não informado",
  "Simples Nacional",
  "Regime Normal",
  "MEI",
];

const crmStatusOptions = ["Cliente", "Inativo", "Lead", "Prospect"];
const contributorOptions = [
  "9 - Não Contribuinte, que",
  "1 - Contribuinte ICMS",
  "2 - Contribuinte isento",
];

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
      <path
        d="M4 6h16M7 12h10M10 18h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
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
      <path d="M12.5 4.75 7.25 10l5.25 5.25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <path d="M10 14V6m0 0-3 3m3-3 3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 15.25h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function EmptyStateCat() {
  return (
    <svg viewBox="0 0 220 170" role="img" aria-label="Nenhum registro encontrado" focusable="false">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M114 30c8-12 22-18 35-15-2 6-1 12 5 18 5 5 12 8 18 8-8 12-19 18-31 18-18 0-33-11-27-29Z"
          fill="#d9dde8"
          stroke="#d9dde8"
        />
        <path
          d="M118 34c-15-4-28 0-38 10-10 10-15 24-14 39 2 26 20 46 47 52 17 4 34 0 48-10 17-12 26-29 25-48 0-12-5-24-13-33"
          fill="#f1f3fb"
          stroke="#d8dced"
          strokeWidth="3"
        />
        <path d="M88 79 68 58M92 70 78 48M140 80 159 59M137 69 150 47" stroke="#d8dced" strokeWidth="3" />
        <ellipse cx="103" cy="108" rx="6" ry="5" fill="#10204d" stroke="#10204d" />
        <ellipse cx="129" cy="108" rx="6" ry="5" fill="#10204d" stroke="#10204d" />
        <path d="M111 119c6 4 12 4 18 0" stroke="#10204d" strokeWidth="3" />
        <path d="M101 122c-7 4-14 5-21 3" stroke="#10204d" strokeWidth="2" />
        <path d="M140 124c8 4 15 4 22 2" stroke="#10204d" strokeWidth="2" />
        <path d="M117 126c0 7-2 13-6 17" stroke="#f7a8b9" strokeWidth="4" />
        <path d="M111 143c5 3 10 4 15 4 9 0 16-3 23-8" stroke="#f7a8b9" strokeWidth="4" />
      </g>
      <g transform="translate(160 114)">
        <rect x="0" y="0" width="26" height="16" rx="4" fill="#0f5cff" />
        <rect x="8" y="-10" width="10" height="12" rx="2" fill="#d9dde8" />
        <path d="M13 6v16" stroke="#d9dde8" strokeWidth="3" />
        <path d="M13 22c8 0 14 4 20 10" stroke="#d9dde8" strokeWidth="3" />
      </g>
    </svg>
  );
}

function SelectField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className={styles.customersSuppliersField}>
      <span className={styles.customersSuppliersFieldLabel}>{label}</span>
      {children}
    </label>
  );
}

export function CustomersSuppliersContent({ currentUser }: { currentUser: CurrentUser }) {
  const [view, setView] = useState<"list" | "form">("list");
  const [activeTab, setActiveTab] = useState<ContactFormTab>("dados gerais");

  const tabs = useMemo(
    () => ["dados gerais", "dados complementares", "anexos", "observações"] as ContactFormTab[],
    [],
  );

  const formBody = (
    <section className={styles.customersSuppliersFormCard}>
      <div className={styles.customersSuppliersFormTabs} role="tablist" aria-label="Cadastro de contato">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={tab === activeTab ? styles.customersSuppliersFormTabActive : styles.customersSuppliersFormTab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "dados gerais" ? (
        <div className={styles.customersSuppliersFormSection}>
          <div className={styles.customersSuppliersFormSectionBlock}>
            <h2 className={styles.customersSuppliersSectionTitle}>Dados gerais</h2>
            <div className={styles.customersSuppliersFormGrid}>
              <SelectField label="Tipo de contato">
                <select className={styles.field} defaultValue="Cliente">
                  {contactTypeOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </SelectField>
              <SelectField label="UF">
                <select className={styles.field} defaultValue="PR">
                  {ufOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </SelectField>
            </div>

            <div className={styles.customersSuppliersFormGrid}>
              <SelectField label="Tipo de pessoa">
                <select className={styles.field} defaultValue="Pessoa Jurídica">
                  <option>Pessoa Jurídica</option>
                  <option>Pessoa Física</option>
                </select>
              </SelectField>
              <label className={styles.customersSuppliersField}>
                <span className={styles.customersSuppliersFieldLabel}>CNPJ</span>
                <input className={styles.field} placeholder="00.000.000/0000-00" />
              </label>
            </div>

            <div className={styles.customersSuppliersFormGrid}>
              <label className={styles.customersSuppliersField}>
                <span className={styles.customersSuppliersFieldLabel}>Nome</span>
                <input className={styles.field} placeholder="Nome ou Razão Social do contato" />
              </label>
              <label className={styles.customersSuppliersField}>
                <span className={styles.customersSuppliersFieldLabel}>Fantasia</span>
                <input className={styles.field} placeholder="Nome fantasia" />
              </label>
            </div>

            <div className={styles.customersSuppliersFormGrid}>
              <label className={styles.customersSuppliersField}>
                <span className={styles.customersSuppliersFieldLabel}>Código</span>
                <input className={styles.field} placeholder="Opcional" />
              </label>
              <label className={styles.customersSuppliersField}>
                <span className={styles.customersSuppliersFieldLabel}>Inscrição Estadual</span>
                <input className={styles.field} placeholder="Inscrição Estadual" />
              </label>
            </div>

            <div className={styles.customersSuppliersFormGrid}>
              <SelectField label="Contribuinte">
                <select className={styles.field} defaultValue="9 - Não Contribuinte, que">
                  {contributorOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </SelectField>
              <label className={styles.customersSuppliersField}>
                <span className={styles.customersSuppliersFieldLabel}>Inscrição Municipal</span>
                <input className={styles.field} placeholder="Inscrição Municipal" />
              </label>
            </div>
          </div>

          <div className={styles.customersSuppliersFormSectionDivider} />

          <div className={styles.customersSuppliersFormSectionBlock}>
            <h2 className={styles.customersSuppliersSectionTitle}>Endereço</h2>
            <div className={styles.customersSuppliersAddressGrid}>
              <label className={styles.customersSuppliersField}>
                <span className={styles.customersSuppliersFieldLabel}>CEP</span>
                <input className={styles.field} placeholder="00000-000" />
              </label>
              <label className={styles.customersSuppliersField}>
                <span className={styles.customersSuppliersFieldLabel}>Município</span>
                <input className={styles.field} placeholder="Município" />
              </label>
              <SelectField label="UF">
                <select className={styles.field} defaultValue="PR">
                  {ufOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </SelectField>
            </div>

            <label className={styles.customersSuppliersField}>
              <span className={styles.customersSuppliersFieldLabel}>Endereço</span>
              <input className={styles.field} placeholder="Endereço" />
            </label>

            <div className={styles.customersSuppliersAddressGrid}>
              <label className={styles.customersSuppliersField}>
                <span className={styles.customersSuppliersFieldLabel}>Bairro</span>
                <input className={styles.field} placeholder="Bairro" />
              </label>
              <label className={styles.customersSuppliersField}>
                <span className={styles.customersSuppliersFieldLabel}>Número</span>
                <input className={styles.field} placeholder="Número" />
              </label>
              <label className={styles.customersSuppliersField}>
                <span className={styles.customersSuppliersFieldLabel}>Complemento</span>
                <input className={styles.field} placeholder="Complemento" />
              </label>
            </div>

            <label className={styles.customersSuppliersCheckboxRow}>
              <input type="checkbox" />
              <span>Possui endereço de cobrança diferente do endereço principal</span>
            </label>
          </div>

          <div className={styles.customersSuppliersFormSectionDivider} />

          <div className={styles.customersSuppliersFormSectionBlock}>
            <h2 className={styles.customersSuppliersSectionTitle}>Contato</h2>
            <div className={styles.customersSuppliersAddressGrid}>
              <label className={styles.customersSuppliersField}>
                <span className={styles.customersSuppliersFieldLabel}>Telefone</span>
                <input className={styles.field} placeholder="Telefone" />
              </label>
              <label className={styles.customersSuppliersField}>
                <span className={styles.customersSuppliersFieldLabel}>Telefone Adicional</span>
                <input className={styles.field} placeholder="Telefone Adicional" />
              </label>
              <label className={styles.customersSuppliersField}>
                <span className={styles.customersSuppliersFieldLabel}>Celular</span>
                <input className={styles.field} placeholder="Celular" />
              </label>
            </div>

            <div className={styles.customersSuppliersAddressGrid}>
              <label className={styles.customersSuppliersField}>
                <span className={styles.customersSuppliersFieldLabel}>WebSite</span>
                <input className={styles.field} placeholder="WebSite" />
              </label>
              <label className={styles.customersSuppliersField}>
                <span className={styles.customersSuppliersFieldLabel}>E-mail</span>
                <input className={styles.field} placeholder="E-mail" />
              </label>
              <label className={styles.customersSuppliersField}>
                <span className={styles.customersSuppliersFieldLabel}>E-mail para envio de NFE</span>
                <input className={styles.field} placeholder="E-mail para envio de NFE" />
              </label>
            </div>

            <label className={styles.customersSuppliersField}>
              <span className={styles.customersSuppliersFieldLabel}>Observações do contato</span>
              <textarea className={styles.customersSuppliersTextarea} rows={4} />
            </label>
          </div>

          <div className={styles.customersSuppliersFormSectionDivider} />

          <div className={styles.customersSuppliersFormSectionBlock}>
            <div className={styles.customersSuppliersPeopleHeader}>
              <h2 className={styles.customersSuppliersSectionTitle}>Pessoas de Contato</h2>
              <button className={styles.customersSuppliersAddLink} type="button">
                <PlusIcon />
                adicionar contato
              </button>
            </div>
            <div className={styles.customersSuppliersPeopleTable}>
              <div className={styles.customersSuppliersPeopleColumns}>
                <span>Nome</span>
                <span>Setor</span>
                <span>Email</span>
                <span>Telefone</span>
                <span>Ramal</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {activeTab === "dados complementares" ? (
        <div className={styles.customersSuppliersFormSection}>
          <div className={styles.customersSuppliersFormGrid}>
            <SelectField label="Código de regime tributário">
              <select className={styles.field} defaultValue="Não informado">
                {tributaryRegimeOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </SelectField>
            <label className={styles.customersSuppliersField}>
              <span className={styles.customersSuppliersFieldLabel}>Inscrição Suframa</span>
              <input className={styles.field} placeholder="Inscrição Suframa" />
            </label>
          </div>

          <div className={styles.customersSuppliersFormGrid}>
            <SelectField label="Status no CRM">
              <select className={styles.field} defaultValue="Cliente">
                {crmStatusOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </SelectField>
            <label className={styles.customersSuppliersField}>
              <span className={styles.customersSuppliersFieldLabel}>Vendedor</span>
              <input className={styles.field} placeholder="Vendedor padrão para este cliente" />
            </label>
          </div>

          <div className={styles.customersSuppliersFormGrid}>
            <label className={styles.customersSuppliersField}>
              <span className={styles.customersSuppliersFieldLabel}>Condição de pagamento</span>
              <input className={styles.field} placeholder="30 60, 3x ou 15 + 2x" />
            </label>
            <label className={styles.customersSuppliersField}>
              <span className={styles.customersSuppliersFieldLabel}>Data de criação</span>
              <input className={styles.field} type="date" />
            </label>
          </div>
        </div>
      ) : null}

      {activeTab === "anexos" ? (
        <div className={styles.customersSuppliersFormSection}>
          <button type="button" className={styles.customersSuppliersUploadButton}>
            <UploadIcon />
            <span>procurar arquivo</span>
          </button>
          <p className={styles.customersSuppliersHelperText}>O tamanho do arquivo não deve ultrapassar 2Mb</p>
        </div>
      ) : null}

      {activeTab === "observações" ? (
        <div className={styles.customersSuppliersFormSection}>
          <label className={styles.customersSuppliersField}>
            <span className={styles.customersSuppliersFieldLabel}>Observações</span>
            <textarea className={styles.customersSuppliersTextarea} rows={5} />
          </label>
        </div>
      ) : null}

      <div className={styles.customersSuppliersFormActions}>
        <button type="button" className={styles.customersSuppliersPrimaryButton}>
          salvar
        </button>
        <button type="button" className={styles.customersSuppliersTextButton} onClick={() => setView("list")}>
          cancelar
        </button>
      </div>
    </section>
  );

  return (
    <main className={styles.customersSuppliersRoot}>
      <section className={styles.customersSuppliersPage}>
        <header className={styles.customersSuppliersTopBar}>
          <div className={styles.customersSuppliersCrumbs}>
            {view === "form" ? (
              <button type="button" className={styles.customersSuppliersBackButton} onClick={() => setView("list")}>
                <BackIcon />
                voltar
              </button>
            ) : null}
            <span>início</span>
            <span>cadastros</span>
            <strong>clientes e fornecedores</strong>
          </div>

          <div className={styles.customersSuppliersActions}>
            <button type="button" className={styles.customersSuppliersGhostButton}>
              imprimir
            </button>
            <button type="button" className={styles.customersSuppliersPrimaryButton} onClick={() => setView("form")}>
              incluir cadastro
            </button>
            <button type="button" className={styles.customersSuppliersGhostButton}>
              mais ações
            </button>
          </div>
        </header>

        {view === "list" ? (
          <>
            <section className={styles.customersSuppliersToolbar}>
              <h1>Clientes e Fornecedores</h1>
              <div className={styles.customersSuppliersSearchRow}>
                <input
                  className={styles.customersSuppliersSearchInput}
                  placeholder="Pesquise por nome, cód., fantasia, email ou CPF/CNPJ"
                  type="search"
                />
                <button type="button" className={styles.customersSuppliersToolButton} aria-label="Buscar">
                  <SearchIcon />
                </button>
                <button type="button" className={styles.customersSuppliersToolButton} aria-label="Filtros">
                  <FilterIcon />
                </button>
                <button type="button" className={styles.customersSuppliersPillButton}>
                  por data do cadastro
                </button>
                <button type="button" className={styles.customersSuppliersPillButton}>
                  nome
                </button>
                <button type="button" className={styles.customersSuppliersPillButton}>
                  por situação
                </button>
                <button type="button" className={styles.customersSuppliersPillButton}>
                  filtros
                </button>
              </div>
            </section>

            <div className={styles.customersSuppliersTabs} role="tablist" aria-label="Tipos de cadastro">
              {["todos", "cliente", "fornecedor", "transportador", "outro"].map((tab, index) => (
                <button
                  key={tab}
                  className={index === 0 ? styles.customersSuppliersTabActive : styles.customersSuppliersTab}
                  type="button"
                >
                  {tab}
                </button>
              ))}
            </div>

            <section className={styles.customersSuppliersEmptyState}>
              <div className={styles.customersSuppliersEmptyCard}>
                <div className={styles.customersSuppliersEmptyText}>
                  <h2>Nenhum registro encontrado</h2>
                  <p>Nenhum registro foi encontrado.</p>
                </div>
                <div className={styles.customersSuppliersCatWrap}>
                  <EmptyStateCat />
                </div>
              </div>
            </section>
          </>
        ) : (
          formBody
        )}
      </section>
    </main>
  );
}
