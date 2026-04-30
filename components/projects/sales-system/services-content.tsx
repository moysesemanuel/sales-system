"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import styles from "./landing-page.module.css";
import type { CurrentUser } from "./types";

type ServicesContentProps = {
  currentUser: CurrentUser;
};

const situationOptions = [
  { value: "active", label: "Ativo" },
  { value: "inactive", label: "Inativo" },
] as const;

const itemTypeOptions = [
  "Mercadoria para Revenda",
  "Matéria-Prima",
  "Embalagem",
  "Produto em Processo",
  "Produto Acabado",
  "Subproduto",
  "Produto Intermediário",
  "Material de Uso e Consumo",
  "Ativo Imobilizado",
  "Serviços",
  "Outros insumos",
  "Outras",
] as const;

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M16 16l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12.8 4.6 7.4 10l5.4 5.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PrinterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M6 7V3.6h8V7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M6 13.6v2.8h8v-2.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M5.2 7h9.6A2.2 2.2 0 0 1 17 9.2v3A2.2 2.2 0 0 1 14.8 14.4H5.2A2.2 2.2 0 0 1 3 12.2v-3A2.2 2.2 0 0 1 5.2 7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0.5"
      />
      <path
        d="M6.4 10.1h.01"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TextColorIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8.7 16h-.8a.5.5 0 0 1-.5-.6l2.7-9c.1-.3.3-.4.5-.4h2.8c.2 0 .4.1.5.4l2.7 9a.5.5 0 0 1-.5.6h-.8a.5.5 0 0 1-.4-.4l-.7-2.2c0-.3-.3-.4-.5-.4h-3.4c-.2 0-.4.1-.5.4l-.7 2.2c0 .3-.2.4-.4.4Zm2.6-7.6-.6 2a.5.5 0 0 0 .5.6h1.6a.5.5 0 0 0 .5-.6l-.6-2c0-.3-.3-.4-.5-.4h-.4c-.2 0-.4.1-.5.4Z" />
    </svg>
  );
}

function HighlightColorIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <g fillRule="evenodd">
        <path d="M3 18h18v3H3z" fill="#2DC26B" />
        <path
          fillRule="nonzero"
          d="M7.7 16.7H3l3.3-3.3-.7-.8L10.2 8l4 4.1-4 4.2c-.2.2-.6.2-.8 0l-.6-.7-1.1 1.1zm5-7.5L11 7.4l3-2.9a2 2 0 0 1 2.6 0L18 6c.7.7.7 2 0 2.7l-2.9 2.9-1.8-1.8-.5-.6"
        />
      </g>
    </svg>
  );
}

function AlignLeftIcon() {
  return (
    <svg width="24" height="24" focusable="false" aria-hidden="true">
      <path
        d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2Zm0 4h8c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2Zm0 8h8c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2Zm0-4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

function AlignCenterIcon() {
  return (
    <svg width="24" height="24" focusable="false" aria-hidden="true">
      <path
        d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2Zm3 4h8c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 1 1 0-2Zm0 8h8c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 0 1 0-2Zm-3-4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

function AlignRightIcon() {
  return (
    <svg width="24" height="24" focusable="false" aria-hidden="true">
      <path
        d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2Zm6 4h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2Zm0 8h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2Zm-6-4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

function JustifyIcon() {
  return (
    <svg width="24" height="24" focusable="false" aria-hidden="true">
      <path
        d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2Zm0 4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2Zm0 4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2Zm0 4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

function OutdentIcon() {
  return (
    <svg width="24" height="24" focusable="false" aria-hidden="true">
      <path
        d="M7 5h12c.6 0 1 .4 1 1s-.4 1-1 1H7a1 1 0 1 1 0-2Zm5 4h7c.6 0 1 .4 1 1s-.4 1-1 1h-7a1 1 0 0 1 0-2Zm0 4h7c.6 0 1 .4 1 1s-.4 1-1 1h-7a1 1 0 0 1 0-2Zm-5 4h12a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2Zm1.6-3.8a1 1 0 0 1-1.2 1.6l-3-2a1 1 0 0 1 0-1.6l3-2a1 1 0 0 1 1.2 1.6L6.8 12l1.8 1.2Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

function IndentIcon() {
  return (
    <svg width="24" height="24" focusable="false" aria-hidden="true">
      <path
        d="M7 5h12c.6 0 1 .4 1 1s-.4 1-1 1H7a1 1 0 1 1 0-2Zm5 4h7c.6 0 1 .4 1 1s-.4 1-1 1h-7a1 1 0 0 1 0-2Zm0 4h7c.6 0 1 .4 1 1s-.4 1-1 1h-7a1 1 0 0 1 0-2Zm-5 4h12a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2Zm-2.6-3.8L6.2 12l-1.8-1.2a1 1 0 0 1 1.2-1.6l3 2a1 1 0 0 1 0 1.6l-3 2a1 1 0 1 1-1.2-1.6Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

function BulletListIcon() {
  return (
    <svg width="24" height="24" focusable="false" aria-hidden="true">
      <path
        d="M11 5h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2Zm0 6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2Zm0 6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2ZM4.5 6c0-.4.1-.8.4-1 .3-.4.7-.5 1.1-.5.4 0 .8.1 1 .4.4.3.5.7.5 1.1 0 .4-.1.8-.4 1-.3.4-.7.5-1.1.5-.4 0-.8-.1-1-.4-.4-.3-.5-.7-.5-1.1Zm0 6c0-.4.1-.8.4-1 .3-.4.7-.5 1.1-.5.4 0 .8.1 1 .4.4.3.5.7.5 1.1 0 .4-.1.8-.4 1-.3.4-.7.5-1.1.5-.4 0-.8-.1-1-.4-.4-.3-.5-.7-.5-1.1Zm0 6c0-.4.1-.8.4-1 .3-.4.7-.5 1.1-.5.4 0 .8.1 1 .4.4.3.5.7.5 1.1 0 .4-.1.8-.4 1-.3.4-.7.5-1.1.5-.4 0-.8-.1-1-.4-.4-.3-.5-.7-.5-1.1Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

function NumberedListIcon() {
  return (
    <svg width="24" height="24" focusable="false" aria-hidden="true">
      <path
        d="M10 17h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2Zm0-6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2Zm0-6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 1 1 0-2ZM6 4v3.5c0 .3-.2.5-.5.5a.5.5 0 0 1-.5-.5V5h-.5a.5.5 0 0 1 0-1H6Zm-1 8.8.2.2h1.3c.3 0 .5.2.5.5s-.2.5-.5.5H4.9a1 1 0 0 1-.9-1V13c0-.4.3-.8.6-1l1.2-.4.2-.3a.2.2 0 0 0-.2-.2H4.5a.5.5 0 0 1-.5-.5c0-.3.2-.5.5-.5h1.6c.5 0 .9.4.9 1v.1c0 .4-.3.8-.6 1l-1.2.4-.2.3ZM7 17v2c0 .6-.4 1-1 1H4.5a.5.5 0 0 1 0-1h1.2c.2 0 .3-.1.3-.3 0-.2-.1-.3-.3-.3H4.4a.4.4 0 1 1 0-.8h1.3c.2 0 .3-.1.3-.3 0-.2-.1-.3-.3-.3H4.5a.5.5 0 1 1 0-1H6c.6 0 1 .4 1 1Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

function UndoIcon() {
  return (
    <svg width="24" height="24" focusable="false" aria-hidden="true">
      <path
        d="M6.4 8H12c3.7 0 6.2 2 6.8 5.1.6 2.7-.4 5.6-2.3 6.8a1 1 0 0 1-1-1.8c1.1-.6 1.8-2.7 1.4-4.6-.5-2.1-2.1-3.5-4.9-3.5H6.4l3.3 3.3a1 1 0 1 1-1.4 1.4l-5-5a1 1 0 0 1 0-1.4l5-5a1 1 0 0 1 1.4 1.4L6.4 8Z"
        fillRule="nonzero"
      />
    </svg>
  );
}

function RedoIcon() {
  return (
    <svg width="24" height="24" focusable="false" aria-hidden="true">
      <path
        d="M17.6 10H12c-2.8 0-4.4 1.4-4.9 3.5-.4 2 .3 4 1.4 4.6a1 1 0 1 1-1 1.8c-2-1.2-2.9-4.1-2.3-6.8.6-3 3-5.1 6.8-5.1h5.6l-3.3-3.3a1 1 0 1 1 1.4-1.4l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4-1.4l3.3-3.3Z"
        fillRule="nonzero"
      />
    </svg>
  );
}

function InsertImageIcon() {
  return (
    <svg width="24" height="24" focusable="false" aria-hidden="true">
      <path
        d="m5 15.7 3.3-3.2c.3-.3.7-.3 1 0L12 15l4.1-4c.3-.4.8-.4 1 0l2 1.9V5H5v10.7ZM5 18V19h3l2.8-2.9-2-2L5 17.9Zm14-3-2.5-2.4-6.4 6.5H19v-4ZM4 3h16c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V4c0-.6.4-1 1-1Zm6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        fillRule="nonzero"
      />
    </svg>
  );
}

function ClearFormattingIcon() {
  return (
    <svg width="24" height="24" focusable="false" aria-hidden="true">
      <path
        d="M13.2 6a1 1 0 0 1 0 .2l-2.6 10a1 1 0 0 1-1 .8h-.2a.8.8 0 0 1-.8-1l2.6-10H8a1 1 0 1 1 0-2h9a1 1 0 0 1 0 2h-3.8ZM5 18h7a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Zm13 1.5L16.5 18 15 19.5a.7.7 0 0 1-1-1l1.5-1.5-1.5-1.5a.7.7 0 0 1 1-1l1.5 1.5 1.5-1.5a.7.7 0 0 1 1 1L17.5 17l1.5 1.5a.7.7 0 0 1-1 1Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

export function ServicesContent({ currentUser: _currentUser }: ServicesContentProps) {
  const [mode, setMode] = useState<"list" | "create">("list");
  const situationSelectId = useId();
  const itemTypeSelectId = useId();
  const [isHtmlEditorOpen, setIsHtmlEditorOpen] = useState(false);
  const [htmlDraft, setHtmlDraft] = useState("");
  const editorRef = useRef<HTMLDivElement | null>(null);
  const textColorInputRef = useRef<HTMLInputElement | null>(null);
  const highlightColorInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const [history, setHistory] = useState<{ entries: string[]; index: number }>({
    entries: [""],
    index: 0,
  });

  const [formState, setFormState] = useState<{
    description: string;
    code: string;
    price: string;
    unit: string;
    situation: (typeof situationOptions)[number]["value"];
    itemType: string;
    serviceListCode: string;
    nbs: string;
    complementaryDescription: string;
    notes: string;
  }>({
    description: "",
    code: "",
    price: "",
    unit: "",
    situation: situationOptions[0].value,
    itemType: "",
    serviceListCode: "",
    nbs: "",
    complementaryDescription: "",
    notes: "",
  });

  const canUndo = history.index > 0;
  const canRedo = history.index < history.entries.length - 1;

  const sizeOptions = [
    { pt: 8, cmd: "1" },
    { pt: 10, cmd: "2" },
    { pt: 12, cmd: "3" },
    { pt: 14, cmd: "4" },
    { pt: 18, cmd: "5" },
    { pt: 24, cmd: "6" },
    { pt: 36, cmd: "7" },
  ];

  const [selectedFontPt, setSelectedFontPt] = useState("12");
  const [selectedTextColor, setSelectedTextColor] = useState("#111111");
  const [selectedBlockType, setSelectedBlockType] = useState("simple");
  const [isTextStyleMenuOpen, setIsTextStyleMenuOpen] = useState(false);
  const [formatState, setFormatState] = useState({
    justifyLeft: false,
    justifyCenter: false,
    justifyRight: false,
    justifyFull: false,
    canOutdent: false,
    canIndent: false,
    unorderedList: false,
    orderedList: false,
  });

  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const textStyleMenuRef = useRef<HTMLDivElement | null>(null);
  const savedSelectionRef = useRef<Range | null>(null);
  const [overflowKeys, setOverflowKeys] = useState<Set<string>>(() => new Set());

  const blockTypeOptions = useMemo(
    () =>
      [
        { value: "simple", label: "Simples" },
        { value: "h1", label: "Título 1" },
        { value: "h2", label: "Título 2" },
        { value: "h3", label: "Título 3" },
        { value: "h4", label: "Título 4" },
        { value: "h5", label: "Título 5" },
        { value: "h6", label: "Título 6" },
        { value: "pre", label: "Pré-formatado" },
      ] as const,
    []
  );

  const selectedBlockTypeLabel = useMemo(() => {
    return blockTypeOptions.find((option) => option.value === selectedBlockType)?.label ?? "Simples";
  }, [blockTypeOptions, selectedBlockType]);

  const getBlockTypePreviewClass = useCallback(
    (value: string) => {
      if (value === "h1") return styles.richTextSelectPreviewH1;
      if (value === "h2") return styles.richTextSelectPreviewH2;
      if (value === "h3") return styles.richTextSelectPreviewH3;
      if (value === "h4") return styles.richTextSelectPreviewH4;
      if (value === "h5") return styles.richTextSelectPreviewH5;
      if (value === "h6") return styles.richTextSelectPreviewH6;
      if (value === "pre") return styles.richTextSelectPreviewPre;
      return styles.richTextSelectPreviewSimple;
    },
    []
  );

  const getEditorHtml = useCallback(() => editorRef.current?.innerHTML ?? "", []);

  const setEditorHtml = useCallback((html: string) => {
    if (!editorRef.current) return;
    editorRef.current.innerHTML = html;
  }, []);

  const isSelectionInsideEditor = useCallback((selection: Selection | null) => {
    const editor = editorRef.current;
    if (!editor || !selection || selection.rangeCount === 0) return false;
    const range = selection.getRangeAt(0);
    return editor.contains(range.startContainer) && editor.contains(range.endContainer);
  }, []);

  const saveSelection = useCallback(() => {
    const selection = window.getSelection();
    if (!isSelectionInsideEditor(selection)) return;
    savedSelectionRef.current = selection?.getRangeAt(0).cloneRange() ?? null;
  }, [isSelectionInsideEditor]);

  const restoreSelection = useCallback(() => {
    const editor = editorRef.current;
    const selection = window.getSelection();
    const range = savedSelectionRef.current;
    if (!editor || !selection) return;
    editor.focus();
    if (!range) return;
    selection.removeAllRanges();
    selection.addRange(range);
  }, []);

  const commitHistory = useCallback((nextHtml: string) => {
    setHistory((prev) => {
      const currentHtml = prev.entries[prev.index] ?? "";
      if (nextHtml === currentHtml) return prev;
      const nextEntries = prev.entries.slice(0, prev.index + 1);
      nextEntries.push(nextHtml);
      const cappedEntries = nextEntries.slice(-60);
      const nextIndex = cappedEntries.length - 1;
      return { entries: cappedEntries, index: nextIndex };
    });
  }, []);

  const syncComplementaryDescription = useCallback((html: string) => {
    setFormState((prev) => ({ ...prev, complementaryDescription: html }));
  }, []);

  const runCommand = useCallback(
    (command: string, value?: string) => {
      const editor = editorRef.current;
      if (!editor) return;
      restoreSelection();
      document.execCommand(command, false, value);
      saveSelection();
      const html = getEditorHtml();
      syncComplementaryDescription(html);
      commitHistory(html);
    },
    [commitHistory, getEditorHtml, restoreSelection, saveSelection, syncComplementaryDescription]
  );

  const handleToolbarMouseDownCapture = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (!target.closest("button")) return;
      saveSelection();
      event.preventDefault();
    },
    [saveSelection]
  );

  const handleUndo = useCallback(() => {
    setHistory((prev) => {
      if (prev.index <= 0) return prev;
      const nextIndex = prev.index - 1;
      const html = prev.entries[nextIndex] ?? "";
      setEditorHtml(html);
      syncComplementaryDescription(html);
      return { ...prev, index: nextIndex };
    });
  }, [setEditorHtml, syncComplementaryDescription]);

  const handleRedo = useCallback(() => {
    setHistory((prev) => {
      if (prev.index >= prev.entries.length - 1) return prev;
      const nextIndex = prev.index + 1;
      const html = prev.entries[nextIndex] ?? "";
      setEditorHtml(html);
      syncComplementaryDescription(html);
      return { ...prev, index: nextIndex };
    });
  }, [setEditorHtml, syncComplementaryDescription]);

  useEffect(() => {
    if (mode !== "create") return;
    const html = getEditorHtml();
    syncComplementaryDescription(html);
    setHistory({ entries: [html], index: 0 });
  }, [getEditorHtml, mode, syncComplementaryDescription]);

  useEffect(() => {
    if (mode !== "create") return;
    let rafId = 0;

    const refresh = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const selection = window.getSelection();
        if (isSelectionInsideEditor(selection)) {
          savedSelectionRef.current = selection?.getRangeAt(0).cloneRange() ?? null;
        }

        setFormatState({
          justifyLeft: document.queryCommandState("justifyLeft"),
          justifyCenter: document.queryCommandState("justifyCenter"),
          justifyRight: document.queryCommandState("justifyRight"),
          justifyFull: document.queryCommandState("justifyFull"),
          canOutdent: document.queryCommandEnabled("outdent"),
          canIndent: document.queryCommandEnabled("indent"),
          unorderedList: document.queryCommandState("insertUnorderedList"),
          orderedList: document.queryCommandState("insertOrderedList"),
        });
      });
    };

    document.addEventListener("selectionchange", refresh);
    refresh();

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("selectionchange", refresh);
    };
  }, [isSelectionInsideEditor, mode]);

  const toolbarItems = useMemo(
    () =>
      [
        {
          key: "text_style",
          keepInToolbar: true,
        },
        { key: "bold" },
        { key: "italic" },
        { key: "underline" },
        {
          key: "font_size",
          keepInToolbar: true,
        },
        { key: "text_color" },
        { key: "highlight" },
        { key: "divider_1", separator: true },
        { key: "align_left" },
        { key: "align_center" },
        { key: "align_right" },
        { key: "align_justify" },
        { key: "outdent" },
        { key: "indent" },
        { key: "list_bullets" },
        { key: "list_numbers" },
        { key: "undo" },
        { key: "redo" },
        { key: "insert_image" },
        { key: "clear_format" },
        { key: "menu", keepInToolbar: true },
      ] as const,
    []
  );

  useEffect(() => {
    if (mode !== "create") return;
    const toolbar = toolbarRef.current;
    const measure = measureRef.current;
    if (!toolbar || !measure) return;

    const compute = () => {
      const toolbarStyles = window.getComputedStyle(toolbar);
      const paddingLeft = parseFloat(toolbarStyles.paddingLeft || "0");
      const paddingRight = parseFloat(toolbarStyles.paddingRight || "0");
      const columnGap = parseFloat(toolbarStyles.columnGap || toolbarStyles.gap || "0");

      const safety = 8;

      const toolbarWidth =
        toolbar.getBoundingClientRect().width - paddingLeft - paddingRight - safety;

      const menuEl = measure.querySelector<HTMLElement>('[data-toolbar-key="menu"]');
      if (!menuEl) return;

      const menuWidth = menuEl.getBoundingClientRect().width;

      const pinnedItems = toolbarItems
        .filter((item) => "keepInToolbar" in item && item.keepInToolbar && item.key !== "menu")
        .map((item) => {
          const el = measure.querySelector<HTMLElement>(`[data-toolbar-key="${item.key}"]`);
          return el?.getBoundingClientRect().width ?? 0;
        });

      const pinnedWidth = pinnedItems.reduce((total, width) => total + width, 0);
      const pinnedGaps = Math.max(0, pinnedItems.length - 1) * columnGap;

      const measuredItems = toolbarItems
        .filter((item) => item.key !== "menu" && !("keepInToolbar" in item && item.keepInToolbar))
        .map((item) => {
          const el = measure.querySelector<HTMLElement>(`[data-toolbar-key="${item.key}"]`);
          return {
            key: item.key,
            width: el?.getBoundingClientRect().width ?? 0,
          };
        });

      const availableWithoutMenu = Math.max(0, toolbarWidth - pinnedWidth - pinnedGaps);

      let used = 0;
      let usedCount = 0;
      const firstPassOverflow: string[] = [];

      for (const item of measuredItems) {
        const nextWidth = used + item.width + (usedCount > 0 ? columnGap : 0);

        if (nextWidth <= availableWithoutMenu) {
          used = nextWidth;
          usedCount += 1;
        } else {
          firstPassOverflow.push(item.key);
        }
      }

      if (firstPassOverflow.length === 0) {
        setOverflowKeys(new Set());
        return;
      }

      const availableWithMenu = Math.max(
        0,
        toolbarWidth - pinnedWidth - pinnedGaps - menuWidth - columnGap
      );

      let usedWithMenu = 0;
      let usedWithMenuCount = 0;
      const nextOverflow = new Set<string>();

      for (const item of measuredItems) {
        const nextWidth =
          usedWithMenu + item.width + (usedWithMenuCount > 0 ? columnGap : 0);

        if (nextWidth <= availableWithMenu) {
          usedWithMenu = nextWidth;
          usedWithMenuCount += 1;
        } else {
          nextOverflow.add(item.key);
        }
      }

      setOverflowKeys(nextOverflow);
    };

    compute();
    const resizeObserver = new ResizeObserver(() => compute());
    resizeObserver.observe(toolbar);

    return () => resizeObserver.disconnect();
  }, [mode, toolbarItems]);

  useEffect(() => {
    if (!isTextStyleMenuOpen) return;

    const handleMouseDown = (event: MouseEvent) => {
      const root = textStyleMenuRef.current;
      if (!root) return;
      if (event.target instanceof Node && root.contains(event.target)) return;
      setIsTextStyleMenuOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsTextStyleMenuOpen(false);
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTextStyleMenuOpen]);

  const applyBlockType = useCallback(
    (value: string) => {
      setSelectedBlockType(value);
      if (value === "simple") {
        runCommand("formatBlock", "p");
      } else if (value === "pre") {
        runCommand("formatBlock", "pre");
      } else {
        runCommand("formatBlock", value);
      }
    },
    [runCommand]
  );

  return (
    <section className={styles.contentSection}>
      <div className={styles.contentHeaderRow}>
        <div className={styles.headerLeft}>
          {mode === "create" ? (
            <button
              type="button"
              className={styles.backPillButton}
              onClick={() => setMode("list")}
            >
              <ArrowLeftIcon />
              voltar
            </button>
          ) : null}
          <p className={styles.breadcrumb}>
            início <span className={styles.breadcrumbSeparator}>=</span> cadastros{" "}
            <span className={styles.breadcrumbCurrent}>serviços</span>
          </p>
        </div>

        {mode === "list" ? (
          <div className={styles.headerActions}>
            <button type="button" className={styles.secondaryActionButton}>
              <span aria-hidden="true">
                <PrinterIcon />
              </span>
              imprimir
            </button>
            <button
              type="button"
              className={styles.primaryActionButton}
              onClick={() => setMode("create")}
            >
              incluir serviço
            </button>
          </div>
        ) : null}
      </div>

      <div className={styles.guideBanner}>
        <div className={styles.guideBannerLeft}>
          <span className={styles.guideBannerIcon}>✦</span>
          <span className={styles.guideBannerLabel}>Etapa atual</span>
          <strong className={styles.guideBannerTitle}>
            Centralize seus produtos e estoque
          </strong>
        </div>

        <div className={styles.guideBannerRight}>
          <span className={styles.guideBannerProgressText}>0 de 4</span>
          <div className={styles.guideBannerProgressTrack}>
            <div className={styles.guideBannerProgressFill} />
          </div>
          <button type="button" className={styles.guideBannerLink}>
            acessar o guia
          </button>
        </div>
      </div>

      {mode === "list" ? (
        <div className={styles.pageSection}>
          <h1 className={styles.pageTitle}>Serviços</h1>

          <div className={styles.servicesToolbar}>
            <div className={styles.searchInputWrapperWide}>
              <input
                type="text"
                placeholder="Pesquise por nome ou código"
                className={styles.searchInput}
              />
              <button
                type="button"
                className={styles.searchIconButton}
                aria-label="Buscar serviço"
              >
                <SearchIcon />
              </button>
            </div>

            <button type="button" className={styles.filterPill}>
              por situação
            </button>
          </div>

          <div className={styles.emptyStateWrapper}>
            <div className={styles.servicesEmptyStateCard}>
              <div className={styles.servicesEmptyStateText}>
                <h2 className={styles.emptyStateTitle}>
                  Você não possui nenhum item cadastrado.
                </h2>
                <p className={styles.emptyStateDescription}>
                  Para inserir novos registros você pode clicar em incluir serviço.
                </p>
                <button
                  type="button"
                  className={styles.primaryActionButton}
                  onClick={() => setMode("create")}
                >
                  incluir serviço
                </button>
              </div>

              <div className={styles.servicesEmptyStateIllustration} aria-hidden="true">
                🐱
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.pageSection}>
          <h1 className={styles.pageTitle}>Serviço</h1>
          <p className={styles.pageSubtitle}>Novo Serviço</p>
          <div className={styles.pageDivider} />

          <form
            className={styles.servicesForm}
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <section className={styles.formSection}>
              <div className={styles.servicesGridTop}>
                <div className={styles.plainField}>
                  <span className={styles.fieldLabel}>Descrição</span>
                  <input
                    className={styles.fieldInput}
                    type="text"
                    placeholder="Descrição completa do serviço"
                    value={formState.description}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, description: event.target.value }))
                    }
                  />
                </div>

                <div className={styles.plainField}>
                  <span className={styles.fieldLabel}>Código</span>
                  <input
                    className={styles.fieldInput}
                    type="text"
                    placeholder="Código ou referência (opcional)"
                    value={formState.code}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, code: event.target.value }))
                    }
                  />
                </div>
              </div>

              <div className={styles.servicesGridRow4}>
                <div className={styles.plainField}>
                  <span className={styles.fieldLabel}>Preço</span>
                  <div className={styles.moneyField}>
                    <span className={styles.moneyPrefix} aria-hidden="true">
                      R$
                    </span>
                    <input
                      className={styles.fieldInput}
                      type="text"
                      placeholder="Preço de venda"
                      value={formState.price}
                      onChange={(event) =>
                        setFormState((prev) => ({ ...prev, price: event.target.value }))
                      }
                    />
                  </div>
                  <span className={styles.fieldHint} aria-hidden="true">
                    &nbsp;
                  </span>
                </div>

                <div className={styles.plainField}>
                  <span className={styles.fieldLabel}>Unidade</span>
                  <input
                    className={styles.fieldInput}
                    type="text"
                    placeholder="Ex: Pç, K"
                    value={formState.unit}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, unit: event.target.value }))
                    }
                  />
                  <span className={styles.fieldHint} aria-hidden="true">
                    &nbsp;
                  </span>
                </div>

                <div className={styles.plainField}>
                  <span className={styles.fieldLabel}>Situação</span>
                  <select
                    id={situationSelectId}
                    className={styles.selectField}
                    value={formState.situation}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        situation: event.target.value as (typeof situationOptions)[number]["value"],
                      }))
                    }
                  >
                    {situationOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <span className={styles.fieldHint}>Estado atual</span>
                </div>

                <div className={styles.plainField}>
                  <span className={styles.fieldLabel}>Tipo do item</span>
                  <select
                    id={itemTypeSelectId}
                    className={styles.selectField}
                    value={formState.itemType}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, itemType: event.target.value }))
                    }
                  >
                    <option value="">Selecione</option>
                    {itemTypeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <span className={styles.fieldHint}>Utilizado na geração do SPED</span>
                </div>
              </div>

              <div className={styles.servicesGridBottom}>
                <div className={styles.plainField}>
                  <span className={styles.fieldLabelRow}>
                    <span>Código da lista de serviços</span>
                    <button
                      type="button"
                      className={styles.inlineActionLink}
                      onClick={() =>
                        setFormState((prev) => ({
                          ...prev,
                          serviceListCode: "",
                        }))
                      }
                    >
                      remover
                    </button>
                  </span>
                  <div className={styles.inputWithSearch}>
                    <input
                      className={styles.fieldInput}
                      type="text"
                      value={formState.serviceListCode}
                      onChange={(event) =>
                        setFormState((prev) => ({
                          ...prev,
                          serviceListCode: event.target.value,
                        }))
                      }
                    />
                    <button
                      type="button"
                      className={styles.searchIconButton}
                      aria-label="Buscar código da lista de serviços"
                    >
                      <SearchIcon />
                    </button>
                  </div>
                </div>

                <div className={styles.plainField}>
                  <span className={styles.fieldLabel}>
                    Nomenclatura Brasileira de Serviços (NBS)
                  </span>
                  <div className={styles.inputWithSearch}>
                    <input
                      className={styles.fieldInput}
                      type="text"
                      value={formState.nbs}
                      onChange={(event) =>
                        setFormState((prev) => ({
                          ...prev,
                          nbs: event.target.value,
                        }))
                      }
                    />
                    <button
                      type="button"
                      className={styles.searchIconButton}
                      aria-label="Buscar NBS"
                    >
                      <SearchIcon />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <div className={styles.sectionDivider} />

            <section className={styles.formSection}>
              <h2 className={styles.formSectionTitle}>Descrição Complementar</h2>
              <div className={styles.richTextEditorWrap}>
                <div className={styles.richTextEditor}>
                  <div
                    className={styles.richTextToolbar}
                    role="toolbar"
                    ref={toolbarRef}
                    onMouseDownCapture={handleToolbarMouseDownCapture}
                  >
                    <div
                      className={styles.richTextLabeledSelect}
                      data-toolbar-key="text_style"
                      ref={textStyleMenuRef}
                    >
                      <div className={styles.richTextSelectControl}>
                        <button
                          type="button"
                          className={styles.richTextSelectButton}
                          aria-haspopup="menu"
                          aria-expanded={isTextStyleMenuOpen}
                          aria-label="Tipo de texto"
                          onClick={() => setIsTextStyleMenuOpen((prev) => !prev)}
                        >
                          <span className={styles.richTextSelectButtonPreview} aria-hidden="true">
                            <span className={getBlockTypePreviewClass(selectedBlockType)}>
                              {selectedBlockTypeLabel}
                            </span>
                          </span>
                        </button>
                      </div>

                      {isTextStyleMenuOpen ? (
                        <div className={styles.richTextSelectMenu} role="menu">
                          {blockTypeOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              role="menuitemradio"
                              aria-checked={selectedBlockType === option.value}
                              className={`${styles.richTextSelectMenuItem} ${selectedBlockType === option.value
                                ? styles.richTextSelectMenuItemActive
                                : ""
                                }`}
                              onClick={() => {
                                applyBlockType(option.value);
                                setIsTextStyleMenuOpen(false);
                              }}
                            >
                              <span className={getBlockTypePreviewClass(option.value)}>
                                {option.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <button
                      type="button"
                      className={styles.richTextButton}
                      aria-label="Negrito"
                      onClick={() => runCommand("bold")}
                      data-toolbar-key="bold"
                      style={overflowKeys.has("bold") ? { display: "none" } : undefined}
                    >
                      <strong>B</strong>
                    </button>
                    <button
                      type="button"
                      className={styles.richTextButton}
                      aria-label="Itálico"
                      onClick={() => runCommand("italic")}
                      data-toolbar-key="italic"
                      style={overflowKeys.has("italic") ? { display: "none" } : undefined}
                    >
                      <em>I</em>
                    </button>
                    <button
                      type="button"
                      className={styles.richTextButton}
                      aria-label="Sublinhado"
                      onClick={() => runCommand("underline")}
                      data-toolbar-key="underline"
                      style={overflowKeys.has("underline") ? { display: "none" } : undefined}
                    >
                      <span className={styles.underlineText}>U</span>
                    </button>

                    <div className={styles.richTextLabeledSelect} data-toolbar-key="font_size">
                      <div className={styles.richTextSelectControl}>
                        <span className={styles.richTextSelectLabel} aria-hidden="true">
                          {selectedFontPt}pt
                        </span>
                        <select
                          className={styles.richTextSelect}
                          aria-label="Tamanho da fonte"
                          value={selectedFontPt}
                          onMouseDown={() => saveSelection()}
                          onChange={(event) => {
                            const pt = event.target.value;
                            setSelectedFontPt(pt);
                            const match = sizeOptions.find((option) => String(option.pt) === pt);
                            runCommand("fontSize", match?.cmd ?? "3");
                          }}
                        >
                          <option value="8">8pt</option>
                          <option value="10">10pt</option>
                          <option value="12">12pt</option>
                          <option value="14">14pt</option>
                          <option value="18">18pt</option>
                          <option value="24">24pt</option>
                          <option value="36">36pt</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`${styles.richTextButton} ${styles.richTextButtonChevron} ${styles.richTextColorButton}`}
                      aria-label="Cor da fonte"
                      onClick={() => textColorInputRef.current?.click()}
                      data-toolbar-key="text_color"
                      style={overflowKeys.has("text_color") ? { display: "none" } : undefined}
                    >
                      <span className={styles.richTextColorGlyph}>
                        <TextColorIcon />
                      </span>
                      <span
                        className={styles.richTextColorSwatch}
                        style={{ backgroundColor: selectedTextColor }}
                        aria-hidden="true"
                      />
                    </button>
                    <button
                      type="button"
                      className={`${styles.richTextButton} ${styles.richTextButtonChevron}`}
                      aria-label="Marca texto"
                      onClick={() => highlightColorInputRef.current?.click()}
                      data-toolbar-key="highlight"
                      style={overflowKeys.has("highlight") ? { display: "none" } : undefined}
                    >
                      <HighlightColorIcon />
                    </button>

                    <div
                      className={styles.richTextDivider}
                      aria-hidden="true"
                      data-toolbar-key="divider_1"
                      style={overflowKeys.has("divider_1") ? { display: "none" } : undefined}
                    />

                    <button
                      type="button"
                      className={styles.richTextButton}
                      aria-label="Alinhar à esquerda"
                      title="Alinhar à esquerda"
                      onClick={() => runCommand("justifyLeft")}
                      aria-pressed={formatState.justifyLeft}
                      data-toolbar-key="align_left"
                      style={overflowKeys.has("align_left") ? { display: "none" } : undefined}
                    >
                      <AlignLeftIcon />
                    </button>
                    <button
                      type="button"
                      className={styles.richTextButton}
                      aria-label="Centralizar"
                      title="Centralizar"
                      onClick={() => runCommand("justifyCenter")}
                      aria-pressed={formatState.justifyCenter}
                      data-toolbar-key="align_center"
                      style={overflowKeys.has("align_center") ? { display: "none" } : undefined}
                    >
                      <AlignCenterIcon />
                    </button>
                    <button
                      type="button"
                      className={styles.richTextButton}
                      aria-label="Alinhar à direita"
                      title="Alinhar à direita"
                      onClick={() => runCommand("justifyRight")}
                      aria-pressed={formatState.justifyRight}
                      data-toolbar-key="align_right"
                      style={overflowKeys.has("align_right") ? { display: "none" } : undefined}
                    >
                      <AlignRightIcon />
                    </button>
                    <button
                      type="button"
                      className={styles.richTextButton}
                      aria-label="Justificar"
                      title="Justificar"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => {
                        restoreSelection();
                        runCommand("justifyFull");
                      }}
                      aria-pressed={formatState.justifyFull}
                      data-toolbar-key="align_justify"
                      style={overflowKeys.has("align_justify") ? { display: "none" } : undefined}
                    >
                      <JustifyIcon />
                    </button>
                    <button
                      type="button"
                      className={styles.richTextButton}
                      aria-label="Diminuir recuo"
                      title="Diminuir recuo"
                      onClick={() => runCommand("outdent")}
                      disabled={!formatState.canOutdent}
                      data-toolbar-key="outdent"
                      style={overflowKeys.has("outdent") ? { display: "none" } : undefined}
                    >
                      <OutdentIcon />
                    </button>
                    <button
                      type="button"
                      className={styles.richTextButton}
                      aria-label="Aumentar recuo"
                      title="Aumentar recuo"
                      onClick={() => runCommand("indent")}
                      disabled={!formatState.canIndent}
                      data-toolbar-key="indent"
                      style={overflowKeys.has("indent") ? { display: "none" } : undefined}
                    >
                      <IndentIcon />
                    </button>
                    <button
                      type="button"
                      className={styles.richTextButton}
                      aria-label="Lista com marcadores"
                      title="Lista com marcadores"
                      onClick={() => runCommand("insertUnorderedList")}
                      aria-pressed={formatState.unorderedList}
                      data-toolbar-key="list_bullets"
                      style={overflowKeys.has("list_bullets") ? { display: "none" } : undefined}
                    >
                      <BulletListIcon />
                    </button>
                    <button
                      type="button"
                      className={styles.richTextButton}
                      aria-label="Lista numerada"
                      title="Lista numerada"
                      onClick={() => runCommand("insertOrderedList")}
                      aria-pressed={formatState.orderedList}
                      data-toolbar-key="list_numbers"
                      style={overflowKeys.has("list_numbers") ? { display: "none" } : undefined}
                    >
                      <NumberedListIcon />
                    </button>

                    <button
                      type="button"
                      className={styles.richTextButton}
                      aria-label="Desfazer"
                      title="Desfazer"
                      onClick={handleUndo}
                      disabled={!canUndo}
                      data-toolbar-key="undo"
                      style={overflowKeys.has("undo") ? { display: "none" } : undefined}
                    >
                      <UndoIcon />
                    </button>

                    <button
                      type="button"
                      className={styles.richTextButton}
                      aria-label="Refazer"
                      title="Refazer"
                      onClick={handleRedo}
                      disabled={!canRedo}
                      data-toolbar-key="redo"
                      style={overflowKeys.has("redo") ? { display: "none" } : undefined}
                    >
                      <RedoIcon />
                    </button>

                    <button
                      type="button"
                      className={styles.richTextButton}
                      aria-label="Inserir imagem"
                      title="Inserir imagem"
                      onClick={() => imageInputRef.current?.click()}
                      data-toolbar-key="insert_image"
                      style={overflowKeys.has("insert_image") ? { display: "none" } : undefined}
                    >
                      <InsertImageIcon />
                    </button>

                    <button
                      type="button"
                      className={styles.richTextButton}
                      aria-label="Limpar formatação"
                      title="Limpar formatação"
                      onClick={() => runCommand("removeFormat")}
                      data-toolbar-key="clear_format"
                      style={overflowKeys.has("clear_format") ? { display: "none" } : undefined}
                    >
                      <ClearFormattingIcon />
                    </button>

                    <div
                      className={styles.richTextMenu}
                      data-toolbar-key="menu"
                      style={overflowKeys.size === 0 ? { display: "none" } : undefined}
                    >
                      <button
                        type="button"
                        className={`${styles.richTextButton} ${styles.richTextMenuTrigger}`}
                        aria-label="Mais opções"
                      >
                        <span className={styles.richTextMenuTriggerIcon}>
                          <svg width="24" height="24" focusable="false" aria-hidden="true">
                            <path
                              d="M6 10a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2Zm12 0a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2Zm-6 0a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2Z"
                              fillRule="nonzero"
                            />
                          </svg>
                        </span>
                      </button>
                      <div className={styles.richTextMenuPopover}>
                        {Array.from(overflowKeys).length ? (
                          <>
                            {overflowKeys.has("bold") ? (
                              <button
                                type="button"
                                className={styles.richTextMenuItemIcon}
                                aria-label="Negrito"
                                title="Negrito"
                                onClick={() => runCommand("bold")}
                              >
                                <strong>B</strong>
                              </button>
                            ) : null}

                            {overflowKeys.has("italic") ? (
                              <button
                                type="button"
                                className={styles.richTextMenuItemIcon}
                                aria-label="Itálico"
                                title="Itálico"
                                onClick={() => runCommand("italic")}
                              >
                                <em>I</em>
                              </button>
                            ) : null}

                            {overflowKeys.has("underline") ? (
                              <button
                                type="button"
                                className={styles.richTextMenuItemIcon}
                                aria-label="Sublinhado"
                                title="Sublinhado"
                                onClick={() => runCommand("underline")}
                              >
                                <span className={styles.underlineText}>U</span>
                              </button>
                            ) : null}

                            {overflowKeys.has("text_color") ? (
                              <button
                                type="button"
                                className={`${styles.richTextMenuItemIcon} ${styles.richTextButtonChevron} ${styles.richTextColorButton}`}
                                aria-label="Cor da fonte"
                                title="Cor da fonte"
                                onClick={() => textColorInputRef.current?.click()}
                              >
                                <span className={styles.richTextColorGlyph}>
                                  <TextColorIcon />
                                </span>
                                <span
                                  className={styles.richTextColorSwatch}
                                  style={{ backgroundColor: selectedTextColor }}
                                  aria-hidden="true"
                                />
                              </button>
                            ) : null}

                            {overflowKeys.has("highlight") ? (
                              <button
                                type="button"
                                className={`${styles.richTextMenuItemIcon} ${styles.richTextButtonChevron}`}
                                aria-label="Marca texto"
                                title="Marca texto"
                                onClick={() => highlightColorInputRef.current?.click()}
                              >
                                <HighlightColorIcon />
                              </button>
                            ) : null}

                            {overflowKeys.has("align_left") ? (
                              <button
                                type="button"
                                className={styles.richTextMenuItemIcon}
                                aria-label="Alinhar à esquerda"
                                title="Alinhar à esquerda"
                                onClick={() => runCommand("justifyLeft")}
                              >
                                <AlignLeftIcon />
                              </button>
                            ) : null}

                            {overflowKeys.has("align_center") ? (
                              <button
                                type="button"
                                className={styles.richTextMenuItemIcon}
                                aria-label="Centralizar"
                                title="Centralizar"
                                onClick={() => runCommand("justifyCenter")}
                              >
                                <AlignCenterIcon />
                              </button>
                            ) : null}

                            {overflowKeys.has("align_right") ? (
                              <button
                                type="button"
                                className={styles.richTextMenuItemIcon}
                                aria-label="Alinhar à direita"
                                title="Alinhar à direita"
                                onClick={() => runCommand("justifyRight")}
                              >
                                <AlignRightIcon />
                              </button>
                            ) : null}

                            {overflowKeys.has("align_justify") ? (
                              <button
                                type="button"
                                className={styles.richTextMenuItemIcon}
                                aria-label="Justificar"
                                title="Justificar"
                                onMouseDown={(event) => event.preventDefault()}
                                onClick={() => {
                                  restoreSelection();
                                  runCommand("justifyFull");
                                }}
                              >
                                <JustifyIcon />
                              </button>
                            ) : null}

                            {overflowKeys.has("outdent") ? (
                              <button
                                type="button"
                                className={styles.richTextMenuItemIcon}
                                aria-label="Diminuir recuo"
                                title="Diminuir recuo"
                                disabled={!formatState.canOutdent}
                                onClick={() => runCommand("outdent")}
                              >
                                <OutdentIcon />
                              </button>
                            ) : null}

                            {overflowKeys.has("indent") ? (
                              <button
                                type="button"
                                className={styles.richTextMenuItemIcon}
                                aria-label="Aumentar recuo"
                                title="Aumentar recuo"
                                disabled={!formatState.canIndent}
                                onClick={() => runCommand("indent")}
                              >
                                <IndentIcon />
                              </button>
                            ) : null}

                            {overflowKeys.has("list_bullets") ? (
                              <button
                                type="button"
                                className={styles.richTextMenuItemIcon}
                                aria-label="Lista com marcadores"
                                title="Lista com marcadores"
                                onClick={() => runCommand("insertUnorderedList")}
                              >
                                <BulletListIcon />
                              </button>
                            ) : null}

                            {overflowKeys.has("list_numbers") ? (
                              <button
                                type="button"
                                className={styles.richTextMenuItemIcon}
                                aria-label="Lista numerada"
                                title="Lista numerada"
                                onClick={() => runCommand("insertOrderedList")}
                              >
                                <NumberedListIcon />
                              </button>
                            ) : null}

                            {overflowKeys.has("undo") ? (
                              <button
                                type="button"
                                className={styles.richTextMenuItemIcon}
                                aria-label="Desfazer"
                                title="Desfazer"
                                disabled={!canUndo}
                                onClick={handleUndo}
                              >
                                <UndoIcon />
                              </button>
                            ) : null}

                            {overflowKeys.has("redo") ? (
                              <button
                                type="button"
                                className={styles.richTextMenuItemIcon}
                                aria-label="Refazer"
                                title="Refazer"
                                disabled={!canRedo}
                                onClick={handleRedo}
                              >
                                <RedoIcon />
                              </button>
                            ) : null}

                            {overflowKeys.has("insert_image") ? (
                              <button
                                type="button"
                                className={styles.richTextMenuItemIcon}
                                aria-label="Inserir imagem"
                                title="Inserir imagem"
                                onClick={() => imageInputRef.current?.click()}
                              >
                                <InsertImageIcon />
                              </button>
                            ) : null}

                            {overflowKeys.has("clear_format") ? (
                              <button
                                type="button"
                                className={styles.richTextMenuItemIcon}
                                aria-label="Limpar formatação"
                                title="Limpar formatação"
                                onClick={() => runCommand("removeFormat")}
                              >
                                <ClearFormattingIcon />
                              </button>
                            ) : null}

                            <div className={styles.richTextMenuSeparator} aria-hidden="true" />
                          </>
                        ) : null}


                      </div>
                    </div>
                  </div>

                  <div className={styles.richTextMeasure} ref={measureRef} aria-hidden="true">
                    <div className={styles.richTextToolbar}>
                      <div className={styles.richTextLabeledSelect} data-toolbar-key="text_style">
                        <div className={styles.richTextSelectControl}>
                          <span className={styles.richTextSelectLabel}>Título 1</span>
                          <button className={styles.richTextSelectButton} type="button">
                            <span className={styles.richTextSelectButtonPreview}>
                              <span className={styles.richTextSelectPreviewH1}>Título 1</span>
                            </span>
                          </button>
                        </div>
                      </div>
                      <button className={styles.richTextButton} data-toolbar-key="bold" type="button">
                        <strong>B</strong>
                      </button>
                      <button
                        className={styles.richTextButton}
                        data-toolbar-key="italic"
                        type="button"
                      >
                        <em>I</em>
                      </button>
                      <button
                        className={styles.richTextButton}
                        data-toolbar-key="underline"
                        type="button"
                      >
                        <span className={styles.underlineText}>U</span>
                      </button>
                      <div className={styles.richTextLabeledSelect} data-toolbar-key="font_size">
                        <div className={styles.richTextSelectControl}>
                          <span className={styles.richTextSelectLabel}>Tamanho</span>
                          <select className={styles.richTextSelect} defaultValue="12">
                            <option value="12">12pt</option>
                          </select>
                        </div>
                      </div>
                      <button
                        className={`${styles.richTextButton} ${styles.richTextButtonChevron}`}
                        data-toolbar-key="text_color"
                        type="button"
                      >
                        <TextColorIcon />
                      </button>
                      <button
                        className={`${styles.richTextButton} ${styles.richTextButtonChevron}`}
                        data-toolbar-key="highlight"
                        type="button"
                      >
                        <HighlightColorIcon />
                      </button>
                      <div className={styles.richTextDivider} data-toolbar-key="divider_1" />
                      <button
                        className={styles.richTextButton}
                        data-toolbar-key="align_left"
                        type="button"
                      >
                        <AlignLeftIcon />
                      </button>
                      <button
                        className={styles.richTextButton}
                        data-toolbar-key="align_center"
                        type="button"
                      >
                        <AlignCenterIcon />
                      </button>
                      <button
                        className={styles.richTextButton}
                        data-toolbar-key="align_right"
                        type="button"
                      >
                        <AlignRightIcon />
                      </button>
                      <button
                        className={styles.richTextButton}
                        data-toolbar-key="align_justify"
                        type="button"
                      >
                        <JustifyIcon />
                      </button>
                      <button
                        className={styles.richTextButton}
                        data-toolbar-key="outdent"
                        type="button"
                      >
                        <OutdentIcon />
                      </button>
                      <button
                        className={styles.richTextButton}
                        data-toolbar-key="indent"
                        type="button"
                      >
                        <IndentIcon />
                      </button>
                      <button
                        className={styles.richTextButton}
                        data-toolbar-key="list_bullets"
                        type="button"
                      >
                        <BulletListIcon />
                      </button>
                      <button
                        className={styles.richTextButton}
                        data-toolbar-key="list_numbers"
                        type="button"
                      >
                        <NumberedListIcon />
                      </button>

                      <button
                        className={styles.richTextButton}
                        data-toolbar-key="undo"
                        type="button"
                      >
                        <UndoIcon />
                      </button>

                      <button
                        className={styles.richTextButton}
                        data-toolbar-key="redo"
                        type="button"
                      >
                        <RedoIcon />
                      </button>

                      <button
                        className={styles.richTextButton}
                        data-toolbar-key="insert_image"
                        type="button"
                      >
                        <InsertImageIcon />
                      </button>

                      <button
                        className={styles.richTextButton}
                        data-toolbar-key="clear_format"
                        type="button"
                      >
                        <ClearFormattingIcon />
                      </button>

                      <div className={styles.richTextMenu} data-toolbar-key="menu">
                        <button className={styles.richTextButton} type="button">
                          …
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    className={styles.richTextSurface}
                    contentEditable
                    suppressContentEditableWarning
                    ref={editorRef}
                    onBlur={saveSelection}
                    onFocus={saveSelection}
                    onKeyUp={saveSelection}
                    onMouseUp={saveSelection}
                    onInput={() => {
                      const html = getEditorHtml();
                      syncComplementaryDescription(html);
                      commitHistory(html);
                    }}
                  />
                </div>
              </div>
              <input
                ref={textColorInputRef}
                className={styles.visuallyHidden}
                type="color"
                aria-label="Selecionar cor da fonte"
                onChange={(event) => {
                  const color = event.target.value;
                  setSelectedTextColor(color);
                  runCommand("foreColor", color);
                }}
              />
              <input
                ref={highlightColorInputRef}
                className={styles.visuallyHidden}
                type="color"
                aria-label="Selecionar cor do marca texto"
                onChange={(event) => runCommand("hiliteColor", event.target.value)}
              />
              <input
                ref={imageInputRef}
                className={styles.visuallyHidden}
                type="file"
                accept="image/*"
                aria-label="Inserir imagem"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  const dataUrl = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(String(reader.result ?? ""));
                    reader.onerror = () => reject(new Error("Falha ao ler imagem"));
                    reader.readAsDataURL(file);
                  });
                  runCommand("insertImage", dataUrl);
                  event.target.value = "";
                }}
              />
              <p className={styles.fieldHint}>
                Campo exibido em propostas comerciais e pedidos de venda. Editar{" "}
                <a
                  className={styles.inlineLink}
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    setHtmlDraft(getEditorHtml());
                    setIsHtmlEditorOpen(true);
                  }}
                >
                  HTML
                </a>
                .
              </p>
            </section>

            <div className={styles.sectionDivider} />

            <section className={styles.formSection}>
              <h2 className={styles.formSectionTitle}>Observações</h2>
              <textarea
                className={styles.textareaField}
                rows={4}
                value={formState.notes}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, notes: event.target.value }))
                }
              />
            </section>

            <div className={styles.servicesFormFooter}>
              <button type="submit" className={styles.primaryActionButton}>
                salvar
              </button>
              <button
                type="button"
                className={styles.textButton}
                onClick={() => setMode("list")}
              >
                cancelar
              </button>
            </div>
          </form>

          {isHtmlEditorOpen ? (
            <aside className={styles.rightDrawer} role="dialog" aria-modal="true">
              <div className={styles.rightDrawerHeader}>
                <h2 className={styles.rightDrawerTitle}>Edição HTML</h2>
                <button
                  type="button"
                  className={styles.rightDrawerClose}
                  aria-label="Fechar"
                  onClick={() => setIsHtmlEditorOpen(false)}
                >
                  ×
                </button>
              </div>
              <div className={styles.rightDrawerBody}>
                <p className={styles.rightDrawerSubtitle}>Descrição complementar</p>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Input de texto</span>
                  <textarea
                    className={styles.textareaField}
                    rows={12}
                    value={htmlDraft}
                    onChange={(event) => setHtmlDraft(event.target.value)}
                  />
                </label>
              </div>
              <div className={styles.rightDrawerFooter}>
                <button
                  type="button"
                  className={styles.primaryActionButton}
                  onClick={() => {
                    setEditorHtml(htmlDraft);
                    syncComplementaryDescription(htmlDraft);
                    commitHistory(htmlDraft);
                    setIsHtmlEditorOpen(false);
                  }}
                >
                  aplicar
                </button>
                <button
                  type="button"
                  className={styles.textButton}
                  onClick={() => setIsHtmlEditorOpen(false)}
                >
                  cancelar
                </button>
              </div>
            </aside>
          ) : null}
        </div>
      )}

      <footer className={styles.helpFooter}>
        <p className={styles.helpFooterTitle}>Ficou com alguma dúvida?</p>
        <a href="#" className={styles.helpFooterLink}>
          Acesse a ajuda do ERP.
        </a>
      </footer>
    </section>
  );
}
