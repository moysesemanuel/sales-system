"use client";

import styles from "../landing-page.module.css";

export function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function VendorsTab({ active, children }: { active?: boolean; children: string }) {
  return (
    <button type="button" className={active ? styles.vendorsTabActive : styles.vendorsTab}>
      {children}
    </button>
  );
}

export function CEPButton() {
  return (
    <button type="button" className={styles.vendorsInputCircleButton} aria-label="Buscar CEP">
      <SearchIcon />
    </button>
  );
}

export function CnpjButton() {
  return (
    <button type="button" className={styles.vendorsInputCircleButton} aria-label="Validar CNPJ">
      <i className="far fa-fw fa-id-card" />
    </button>
  );
}
