"use client";

import { FormEvent, useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DaBiTechLogo } from "@/components/shared/dabi-tech-logo";
import { useToast } from "@/components/shared/toast-provider";
import { MenuSelectionShape } from "./shell/ui/menu-selection-shape";
import type {
  CurrentUser,
  DashboardData,
  SalesCustomer,
  SalesOrder,
  SalesProduct,
} from "./types";
import styles from "./landing-page.module.css";
import { ShellContentRouter } from "./shell/content/shell-content-router";
import { ShellDefaultWorkspace } from "./shell/content/shell-default-workspace";
import {
  menuItemByPath,
  menuRoutes,
  navigationGroups,
  supportLinks,
} from "./shell/navigation/navigation-config";
import type { NavigationGroupId } from "./shell/navigation/navigation-config";

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
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isThemeHydrated, setIsThemeHydrated] = useState(false);
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedTheme = window.localStorage.getItem("sales-system-theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
    }
    setIsThemeHydrated(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isThemeHydrated) return;
    window.localStorage.setItem("sales-system-theme", theme);
  }, [isThemeHydrated, theme]);

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

  const notifications = useMemo<Array<{ id: string; text: string }>>(() => [], []);

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

  function NotificationBellIcon() {
    return (
      <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
        <path
          d="M10 3.4a4.6 4.6 0 0 0-4.6 4.6v2.2c0 .7-.2 1.4-.6 2l-1 1.4h12.4l-1-1.4c-.4-.6-.6-1.3-.6-2V8A4.6 4.6 0 0 0 10 3.4Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
        <path
          d="M8.3 15.4a1.7 1.7 0 0 0 3.4 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>
    );
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
      data-theme={theme}
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
                        setIsProfileMenuOpen(false);

                        if (item.label === "Dados da empresa") {
                          setActiveGroupId("inicio");
                          setActiveMenuItem("Dados da empresa");
                          router.push("/dados-da-empresa");
                          return;
                        }

                        showToast({ message: `Abrir: ${item.label}` });
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
        <button
          className={styles.hamburgerDock}
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
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <div className={styles.logoBadge} aria-hidden="true">
          <DaBiTechLogo className={styles.railLogoFull} />
          <DaBiTechLogo className={styles.railLogoSymbol} mode="symbol" />
        </div>

        <button
          className={styles.notificationDockButton}
          onClick={() => {
            setIsProfileMenuOpen(false);
            setIsPrimaryRailExpanded(true);
            setIsNotificationsOpen((current) => !current);
          }}
          type="button"
          aria-label="Notificações"
          aria-pressed={isNotificationsOpen}
          title="Notificações"
        >
          <span aria-hidden="true">
            <NotificationBellIcon />
          </span>
        </button>

        <button
          className={styles.helpDockButton}
          onClick={() => {
            window.open("/ajuda-do-erp", "_blank", "noopener,noreferrer");
          }}
          type="button"
          aria-label="Ajuda"
          title="Ajuda"
        >
          <span aria-hidden="true">?</span>
        </button>

        <button
          className={styles.appearanceDockButton}
          onClick={() =>
            setTheme((current) => (current === "dark" ? "light" : "dark"))
          }
          type="button"
          aria-label="Aparência"
          aria-pressed={theme === "light"}
          title="Aparência"
        >
          <span aria-hidden="true">◐</span>
        </button>

        <button
          className={
            isProfileMenuOpen
              ? styles.profileDockButtonActive
              : styles.profileDockButton
          }
          onClick={() => {
            setIsNotificationsOpen(false);
            setIsProfileMenuOpen((current) => !current);
          }}
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
                    setIsNotificationsOpen(false);
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
          </div>

          <div className={styles.primaryRailBottom}>
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
                    setIsNotificationsOpen(false);
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
        className={`${styles.secondarySidebar} ${isProfileMenuOpen ? styles.secondarySidebarProfileMode : ""
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
                    setIsProfileMenuOpen(false);

                    if (item.label === "Dados da empresa") {
                      setActiveGroupId("inicio");
                      setActiveMenuItem("Dados da empresa");
                      router.push("/dados-da-empresa");
                      return;
                    }

                    showToast({ message: `Abrir: ${item.label}` });
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
        ) : isNotificationsOpen ? (
          <div className={styles.secondaryNotifications}>
            <h2 className={styles.secondaryNotificationsTitle}>Minhas notificações</h2>
            {notifications.length > 0 ? (
              <div className={styles.secondaryNotificationsList}>
                {notifications.map((notification) => (
                  <p key={notification.id} className={styles.secondaryNotificationItem}>
                    {notification.text}
                  </p>
                ))}
              </div>
            ) : (
              <p className={styles.secondaryNotificationsEmpty}>Sem notificações.</p>
            )}
          </div>
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
                    setIsNotificationsOpen(false);
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
        <ShellContentRouter
          activeMenuItem={activeMenuItem}
          currentUser={currentUser}
          isRefreshing={isLoading}
          onRefresh={() => void refreshData()}
          onMyAccountBack={() => {
            setActiveGroupId("inicio");
            setActiveMenuItem("Índice");
            router.push("/indice");
          }}
          fallback={
            <ShellDefaultWorkspace
              activeGroupLabel={activeGroup.label}
              activeMenuItem={activeMenuItem}
              search={search}
              setSearch={setSearch}
              isLoading={isLoading}
              isSaving={isSaving}
              refreshData={refreshData}
              summaryCards={summaryCards}
              dashboard={dashboard}
              conversionRate={conversionRate}
              marginPreview={marginPreview}
              filteredOrders={filteredOrders}
              filteredProducts={filteredProducts}
              filteredCustomers={filteredCustomers}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
              formatDateOnly={formatDateOnly}
              handleCreateCustomer={handleCreateCustomer}
              handleCreateProduct={handleCreateProduct}
              handleCreateOrder={handleCreateOrder}
              customerForm={customerForm}
              setCustomerForm={setCustomerForm}
              productForm={productForm}
              setProductForm={setProductForm}
              orderForm={orderForm}
              setOrderForm={setOrderForm}
              customers={customers}
              products={products}
            />
          }
        />
      </section>
    </main>
  );
}
