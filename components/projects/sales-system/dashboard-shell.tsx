"use client";

import { FormEvent, useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DaBiTechLogo } from "@/components/shared/dabi-tech-logo";
import { useToast } from "@/components/shared/toast-provider";
import { MenuSelectionShape } from "./menu-selection-shape";
import { IndiceContent } from "./indice-content";
import { DashboardContent } from "./dashboard-content";
import { AgendaContent } from "./agenda-content";
import { MyAccountContent } from "./my-account-content";
import { IntegrationsContent } from "./integrations-content";
import { UpgradePlanContent } from "./upgrade-plan-content";
import { VersionContent } from "./version-content";
import { ToolsContent } from "./tools-content";
import { ExtensionsStoreContent } from "./extensions-store-content";
import { CustomersSuppliersContent } from "./customers-suppliers-content";
import { ProductsContent } from "./products-content";
import type {
  CurrentUser,
  DashboardData,
  SalesCustomer,
  SalesOrder,
  SalesProduct,
} from "./types";
import styles from "./landing-page.module.css";
import { PromotionalCampaignsContent } from "./promotional-campaigns-content";
import { ServicesContent } from "./services-content";

const navigationGroups = [
  {
    id: "inicio",
    label: "Início",
    eyebrow: "Cockpit",
    description:
      "Painel geral da operação, agenda e recursos de crescimento do ERP.",
    items: [
      "Índice",
      "Dashboard",
      "Agenda",
      "Minha conta",
      "Integrações",
      "Upgrade de plano",
      "Sobre a versão",
      "Ajuda do ERP",
      "Ferramentas",
      "Loja de extensões",
    ],
  },
  {
    id: "cadastros",
    label: "Cadastros",
    eyebrow: "Base",
    description:
      "Entidades mestras para clientes, catálogo, campanhas, serviços e operação comercial.",
    items: [
      "Clientes e Fornecedores",
      "Produtos",
      "Campanhas Promocionais",
      "Serviços",
      "Categorias dos Produtos",
      "Vendedores",
      "Embalagens",
      "Relatórios",
    ],
  },
  {
    id: "suprimentos",
    label: "Suprimentos",
    eyebrow: "Supply",
    description:
      "Estoques, compras e rotinas de entrada para dar previsibilidade ao abastecimento.",
    items: [
      "Controle de Estoques",
      "Ordens de Compra",
      "Serviços Tomados",
      "Notas de Entrada",
      "Conferência de compra",
      "Necessidades de Compra",
      "Giro de Estoque",
      "FCI",
      "Relatórios",
    ],
  },
  {
    id: "vendas",
    label: "Vendas",
    eyebrow: "Revenue",
    description:
      "CRM, pedidos, notas, automações e execução ponta a ponta da esteira comercial.",
    items: [
      "CRM",
      "Painel de Automações",
      "PDV",
      "Propostas Comerciais",
      "Pedidos de Venda",
      "Notas Fiscais",
      "Comissões",
      "Notas Fiscais Consumidor",
      "Performance de Vendas",
      "Margem Contribuição",
      "Custos do e-commerce",
      "Separação",
      "Expedição",
      "Devoluções de venda",
      "Relatórios",
    ],
  },
  {
    id: "financas",
    label: "Finanças",
    eyebrow: "Cashflow",
    description: "Caixa, contas, conciliação e leitura financeira consolidada.",
    items: [
      "Caixa",
      "Conta Digital",
      "pix grátis",
      "Contas a Pagar",
      "Contas a Receber",
      "Cobranças Bancárias",
      "Extratos Bancários",
      "Relatórios",
    ],
  },
  {
    id: "servicos",
    label: "Serviços",
    eyebrow: "Service",
    description:
      "Gestão de contratos, ordens de serviço, notas e cobrança operacional.",
    items: [
      "Contratos",
      "Ordens de Serviço",
      "Notas de Serviço",
      "Cobranças",
      "Relatórios",
    ],
  },
] as const;

const supportLinks = [
  "Configurações",
  "Canal de ideias",
  "Suporte",
  "Envios DaBi Tech",
  "Ecommerce",
] as const;

type NavigationGroupId = (typeof navigationGroups)[number]["id"];

const menuRoutes = {
  "Clientes e Fornecedores": "/clientes-e-fornecedores",
  Produtos: "/produtos",
  "Campanhas Promocionais": "/campanhas-promocionais",
  Serviços: "/servicos",
  Índice: "/indice",
  Dashboard: "/dashboard",
  Agenda: "/agenda",
  "Minha conta": "/minha-conta",
  Integrações: "/integracoes",
  "Upgrade de plano": "/upgrade-plano",
  "Sobre a versão": "/sobre-versao",
  Ferramentas: "/ferramentas",
  "Loja de extensões": "/loja-de-extensoes",
} as const;

const menuItemByPath: Record<string, keyof typeof menuRoutes> = {
  "/clientes-e-fornecedores": "Clientes e Fornecedores",
  "/produtos": "Produtos",
  "/campanhas-promocionais": "Campanhas Promocionais",
  "/servicos": "Serviços",
  "/indice": "Índice",
  "/dashboard": "Dashboard",
  "/agenda": "Agenda",
  "/minha-conta": "Minha conta",
  "/integracoes": "Integrações",
  "/upgrade-plano": "Upgrade de plano",
  "/sobre-versao": "Sobre a versão",
  "/ferramentas": "Ferramentas",
  "/loja-de-extensoes": "Loja de extensões",
  "/": "Índice",
};

function formatCurrency(valueInCents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valueInCents / 100);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatDateOnly(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
  }).format(new Date(value));
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function SalesSystemDashboard({
  currentUser,
  initialMenuItem = "Índice",
}: {
  currentUser: CurrentUser;
  initialMenuItem?: string;
}) {
  const { showToast } = useToast();
  const pathname = usePathname();
  const router = useRouter();
  const [activeGroupId, setActiveGroupId] =
    useState<NavigationGroupId>("inicio");
  const [activeMenuItem, setActiveMenuItem] = useState<string>(initialMenuItem);
  const [isPrimaryRailExpanded, setIsPrimaryRailExpanded] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileMenuMode, setMobileMenuMode] = useState<"nav" | "profile">("nav");
  const [search, setSearch] = useState("");
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [customers, setCustomers] = useState<SalesCustomer[]>([]);
  const [products, setProducts] = useState<SalesProduct[]>([]);
  const [orders, setOrders] = useState<SalesOrder[]>([]);
  const [isLoading, startLoadingTransition] = useTransition();
  const [isSaving, startSavingTransition] = useTransition();

  const [customerForm, setCustomerForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });
  const [productForm, setProductForm] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    cost: "",
    stockQuantity: "",
  });
  const [orderForm, setOrderForm] = useState({
    customerId: "",
    productId: "",
    quantity: "1",
    notes: "",
  });

  const activeGroup =
    navigationGroups.find((group) => group.id === activeGroupId) ??
    navigationGroups[0];

  useEffect(() => {
    const nextMenuItem = menuItemByPath[pathname] ?? initialMenuItem;
    const nextGroupId = navigationGroups.find((group) =>
      group.items.some((groupItem) => groupItem === nextMenuItem)
    )?.id;
    setActiveMenuItem(nextMenuItem);
    if (nextGroupId) {
      setActiveGroupId(nextGroupId);
    }
  }, [initialMenuItem, pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const profileItems = useMemo(
    () => [
      { id: "company", label: "Dados da empresa", icon: "briefcase" as const },
      { id: "user", label: "Dados do usuário", icon: "user" as const },
      {
        id: "support_user",
        label: "Usuário de suporte",
        icon: "support" as const,
      },
      { id: "extensions", label: "Extensões", icon: "puzzle" as const },
      { id: "blog", label: "Blog", icon: "rss" as const },
      {
        id: "refer",
        label: "Indique e ganhe",
        icon: "gift" as const,
        accent: true as const,
      },
    ],
    []
  );

  function ProfileIcon({
    kind,
  }: {
    kind: (typeof profileItems)[number]["icon"];
  }) {
    switch (kind) {
      case "briefcase":
        return (
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M7 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M4 6h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              opacity="0.85"
            />
            <path
              d="M2.5 11h15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              opacity="0.4"
            />
          </svg>
        );
      case "user":
        return (
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M10 10.4a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              opacity="0.85"
            />
            <path
              d="M3.2 17a6.8 6.8 0 0 1 13.6 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.85"
            />
          </svg>
        );
      case "support":
        return (
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M4.8 10.2V9a5.2 5.2 0 1 1 10.4 0v1.2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M4.6 10.2h-.2A2.4 2.4 0 0 0 2 12.6v.8A2.4 2.4 0 0 0 4.4 15.8h.2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M15.4 10.2h.2A2.4 2.4 0 0 1 18 12.6v.8a2.4 2.4 0 0 1-2.4 2.4h-.2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.85"
            />
          </svg>
        );
      case "puzzle":
        return (
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M7.2 3.6h2.2a1.6 1.6 0 1 1 3.2 0h2.2V7a1.6 1.6 0 1 0 0 3.2v3.2h-3.2a1.6 1.6 0 1 1-3.2 0H7.2V10.2a1.6 1.6 0 1 0 0-3.2V3.6Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
              opacity="0.85"
            />
          </svg>
        );
      case "rss":
        return (
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M4 4.5c6.6 0 11.5 4.9 11.5 11.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M4 8.7c4.2 0 7.3 3.1 7.3 7.3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M5.1 16.4a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2Z"
              fill="currentColor"
              opacity="0.85"
            />
          </svg>
        );
      case "gift":
        return (
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M3.5 8h13v9a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2V8Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              opacity="0.85"
            />
            <path
              d="M2.5 8h15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              opacity="0.4"
            />
            <path
              d="M10 8v11"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              opacity="0.6"
            />
            <path
              d="M6.2 5.9c-.9-.9-1-2.2-.2-2.9.8-.7 2.1-.5 3 .4L10 4.5l1-1.1c.9-.9 2.2-1.1 3-.4.8.7.7 2-.2 2.9L12.5 7H7.5L6.2 5.9Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
              opacity="0.85"
            />
          </svg>
        );
      default:
        return null;
    }
  }

  type SecondaryMenuIconKind =
    | "book"
    | "gauge"
    | "calendar"
    | "person"
    | "pdv"
    | "tag"
    | "swap"
    | "gear"
    | "wrench"
    | "hierarchy"
    | "briefcase"
    | "rocket"
    | "info"
    | "help"
    | "bag"
    | "gift"
    | "file";

  const secondaryMenuIconByLabel: Record<string, SecondaryMenuIconKind> = {
    "Clientes e Fornecedores": "person",
    Produtos: "tag",
    "Campanhas Promocionais": "gear",
    Serviços: "wrench",
    "Categorias dos Produtos": "hierarchy",
    Vendedores: "briefcase",
    Embalagens: "gift",
    Relatórios: "file",
    Índice: "book",
    Dashboard: "gauge",
    Agenda: "calendar",
    "Minha conta": "person",
    PDV: "pdv",
    Integrações: "swap",
    "Upgrade de plano": "rocket",
    "Sobre a versão": "info",
    "Ajuda do ERP": "help",
    Ferramentas: "wrench",
    "Loja de extensões": "bag",
  };

  function SecondaryMenuIcon({ label }: { label: string }) {
    const kind = secondaryMenuIconByLabel[label] ?? "file";

    switch (kind) {
      case "book":
        return (
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M4 4.2h5.4a2.6 2.6 0 0 1 2.6 2.6v9A2.2 2.2 0 0 0 9.8 13.6H4V4.2Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
              opacity="0.85"
            />
            <path
              d="M16 4.2h-5.4a2.6 2.6 0 0 0-2.6 2.6v9"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.85"
            />
          </svg>
        );
      case "gauge":
        return (
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M4.3 13.3a5.8 5.8 0 1 1 11.4 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M10 10l3.1-2.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle
              cx="10"
              cy="10"
              r="1.2"
              fill="currentColor"
              opacity="0.85"
            />
          </svg>
        );
      case "calendar":
        return (
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M4 4.6h12a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5.6a1 1 0 0 1 1-1Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
              opacity="0.85"
            />
            <path
              d="M5.6 2.8v3M14.4 2.8v3M3 8h14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              opacity="0.85"
            />
          </svg>
        );
      case "person":
        return (
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M10 10.3a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              opacity="0.85"
            />
            <path
              d="M3.4 16.8a6.6 6.6 0 0 1 13.2 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.85"
            />
          </svg>
        );
      case "pdv":
        return (
          <svg width="18" height="18" viewBox="0 0 64 64" aria-hidden="true">
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 10v3" />
              <path d="M27 10v3" />
              <path d="M31 10v3" />
              <path d="M37 10v4" />
              <path d="M45 10v14" />
              <path d="M50 10v14" />
              <path d="M55 10v14" />
              <rect x="10" y="18" width="28" height="38" rx="6" ry="6" />
              <rect x="16" y="24" width="16" height="10" rx="1.5" ry="1.5" />
              <path d="M18 42h4" />
              <path d="M27 42h4" />
              <path d="M18 48h4" />
              <path d="M27 48h4" />
            </g>
          </svg>
        );
      case "tag":
        return (
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M3 6.2V3.8A.8.8 0 0 1 3.8 3H6.2l8.6 8.6a1.5 1.5 0 0 1 0 2.1l-3.4 3.4a1.5 1.5 0 0 1-2.1 0L3 9.3Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
              opacity="0.85"
            />
            <circle
              cx="6.4"
              cy="6.4"
              r="1.1"
              fill="currentColor"
              opacity="0.85"
            />
          </svg>
        );
      case "swap":
        return (
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M4 6.7h10.4M11.7 4.2 14.2 6.7 11.7 9.2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />
            <path
              d="M16 13.3H5.6M8.3 10.8 5.8 13.3 8.3 15.8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />
          </svg>
        );
      case "gear":
        return (
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M10 5.8a4.2 4.2 0 1 0 0 8.4 4.2 4.2 0 0 0 0-8.4Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              opacity="0.85"
            />
            <path
              d="M10 2.4v2.1M10 15.5v2.1M4.4 4.4l1.5 1.5M14.1 14.1l1.5 1.5M2.4 10h2.1M15.5 10h2.1M4.4 15.6l1.5-1.5M14.1 5.9l1.5-1.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.75"
            />
          </svg>
        );
      case "wrench":
        return (
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M12.7 3.6a4.2 4.2 0 0 0-5.4 5.4L3.6 12.7l3.7 3.7 3.7-3.7a4.2 4.2 0 0 0 5.4-5.4l-2.1 2.1-2.1-.5-.5-2.1 2.1-2.1Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
              opacity="0.85"
            />
          </svg>
        );
      case "hierarchy":
        return (
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M10 4v4M5 14v-2.2A1.8 1.8 0 0 1 6.8 10h6.4A1.8 1.8 0 0 1 15 11.8V14M5 4h2.5v2.5H5ZM12.5 4H15v2.5h-2.5ZM8.8 14h2.4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />
          </svg>
        );
      case "briefcase":
        return (
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M7 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M4 6h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              opacity="0.85"
            />
          </svg>
        );
      case "rocket":
        return (
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M12.9 3.1c1.8.2 3 1.4 3.2 3.2-.1 2.2-1.1 4.6-2.7 6.2l-3.7 3.7-2.6-2.6 3.7-3.7c1.7-1.7 4.1-2.6 6.3-2.8-1.7 1.7-3.1 4.6-3.3 6.4-.2 1.8-1.1 3.1-2.9 3.2-1.2.1-2.4-.4-3.3-1.3l-1.1-1.1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M6 14l-2.1.7.7-2.1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.85"
            />
          </svg>
        );
      case "info":
        return (
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <circle
              cx="10"
              cy="10"
              r="7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              opacity="0.85"
            />
            <path
              d="M10 9v4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle cx="10" cy="6.4" r="1" fill="currentColor" opacity="0.85" />
          </svg>
        );
      case "help":
        return (
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <circle
              cx="10"
              cy="10"
              r="7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              opacity="0.85"
            />
            <path
              d="M7.9 8.1A2.3 2.3 0 0 1 10 6.8c1.3 0 2.3.8 2.3 2 0 1.6-1.8 2-2.4 2.9v.6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="10"
              cy="14.3"
              r="0.9"
              fill="currentColor"
              opacity="0.85"
            />
          </svg>
        );
      case "bag":
        return (
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M5.2 6.5h9.6l-.7 8.2a1.4 1.4 0 0 1-1.4 1.3H7.3a1.4 1.4 0 0 1-1.4-1.3l-.7-8.2Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
              opacity="0.85"
            />
            <path
              d="M7.2 6.5a2.8 2.8 0 0 1 5.6 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.85"
            />
          </svg>
        );
      case "gift":
        return (
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
        );
      case "file":
      default:
        return (
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M6 2.8h5l3.2 3.2V17.2a.8.8 0 0 1-.8.8H6a.8.8 0 0 1-.8-.8V3.6a.8.8 0 0 1 .8-.8Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
              opacity="0.85"
            />
            <path
              d="M11 2.8v3.2h3.2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              opacity="0.85"
            />
          </svg>
        );
    }
  }

  async function loadData() {
    const [
      dashboardResponse,
      customersResponse,
      productsResponse,
      ordersResponse,
    ] = await Promise.all([
      fetch("/api/sales-system/dashboard", { cache: "no-store" }),
      fetch("/api/sales-system/customers", { cache: "no-store" }),
      fetch("/api/sales-system/products", { cache: "no-store" }),
      fetch("/api/sales-system/orders", { cache: "no-store" }),
    ]);

    const firstFailure = [
      { response: dashboardResponse, label: "dashboard" },
      { response: customersResponse, label: "clientes" },
      { response: productsResponse, label: "produtos" },
      { response: ordersResponse, label: "pedidos" },
    ].find((item) => !item.response.ok);

    if (firstFailure) {
      const payload = (await firstFailure.response
        .json()
        .catch(() => null)) as { error?: string } | null;
      throw new Error(
        payload?.error ??
          `Não foi possível carregar ${firstFailure.label} do ERP.`
      );
    }

    const [dashboardPayload, customersPayload, productsPayload, ordersPayload] =
      await Promise.all([
        dashboardResponse.json() as Promise<DashboardData>,
        customersResponse.json() as Promise<{ customers: SalesCustomer[] }>,
        productsResponse.json() as Promise<{ products: SalesProduct[] }>,
        ordersResponse.json() as Promise<{ orders: SalesOrder[] }>,
      ]);

    setDashboard(dashboardPayload);
    setCustomers(customersPayload.customers);
    setProducts(productsPayload.products);
    setOrders(ordersPayload.orders);
  }

  useEffect(() => {
    startLoadingTransition(() => {
      void loadData().catch((error) => {
        showToast({
          variant: "error",
          message:
            error instanceof Error ? error.message : "Falha ao carregar o ERP.",
        });
      });
    });
  }, [showToast]);

  const filteredCustomers = useMemo(() => {
    if (!search) return customers;
    return customers.filter((customer) =>
      [customer.name, customer.email, customer.city, customer.document]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(search.toLowerCase()))
    );
  }, [customers, search]);

  const filteredProducts = useMemo(() => {
    if (!search) return products;
    return products.filter((product) =>
      [product.name, product.sku, product.category].some((value) =>
        value.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [products, search]);

  const filteredOrders = useMemo(() => {
    if (!search) return orders;
    return orders.filter((order) =>
      [String(order.orderNumber), order.customerName, order.status].some(
        (value) => value.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [orders, search]);

  const conversionRate = dashboard
    ? Math.round(
        (dashboard.summary.ordersToday /
          Math.max(1, dashboard.summary.customersCount)) *
          100
      )
    : 0;

  const marginPreview = dashboard
    ? Math.round(
        products.reduce(
          (sum, product) => sum + (product.priceInCents - product.costInCents),
          0
        ) /
          Math.max(1, products.length) /
          100
      )
    : 0;

  async function refreshData(message?: string) {
    startLoadingTransition(() => {
      void loadData()
        .then(() => {
          if (message) {
            showToast({ variant: "success", message });
          }
        })
        .catch((error) => {
          showToast({
            variant: "error",
            message:
              error instanceof Error
                ? error.message
                : "Falha ao atualizar os dados.",
          });
        });
    });
  }

  async function handleCreateCustomer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startSavingTransition(() => {
      void (async () => {
        const response = await fetch("/api/sales-system/customers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(customerForm),
        });

        const payload = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;

        if (!response.ok) {
          throw new Error(
            payload?.error ?? "Não foi possível cadastrar o cliente."
          );
        }

        setCustomerForm({ name: "", email: "", phone: "", city: "" });
        await refreshData("Cliente cadastrado.");
      })().catch((error) => {
        showToast({
          variant: "error",
          message:
            error instanceof Error
              ? error.message
              : "Falha ao cadastrar cliente.",
        });
      });
    });
  }

  async function handleCreateProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startSavingTransition(() => {
      void (async () => {
        const response = await fetch("/api/sales-system/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: productForm.name,
            sku: productForm.sku,
            category: productForm.category,
            priceInCents: Math.round(
              Number(productForm.price.replace(",", ".")) * 100
            ),
            costInCents: Math.round(
              Number(productForm.cost.replace(",", ".")) * 100
            ),
            stockQuantity: Number(productForm.stockQuantity),
            minimumStock: 0,
          }),
        });

        const payload = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;

        if (!response.ok) {
          throw new Error(
            payload?.error ?? "Não foi possível cadastrar o produto."
          );
        }

        setProductForm({
          name: "",
          sku: "",
          category: "",
          price: "",
          cost: "",
          stockQuantity: "",
        });
        await refreshData("Produto cadastrado.");
      })().catch((error) => {
        showToast({
          variant: "error",
          message:
            error instanceof Error
              ? error.message
              : "Falha ao cadastrar produto.",
        });
      });
    });
  }

  async function handleCreateOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startSavingTransition(() => {
      void (async () => {
        const response = await fetch("/api/sales-system/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerId: orderForm.customerId,
            notes: orderForm.notes,
            items: [
              {
                productId: orderForm.productId,
                quantity: Number(orderForm.quantity),
              },
            ],
          }),
        });

        const payload = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;

        if (!response.ok) {
          throw new Error(
            payload?.error ?? "Não foi possível registrar o pedido."
          );
        }

        setOrderForm({
          customerId: "",
          productId: "",
          quantity: "1",
          notes: "",
        });
        await refreshData("Pedido registrado.");
      })().catch((error) => {
        showToast({
          variant: "error",
          message:
            error instanceof Error
              ? error.message
              : "Falha ao registrar pedido.",
        });
      });
    });
  }

  const summaryCards = dashboard
    ? [
        {
          label: "Receita do mês",
          value: formatCurrency(dashboard.summary.monthRevenueInCents),
          tone: "primary",
        },
        {
          label: "Receita de hoje",
          value: formatCurrency(dashboard.summary.todayRevenueInCents),
          tone: "secondary",
        },
        {
          label: "Pedidos hoje",
          value: String(dashboard.summary.ordersToday),
          tone: "neutral",
        },
        {
          label: "Itens em alerta",
          value: String(dashboard.summary.lowStockCount),
          tone: "warning",
        },
      ]
    : [];

  return (
    <main
      className={styles.page}
      data-primary-rail-state={isPrimaryRailExpanded ? "expanded" : "collapsed"}
    >
      <header className={styles.mobileTopBar}>
        <button
          type="button"
          className={styles.mobileTopBarLogo}
          aria-label="Início"
          onClick={() => router.push("/indice")}
        >
          <DaBiTechLogo className={styles.mobileLogo} mode="symbol" />
        </button>

        <button
          type="button"
          className={styles.mobileTopBarHamburger}
          aria-label="Abrir menu"
          aria-pressed={isMobileMenuOpen && mobileMenuMode === "nav"}
          onClick={() => {
            setMobileMenuMode("nav");
            setIsMobileMenuOpen((prev) => !prev);
          }}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <button
          type="button"
          className={styles.mobileTopBarProfile}
          aria-label="Perfil"
          aria-pressed={isMobileMenuOpen && mobileMenuMode === "profile"}
          onClick={() => {
            setIsMobileMenuOpen((prev) => {
              const willClose = prev && mobileMenuMode === "profile";
              return !willClose;
            });
            setMobileMenuMode("profile");
          }}
        >
          <span className={styles.profileDockAvatar}>
            {getInitials(currentUser.name)}
          </span>
        </button>
      </header>

      {isMobileMenuOpen ? (
        <div
          className={styles.mobileMenuOverlay}
          role="dialog"
          aria-modal="true"
          aria-label={mobileMenuMode === "profile" ? "Menu do perfil" : "Menu"}
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsMobileMenuOpen(false);
          }}
        >
          <div className={styles.mobileMenuPanel}>
            {mobileMenuMode === "profile" ? (
              <>
                <div className={styles.mobileMenuHeaderRow}>
                  <p className={styles.mobileMenuTitle}>Perfil</p>
                  <button
                    type="button"
                    className={styles.mobileMenuClose}
                    aria-label="Fechar"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    ×
                  </button>
                </div>
                <nav className={styles.mobileMenuList}>
                  {profileItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={styles.mobileMenuItem}
                      onClick={() => {
                        showToast({ message: `Abrir: ${item.label}` });
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <span className={styles.mobileMenuItemIcon} aria-hidden="true">
                        <ProfileIcon kind={item.icon} />
                      </span>
                      {item.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    className={styles.mobileMenuItem}
                    onClick={() => window.location.assign("/api/auth/logout")}
                  >
                    sair
                  </button>
                </nav>
              </>
            ) : (
              <>
                <div className={styles.mobileMenuHeaderRow}>
                  <p className={styles.mobileMenuTitle}>Menu</p>
                  <button
                    type="button"
                    className={styles.mobileMenuClose}
                    aria-label="Fechar"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    ×
                  </button>
                </div>
                <nav className={styles.mobileMenuGroups}>
                  {navigationGroups.map((group) => (
                    <button
                      key={group.id}
                      type="button"
                      className={
                        group.id === activeGroupId
                          ? styles.mobileMenuGroupActive
                          : styles.mobileMenuGroup
                      }
                      onClick={() => setActiveGroupId(group.id)}
                    >
                      {group.label}
                    </button>
                  ))}
                </nav>
                <nav className={styles.mobileMenuList}>
                  {activeGroup.items.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={
                        item === activeMenuItem
                          ? styles.mobileMenuItemActive
                          : styles.mobileMenuItem
                      }
                      onClick={() => {
                        if (item === "Ajuda do ERP") {
                          window.open("/ajuda-do-erp", "_blank", "noopener,noreferrer");
                          setIsMobileMenuOpen(false);
                          return;
                        }
                        const route = menuRoutes[item as keyof typeof menuRoutes];
                        if (route) {
                          const nextGroupId = navigationGroups.find((nextGroup) =>
                            nextGroup.items.some((groupItem) => groupItem === item)
                          )?.id;
                          if (nextGroupId) setActiveGroupId(nextGroupId);
                          setActiveMenuItem(item);
                          if (pathname !== route) router.push(route);
                          setIsMobileMenuOpen(false);
                          return;
                        }
                        setActiveMenuItem(item);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </nav>
              </>
            )}
          </div>
        </div>
      ) : null}

      <aside className={styles.primaryRailShell}>
        <div className={styles.hamburgerDock} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className={styles.logoBadge} aria-hidden="true">
          <DaBiTechLogo className={styles.railLogoFull} />
          <DaBiTechLogo className={styles.railLogoSymbol} mode="symbol" />
        </div>

        <button
          className={
            isPrimaryRailExpanded
              ? styles.railModeDockButtonActive
              : styles.railModeDockButton
          }
          onClick={() => setIsPrimaryRailExpanded((current) => !current)}
          type="button"
          aria-label={
            isPrimaryRailExpanded
              ? "Colapsar menu lateral esquerdo"
              : "Expandir menu lateral esquerdo"
          }
          aria-pressed={isPrimaryRailExpanded}
          title={isPrimaryRailExpanded ? "Colapsar menu" : "Expandir menu"}
        >
          <span aria-hidden="true">↔</span>
        </button>

        <button
          className={
            isProfileMenuOpen
              ? styles.profileDockButtonActive
              : styles.profileDockButton
          }
          onClick={() => setIsProfileMenuOpen((current) => !current)}
          type="button"
          aria-label="Perfil"
          aria-pressed={isProfileMenuOpen}
        >
          <span className={styles.profileDockAvatar}>
            {getInitials(currentUser.name)}
          </span>
        </button>

        <div className={styles.primaryRail}>
          <div className={styles.primaryRailTop}>
            <nav className={styles.primaryNav}>
              {navigationGroups.map((group) => (
                <button
                  key={group.id}
                  className={
                    group.id === activeGroupId
                      ? styles.primaryNavItemActive
                      : styles.primaryNavItem
                  }
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    setActiveGroupId(group.id);
                    setActiveMenuItem(group.items[0]);
                  }}
                  title={group.label}
                  type="button"
                >
                  {group.id === activeGroupId ? (
                    <MenuSelectionShape
                      className={styles.primaryNavSelectionShape}
                    />
                  ) : null}
                  <span className={styles.primaryNavText}>{group.label}</span>
                </button>
              ))}
            </nav>

            <div className={styles.primaryQuickLinks}>
              {supportLinks.map((item) => (
                <button
                  key={item}
                  className={
                    item === activeMenuItem
                      ? styles.primaryQuickLinkActive
                      : styles.primaryQuickLink
                  }
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    setActiveMenuItem(item);
                  }}
                  title={item}
                  type="button"
                >
                  <span className={styles.primaryQuickLinkText}>{item}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <aside
        className={`${styles.secondarySidebar} ${
          isProfileMenuOpen ? styles.secondarySidebarProfileMode : ""
        }`}
      >
        {isProfileMenuOpen ? (
          <>
            <div className={styles.secondarySidebarSpacer} aria-hidden="true" />
            <nav className={styles.profileMenu} aria-label="Menu do perfil">
              {profileItems.map((item) => (
                <button
                  key={item.id}
                  className={
                    item.accent
                      ? styles.profileMenuItemAccent
                      : styles.profileMenuItem
                  }
                  onClick={() => {
                    // TODO: conectar navegação real.
                    showToast({ message: `Abrir: ${item.label}` });
                    setIsProfileMenuOpen(false);
                  }}
                  type="button"
                >
                  <span className={styles.profileMenuIcon} aria-hidden="true">
                    <ProfileIcon kind={item.icon} />
                  </span>
                  <span className={styles.profileMenuText}>{item.label}</span>
                </button>
              ))}
            </nav>
            <button
              className={styles.profileLogoutButton}
              onClick={() => window.location.assign("/api/auth/logout")}
              type="button"
            >
              sair
            </button>
          </>
        ) : (
          <>
            <div className={styles.secondaryMenu}>
              {activeGroup.items.map((item) => (
                <button
                  key={item}
                  className={
                    item === activeMenuItem
                      ? styles.secondaryMenuItemActive
                      : styles.secondaryMenuItem
                  }
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    if (item === "Ajuda do ERP") {
                      window.open(
                        "/ajuda-do-erp",
                        "_blank",
                        "noopener,noreferrer"
                      );
                      return;
                    }
                    const route = menuRoutes[item as keyof typeof menuRoutes];
                    if (route) {
                      const nextGroupId = navigationGroups.find((group) =>
                        group.items.some((groupItem) => groupItem === item)
                      )?.id;
                      if (nextGroupId) {
                        setActiveGroupId(nextGroupId);
                      }
                      setActiveMenuItem(item);
                      if (pathname !== route) {
                        router.push(route);
                      }
                      return;
                    }
                    setActiveMenuItem(item);
                  }}
                  type="button"
                >
                  <span className={styles.secondaryMenuIcon} aria-hidden="true">
                    <SecondaryMenuIcon label={item} />
                  </span>
                  <span className={styles.secondaryMenuLabel}>{item}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </aside>

      <section className={styles.workspace}>
        {activeMenuItem === "Índice" ? (
          <IndiceContent currentUser={currentUser} />
        ) : activeMenuItem === "Dashboard" ? (
          <DashboardContent
            isRefreshing={isLoading}
            onRefresh={() => void refreshData()}
          />
        ) : activeMenuItem === "Agenda" ? (
          <AgendaContent currentUser={currentUser} />
        ) : activeMenuItem === "Minha conta" ? (
          <MyAccountContent
            currentUser={currentUser}
            onBack={() => {
              setActiveGroupId("inicio");
              setActiveMenuItem("Índice");
              router.push("/indice");
            }}
          />
        ) : activeMenuItem === "Integrações" ? (
          <IntegrationsContent currentUser={currentUser} />
        ) : activeMenuItem === "Upgrade de plano" ? (
          <UpgradePlanContent currentUser={currentUser} />
        ) : activeMenuItem === "Sobre a versão" ? (
          <VersionContent currentUser={currentUser} />
        ) : activeMenuItem === "Ferramentas" ? (
          <ToolsContent currentUser={currentUser} />
        ) : activeMenuItem === "Loja de extensões" ? (
          <ExtensionsStoreContent currentUser={currentUser} />
        ) : activeMenuItem === "Clientes e Fornecedores" ? (
          <CustomersSuppliersContent currentUser={currentUser} />
        ) : activeMenuItem === "Produtos" ? (
          <ProductsContent currentUser={currentUser} />
        ) : activeMenuItem === "Campanhas Promocionais" ? (
          <PromotionalCampaignsContent currentUser={currentUser} />
        ) : activeMenuItem === "Serviços" ? (
          <ServicesContent currentUser={currentUser} />
        ) : (
          <>
            <header className={styles.hero}>
              <div className={styles.heroContent}>
                <span className={styles.panelEyebrow}>{activeGroup.label}</span>
                <h1>{activeMenuItem}</h1>
                <p>
                  Navegação em trilho duplo: módulo colapsado à esquerda e
                  submenu completo ao lado, no padrão de operação que você
                  pediu.
                </p>
              </div>

              <div className={styles.heroActions}>
                <input
                  className={styles.searchInput}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={`Buscar dentro de ${activeGroup.label.toLowerCase()}...`}
                  value={search}
                />
                <button
                  className={styles.primaryButton}
                  onClick={() => void refreshData("Dados atualizados.")}
                  type="button"
                >
                  {isLoading ? "Atualizando..." : "Atualizar"}
                </button>
              </div>
            </header>

            <section className={styles.summaryGrid}>
              {summaryCards.map((card) => (
                <article
                  key={card.label}
                  className={`${styles.metricCard} ${
                    styles[
                      `tone${card.tone[0].toUpperCase()}${card.tone.slice(1)}`
                    ]
                  }`}
                >
                  <span>{card.label}</span>
                  <strong>{card.value}</strong>
                </article>
              ))}
            </section>

            <section className={styles.storyGrid}>
              <article className={styles.panel}>
                <div className={styles.panelHeader}>
                  <div>
                    <span className={styles.panelEyebrow}>
                      Operação ao vivo
                    </span>
                    <h2>Indicadores rápidos</h2>
                  </div>
                </div>
                <div className={styles.list}>
                  <div className={styles.listRow}>
                    <div>
                      <strong>{dashboard?.summary.ordersToday ?? 0}</strong>
                      <p>pedidos capturados hoje</p>
                    </div>
                    <div>
                      <strong>{conversionRate}%</strong>
                      <p>pressão comercial</p>
                    </div>
                  </div>
                  <div className={styles.listRow}>
                    <div>
                      <strong>R$ {marginPreview}</strong>
                      <p>margem média estimada por item</p>
                    </div>
                    <div>
                      <strong>
                        {dashboard?.summary.activeProductsCount ?? 0}
                      </strong>
                      <p>produtos ativos</p>
                    </div>
                  </div>
                </div>
              </article>

              <article className={styles.panel}>
                <div className={styles.panelHeader}>
                  <div>
                    <span className={styles.panelEyebrow}>Ritmo recente</span>
                    <h2>Pedidos mais recentes</h2>
                  </div>
                </div>
                <div className={styles.list}>
                  {dashboard?.recentOrders.map((order) => (
                    <div key={order.id} className={styles.listRow}>
                      <div>
                        <strong>#{order.orderNumber}</strong>
                        <p>{order.customerName}</p>
                      </div>
                      <div>
                        <strong>{formatCurrency(order.totalInCents)}</strong>
                        <p>{formatDate(order.createdAt)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </section>

            <section className={styles.contentGrid}>
              <div className={styles.mainColumn}>
                <article className={styles.panel}>
                  <div className={styles.panelHeader}>
                    <div>
                      <span className={styles.panelEyebrow}>Pedidos</span>
                      <h2>Fila comercial</h2>
                    </div>
                    <span className={styles.countBadge}>
                      {filteredOrders.length} resultados
                    </span>
                  </div>
                  <div className={styles.table}>
                    {filteredOrders.map((order) => (
                      <div key={order.id} className={styles.tableRow}>
                        <div>
                          <strong>#{order.orderNumber}</strong>
                          <p>{order.customerName}</p>
                        </div>
                        <div>
                          <strong>
                            {order.items.reduce(
                              (sum, item) => sum + item.quantity,
                              0
                            )}{" "}
                            itens
                          </strong>
                          <p>{order.status}</p>
                        </div>
                        <div>
                          <strong>{formatCurrency(order.totalInCents)}</strong>
                          <p>{formatDate(order.createdAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>

                <article className={styles.panel}>
                  <div className={styles.panelHeader}>
                    <div>
                      <span className={styles.panelEyebrow}>Catálogo</span>
                      <h2>Produtos ativos</h2>
                    </div>
                    <span className={styles.countBadge}>
                      {filteredProducts.length} SKUs
                    </span>
                  </div>
                  <div className={styles.table}>
                    {filteredProducts.map((product) => (
                      <div key={product.id} className={styles.tableRow}>
                        <div>
                          <strong>{product.name}</strong>
                          <p>
                            {product.sku} · {product.category}
                          </p>
                        </div>
                        <div>
                          <strong>
                            {formatCurrency(product.priceInCents)}
                          </strong>
                          <p>Estoque {product.stockQuantity}</p>
                        </div>
                        <div>
                          <strong>{formatCurrency(product.costInCents)}</strong>
                          <p>Cadastro {formatDateOnly(product.createdAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>

                <article className={styles.panel}>
                  <div className={styles.panelHeader}>
                    <div>
                      <span className={styles.panelEyebrow}>Carteira</span>
                      <h2>Clientes acompanhados</h2>
                    </div>
                    <span className={styles.countBadge}>
                      {filteredCustomers.length} contas
                    </span>
                  </div>
                  <div className={styles.table}>
                    {filteredCustomers.map((customer) => (
                      <div key={customer.id} className={styles.tableRow}>
                        <div>
                          <strong>{customer.name}</strong>
                          <p>
                            {customer.email ?? "Sem email"} ·{" "}
                            {customer.city ?? "Cidade não informada"}
                          </p>
                        </div>
                        <div>
                          <strong>{customer.ordersCount} pedidos</strong>
                          <p>{customer.phone ?? "Sem telefone"}</p>
                        </div>
                        <div>
                          <strong>
                            {formatCurrency(customer.totalRevenueInCents)}
                          </strong>
                          <p>{formatDateOnly(customer.createdAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              </div>

              <aside className={styles.sideColumn}>
                <article className={styles.panel}>
                  <div className={styles.panelHeader}>
                    <div>
                      <span className={styles.panelEyebrow}>Ação rápida</span>
                      <h2>Novo cliente</h2>
                    </div>
                  </div>
                  <form className={styles.form} onSubmit={handleCreateCustomer}>
                    <input
                      className={styles.field}
                      onChange={(event) =>
                        setCustomerForm((current) => ({
                          ...current,
                          name: event.target.value,
                        }))
                      }
                      placeholder="Nome da conta"
                      value={customerForm.name}
                    />
                    <input
                      className={styles.field}
                      onChange={(event) =>
                        setCustomerForm((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }
                      placeholder="Email"
                      value={customerForm.email}
                    />
                    <input
                      className={styles.field}
                      onChange={(event) =>
                        setCustomerForm((current) => ({
                          ...current,
                          phone: event.target.value,
                        }))
                      }
                      placeholder="Telefone"
                      value={customerForm.phone}
                    />
                    <input
                      className={styles.field}
                      onChange={(event) =>
                        setCustomerForm((current) => ({
                          ...current,
                          city: event.target.value,
                        }))
                      }
                      placeholder="Cidade"
                      value={customerForm.city}
                    />
                    <button
                      className={styles.primaryButton}
                      disabled={isSaving}
                      type="submit"
                    >
                      Criar cliente
                    </button>
                  </form>
                </article>

                <article className={styles.panel}>
                  <div className={styles.panelHeader}>
                    <div>
                      <span className={styles.panelEyebrow}>Ação rápida</span>
                      <h2>Novo produto</h2>
                    </div>
                  </div>
                  <form className={styles.form} onSubmit={handleCreateProduct}>
                    <input
                      className={styles.field}
                      placeholder="Nome"
                      value={productForm.name}
                      onChange={(event) =>
                        setProductForm((current) => ({
                          ...current,
                          name: event.target.value,
                        }))
                      }
                    />
                    <input
                      className={styles.field}
                      placeholder="SKU"
                      value={productForm.sku}
                      onChange={(event) =>
                        setProductForm((current) => ({
                          ...current,
                          sku: event.target.value,
                        }))
                      }
                    />
                    <input
                      className={styles.field}
                      placeholder="Categoria"
                      value={productForm.category}
                      onChange={(event) =>
                        setProductForm((current) => ({
                          ...current,
                          category: event.target.value,
                        }))
                      }
                    />
                    <input
                      className={styles.field}
                      placeholder="Preço"
                      value={productForm.price}
                      onChange={(event) =>
                        setProductForm((current) => ({
                          ...current,
                          price: event.target.value,
                        }))
                      }
                    />
                    <input
                      className={styles.field}
                      placeholder="Custo"
                      value={productForm.cost}
                      onChange={(event) =>
                        setProductForm((current) => ({
                          ...current,
                          cost: event.target.value,
                        }))
                      }
                    />
                    <input
                      className={styles.field}
                      placeholder="Estoque inicial"
                      value={productForm.stockQuantity}
                      onChange={(event) =>
                        setProductForm((current) => ({
                          ...current,
                          stockQuantity: event.target.value,
                        }))
                      }
                    />
                    <button
                      className={styles.primaryButton}
                      disabled={isSaving}
                      type="submit"
                    >
                      Criar produto
                    </button>
                  </form>
                </article>

                <article className={styles.panel}>
                  <div className={styles.panelHeader}>
                    <div>
                      <span className={styles.panelEyebrow}>Ação rápida</span>
                      <h2>Novo pedido</h2>
                    </div>
                  </div>
                  <form className={styles.form} onSubmit={handleCreateOrder}>
                    <select
                      className={styles.field}
                      value={orderForm.customerId}
                      onChange={(event) =>
                        setOrderForm((current) => ({
                          ...current,
                          customerId: event.target.value,
                        }))
                      }
                    >
                      <option value="">Selecione o cliente</option>
                      {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.name}
                        </option>
                      ))}
                    </select>
                    <select
                      className={styles.field}
                      value={orderForm.productId}
                      onChange={(event) =>
                        setOrderForm((current) => ({
                          ...current,
                          productId: event.target.value,
                        }))
                      }
                    >
                      <option value="">Selecione o produto</option>
                      {products
                        .filter((product) => product.active)
                        .map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                    </select>
                    <input
                      className={styles.field}
                      min="1"
                      onChange={(event) =>
                        setOrderForm((current) => ({
                          ...current,
                          quantity: event.target.value,
                        }))
                      }
                      placeholder="Quantidade"
                      type="number"
                      value={orderForm.quantity}
                    />
                    <textarea
                      className={styles.field}
                      onChange={(event) =>
                        setOrderForm((current) => ({
                          ...current,
                          notes: event.target.value,
                        }))
                      }
                      placeholder="Observações"
                      rows={3}
                      value={orderForm.notes}
                    />
                    <button
                      className={styles.primaryButton}
                      disabled={isSaving}
                      type="submit"
                    >
                      Registrar pedido
                    </button>
                  </form>
                </article>

                <article className={styles.panel}>
                  <div className={styles.panelHeader}>
                    <div>
                      <span className={styles.panelEyebrow}>Alerta</span>
                      <h2>Baixo estoque</h2>
                    </div>
                  </div>
                  <div className={styles.list}>
                    {dashboard?.lowStockProducts.map((product) => (
                      <div key={product.id} className={styles.listRow}>
                        <div>
                          <strong>{product.name}</strong>
                          <p>{product.sku}</p>
                        </div>
                        <div>
                          <strong>{product.stockQuantity}</strong>
                          <p>mínimo {product.minimumStock}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              </aside>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
