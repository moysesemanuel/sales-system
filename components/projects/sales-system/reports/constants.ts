export type ReportGroup = {
  id: string;
  name: string;
};

export type ReportItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  groupId: string;
};

export const reportGroups: ReportGroup[] = [
  {
    id: "products",
    name: "Produtos",
  },
];

export const reportItems: ReportItem[] = [
  {
    id: "product-price-list",
    title: "Relatório de Preços dos Produtos",
    description: "Impressão da lista de preços agrupada por tags.",
    href: "#",
    groupId: "products",
  },
];