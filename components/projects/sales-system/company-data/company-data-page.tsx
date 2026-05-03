"use client";

import { useState } from "react";
import styles from "./company-data-page.module.css";
import type { CurrentUser } from "../types";
function UploadArrowIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path
                d="M8 11V4.8M8 4.8 5.6 7.2M8 4.8l2.4 2.4M3.5 11.8v.7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-.7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ExternalLinkIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path
                d="M9.5 3.5h3v3M8.2 7.8l4.3-4.3M6.5 4.5h-2A1.5 1.5 0 0 0 3 6v5.5A1.5 1.5 0 0 0 4.5 13h5.5a1.5 1.5 0 0 0 1.5-1.5v-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function TrashIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
        >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
        </svg>
    );
}

type CompanyDataPageProps = {
    currentUser: CurrentUser;
};

type CompanyDataFormState = {
    corporateName: string;
    tradeName: string;
    address: string;
    number: string;
    district: string;
    complement: string;
    city: string;
    zipCode: string;
    state: string;
    phone: string;
    fax: string;
    mobile: string;
    email: string;
    website: string;
    businessSegment: string;
    personType: string;
    cnpj: string;
    stateRegistration: string;
    stateRegistrationExempt: boolean;
    municipalRegistration: string;
    cnae: string;
    taxRegime: string;
    substituteTaxState: string;
    substituteTaxRegistration: string;
    contactName: string;
    preferredChannel: string;
    adminName: string;
    adminEmail: string;
    adminMobile: string;
};

const initialState: CompanyDataFormState = {
    corporateName: "57.936.721 MOYSES EMANUEL COSTA SILVA",
    tradeName: "",
    address: "RUA FREDERICO MAURER",
    number: "2787",
    district: "BOQUEIRAO",
    complement: "CASA 4",
    city: "Curitiba",
    zipCode: "81.670-020",
    state: "PR",
    phone: "",
    fax: "",
    mobile: "(41) 92003-8570",
    email: "mecs.cwb@gmail.com",
    website: "",
    businessSegment: "",
    personType: "Pessoa Jurídica",
    cnpj: "57.936.721/0001-25",
    stateRegistration: "",
    stateRegistrationExempt: false,
    municipalRegistration: "",
    cnae: "6203-1/00",
    taxRegime: "Simples nacional",
    substituteTaxState: "",
    substituteTaxRegistration: "",
    contactName: "Moyses Emanuel",
    preferredChannel: "E-mail",
    adminName: "",
    adminEmail: "",
    adminMobile: "",
};

export function CompanyDataPage({ currentUser: _currentUser }: CompanyDataPageProps) {
    const [form, setForm] = useState<CompanyDataFormState>(initialState);

    const handleChange =
        (field: keyof CompanyDataFormState) =>
            (
                event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
            ) => {
                const value =
                    event.target instanceof HTMLInputElement && event.target.type === "checkbox"
                        ? event.target.checked
                        : event.target.value;

                setForm((prev) => ({
                    ...prev,
                    [field]: value,
                }));
            };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Salvar dados da empresa:", form);
    };

    return (
        <section className={styles.contentSection}>
            <div className={styles.contentHeaderRow}>
                <div className={styles.headerLeft}>
                    <button type="button" className={styles.backPillButton}>
                        voltar
                    </button>

                    <p className={styles.breadcrumb}>
                        início <span className={styles.breadcrumbSeparator}>=</span> configurações{" "}
                        <span className={styles.breadcrumbCurrent}>dados da empresa</span>
                    </p>
                </div>
            </div>

            <div className={styles.guideBanner}>
                <div className={styles.guideBannerLeft}>
                    <span className={styles.guideBannerIcon}>＋</span>
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
                <h1 className={styles.pageTitle}>Dados da empresa</h1>
                <p className={styles.pageSubtitle}>
                    Para facilitar o preenchimento dos dados, o ERP pode realizar consultas à Receita
                    Federal através do CNPJ.
                </p>
                <div className={styles.pageDivider} />

                <section className={styles.companyCardSection}>

                    <div className={styles.companyGridStack}>
                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Razão social</label>
                            <input
                                className={styles.fieldInput}
                                value={form.corporateName}
                                onChange={handleChange("corporateName")}
                            />
                            <span className={styles.fieldHint}>Nome completo da empresa</span>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Fantasia</label>
                            <input
                                className={styles.fieldInput}
                                value={form.tradeName}
                                onChange={handleChange("tradeName")}
                            />
                            <span className={styles.fieldHint}>
                                Nome fantasia da empresa (será exibido no topo das telas do sistema)
                            </span>
                        </div>
                    </div>

                    <div className={styles.companyGridAddress}>
                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Endereço</label>
                            <input
                                className={styles.fieldInput}
                                value={form.address}
                                onChange={handleChange("address")}
                            />
                            <span className={styles.fieldHint}>
                                Endereço completo. (Exemplo: Rua Assis Brasil)
                            </span>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Número</label>
                            <input
                                className={styles.fieldInput}
                                value={form.number}
                                onChange={handleChange("number")}
                            />
                        </div>
                    </div>

                    <div className={styles.companyGrid2}>
                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Bairro</label>
                            <input
                                className={styles.fieldInput}
                                value={form.district}
                                onChange={handleChange("district")}
                            />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Complemento</label>
                            <input
                                className={styles.fieldInput}
                                value={form.complement}
                                onChange={handleChange("complement")}
                            />
                        </div>
                    </div>

                    <div className={styles.companyGridCity}>
                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Cidade</label>
                            <input
                                className={styles.fieldInput}
                                value={form.city}
                                onChange={handleChange("city")}
                            />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>CEP</label>
                            <input
                                className={styles.fieldInput}
                                value={form.zipCode}
                                onChange={handleChange("zipCode")}
                            />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>UF</label>
                            <select
                                className={styles.selectField}
                                value={form.state}
                                onChange={handleChange("state")}
                            >
                                <option value="PR">PR</option>
                                <option value="SC">SC</option>
                                <option value="SP">SP</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.companyGrid3}>
                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Fone</label>
                            <input className={styles.fieldInput} value={form.phone} onChange={handleChange("phone")} />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Fax</label>
                            <input className={styles.fieldInput} value={form.fax} onChange={handleChange("fax")} />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Celular</label>
                            <input
                                className={styles.fieldInput}
                                value={form.mobile}
                                onChange={handleChange("mobile")}
                            />
                        </div>
                    </div>

                    <div className={styles.companyGrid2}>
                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>E-mail</label>
                            <input className={styles.fieldInput} value={form.email} onChange={handleChange("email")} />
                            <span className={styles.fieldHint}>Exemplo: joao@olist.com.br</span>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>WebSite</label>
                            <input
                                className={styles.fieldInput}
                                value={form.website}
                                onChange={handleChange("website")}
                            />
                            <span className={styles.fieldHint}>
                                Página na web. (Exemplo: www.olist.com.br)
                            </span>
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.fieldLabel}>Segmento de atuação</label>
                        <select
                            className={styles.selectField}
                            value={form.businessSegment}
                            onChange={handleChange("businessSegment")}
                        >
                            <option value="">Selecione</option>
                            <option value="Comércio">Acessórios para veículos</option>
                            <option value="Alimentos e Bebidas">Alimentos e Bebidas</option>
                            <option value="Animais">Animais</option>
                            <option value="Antiguidades e Colecionáveis">Antiguidades e Colecionáveis</option>
                            <option value="Artes (Manufaturados)">Artes (Manufaturados)</option>
                            <option value="Beleza e Cuidados Pessoais">Beleza e Cuidados Pessoais</option>
                            <option value="Brinquedos e Hobbies">Brinquedos e Hobbies</option>
                            <option value="Calçados, Roupas e Bolsas">Calçados, Roupas e Bolsas</option>
                            <option value="Câmeras e Acessórios">Câmeras e Acessórios</option>
                            <option value="Carros, Motos e Outros">Carros, Motos e Outros</option>
                            <option value="Casa, Móveis e Decoração">Casa, Móveis e Decoração</option>
                            <option value="Celulares e Telefones">Celulares e Telefones</option>
                            <option value="Eletrodomésticos">Eletrodomésticos</option>
                            <option value="Eletrônicos, Áudio e Vídeo">Eletrônicos, Áudio e Vídeo</option>
                            <option value="Esportes e Fitness">Esportes e Fitness</option>
                            <option value="Ferramentas e Construção">Ferramentas e Construção</option>
                            <option value="Festas e Lembrancinhas">Festas e Lembrancinhas</option>
                            <option value="Games">Games</option>
                            <option value="Imóveis">Imóveis</option>
                            <option value="Industria e Comércio">Industria e Comércio</option>
                            <option value="Informática">Informática</option>
                            <option value="Ingressos">Ingressos</option>
                            <option value="Instrumentos musicais">Instrumentos musicais</option>
                            <option value="Joias e Relógios">Joias e Relógios</option>
                            <option value="Livros, Revistas e Comics">Livros, Revistas e Comics</option>
                            <option value="Música, Filmes e Seriados">Música, Filmes e Seriados</option>
                            <option value="Papelaria">Papelaria</option>
                            <option value="Produtos Agro">Produtos Agro</option>
                            <option value="Produtos para bebês">Produtos para bebês</option>
                            <option value="Saúde">Saúde</option>
                            <option value="Serviços">Serviços</option>
                            <option value="Outros">Outros</option>
                        </select>
                    </div>
                </section>

                <div className={styles.sectionDivider} />

                <section className={styles.companyCardSection}>
                    
                    <div className={styles.companyGridFiscal}>
                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Tipo da Pessoa</label>
                            <select
                                className={styles.selectField}
                                value={form.personType}
                                onChange={handleChange("personType")}
                            >
                                <option>Pessoa Jurídica</option>
                                <option>Pessoa Física</option>
                            </select>
                            <span className={styles.fieldHint}>Pessoa Física ou Pessoa Jurídica</span>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>CNPJ</label>
                            <input className={styles.fieldInput} value={form.cnpj} onChange={handleChange("cnpj")} />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Inscrição Estadual</label>
                            <input
                                className={styles.fieldInput}
                                value={form.stateRegistration}
                                onChange={handleChange("stateRegistration")}
                            />
                            <span className={styles.fieldHint}>Inscrição Estadual do estabelecimento</span>
                        </div>

                        <label className={styles.companyCheckboxInline}>
                            <input
                                type="checkbox"
                                checked={form.stateRegistrationExempt}
                                onChange={handleChange("stateRegistrationExempt")}
                            />
                            <span>IE Isento</span>
                        </label>
                    </div>

                    <div className={styles.companyGrid3}>
                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Inscrição Municipal</label>
                            <input
                                className={styles.fieldInput}
                                value={form.municipalRegistration}
                                onChange={handleChange("municipalRegistration")}
                            />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>CNAE</label>
                            <input className={styles.fieldInput} value={form.cnae} onChange={handleChange("cnae")} />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Código de regime tributário</label>
                            <select
                                className={styles.selectField}
                                value={form.taxRegime}
                                onChange={handleChange("taxRegime")}
                            >
                                <option>Simples nacional</option>
                                <option>Lucro presumido</option>
                                <option>Lucro real</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.companyInlineActions}>
                        <button type="button" className={styles.linkButton}>
                            Alterar senha
                        </button>
                    </div>
                </section>

                <div className={styles.sectionDivider} />

                <section className={styles.companyCardSection}>
                    <div className={styles.companySectionIntro}>
                        <h2 className={styles.formSectionTitle}>
                            Inscrições Estaduais dos Substitutos Tributários
                        </h2>
                    </div>

                    <div className={styles.companyGridStateRegistration}>
                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Estado</label>
                            <select
                                className={styles.selectField}
                                value={form.substituteTaxState}
                                onChange={handleChange("substituteTaxState")}
                            >
                                <option value="">Selecione</option>
                                <option value="PR">PR</option>
                                <option value="SC">SC</option>
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Inscrição Estadual</label>
                            <input
                                className={styles.fieldInput}
                                value={form.substituteTaxRegistration}
                                onChange={handleChange("substituteTaxRegistration")}
                            />
                        </div>

                        <button
                            type="button"
                            className={styles.inputActionCircleOutside}
                            aria-label="Excluir inscrição estadual"
                        >
                            <TrashIcon />
                        </button>
                    </div>

                    <div className={styles.companyInlineActions}>
                        <button type="button" className={styles.linkButton}>
                            + adicionar outra inscrição
                        </button>
                    </div>
                </section>

                <div className={styles.sectionDivider} />

                <section className={styles.companyCardSection}>
                    <div className={styles.companySectionIntro}>
                        <h2 className={styles.formSectionTitle}>
                            Dados de cobrança utilizados pelo ERP da Olist
                        </h2>
                        <p className={styles.sectionDescription}>
                            Configurar dados utilizados pela Olist para gerar os boletos e as notas de serviço.
                        </p>
                    </div>

                    <div className={styles.companyActionCard}>
                        <a href="#" className={styles.inlineLinkAction}>
                            <span>alterar dados de cobrança</span>
                            <span className={styles.inlineLinkIcon} aria-hidden="true">
                                <ExternalLinkIcon />
                            </span>
                        </a>
                    </div>
                </section>

                <div className={styles.sectionDivider} />

                <section className={styles.companyCardSection}>
                    <div className={styles.companySectionIntro}>
                        <h2 className={styles.formSectionTitle}>Logo da empresa</h2>
                        <p className={styles.sectionDescription}>
                            Seu logo será exibido nas suas Notas Fiscais, pedidos, propostas, etc.
                        </p>
                    </div>

                    <div className={styles.companyUploadArea}>
                        <button type="button" className={styles.secondaryActionButton}>
                            <span className={styles.buttonIconCircle} aria-hidden="true">
                                <UploadArrowIcon />
                            </span>
                            <span>procurar arquivo</span>
                        </button>
                        <p className={styles.fieldHint}>O tamanho do arquivo não deve ultrapassar 2Mb</p>
                    </div>
                </section>

                <div className={styles.sectionDivider} />

                <section className={styles.companyCardSection}>
                    <div className={styles.companySectionIntro}>
                        <h2 className={styles.formSectionTitle}>
                            Preferências de Contato utilizados pelo ERP da Olist
                        </h2>
                        <p className={styles.sectionDescription}>
                            Essa será a forma de contato que preferencialmente entraremos em contato com você.
                        </p>
                    </div>

                    <div className={styles.companyGrid2}>
                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Como deseja ser chamado</label>
                            <input
                                className={styles.fieldInput}
                                value={form.contactName}
                                onChange={handleChange("contactName")}
                            />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Canal de Comunicação</label>
                            <select
                                className={styles.selectField}
                                value={form.preferredChannel}
                                onChange={handleChange("preferredChannel")}
                            >
                                <option>E-mail</option>
                                <option>WhatsApp</option>
                                <option>Telefone</option>
                            </select>
                        </div>
                    </div>
                </section>

                <div className={styles.sectionDivider} />

                <section className={styles.companyCardSection}>
                    <div className={styles.companySectionIntro}>
                        <h2 className={styles.formSectionTitle}>Pessoa administradora da empresa</h2>
                    </div>

                    <div className={styles.companyGrid3}>
                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Nome do sócio administrador</label>
                            <input
                                className={styles.fieldInput}
                                value={form.adminName}
                                onChange={handleChange("adminName")}
                            />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>E-mail</label>
                            <input
                                className={styles.fieldInput}
                                value={form.adminEmail}
                                onChange={handleChange("adminEmail")}
                            />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Celular</label>
                            <input
                                className={styles.fieldInput}
                                value={form.adminMobile}
                                onChange={handleChange("adminMobile")}
                            />
                        </div>
                    </div>
                </section>

                <div className={styles.formFooter}>
                    <button type="submit" className={styles.primaryActionButton}>
                        salvar
                    </button>
                    <button type="button" className={styles.textButton}>
                        cancelar
                    </button>
                </div>
            </div>
        </section>
    );
}