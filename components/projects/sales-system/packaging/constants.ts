export const packagingTypeOptions = [
  "Envelope",
  "Pacote / Caixa",
  "Rolo Cilindro",
] as const;

export type PackagingType = (typeof packagingTypeOptions)[number];

export type PackagingItem = {
  id: string;
  description: string;
  type: PackagingType;
  width: string;
  length: string;
  height?: string;
  weight: string;
  isDefault?: boolean;
};

export const correiosPackagingTemplates: Omit<PackagingItem, "id">[] = [
  { description: "Caixa de Encomenda Flex", type: "Pacote / Caixa", width: "26,00", length: "21,00", height: "1,00", weight: "0,09" },
  { description: "Caixa de Encomenda Flex", type: "Pacote / Caixa", width: "26,00", length: "21,00", height: "2,00", weight: "0,18" },
  { description: "Caixa de Encomenda Flex", type: "Pacote / Caixa", width: "26,00", length: "21,00", height: "3,00", weight: "0,27" },
  { description: "Caixa de Encomenda Flex", type: "Pacote / Caixa", width: "26,00", length: "21,00", height: "4,00", weight: "0,36" },
  { description: "Caixa de Encomenda Flex", type: "Pacote / Caixa", width: "26,00", length: "21,00", height: "5,00", weight: "0,46" },
  { description: "Caixa de Encomenda Flex", type: "Pacote / Caixa", width: "26,00", length: "21,00", height: "6,00", weight: "0,55" },
  { description: "Caixa de Encomenda CE - 01", type: "Pacote / Caixa", width: "18,00", length: "13,50", height: "9,00", weight: "0,36" },
  { description: "Caixa de Encomenda CE - 02", type: "Pacote / Caixa", width: "27,00", length: "18,00", height: "9,00", weight: "0,73" },
  { description: "Caixa de Encomenda CE - 03", type: "Pacote / Caixa", width: "27,00", length: "22,50", height: "13,50", weight: "1,37" },
  { description: "Caixa de Encomenda CE - 07", type: "Pacote / Caixa", width: "36,00", length: "28,00", height: "4,00", weight: "0,67" },
  { description: "Caixa de Encomenda 5B", type: "Pacote / Caixa", width: "54,00", length: "36,00", height: "27,00", weight: "8,75" },
  { description: "Caixa de Encomenda 6B", type: "Pacote / Caixa", width: "27,00", length: "27,00", height: "36,00", weight: "4,37" },
  { description: "Caixa de Encomenda Vai e Vem", type: "Pacote / Caixa", width: "18,00", length: "13,50", height: "9,00", weight: "0,36" },
  { description: "Caixa de Encomenda B", type: "Pacote / Caixa", width: "16,00", length: "11,00", height: "6,00", weight: "0,18" },
  { description: "Caixa de Encomenda 2B", type: "Pacote / Caixa", width: "27,00", length: "18,00", height: "9,00", weight: "0,73" },
  { description: "Caixa de Encomenda 4B", type: "Pacote / Caixa", width: "27,00", length: "27,00", height: "18,00", weight: "2,19" },
  { description: "Caixa de Encomenda Temática 01", type: "Pacote / Caixa", width: "18,00", length: "13,50", height: "9,00", weight: "0,36" },
  { description: "Caixa de Encomenda Temática 02", type: "Pacote / Caixa", width: "27,00", length: "18,00", height: "9,00", weight: "0,73" },
  { description: "Caixa de Encomenda Temática 03", type: "Pacote / Caixa", width: "27,00", length: "22,50", height: "13,50", weight: "1,37" },
  { description: "Envelope Básico RPC (Papel)", type: "Envelope", width: "16,20", length: "11,40", weight: "0,03" },
  { description: "Envelope Básico Médio (Plástico)", type: "Envelope", width: "35,30", length: "25,00", weight: "0,15" },
  { description: "Envelope Básico Grande (Plástico)", type: "Envelope", width: "40,00", length: "28,00", weight: "0,19" },
  { description: "Envelope Convencional Médio (Plástico)", type: "Envelope", width: "35,30", length: "25,00", weight: "0,15" },
  { description: "Envelope Convencional Grande (Plástico)", type: "Envelope", width: "40,00", length: "28,00", weight: "0,19" },
  { description: "Envelope Convencional CD (Plástico)", type: "Envelope", width: "21,00", length: "18,00", weight: "0,06" },
  { description: "Envelope Convencional DVD (Plástico)", type: "Envelope", width: "21,00", length: "18,00", weight: "0,06" },
  { description: "Envelope Convencional Tipo Saco II (Papel)", type: "Envelope", width: "25,00", length: "35,30", weight: "0,15" },
  { description: "Envelope Temático Tipo Saco I (Papel)", type: "Envelope", width: "16,00", length: "23,00", weight: "0,06" },
  { description: "Envelope Temático Tipo Saco II (Papel)", type: "Envelope", width: "25,00", length: "35,30", weight: "0,15" },
  { description: "Envelope Temático Ofício (Papel)", type: "Envelope", width: "22,90", length: "11,40", weight: "0,04" },
  { description: "Envelope Temático Médio (Cartão)", type: "Envelope", width: "35,30", length: "25,00", weight: "0,15" },
  { description: "Envelope Temático Grande (Cartão)", type: "Envelope", width: "40,00", length: "28,00", weight: "0,19" },
  { description: "Envelope Tipo Saco I", type: "Envelope", width: "16,00", length: "23,00", weight: "0,06" },
  { description: "Envelope Tipo Saco II", type: "Envelope", width: "25,00", length: "35,30", weight: "0,15" },
  { description: "Envelope Ofício", type: "Envelope", width: "22,90", length: "11,40", weight: "0,04" },
  { description: "Envelope Cartonado Médio", type: "Envelope", width: "35,30", length: "25,00", weight: "0,15" },
  { description: "Envelope Cartonado Grande", type: "Envelope", width: "40,00", length: "28,00", weight: "0,19" },
];
