"use client";

import type { ReactNode } from "react";
import { AgendaContent } from "../../agenda-content";
import { CategoriesProductsContent } from "../../categories";
import { CompanyDataPage } from "../../company-data";
import { CustomersSuppliersContent } from "../../customers-suppliers-content";
import { DashboardContent } from "../../dashboard-content";
import { ExtensionsStoreContent } from "../../extensions-store-content";
import { IndiceContent } from "../../indice-content";
import { IntegrationsContent } from "../../integrations-content";
import { MyAccountContent } from "../../my-account-content";
import { PackagingContent } from "../../packaging";
import { ReportsContent } from "../../reports/reports-content";
import { ProductsContent } from "../../products";
import { PromotionalCampaignsContent } from "../../promotional-campaigns-content";
import { ServicesContent } from "../../services-content";
import { StockControlContent } from "../../stock-control-content";
import type { CurrentUser } from "../../types";
import { ToolsContent } from "../../tools-content";
import { UpgradePlanContent } from "../../upgrade-plan-content";
import { VendorsContent } from "../../vendors";
import { VersionContent } from "../../version-content";


type ShellContentRouterProps = {
  activeMenuItem: string;
  currentUser: CurrentUser;
  isRefreshing: boolean;
  onRefresh: () => void;
  onMyAccountBack: () => void;
  fallback: ReactNode;
};

export function ShellContentRouter({
  activeMenuItem,
  currentUser,
  isRefreshing,
  onRefresh,
  onMyAccountBack,
  fallback,
}: ShellContentRouterProps) {
  if (activeMenuItem === "Índice") {
    return <IndiceContent currentUser={currentUser} />;
  }

  if (activeMenuItem === "Dashboard") {
    return <DashboardContent isRefreshing={isRefreshing} onRefresh={onRefresh} />;
  }

  if (activeMenuItem === "Agenda") {
    return <AgendaContent currentUser={currentUser} />;
  }

  if (activeMenuItem === "Minha conta") {
    return <MyAccountContent currentUser={currentUser} onBack={onMyAccountBack} />;
  }

  if (activeMenuItem === "Dados da empresa") {
    return <CompanyDataPage currentUser={currentUser} />;
  }

  if (activeMenuItem === "Integrações") {
    return <IntegrationsContent currentUser={currentUser} />;
  }

  if (activeMenuItem === "Upgrade de plano") {
    return <UpgradePlanContent currentUser={currentUser} />;
  }

  if (activeMenuItem === "Sobre a versão") {
    return <VersionContent currentUser={currentUser} />;
  }

  if (activeMenuItem === "Ferramentas") {
    return <ToolsContent currentUser={currentUser} />;
  }

  if (activeMenuItem === "Loja de extensões") {
    return <ExtensionsStoreContent currentUser={currentUser} />;
  }

  if (activeMenuItem === "Clientes e Fornecedores") {
    return <CustomersSuppliersContent currentUser={currentUser} />;
  }

  if (activeMenuItem === "Produtos") {
    return <ProductsContent currentUser={currentUser} />;
  }

  if (activeMenuItem === "Campanhas Promocionais") {
    return <PromotionalCampaignsContent currentUser={currentUser} />;
  }

  if (activeMenuItem === "Categorias dos Produtos") {
    return <CategoriesProductsContent currentUser={currentUser} />;
  }

  if (activeMenuItem === "Embalagens") {
    return <PackagingContent currentUser={currentUser} />;
  }

  if (activeMenuItem === "Relatórios") {
  return <ReportsContent currentUser={currentUser} />;
}

  if (activeMenuItem === "Vendedores") {
    return <VendorsContent currentUser={currentUser} />;
  }

  if (activeMenuItem === "Serviços") {
    return <ServicesContent currentUser={currentUser} />;
  }

  if (activeMenuItem === "Controle de Estoques") {
    return <StockControlContent currentUser={currentUser} />;
  }

  return <>{fallback}</>;
}
