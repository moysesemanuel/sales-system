"use client";

import { useMemo, useState } from "react";
import type { CurrentUser } from "./types";
import styles from "./landing-page.module.css";

const toolTabs = ["geral", "importações", "exportações"] as const;

const toolContent = {
  geral: [
    { title: "Backup" },
    { title: "Exclusão de registros" },
    { title: "Inutilizações de NFes" },
    { title: "Gerenciar Anexos" },
    { title: "Resumo de Sincronizações" },
    { title: "Reiniciar conta" },
  ],
  importações: [
    { title: "Cadastros", heading: true },
    { title: "Contatos" },
    { title: "Contatos dos clientes" },
    { title: "Produtos" },
    { title: "Kits e Produtos Fabricados" },
    { title: "Preços dos produtos" },
    { title: "Suprimentos", heading: true },
    { title: "Estoque" },
    { title: "Ordens de Compra" },
    { title: "Vendas", heading: true },
    { title: "Pedidos de Venda" },
    { title: "Propostas Comerciais" },
    { title: "Atualizar informações de envio" },
    { title: "Notas Fiscais", heading: true },
    { title: "XMLs em Lote" },
    { title: "Finanças", heading: true },
    { title: "Caixa" },
    { title: "Categorias de Receitas e Despesas" },
    { title: "Contas a Receber" },
    { title: "Contas a Pagar" },
    { title: "Serviços", heading: true },
    { title: "Ordens de Serviço" },
  ],
  exportações: [{ title: "SPED Fiscal" }, { title: "SPED Contribuições" }],
} as const;

export function ToolsContent({ currentUser }: { currentUser: CurrentUser }) {
  const [activeTab, setActiveTab] = useState<(typeof toolTabs)[number]>("geral");
  const activeItems = useMemo(() => toolContent[activeTab], [activeTab]);

  return (
    <main className={styles.toolsRoot}>
      <section className={styles.toolsPage}>
        <div className={styles.toolsHeader}>
          <h1>Ferramentas</h1>
          <div className={styles.toolsTabs} role="tablist" aria-label="Ferramentas">
            {toolTabs.map((tab) => (
              <button
                key={tab}
                className={tab === activeTab ? styles.toolsTabActive : styles.toolsTab}
                onClick={() => setActiveTab(tab)}
                role="tab"
                aria-selected={tab === activeTab}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.toolsList}>
          {activeItems.map((item) =>
            "heading" in item && item.heading ? (
              <div key={item.title} className={styles.toolsGroupHeading}>
                {item.title}
              </div>
            ) : (
              <button key={item.title} className={styles.toolsListItem} type="button">
                {item.title}
              </button>
            ),
          )}
        </div>
      </section>

      <div className={styles.toolsFooterNote}>{currentUser.name}</div>
    </main>
  );
}
