"use client";

import type { FormEvent } from "react";
import styles from "../../landing-page.module.css";
import type { DashboardData, SalesCustomer, SalesOrder, SalesProduct } from "../../types";

type SummaryCard = {
  label: string;
  value: string | number;
  tone: string;
};

type ShellDefaultWorkspaceProps = {
  activeGroupLabel: string;
  activeMenuItem: string;
  search: string;
  setSearch: (value: string) => void;
  isLoading: boolean;
  isSaving: boolean;
  refreshData: (successMessage?: string) => Promise<void>;
  summaryCards: SummaryCard[];
  dashboard: DashboardData | null;
  conversionRate: number;
  marginPreview: string | number;
  filteredOrders: SalesOrder[];
  filteredProducts: SalesProduct[];
  filteredCustomers: SalesCustomer[];
  formatCurrency: (valueInCents: number) => string;
  formatDate: (value: string) => string;
  formatDateOnly: (value: string) => string;
  handleCreateCustomer: (event: FormEvent<HTMLFormElement>) => void;
  handleCreateProduct: (event: FormEvent<HTMLFormElement>) => void;
  handleCreateOrder: (event: FormEvent<HTMLFormElement>) => void;
  customerForm: {
    name: string;
    email: string;
    phone: string;
    city: string;
  };
  setCustomerForm: (updater: (current: { name: string; email: string; phone: string; city: string }) => {
    name: string;
    email: string;
    phone: string;
    city: string;
  }) => void;
  productForm: {
    name: string;
    sku: string;
    category: string;
    price: string;
    cost: string;
    stockQuantity: string;
  };
  setProductForm: (updater: (current: {
    name: string;
    sku: string;
    category: string;
    price: string;
    cost: string;
    stockQuantity: string;
  }) => {
    name: string;
    sku: string;
    category: string;
    price: string;
    cost: string;
    stockQuantity: string;
  }) => void;
  orderForm: {
    customerId: string;
    productId: string;
    quantity: string;
    notes: string;
  };
  setOrderForm: (updater: (current: {
    customerId: string;
    productId: string;
    quantity: string;
    notes: string;
  }) => {
    customerId: string;
    productId: string;
    quantity: string;
    notes: string;
  }) => void;
  customers: SalesCustomer[];
  products: SalesProduct[];
};

export function ShellDefaultWorkspace({
  activeGroupLabel,
  activeMenuItem,
  search,
  setSearch,
  isLoading,
  isSaving,
  refreshData,
  summaryCards,
  dashboard,
  conversionRate,
  marginPreview,
  filteredOrders,
  filteredProducts,
  filteredCustomers,
  formatCurrency,
  formatDate,
  formatDateOnly,
  handleCreateCustomer,
  handleCreateProduct,
  handleCreateOrder,
  customerForm,
  setCustomerForm,
  productForm,
  setProductForm,
  orderForm,
  setOrderForm,
  customers,
  products,
}: ShellDefaultWorkspaceProps) {
  return (
    <>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.panelEyebrow}>{activeGroupLabel}</span>
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
            placeholder={`Buscar dentro de ${activeGroupLabel.toLowerCase()}...`}
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
                    <p>
                      {product.sku} · {product.category}
                    </p>
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
                    <p>
                      {customer.email ?? "Sem email"} · {customer.city ?? "Cidade não informada"}
                    </p>
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
    </>
  );
}
