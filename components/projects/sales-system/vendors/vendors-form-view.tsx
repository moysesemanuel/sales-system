"use client";

import type { Dispatch, SetStateAction } from "react";
import { ContactsProfileSelect } from "./contacts-profile-select";
import {
  comissionamentoRegraOptions,
  contribuinteOptions,
  depositoOptions,
  modulosOptions,
  tipoPessoaOptions,
} from "./constants";
import { CEPButton, CnpjButton } from "./vendors-ui";
import styles from "../landing-page.module.css";

type VendorsFormViewProps = {
  tipoPessoa: (typeof tipoPessoaOptions)[number];
  setTipoPessoa: (value: (typeof tipoPessoaOptions)[number]) => void;
  contribuinte: (typeof contribuinteOptions)[number];
  setContribuinte: (value: (typeof contribuinteOptions)[number]) => void;
  deposito: (typeof depositoOptions)[number];
  setDeposito: (value: (typeof depositoOptions)[number]) => void;
  restricaoHorario: boolean;
  setRestricaoHorario: (value: boolean) => void;
  restricaoIp: boolean;
  setRestricaoIp: (value: boolean) => void;
  periodoManha: boolean;
  setPeriodoManha: (value: boolean) => void;
  periodoTarde: boolean;
  setPeriodoTarde: (value: boolean) => void;
  periodoNoite: boolean;
  setPeriodoNoite: (value: boolean) => void;
  diaSegunda: boolean;
  setDiaSegunda: (value: boolean) => void;
  diaTerca: boolean;
  setDiaTerca: (value: boolean) => void;
  diaQuarta: boolean;
  setDiaQuarta: (value: boolean) => void;
  diaQuinta: boolean;
  setDiaQuinta: (value: boolean) => void;
  diaSexta: boolean;
  setDiaSexta: (value: boolean) => void;
  diaSabado: boolean;
  setDiaSabado: (value: boolean) => void;
  diaDomingo: boolean;
  setDiaDomingo: (value: boolean) => void;
  perfisContato: string[];
  setPerfisContato: Dispatch<SetStateAction<string[]>>;
  ipInput: string;
  setIpInput: (value: string) => void;
  ips: string[];
  setIps: Dispatch<SetStateAction<string[]>>;
  regraComissao: (typeof comissionamentoRegraOptions)[number];
  setRegraComissao: (value: (typeof comissionamentoRegraOptions)[number]) => void;
  tipoComissao: "fixa" | "descontos";
  setTipoComissao: (value: "fixa" | "descontos") => void;
  onBack: () => void;
};

export function VendorsFormView({
  tipoPessoa,
  setTipoPessoa,
  contribuinte,
  setContribuinte,
  deposito,
  setDeposito,
  restricaoHorario,
  setRestricaoHorario,
  restricaoIp,
  setRestricaoIp,
  periodoManha,
  setPeriodoManha,
  periodoTarde,
  setPeriodoTarde,
  periodoNoite,
  setPeriodoNoite,
  diaSegunda,
  setDiaSegunda,
  diaTerca,
  setDiaTerca,
  diaQuarta,
  setDiaQuarta,
  diaQuinta,
  setDiaQuinta,
  diaSexta,
  setDiaSexta,
  diaSabado,
  setDiaSabado,
  diaDomingo,
  setDiaDomingo,
  perfisContato,
  setPerfisContato,
  ipInput,
  setIpInput,
  ips,
  setIps,
  regraComissao,
  setRegraComissao,
  tipoComissao,
  setTipoComissao,
  onBack,
}: VendorsFormViewProps) {
  return (
    <>
      <header className={styles.vendorsTopBar}>
        <div className={styles.vendorsCrumbs}>
          <button type="button" className={styles.vendorsBackButton} onClick={onBack}>
            voltar
          </button>
          <span>início</span>
          <span>cadastros</span>
          <strong>vendedores</strong>
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

      <section className={styles.vendorsFormPage}>
        <h1>Vendedor</h1>
        <div className={styles.vendorsFormDivider} />

        <div className={styles.vendorsFormGrid3}>
          <label className={styles.vendorsField}><span>Nome</span><input className={styles.vendorsFieldInput} placeholder="Nome completo do vendedor" /></label>
          <label className={styles.vendorsField}><span>Fantasia</span><input className={styles.vendorsFieldInput} placeholder="Nome de fantasia ou apelido" /></label>
          <label className={styles.vendorsField}><span>Código</span><input className={styles.vendorsFieldInput} placeholder="Opcional" /></label>
        </div>

        <div className={styles.vendorsFormGrid4}>
          <label className={styles.vendorsField}>
            <span>Tipo de Pessoa</span>
            <select className={styles.vendorsFieldInput} value={tipoPessoa} onChange={(event) => setTipoPessoa(event.target.value as (typeof tipoPessoaOptions)[number])}>
              {tipoPessoaOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label className={styles.vendorsField}>
            <span>CNPJ</span>
            <div className={styles.vendorsInputWithAction}>
              <input className={styles.vendorsFieldInput} />
              <CnpjButton />
            </div>
          </label>
          <label className={styles.vendorsField}>
            <span>Contribuinte</span>
            <select className={styles.vendorsFieldInput} value={contribuinte} onChange={(event) => setContribuinte(event.target.value as (typeof contribuinteOptions)[number])}>
              {contribuinteOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label className={styles.vendorsField}><span>Inscrição Estadual</span><input className={styles.vendorsFieldInput} /></label>
        </div>

        <div className={`${styles.vendorsFormGrid3} ${styles.vendorsCepRow}`}>
          <label className={`${styles.vendorsField} ${styles.vendorsFieldCep}`}>
            <span>CEP</span>
            <div className={styles.vendorsInputWithAction}>
              <input className={styles.vendorsFieldInput} />
              <CEPButton />
            </div>
          </label>
          <label className={styles.vendorsField}><span>Cidade</span><input className={styles.vendorsFieldInput} /></label>
          <label className={styles.vendorsField}><span>UF</span><select className={styles.vendorsFieldInput}><option>Selecione</option></select></label>
        </div>

        <label className={styles.vendorsField}><span>Endereço</span><input className={styles.vendorsFieldInput} /></label>

        <div className={styles.vendorsFormGrid3}>
          <label className={styles.vendorsField}><span>Bairro</span><input className={styles.vendorsFieldInput} /></label>
          <label className={styles.vendorsField}><span>Número</span><input className={styles.vendorsFieldInput} /></label>
          <label className={styles.vendorsField}><span>Complemento</span><input className={styles.vendorsFieldInput} /></label>
        </div>

        <div className={styles.vendorsFormGrid3}>
          <label className={styles.vendorsField}><span>Telefone</span><input className={styles.vendorsFieldInput} /></label>
          <label className={styles.vendorsField}><span>Celular</span><input className={styles.vendorsFieldInput} /></label>
          <label className={styles.vendorsField}><span>Email</span><input className={styles.vendorsFieldInput} /></label>
        </div>

        <div className={styles.vendorsFormGrid3}>
          <label className={styles.vendorsField}><span>Situação</span><select className={styles.vendorsFieldInput}><option>Ativo com acesso ao sistema</option></select></label>
          <label className={styles.vendorsField}>
            <span>Depósito</span>
            <select className={styles.vendorsFieldInput} value={deposito} onChange={(event) => setDeposito(event.target.value as (typeof depositoOptions)[number])}>
              {depositoOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label className={styles.vendorsField}><span>E-mail para comunicações</span><input className={styles.vendorsFieldInput} /></label>
        </div>

        <div className={styles.vendorsFormDivider} />
        <h2>Dados de acesso</h2>

        <label className={`${styles.vendorsField} ${styles.vendorsFieldUserSystem}`}>
          <span>Usuário do Sistema</span>
          <input className={styles.vendorsFieldInput} />
        </label>
        <p className={styles.vendorsAliasLabel}>@lbl_apelido_empresa</p>

        <div className={styles.vendorsPasswordCallout}>
          <p>A senha de acesso será configurada em um segundo passo, realizado após ser salvo o vendedor.</p>
        </div>

        <div className={styles.vendorsFormDivider} />
        <h3 className={styles.vendorsSectionTitle}>Restrições de acesso</h3>

        <label className={styles.vendorsCheckboxRow}>
          <input type="checkbox" checked={restricaoHorario} onChange={(event) => setRestricaoHorario(event.target.checked)} />
          <span>Acesso restrito por horário</span>
        </label>

        {restricaoHorario ? (
          <div className={styles.vendorsAccessPanel}>
            <div className={styles.vendorsWeekdaysRow}>
              <label className={styles.vendorsCheckboxRow}><input type="checkbox" checked={diaSegunda} onChange={(event) => setDiaSegunda(event.target.checked)} /><span>Segunda</span></label>
              <label className={styles.vendorsCheckboxRow}><input type="checkbox" checked={diaTerca} onChange={(event) => setDiaTerca(event.target.checked)} /><span>Terça</span></label>
              <label className={styles.vendorsCheckboxRow}><input type="checkbox" checked={diaQuarta} onChange={(event) => setDiaQuarta(event.target.checked)} /><span>Quarta</span></label>
              <label className={styles.vendorsCheckboxRow}><input type="checkbox" checked={diaQuinta} onChange={(event) => setDiaQuinta(event.target.checked)} /><span>Quinta</span></label>
              <label className={styles.vendorsCheckboxRow}><input type="checkbox" checked={diaSexta} onChange={(event) => setDiaSexta(event.target.checked)} /><span>Sexta</span></label>
              <label className={styles.vendorsCheckboxRow}><input type="checkbox" checked={diaSabado} onChange={(event) => setDiaSabado(event.target.checked)} /><span>Sábado</span></label>
              <label className={styles.vendorsCheckboxRow}><input type="checkbox" checked={diaDomingo} onChange={(event) => setDiaDomingo(event.target.checked)} /><span>Domingo</span></label>
            </div>
            <div className={styles.vendorsAccessDivider} />
            <p className={styles.vendorsAccessTitle}>Horários permitidos</p>

            <div className={styles.vendorsPeriodRow}>
              <label className={styles.vendorsCheckboxRow}><input type="checkbox" checked={periodoManha} onChange={(event) => setPeriodoManha(event.target.checked)} /><span>Manhã</span></label>
              <div className={styles.vendorsPeriodTimes}>
                <input className={styles.vendorsFieldInput} placeholder="Inicial" />
                <input className={styles.vendorsFieldInput} placeholder="Final" />
              </div>
            </div>

            <div className={styles.vendorsPeriodRow}>
              <label className={styles.vendorsCheckboxRow}><input type="checkbox" checked={periodoTarde} onChange={(event) => setPeriodoTarde(event.target.checked)} /><span>Tarde</span></label>
              <div className={styles.vendorsPeriodTimes}>
                <input className={styles.vendorsFieldInput} placeholder="Inicial" />
                <input className={styles.vendorsFieldInput} placeholder="Final" />
              </div>
            </div>

            <div className={styles.vendorsPeriodRow}>
              <label className={styles.vendorsCheckboxRow}><input type="checkbox" checked={periodoNoite} onChange={(event) => setPeriodoNoite(event.target.checked)} /><span>Noite</span></label>
              <div className={styles.vendorsPeriodTimes}>
                <input className={styles.vendorsFieldInput} placeholder="Inicial" />
                <input className={styles.vendorsFieldInput} placeholder="Final" />
              </div>
            </div>
          </div>
        ) : null}

        <label className={styles.vendorsCheckboxRow}>
          <input type="checkbox" checked={restricaoIp} onChange={(event) => setRestricaoIp(event.target.checked)} />
          <span>
            Acesso restrito por IP
            {" "}
            <i
              className="has-tipsy fas fa-question-circle"
              style={{ marginLeft: 5, marginTop: 5 }}
              title="O endereço IP (Internet Protocol Address) refere-se ao número externo da sua rede. Ex: 177.200.210.133"
            />
          </span>
        </label>
        <p className={styles.vendorsHelperText}>Utilize esta opção apenas caso tenha IP fixo</p>

        {restricaoIp ? (
          <div className={styles.vendorsIpPanel}>
            <p className={styles.vendorsIpPanelTitle}>IP (Internet Protocol)</p>
            <div className={styles.vendorsIpPanelDivider} />
            <div className={styles.vendorsInlineInputAction}>
              <input className={styles.vendorsFieldInput} value={ipInput} onChange={(event) => setIpInput(event.target.value)} />
              <button
                type="button"
                className={styles.vendorsTextLinkButton}
                onClick={() => {
                  if (!ipInput.trim()) return;
                  setIps((current) => [...current, ipInput.trim()]);
                  setIpInput("");
                }}
              >
                salvar
              </button>
            </div>
            <button
              type="button"
              className={styles.vendorsAddIpButton}
              onClick={() => {
                if (!ipInput.trim()) return;
                setIps((current) => [...current, ipInput.trim()]);
                setIpInput("");
              }}
            >
              <span className={styles.vendorsAddIpCircle}>
                <i className="fa fa-fw fa-plus-circle" />
              </span>
              adicionar IP
            </button>
            {ips.length ? (
              <div className={styles.vendorsIpList}>
                {ips.map((ip) => (
                  <p key={ip}>{ip}</p>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        <div className={styles.vendorsField}>
          <span>Pode acessar contatos com o perfil:</span>
          <ContactsProfileSelect selected={perfisContato} setSelected={setPerfisContato} />
        </div>

        <div className={styles.vendorsFormDivider} />
        <h3 className={styles.vendorsSectionTitle}>Módulos que podem ser acessados pelo vendedor</h3>
        <div className={styles.vendorsModulesGrid}>
          {modulosOptions.map((option) => (
            <label key={option} className={styles.vendorsCheckboxRow}>
              <input type="checkbox" />
              <span>{option}</span>
            </label>
          ))}
        </div>

        <div className={styles.vendorsFormDivider} />
        <h2>Comissionamento</h2>
        <label className={styles.vendorsField}>
          <span>Regras para liberação de comissões</span>
          <select className={styles.vendorsFieldInput} value={regraComissao} onChange={(event) => setRegraComissao(event.target.value as (typeof comissionamentoRegraOptions)[number])}>
            {comissionamentoRegraOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>

        <div className={styles.vendorsRadioGroup}>
          <label><input type="radio" name="tipoComissao" checked={tipoComissao === "fixa"} onChange={() => setTipoComissao("fixa")} /> Comissão com alíquota fixa</label>
          <label><input type="radio" name="tipoComissao" checked={tipoComissao === "descontos"} onChange={() => setTipoComissao("descontos")} /> Comissão com alíquota conforme descontos</label>
        </div>

        <label className={`${styles.vendorsField} ${styles.vendorsFieldAliquota}`}>
          <span>Alíquota de comissão</span>
          <div className={styles.vendorsInputWithAction}>
            <input className={styles.vendorsFieldInput} />
            <button type="button" className={styles.vendorsInputCircleButton} aria-label="Percentual">%</button>
          </div>
        </label>

        <label className={styles.vendorsCheckboxRow}>
          <input type="checkbox" />
          <span>Desconsiderar comissionamento por linhas de produto para este vendedor</span>
        </label>
      </section>

      <footer className={styles.vendorsFormFooter}>
        <button type="button" className={styles.vendorsPrimaryButton}>salvar</button>
        <button type="button" className={styles.vendorsCancelLink} onClick={onBack}>cancelar</button>
      </footer>
    </>
  );
}
