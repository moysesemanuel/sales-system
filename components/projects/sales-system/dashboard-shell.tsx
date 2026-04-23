"use client";

import { FormEvent, useEffect, useMemo, useState, useTransition } from "react";
import { DaBiTechLogo } from "@/components/shared/dabi-tech-logo";
import { useToast } from "@/components/shared/toast-provider";
import { MenuSelectionShape } from "./menu-selection-shape";
import type {
  CurrentUser,
  DashboardData,
  SalesCustomer,
  SalesOrder,
  SalesProduct,
} from "./types";
import styles from "./landing-page.module.css";

const navigationGroups = [
  {
    id: "inicio",
    label: "Início",
    eyebrow: "Cockpit",
    description: "Painel geral da operação, agenda e recursos de crescimento do ERP.",
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
      "Shopping de Serviços",
    ],
  },
  {
    id: "cadastros",
    label: "Cadastros",
    eyebrow: "Base",
    description: "Entidades mestras para clientes, catálogo, campanhas, serviços e operação comercial.",
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
    description: "Estoques, compras e rotinas de entrada para dar previsibilidade ao abastecimento.",
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
    description: "CRM, pedidos, notas, automações e execução ponta a ponta da esteira comercial.",
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
    description: "Gestão de contratos, ordens de serviço, notas e cobrança operacional.",
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

export function SalesSystemDashboard({ currentUser }: { currentUser: CurrentUser }) {
  const { showToast } = useToast();
  const [activeGroupId, setActiveGroupId] = useState<NavigationGroupId>("inicio");
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");
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

  const activeGroup = navigationGroups.find((group) => group.id === activeGroupId) ?? navigationGroups[0];

  async function loadData() {
    const [dashboardResponse, customersResponse, productsResponse, ordersResponse] =
      await Promise.all([
        fetch("/api/sales-system/dashboard", { cache: "no-store" }),
        fetch("/api/sales-system/customers", { cache: "no-store" }),
        fetch("/api/sales-system/products", { cache: "no-store" }),
        fetch("/api/sales-system/orders", { cache: "no-store" }),
      ]);

    if (!dashboardResponse.ok || !customersResponse.ok || !productsResponse.ok || !ordersResponse.ok) {
      throw new Error("Não foi possível carregar os dados principais do ERP.");
    }

    const [dashboardPayload, customersPayload, productsPayload, ordersPayload] = await Promise.all([
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
          message: error instanceof Error ? error.message : "Falha ao carregar o ERP.",
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
      [String(order.orderNumber), order.customerName, order.status].some((value) =>
        value.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [orders, search]);

  const conversionRate = dashboard
    ? Math.round((dashboard.summary.ordersToday / Math.max(1, dashboard.summary.customersCount)) * 100)
    : 0;

  const marginPreview = dashboard
    ? Math.round(
        (products.reduce((sum, product) => sum + (product.priceInCents - product.costInCents), 0) /
          Math.max(1, products.length)) /
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
            message: error instanceof Error ? error.message : "Falha ao atualizar os dados.",
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

        const payload = (await response.json().catch(() => null)) as { error?: string } | null;

        if (!response.ok) {
          throw new Error(payload?.error ?? "Não foi possível cadastrar o cliente.");
        }

        setCustomerForm({ name: "", email: "", phone: "", city: "" });
        await refreshData("Cliente cadastrado.");
      })().catch((error) => {
        showToast({
          variant: "error",
          message: error instanceof Error ? error.message : "Falha ao cadastrar cliente.",
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
            priceInCents: Math.round(Number(productForm.price.replace(",", ".")) * 100),
            costInCents: Math.round(Number(productForm.cost.replace(",", ".")) * 100),
            stockQuantity: Number(productForm.stockQuantity),
            minimumStock: 0,
          }),
        });

        const payload = (await response.json().catch(() => null)) as { error?: string } | null;

        if (!response.ok) {
          throw new Error(payload?.error ?? "Não foi possível cadastrar o produto.");
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
          message: error instanceof Error ? error.message : "Falha ao cadastrar produto.",
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

        const payload = (await response.json().catch(() => null)) as { error?: string } | null;

        if (!response.ok) {
          throw new Error(payload?.error ?? "Não foi possível registrar o pedido.");
        }

        setOrderForm({ customerId: "", productId: "", quantity: "1", notes: "" });
        await refreshData("Pedido registrado.");
      })().catch((error) => {
        showToast({
          variant: "error",
          message: error instanceof Error ? error.message : "Falha ao registrar pedido.",
        });
      });
    });
  }

  const summaryCards = dashboard
    ? [
        { label: "Receita do mês", value: formatCurrency(dashboard.summary.monthRevenueInCents), tone: "primary" },
        { label: "Receita de hoje", value: formatCurrency(dashboard.summary.todayRevenueInCents), tone: "secondary" },
        { label: "Pedidos hoje", value: String(dashboard.summary.ordersToday), tone: "neutral" },
        { label: "Itens em alerta", value: String(dashboard.summary.lowStockCount), tone: "warning" },
      ]
    : [];

  return (
    <main className={styles.page}>
      <aside className={styles.primaryRailShell}>
        <div className={styles.hamburgerDock} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className={styles.primaryRail}>
          <div className={styles.primaryRailTop}>
            <div className={styles.logoBadge}>
              <DaBiTechLogo className={styles.railLogo} />
            </div>
            <nav className={styles.primaryNav}>
              {navigationGroups.map((group) => (
                <button
                  key={group.id}
                  className={group.id === activeGroupId ? styles.primaryNavItemActive : styles.primaryNavItem}
                  onClick={() => {
                    setActiveGroupId(group.id);
                    setActiveMenuItem(group.items[0]);
                  }}
                  title={group.label}
                  type="button"
                >
                  {group.id === activeGroupId ? (
                    <MenuSelectionShape className={styles.primaryNavSelectionShape} />
                  ) : null}
                  <span className={styles.primaryNavText}>{group.label}</span>
                </button>
              ))}
            </nav>

            <div className={styles.primaryQuickLinks}>
              {supportLinks.map((item) => (
                <button
                  key={item}
                  className={item === activeMenuItem ? styles.primaryQuickLinkActive : styles.primaryQuickLink}
                  onClick={() => setActiveMenuItem(item)}
                  title={item}
                  type="button"
                >
                  <span className={styles.primaryQuickLinkText}>{item}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            className={styles.logoutMiniButton}
            onClick={() => window.location.assign("/api/auth/logout")}
            type="button"
          >
            Sair
          </button>
        </div>
      </aside>

      <aside className={styles.secondarySidebar}>
        <div className={styles.secondarySidebarHeader}>
          <span className={styles.brandEyebrow}>{activeGroup.eyebrow}</span>
          <h2>{activeGroup.label}</h2>
          <p>{activeGroup.description}</p>
        </div>

        <div className={styles.secondaryMenu}>
          {activeGroup.items.map((item) => (
            <button
              key={item}
              className={item === activeMenuItem ? styles.secondaryMenuItemActive : styles.secondaryMenuItem}
              onClick={() => setActiveMenuItem(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
        <section className={styles.profileCard}>
          <div className={styles.avatar}>{getInitials(currentUser.name)}</div>
          <div>
            <strong>{currentUser.name}</strong>
            <p>{currentUser.role}</p>
          </div>
        </section>
      </aside>

      <section className={styles.workspace}>
        <header className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.panelEyebrow}>{activeGroup.label}</span>
            <h1>{activeMenuItem}</h1>
            <p>
              Navegação em trilho duplo: módulo colapsado à esquerda e submenu completo ao lado,
              no padrão de operação que você pediu.
            </p>
          </div>

          <div className={styles.heroActions}>
            <input
              className={styles.searchInput}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={`Buscar dentro de ${activeGroup.label.toLowerCase()}...`}
              value={search}
            />
            <button className={styles.primaryButton} onClick={() => void refreshData("Dados atualizados.")} type="button">
              {isLoading ? "Atualizando..." : "Atualizar"}
            </button>
          </div>
        </header>

        <section className={styles.summaryGrid}>
          {summaryCards.map((card) => (
            <article
              key={card.label}
              className={`${styles.metricCard} ${styles[`tone${card.tone[0].toUpperCase()}${card.tone.slice(1)}`]}`}
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
                <span className={styles.panelEyebrow}>Operação ao vivo</span>
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
                  <strong>{dashboard?.summary.activeProductsCount ?? 0}</strong>
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
                <span className={styles.countBadge}>{filteredOrders.length} resultados</span>
              </div>
              <div className={styles.table}>
                {filteredOrders.map((order) => (
                  <div key={order.id} className={styles.tableRow}>
                    <div>
                      <strong>#{order.orderNumber}</strong>
                      <p>{order.customerName}</p>
                    </div>
                    <div>
                      <strong>{order.items.reduce((sum, item) => sum + item.quantity, 0)} itens</strong>
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
                <span className={styles.countBadge}>{filteredProducts.length} SKUs</span>
              </div>
              <div className={styles.table}>
                {filteredProducts.map((product) => (
                  <div key={product.id} className={styles.tableRow}>
                    <div>
                      <strong>{product.name}</strong>
                      <p>{product.sku} · {product.category}</p>
                    </div>
                    <div>
                      <strong>{formatCurrency(product.priceInCents)}</strong>
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
                <span className={styles.countBadge}>{filteredCustomers.length} contas</span>
              </div>
              <div className={styles.table}>
                {filteredCustomers.map((customer) => (
                  <div key={customer.id} className={styles.tableRow}>
                    <div>
                      <strong>{customer.name}</strong>
                      <p>{customer.email ?? "Sem email"} · {customer.city ?? "Cidade não informada"}</p>
                    </div>
                    <div>
                      <strong>{customer.ordersCount} pedidos</strong>
                      <p>{customer.phone ?? "Sem telefone"}</p>
                    </div>
                    <div>
                      <strong>{formatCurrency(customer.totalRevenueInCents)}</strong>
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
                <input className={styles.field} onChange={(event) => setCustomerForm((current) => ({ ...current, name: event.target.value }))} placeholder="Nome da conta" value={customerForm.name} />
                <input className={styles.field} onChange={(event) => setCustomerForm((current) => ({ ...current, email: event.target.value }))} placeholder="Email" value={customerForm.email} />
                <input className={styles.field} onChange={(event) => setCustomerForm((current) => ({ ...current, phone: event.target.value }))} placeholder="Telefone" value={customerForm.phone} />
                <input className={styles.field} onChange={(event) => setCustomerForm((current) => ({ ...current, city: event.target.value }))} placeholder="Cidade" value={customerForm.city} />
                <button className={styles.primaryButton} disabled={isSaving} type="submit">
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
                <input className={styles.field} placeholder="Nome" value={productForm.name} onChange={(event) => setProductForm((current) => ({ ...current, name: event.target.value }))} />
                <input className={styles.field} placeholder="SKU" value={productForm.sku} onChange={(event) => setProductForm((current) => ({ ...current, sku: event.target.value }))} />
                <input className={styles.field} placeholder="Categoria" value={productForm.category} onChange={(event) => setProductForm((current) => ({ ...current, category: event.target.value }))} />
                <input className={styles.field} placeholder="Preço" value={productForm.price} onChange={(event) => setProductForm((current) => ({ ...current, price: event.target.value }))} />
                <input className={styles.field} placeholder="Custo" value={productForm.cost} onChange={(event) => setProductForm((current) => ({ ...current, cost: event.target.value }))} />
                <input className={styles.field} placeholder="Estoque inicial" value={productForm.stockQuantity} onChange={(event) => setProductForm((current) => ({ ...current, stockQuantity: event.target.value }))} />
                <button className={styles.primaryButton} disabled={isSaving} type="submit">
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
                <select className={styles.field} value={orderForm.customerId} onChange={(event) => setOrderForm((current) => ({ ...current, customerId: event.target.value }))}>
                  <option value="">Selecione o cliente</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
                <select className={styles.field} value={orderForm.productId} onChange={(event) => setOrderForm((current) => ({ ...current, productId: event.target.value }))}>
                  <option value="">Selecione o produto</option>
                  {products.filter((product) => product.active).map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
                <input className={styles.field} min="1" onChange={(event) => setOrderForm((current) => ({ ...current, quantity: event.target.value }))} placeholder="Quantidade" type="number" value={orderForm.quantity} />
                <textarea className={styles.field} onChange={(event) => setOrderForm((current) => ({ ...current, notes: event.target.value }))} placeholder="Observações" rows={3} value={orderForm.notes} />
                <button className={styles.primaryButton} disabled={isSaving} type="submit">
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
      </section>
    </main>
  );
}
