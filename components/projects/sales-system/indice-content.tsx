"use client";

import { useMemo, useState } from "react";
import type { CurrentUser } from "./types";
import styles from "./landing-page.module.css";

type SetupTask = {
  id: string;
  order: string;
  title: string;
  bullets?: string[];
  status: "todo" | "done";
};

type SetupStep = {
  id: number;
  title: string;
  description: string;
  tasks: SetupTask[];
};

const setupSteps: SetupStep[] = [
  {
    id: 1,
    title: "Configurações iniciais",
    description:
      "Hora de dar o primeiro passo! Conclua as configurações obrigatórias para começar a usar o ERP.",
    tasks: [
      { id: "import-products", order: "01", title: "Importe seus produtos", status: "todo" },
      { id: "configure-pdv", order: "02", title: "Configure sua frente de caixa (PDV)", status: "done" },
    ],
  },
  {
    id: 2,
    title: "Configurações avançadas",
    description:
      "Abandone as tarefas manuais! Conclua as configurações avançadas para automatizar seus processos e deixar sua gestão mais simples.",
    tasks: [
      {
        id: "configure-nfe",
        order: "01",
        title: "Configure a Emissão de Notas Fiscais",
        status: "todo",
        bullets: [
          "Configure a emissão da suas notas fiscais",
          "Configure a emissão da nota fiscal para o consumidor",
        ],
      },
      {
        id: "configure-payments",
        order: "02",
        title: "Configure seus meios de pagamento",
        status: "todo",
        bullets: [
          "Defina as formas de recebimento da sua loja",
          "Assista ao tutorial e aprenda a configurar os meios de pagamento",
          "Conecte os meios de pagamento",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Configurações personalizadas",
    description:
      "Centralize tudo em um só lugar! Conclua as configurações para conectar todas as frentes da sua empresa e liberar todo o potencial do ERP.",
    tasks: [
      {
        id: "dre-reports",
        order: "01",
        title: "Gerencie seus relatórios financeiros (DRE)",
        status: "todo",
        bullets: ["Configure as categorias financeiras", "Acesso os relatórios financeiros"],
      },
      {
        id: "sales-performance",
        order: "02",
        title: "Acompanhe sua performance de vendas",
        status: "todo",
      },
      {
        id: "purchase-conference",
        order: "03",
        title: "Configure a conferência de compras",
        status: "todo",
        bullets: [
          "Assista ao tutorial e aprenda a usar o módulo de conferência de compra do ERP",
          "Veja como funciona na prática a conferência de compras",
          "Comece a usar a conferência de compras",
        ],
      },
      {
        id: "inventory-optimization",
        order: "04",
        title: "Otimize o Gerenciamento de Estoques e Compras",
        status: "todo",
        bullets: ["Controle seu giro de estoque", "Identifique suas necessidades de compra"],
      },
    ],
  },
];

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M8 4.75 13.25 10 8 15.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M4.5 10.5 8 14 15.5 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M10 4.5v11M4.5 10h11"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CaretUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M5.5 12.5 10 8l4.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CaretDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M5.5 7.5 10 12l4.5-4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IndiceContent({ currentUser }: { currentUser: CurrentUser }) {
  const [currentStep, setCurrentStep] = useState(1);
  const activeStep = useMemo(
    () => setupSteps.find((step) => step.id === currentStep) ?? setupSteps[0],
    [currentStep]
  );
  const [collapsedBlocks, setCollapsedBlocks] = useState<Record<string, boolean>>({});

  const stepIndex = activeStep.id - 1;
  const stepsTotal = setupSteps.length;
  const canPrev = stepIndex > 0;
  const canNext = stepIndex < stepsTotal - 1;

  // Mock do print (pode ser conectado a dados reais depois).
  const progressPercent = 12;
  const progressFills = [48, 0, 0];

  return (
    <div className={styles.indiceRoot}>
      <header className={styles.indiceHeaderRow}>
        <div className={styles.indiceGreetingBlock}>
          <h1 className={styles.indiceTitle}>
            {getGreeting()}, {currentUser.name}
          </h1>
        </div>

        <section className={styles.indiceProgressCard} aria-label="Progresso">
          <h2 className={styles.indiceProgressTitle}>Progresso</h2>
          <div className={styles.indiceProgressBarRow}>
            {["etapa 1", "etapa 2", "etapa 3"].map((label, index) => (
              <div key={label} className={styles.indiceProgressItem}>
                <div className={styles.indiceProgressTrack}>
                  <div
                    className={styles.indiceProgressFill}
                    style={{ width: `${progressFills[index]}%` }}
                  />
                </div>
                <span className={styles.indiceProgressLabel}>{label}</span>
              </div>
            ))}
            <div className={styles.indiceProgressPercent} aria-label={`${progressPercent}% concluído`}>
              {progressPercent}%
            </div>
          </div>
        </section>
      </header>

      <section className={styles.indiceOnboardingCard} aria-label="Configurações iniciais">
        <aside className={styles.indiceOnboardingIntro}>
          <div className={styles.indiceOnboardingIntroTop}>
            <h3 className={styles.indiceOnboardingTitle}>{activeStep.title}</h3>
            <p className={styles.indiceOnboardingDescription}>{activeStep.description}</p>
          </div>

          <footer className={styles.indiceOnboardingFooter}>
            <span className={styles.indiceOnboardingCount}>
              {activeStep.id} de {stepsTotal}
            </span>
            <div className={styles.indiceOnboardingPager}>
              <button
                className={styles.indicePagerButton}
                disabled={!canPrev}
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                type="button"
                aria-label="Etapa anterior"
              >
                ‹
              </button>
              <button
                className={styles.indicePagerButton}
                disabled={!canNext}
                onClick={() => setCurrentStep((prev) => Math.min(stepsTotal, prev + 1))}
                type="button"
                aria-label="Próxima etapa"
              >
                ›
              </button>
            </div>
          </footer>
        </aside>

        <div className={styles.indiceOnboardingTasks}>
          {activeStep.id === 1 ? (
            activeStep.tasks.map((task) => (
              <button
                key={task.id}
                className={styles.indiceTaskRow}
                onClick={() => {
                  // placeholder: aqui dá para navegar para a tela real
                }}
                type="button"
              >
                <span
                  className={task.status === "done" ? styles.indiceTaskIconDone : styles.indiceTaskIconNumber}
                  aria-hidden="true"
                >
                  {task.status === "done" ? <CheckIcon /> : task.order}
                </span>
                <span className={styles.indiceTaskTitle}>{task.title}</span>
                <ChevronRightIcon className={styles.indiceTaskChevron} />
              </button>
            ))
          ) : (
            <div className={styles.indiceTaskBlocks}>
              {activeStep.tasks.map((task) => (
                <section
                  key={task.id}
                  className={`${styles.indiceTaskBlock} ${task.bullets?.length ? "" : styles.indiceTaskBlockClickable}`}
                  aria-label={task.title}
                >
                  {task.bullets?.length ? (
                    <>
                      <header className={styles.indiceTaskBlockHeader}>
                        <span className={styles.indiceTaskBlockOrder}>{task.order}</span>
                        <span className={styles.indiceTaskBlockTitle}>{task.title}</span>
                        <button
                          className={styles.indiceTaskToggle}
                          type="button"
                          onClick={() =>
                            setCollapsedBlocks((prev) => ({ ...prev, [task.id]: !prev[task.id] }))
                          }
                        >
                          <span>{collapsedBlocks[task.id] ? "mostrar passos" : "ocultar passos"}</span>
                          {collapsedBlocks[task.id] ? <CaretDownIcon /> : <CaretUpIcon />}
                        </button>
                      </header>

                      {!collapsedBlocks[task.id] ? (
                        <div className={styles.indiceTaskSteps}>
                          {task.bullets.map((bullet) => (
                            <button
                              key={bullet}
                              className={styles.indiceTaskStepRow}
                              type="button"
                              onClick={() => {
                                // placeholder: navegar para a etapa
                              }}
                            >
                              <span className={styles.indiceTaskStepDot} aria-hidden="true">
                                –
                              </span>
                              <span className={styles.indiceTaskStepText}>{bullet}</span>
                              <ChevronRightIcon className={styles.indiceTaskStepChevron} />
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </>
                  ) : (
                    <button
                      className={styles.indiceTaskBlockButton}
                      type="button"
                      onClick={() => {
                        // placeholder: navegar para a etapa
                      }}
                    >
                      <span className={styles.indiceTaskBlockOrder} aria-hidden="true">
                        {task.order}
                      </span>
                      <span className={styles.indiceTaskBlockTitle}>{task.title}</span>
                      <ChevronRightIcon className={styles.indiceTaskBlockChevron} />
                    </button>
                  )}
                </section>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className={styles.indiceTrialBar} aria-label="Teste grátis">
        <span className={styles.indiceTrialPlus} aria-hidden="true">
          <PlusIcon />
        </span>
        <span className={styles.indiceTrialPill}>Teste grátis</span>
        <p className={styles.indiceTrialText}>
          Gostando de usar o ERP da DaBi Tech? Ative agora e continue aproveitando todos os recursos depois do período
          gratuito.
        </p>
        <a className={styles.indiceTrialAction} href="#">
          ativar plano
        </a>
      </section>

      <section className={styles.indiceAccountCard} aria-label="Conta Digital">
        <div className={styles.indiceAccountIllustration} aria-hidden="true" />
        <div className={styles.indiceAccountContent}>
          <h3 className={styles.indiceAccountTitle}>
            Transforme sua gestão com a Conta Digital: venda, cobre, receba e gerencie tudo em um só lugar!
          </h3>
          <p className={styles.indiceAccountSubtitle}>Aqui você tem:</p>
          <ul className={styles.indiceAccountList}>
            <li>Economia: transferência pix sem taxas</li>
            <li>Eficiência: pagamento de boletos em lote</li>
            <li>Organização: busca de boletos por CNPJ</li>
            <li>Praticidade: conciliação bancária automática</li>
            <li>E muito mais!</li>
          </ul>
        </div>
        <button className={styles.indiceAccountButton} type="button">
          acesse grátis
        </button>
      </section>

      <section className={styles.indiceHelpSection} aria-label="Precisa de ajuda">
        <h2 className={styles.indiceHelpTitle}>Precisa de ajuda?</h2>
        <div className={styles.indiceHelpGrid}>
          <article className={styles.indiceHelpCard}>
            <div className={styles.indiceHelpThumb} aria-hidden="true" />
            <div className={styles.indiceHelpCopy}>
              <h3>Fale conosco</h3>
              <p>Tem alguma dúvida? Abra um chamado para o nosso time de suporte.</p>
            </div>
          </article>
          <article className={styles.indiceHelpCard}>
            <div className={styles.indiceHelpThumbAlt} aria-hidden="true" />
            <div className={styles.indiceHelpCopy}>
              <h3>Vídeo tutoriais</h3>
              <p>Explore o ERP com vídeos que mostram o passo a passo dos principais recursos.</p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
