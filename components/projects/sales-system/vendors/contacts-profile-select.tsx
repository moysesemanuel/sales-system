"use client";

import { useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { contatoPerfilOptions } from "./constants";
import styles from "../landing-page.module.css";

export function ContactsProfileSelect({
  selected,
  setSelected,
}: {
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
}) {
  const [open, setOpen] = useState(false);

  const label = useMemo(() => {
    if (!selected.length) return "Qualquer perfil de contato";
    if (selected.length === 1) return selected[0];
    return `${selected.length} perfis selecionados`;
  }, [selected]);

  return (
    <div className={styles.vendorsMultiSelectWrap}>
      <button
        type="button"
        className={styles.vendorsFieldInput}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={styles.vendorsMultiSelectLabel}>{label}</span>
      </button>
      {open ? (
        <div className={styles.vendorsMultiSelectMenu}>
          {contatoPerfilOptions.map((option) => {
            const checked = selected.includes(option);
            return (
              <label key={option} className={styles.vendorsMultiSelectOption}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => {
                    setSelected((current) =>
                      current.includes(option)
                        ? current.filter((item) => item !== option)
                        : [...current, option]
                    );
                  }}
                />
                <span>{option}</span>
              </label>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
