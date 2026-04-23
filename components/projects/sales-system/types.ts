export type DashboardData = {
  summary: {
    customersCount: number;
    activeProductsCount: number;
    lowStockCount: number;
    monthRevenueInCents: number;
    todayRevenueInCents: number;
    ordersToday: number;
  };
  lowStockProducts: Array<{
    id: string;
    name: string;
    sku: string;
    stockQuantity: number;
    minimumStock: number;
  }>;
  recentOrders: Array<{
    id: string;
    orderNumber: number;
    customerName: string;
    status: string;
    totalInCents: number;
    itemCount: number;
    createdAt: string;
  }>;
  topProducts: Array<{
    productId: string;
    name: string;
    quantitySold: number;
    revenueInCents: number;
  }>;
};

export type SalesCustomer = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  document: string | null;
  city: string | null;
  state: string | null;
  notes: string | null;
  ordersCount: number;
  totalRevenueInCents: number;
  createdAt: string;
};

export type SalesProduct = {
  id: string;
  name: string;
  sku: string;
  description: string | null;
  category: string;
  priceInCents: number;
  costInCents: number;
  stockQuantity: number;
  minimumStock: number;
  active: boolean;
  createdAt: string;
};

export type SalesOrder = {
  id: string;
  orderNumber: number;
  customerId: string;
  customerName: string;
  subtotalInCents: number;
  totalInCents: number;
  status: string;
  notes: string | null;
  createdAt: string;
  items: Array<{
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    unitPriceInCents: number;
    totalPriceInCents: number;
  }>;
};

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  applications: Array<{
    key: "erp";
    label: string;
  }>;
};
