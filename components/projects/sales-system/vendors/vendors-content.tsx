"use client";

import { useState } from "react";
import type { CurrentUser } from "../types";
import styles from "../landing-page.module.css";
import {
  comissionamentoRegraOptions,
  contribuinteOptions,
  depositoOptions,
  tipoPessoaOptions,
} from "./constants";
import { VendorsFormView } from "./vendors-form-view";
import { VendorsListView } from "./vendors-list-view";

export function VendorsContent({ currentUser: _currentUser }: { currentUser: CurrentUser }) {
  const [view, setView] = useState<"list" | "form">("list");
  const [tipoPessoa, setTipoPessoa] = useState<(typeof tipoPessoaOptions)[number]>("Jurídica");
  const [contribuinte, setContribuinte] = useState<(typeof contribuinteOptions)[number]>("Não informado");
  const [deposito, setDeposito] = useState<(typeof depositoOptions)[number]>("Padrão");
  const [restricaoHorario, setRestricaoHorario] = useState(false);
  const [restricaoIp, setRestricaoIp] = useState(false);
  const [periodoManha, setPeriodoManha] = useState(false);
  const [periodoTarde, setPeriodoTarde] = useState(false);
  const [periodoNoite, setPeriodoNoite] = useState(false);
  const [diaSegunda, setDiaSegunda] = useState(false);
  const [diaTerca, setDiaTerca] = useState(false);
  const [diaQuarta, setDiaQuarta] = useState(false);
  const [diaQuinta, setDiaQuinta] = useState(false);
  const [diaSexta, setDiaSexta] = useState(false);
  const [diaSabado, setDiaSabado] = useState(false);
  const [diaDomingo, setDiaDomingo] = useState(false);
  const [perfisContato, setPerfisContato] = useState<string[]>([]);
  const [ipInput, setIpInput] = useState("");
  const [ips, setIps] = useState<string[]>([]);
  const [regraComissao, setRegraComissao] = useState<(typeof comissionamentoRegraOptions)[number]>(
    "Liberação parcial vinculada ao pagamento das parcelas"
  );
  const [tipoComissao, setTipoComissao] = useState<"fixa" | "descontos">("fixa");

  return (
    <main className={styles.vendorsRoot}>
      <section className={styles.vendorsPage}>
        {view === "form" ? (
          <VendorsFormView
            tipoPessoa={tipoPessoa}
            setTipoPessoa={setTipoPessoa}
            contribuinte={contribuinte}
            setContribuinte={setContribuinte}
            deposito={deposito}
            setDeposito={setDeposito}
            restricaoHorario={restricaoHorario}
            setRestricaoHorario={setRestricaoHorario}
            restricaoIp={restricaoIp}
            setRestricaoIp={setRestricaoIp}
            periodoManha={periodoManha}
            setPeriodoManha={setPeriodoManha}
            periodoTarde={periodoTarde}
            setPeriodoTarde={setPeriodoTarde}
            periodoNoite={periodoNoite}
            setPeriodoNoite={setPeriodoNoite}
            diaSegunda={diaSegunda}
            setDiaSegunda={setDiaSegunda}
            diaTerca={diaTerca}
            setDiaTerca={setDiaTerca}
            diaQuarta={diaQuarta}
            setDiaQuarta={setDiaQuarta}
            diaQuinta={diaQuinta}
            setDiaQuinta={setDiaQuinta}
            diaSexta={diaSexta}
            setDiaSexta={setDiaSexta}
            diaSabado={diaSabado}
            setDiaSabado={setDiaSabado}
            diaDomingo={diaDomingo}
            setDiaDomingo={setDiaDomingo}
            perfisContato={perfisContato}
            setPerfisContato={setPerfisContato}
            ipInput={ipInput}
            setIpInput={setIpInput}
            ips={ips}
            setIps={setIps}
            regraComissao={regraComissao}
            setRegraComissao={setRegraComissao}
            tipoComissao={tipoComissao}
            setTipoComissao={setTipoComissao}
            onBack={() => setView("list")}
          />
        ) : (
          <VendorsListView onCreate={() => setView("form")} />
        )}
      </section>
    </main>
  );
}
