"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "../landing-page.module.css";
import type { PackagingItem, PackagingType } from "./constants";
import { packagingTypeOptions } from "./constants";

type PackagingDrawerProps = {
  isOpen: boolean;
  packageType: PackagingType;
  onChangePackageType: (value: PackagingType) => void;
  onSave: (payload: Omit<PackagingItem, "id">) => void;
  onClose: () => void;
};

export function PackagingDrawer({
  isOpen,
  packageType,
  onChangePackageType,
  onSave,
  onClose,
}: PackagingDrawerProps) {
  const [description, setDescription] = useState("");
  const [width, setWidth] = useState("0,0");
  const [length, setLength] = useState("0,0");
  const [height, setHeight] = useState("0,0");
  const [weight, setWeight] = useState("0,00");

  useEffect(() => {
    if (!isOpen) return;
    setDescription("");
    setWidth("0,0");
    setLength("0,0");
    setHeight("0,0");
    setWeight("0,00");
  }, [isOpen]);

  const packageImage = useMemo(() => {
    if (packageType === "Envelope") return "/envelope.svg";
    if (packageType === "Rolo Cilindro") return "/rolo_cilindro.svg";
    return "/pacote_caixa.svg";
  }, [packageType]);

  const packagePreviewClass = useMemo(() => {
    if (packageType === "Envelope") return styles.packagingDrawerPreviewEnvelope;
    if (packageType === "Rolo Cilindro") return styles.packagingDrawerPreviewCilindro;
    return styles.packagingDrawerPreviewCaixa;
  }, [packageType]);

  const handleSave = () => {
    onSave({
      description: description.trim() || "Sem descrição",
      type: packageType,
      width,
      length,
      height: packageType === "Pacote / Caixa" ? height : undefined,
      weight,
    });
  };

  if (!isOpen) return null;

  return (
    <aside className={`${styles.rightDrawer} ${styles.packagingDrawer}`} role="dialog" aria-modal="true">
      <div className={`${styles.rightDrawerHeader} ${styles.packagingDrawerHeader}`}>
        <h2 className={styles.rightDrawerTitle}>Embalagem</h2>
        <button type="button" className={styles.packagingDrawerCloseAction} onClick={onClose}>
          fechar
          <span className={styles.packagingDrawerCloseIcon} aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none" focusable="false">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
        </button>
      </div>

      <div className={`${styles.rightDrawerBody} ${styles.packagingDrawerBody}`}>
        <div className={styles.packagingDrawerGridTop}>
          <label className={styles.packagingDrawerField}>
            <span>Descrição</span>
            <input
              className={styles.packagingDrawerInput}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>
          <label className={styles.packagingDrawerField}>
            <span>Tipo</span>
            <select
              className={styles.packagingDrawerInput}
              value={packageType}
              onChange={(event) => onChangePackageType(event.target.value as PackagingType)}
            >
              {packagingTypeOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>

        <div className={`${styles.packagingDrawerPreview} ${packagePreviewClass}`}>
          <img src={packageImage} alt="" aria-hidden="true" />
        </div>

        {packageType === "Pacote / Caixa" ? (
          <div className={styles.packagingDrawerGridTwo}>
            <label className={styles.packagingDrawerField}>
              <span>Largura</span>
              <div className={styles.packagingDrawerInputWithUnit}>
                <input
                  className={styles.packagingDrawerInput}
                  value={width}
                  onChange={(event) => setWidth(event.target.value)}
                />
                <span className={styles.packagingDrawerUnit}>cm</span>
              </div>
            </label>
            <label className={styles.packagingDrawerField}>
              <span>Comprimento</span>
              <div className={styles.packagingDrawerInputWithUnit}>
                <input
                  className={styles.packagingDrawerInput}
                  value={length}
                  onChange={(event) => setLength(event.target.value)}
                />
                <span className={styles.packagingDrawerUnit}>cm</span>
              </div>
            </label>
            <label className={styles.packagingDrawerField}>
              <span>Altura</span>
              <div className={styles.packagingDrawerInputWithUnit}>
                <input
                  className={styles.packagingDrawerInput}
                  value={height}
                  onChange={(event) => setHeight(event.target.value)}
                />
                <span className={styles.packagingDrawerUnit}>cm</span>
              </div>
            </label>
            <label className={styles.packagingDrawerField}>
              <span>Peso</span>
              <div className={styles.packagingDrawerInputWithUnit}>
                <input
                  className={styles.packagingDrawerInput}
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
                />
                <span className={styles.packagingDrawerUnit}>Kg</span>
              </div>
            </label>
          </div>
        ) : (
          <div className={styles.packagingDrawerGridTwo}>
            <label className={styles.packagingDrawerField}>
              <span>Largura</span>
              <div className={styles.packagingDrawerInputWithUnit}>
                <input
                  className={styles.packagingDrawerInput}
                  value={width}
                  onChange={(event) => setWidth(event.target.value)}
                />
                <span className={styles.packagingDrawerUnit}>cm</span>
              </div>
            </label>
            <label className={styles.packagingDrawerField}>
              <span>Comprimento</span>
              <div className={styles.packagingDrawerInputWithUnit}>
                <input
                  className={styles.packagingDrawerInput}
                  value={length}
                  onChange={(event) => setLength(event.target.value)}
                />
                <span className={styles.packagingDrawerUnit}>cm</span>
              </div>
            </label>
            <label className={styles.packagingDrawerField}>
              <span>Peso</span>
              <div className={styles.packagingDrawerInputWithUnit}>
                <input
                  className={styles.packagingDrawerInput}
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
                />
                <span className={styles.packagingDrawerUnit}>Kg</span>
              </div>
            </label>
            <div className={styles.packagingDrawerFieldSpacer} aria-hidden="true" />
          </div>
        )}
      </div>

      <div className={`${styles.rightDrawerFooter} ${styles.packagingDrawerFooter}`}>
        <button type="button" className={styles.vendorsPrimaryButton} onClick={handleSave}>
          salvar
        </button>
        <button type="button" className={styles.vendorsCancelLink} onClick={onClose}>
          cancelar
        </button>
      </div>
    </aside>
  );
}
