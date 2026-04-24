"use client";

import { useEffect, useMemo, useState } from "react";
import type { CurrentUser } from "./types";
import styles from "./landing-page.module.css";

type AgendaUser = { id: string; name: string };

type Appointment = {
  id: string;
  date: string; // YYYY-MM-DD
  hour: number;
  minute: number;
  userId: string;
  description: string;
};

const weekdayLabels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"] as const;
const weekHeaderLabels = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"] as const;
const WEEK_HOUR_HEIGHT_PX = 48;

function pad2(value: number) {
  return String(value).padStart(2, "0");
}

function formatMonthTitle(value: Date) {
  return new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(value);
}

function toISODate(value: Date) {
  return `${value.getFullYear()}-${pad2(value.getMonth() + 1)}-${pad2(value.getDate())}`;
}

function fromISODate(value: string) {
  const [year, month, day] = value.split("-").map((part) => Number(part));
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

function clampInt(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, Math.trunc(value)));
}

function buildMonthGrid(viewDate: Date) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const lastOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastOfMonth.getDate();

  // Monday-based index (0..6)
  const firstDayIndex = (firstOfMonth.getDay() + 6) % 7;
  const totalCells = 42; // 6 rows x 7 cols

  const cells: Array<{ date: Date; inMonth: boolean }> = [];

  for (let i = 0; i < totalCells; i += 1) {
    const dayOffset = i - firstDayIndex;
    const cellDate = new Date(year, month, 1 + dayOffset);
    const inMonth = dayOffset >= 0 && dayOffset < daysInMonth;
    cells.push({ date: cellDate, inMonth });
  }

  return cells;
}

function startOfWeekSunday(value: Date) {
  const date = new Date(value.getFullYear(), value.getMonth(), value.getDate());
  const day = date.getDay(); // 0=Sun
  date.setDate(date.getDate() - day);
  return date;
}

function addDays(value: Date, amount: number) {
  const date = new Date(value);
  date.setDate(date.getDate() + amount);
  return date;
}

function formatWeekTitle(start: Date, end: Date) {
  const startDay = start.getDate();
  const endDay = end.getDate();
  const startMonth = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(start);
  const endMonth = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(end);
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  if (startYear === endYear && startMonth === endMonth) {
    return `${startDay} de ${startMonth} a ${endDay} de ${endMonth} ${endYear}`;
  }

  if (startYear === endYear) {
    return `${startDay} de ${startMonth} a ${endDay} de ${endMonth} ${endYear}`;
  }

  return `${startDay} de ${startMonth} ${startYear} a ${endDay} de ${endMonth} ${endYear}`;
}

function capitalize(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  return `${trimmed[0]!.toUpperCase()}${trimmed.slice(1)}`;
}

function formatDailyHeader(date: Date) {
  const weekday = new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(date);
  const normalizedWeekday = capitalize(weekday.replace(/-feira$/i, ""));
  return `${normalizedWeekday} ${date.getDate()}/${date.getMonth() + 1}`;
}

export function AgendaContent({ currentUser }: { currentUser: CurrentUser }) {
  const users: AgendaUser[] = useMemo(
    () => [
      { id: currentUser.id, name: currentUser.name },
      { id: "user-2", name: "Usuário 2" },
      { id: "user-3", name: "Usuário 3" },
    ],
    [currentUser.id, currentUser.name],
  );

  const defaultOtherUserId = useMemo(() => {
    return users.find((user) => user.id !== currentUser.id)?.id ?? currentUser.id;
  }, [currentUser.id, users]);

  const [viewDate, setViewDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const todayISO = useMemo(() => toISODate(new Date()), []);
  const [selectedDate, setSelectedDate] = useState<string>(todayISO);
  const [panelOpen, setPanelOpen] = useState(false);
  const [scope, setScope] = useState<"mine" | "others">("mine");
  const [viewMode, setViewMode] = useState<"mensal" | "semanal" | "diario">("mensal");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [nowTs, setNowTs] = useState(() => Date.now());

  const [draft, setDraft] = useState(() => ({
    date: todayISO,
    hour: 9,
    minute: 0,
    userId: currentUser.id,
    description: "",
  }));

  const monthCells = useMemo(() => buildMonthGrid(viewDate), [viewDate]);

  const visibleAppointments = useMemo(() => {
    if (scope === "mine") {
      return appointments.filter((appointment) => appointment.userId === currentUser.id);
    }

    return appointments.filter((appointment) => appointment.userId !== currentUser.id);
  }, [appointments, currentUser.id, scope]);

  const appointmentsByDate = useMemo(() => {
    const map = new Map<string, Appointment[]>();
    for (const appointment of visibleAppointments) {
      const existing = map.get(appointment.date);
      if (existing) existing.push(appointment);
      else map.set(appointment.date, [appointment]);
    }
    for (const list of map.values()) {
      list.sort((a, b) => a.hour - b.hour || a.minute - b.minute);
    }
    return map;
  }, [visibleAppointments]);

  const selectedAppointments = appointmentsByDate.get(selectedDate) ?? [];

  function openForDate(dateISO: string, hour?: number) {
    setSelectedDate(dateISO);
    setEditingId(null);
    setDraft((prev) => ({
      ...prev,
      date: dateISO,
      hour: typeof hour === "number" ? clampInt(hour, 0, 23) : 9,
      minute: 0,
      description: "",
      userId:
        scope === "others"
          ? prev.userId && prev.userId !== currentUser.id
            ? prev.userId
            : defaultOtherUserId
          : currentUser.id,
    }));
    setPanelOpen(true);
  }

  function openForEdit(appointment: Appointment) {
    setSelectedDate(appointment.date);
    setEditingId(appointment.id);
    setDraft({
      date: appointment.date,
      hour: appointment.hour,
      minute: appointment.minute,
      userId: appointment.userId,
      description: appointment.description,
    });
    setPanelOpen(true);
  }

  function handleCancel() {
    setPanelOpen(false);
    setEditingId(null);
  }

  function handleSave() {
    const normalizedHour = clampInt(Number(draft.hour), 0, 23);
    const normalizedMinute = clampInt(Number(draft.minute), 0, 59);
    const normalizedDescription = String(draft.description ?? "").trim();

    if (!draft.date) return;
    if (!draft.userId) return;
    if (!normalizedDescription) return;

    if (editingId) {
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === editingId
            ? {
                ...appointment,
                date: draft.date,
                hour: normalizedHour,
                minute: normalizedMinute,
                userId: draft.userId,
                description: normalizedDescription,
              }
            : appointment,
        ),
      );
    } else {
      setAppointments((prev) => [
        ...prev,
        {
          id: `appt_${Date.now()}_${Math.random().toString(16).slice(2)}`,
          date: draft.date,
          hour: normalizedHour,
          minute: normalizedMinute,
          userId: draft.userId,
          description: normalizedDescription,
        },
      ]);
    }

    setPanelOpen(false);
    setEditingId(null);
  }

  const monthTitle = useMemo(() => formatMonthTitle(viewDate), [viewDate]);
  const baseWeekDate = useMemo(() => fromISODate(selectedDate), [selectedDate]);
  const weekStart = useMemo(() => startOfWeekSunday(baseWeekDate), [baseWeekDate]);
  const weekDays = useMemo(() => Array.from({ length: 7 }, (_, idx) => addDays(weekStart, idx)), [weekStart]);
  const weekTitle = useMemo(() => formatWeekTitle(weekStart, addDays(weekStart, 6)), [weekStart]);
  const hours = useMemo(() => Array.from({ length: 24 }, (_, idx) => idx), []);

  useEffect(() => {
    const timer = window.setInterval(() => setNowTs(Date.now()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const nowLine = useMemo(() => {
    const now = new Date(nowTs);
    const weekEnd = addDays(weekStart, 6);
    const inSameWeek =
      now >= new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate()) &&
      now <= new Date(weekEnd.getFullYear(), weekEnd.getMonth(), weekEnd.getDate(), 23, 59, 59, 999);

    if (!inSameWeek) return null;

    const minutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
    const top = (minutes / 60) * WEEK_HOUR_HEIGHT_PX;

    return {
      topPx: top,
      label: `${pad2(now.getHours())}:${pad2(now.getMinutes())}`,
    };
  }, [nowTs, weekStart]);

  const dayNowLine = useMemo(() => {
    if (selectedDate !== todayISO) return null;
    const now = new Date(nowTs);
    const minutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
    const top = (minutes / 60) * WEEK_HOUR_HEIGHT_PX;

    return {
      topPx: top,
      label: `${pad2(now.getHours())}:${pad2(now.getMinutes())}`,
    };
  }, [nowTs, selectedDate, todayISO]);

  const dailyTitle = useMemo(() => formatDailyHeader(fromISODate(selectedDate)), [selectedDate]);

  return (
    <div className={styles.agendaRoot}>
      <header className={styles.agendaHeader}>
        <div className={styles.agendaHeaderTop}>
          <h1 className={styles.agendaTitle}>Agenda</h1>
        </div>

        <nav className={styles.agendaTabs} aria-label="Filtrar compromissos">
          <button
            className={scope === "mine" ? styles.agendaTabActive : styles.agendaTab}
            onClick={() => {
              setScope("mine");
              setDraft((prev) => ({ ...prev, userId: currentUser.id }));
            }}
            type="button"
          >
            meus compromissos
          </button>
          <button
            className={scope === "others" ? styles.agendaTabActive : styles.agendaTab}
            onClick={() => {
              setScope("others");
              setDraft((prev) => ({
                ...prev,
                userId: prev.userId === currentUser.id ? defaultOtherUserId : prev.userId,
              }));
            }}
            type="button"
          >
            agendados para outros usuários
          </button>
        </nav>

        <div className={styles.agendaDivider} aria-hidden="true" />

        <div className={styles.agendaToolbar}>
          <div className={styles.agendaNavGroup}>
            <button
              className={styles.agendaMonthButton}
              onClick={() =>
                setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
              }
              type="button"
            >
              ←
            </button>
            <button
              className={styles.agendaMonthButton}
              onClick={() =>
                setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
              }
              type="button"
            >
              →
            </button>
            <button
              className={styles.agendaTodayButton}
              onClick={() => {
                const next = fromISODate(todayISO);
                setSelectedDate(todayISO);
                setViewDate(new Date(next.getFullYear(), next.getMonth(), 1));
              }}
              type="button"
            >
              hoje
            </button>
          </div>

          <div className={styles.agendaToolbarTitle} aria-live="polite">
            {viewMode === "semanal" ? weekTitle : viewMode === "diario" ? dailyTitle : monthTitle}
          </div>

          <div className={styles.agendaViewModes} aria-label="Modo de visualização">
            <button
              className={viewMode === "mensal" ? styles.agendaViewModeActive : styles.agendaViewMode}
              onClick={() => setViewMode("mensal")}
              type="button"
            >
              mensal
            </button>
            <button
              className={viewMode === "semanal" ? styles.agendaViewModeActive : styles.agendaViewMode}
              onClick={() => setViewMode("semanal")}
              type="button"
            >
              semanal
            </button>
            <button
              className={viewMode === "diario" ? styles.agendaViewModeActive : styles.agendaViewMode}
              onClick={() => setViewMode("diario")}
              type="button"
            >
              diário
            </button>
          </div>
        </div>
      </header>

      <section
        className={`${styles.agendaLayout} ${panelOpen ? styles.agendaLayoutWithPanel : ""}`}
      >
        {viewMode === "semanal" ? (
          <div className={styles.agendaCalendarCard}>
            <div className={styles.agendaWeekWrap}>
              <div className={styles.agendaWeekHeaderRow}>
                <div className={styles.agendaWeekCorner} aria-hidden="true" />
                {weekDays.map((day, idx) => {
                  const iso = toISODate(day);
                  const isToday = iso === todayISO;
                  return (
                    <button
                      key={iso}
                      className={isToday ? styles.agendaWeekHeaderActive : styles.agendaWeekHeader}
                      onClick={() => openForDate(iso)}
                      type="button"
                    >
                      {weekHeaderLabels[idx]} {day.getDate()}/{day.getMonth() + 1}
                    </button>
                  );
                })}
              </div>

              <div
                className={styles.agendaWeekGrid}
                role="grid"
                aria-label="Agenda semanal"
                style={{ ["--agendaHourHeight" as never]: `${WEEK_HOUR_HEIGHT_PX}px` }}
              >
                {nowLine ? (
                  <div
                    className={styles.agendaNowLine}
                    style={{ top: `${nowLine.topPx}px` }}
                    aria-label={`Agora ${nowLine.label}`}
                  />
                ) : null}
                {hours.map((hour) => (
                  <div key={`h_${hour}`} className={styles.agendaWeekRow} role="row">
                    <div className={styles.agendaWeekTime} role="rowheader">
                      {hour}:00
                    </div>
                    {weekDays.map((day) => {
                      const iso = toISODate(day);
                      const dayAppointments = appointmentsByDate.get(iso) ?? [];
                      const slot = dayAppointments.filter((appt) => appt.hour === hour);
                      const isToday = iso === todayISO;
                      return (
                        <button
                          key={`${iso}_${hour}`}
                          className={isToday ? styles.agendaWeekCellToday : styles.agendaWeekCell}
                          onClick={() => openForDate(iso, hour)}
                          type="button"
                          role="gridcell"
                        >
                          {slot.slice(0, 2).map((appointment) => (
                            <span
                              key={appointment.id}
                              className={styles.agendaWeekPill}
                              onClick={(event) => {
                                event.stopPropagation();
                                openForEdit(appointment);
                              }}
                              role="button"
                              tabIndex={-1}
                            >
                              <span className={styles.agendaWeekPillTime}>
                                {pad2(appointment.hour)}:{pad2(appointment.minute)}
                              </span>{" "}
                              {appointment.description}
                            </span>
                          ))}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : viewMode === "diario" ? (
          <div className={styles.agendaCalendarCard}>
            <div className={styles.agendaDayWrap}>
              <div className={styles.agendaDayHeaderRow}>
                <div className={styles.agendaWeekCorner} aria-hidden="true" />
                <button className={styles.agendaDayHeader} onClick={() => openForDate(selectedDate)} type="button">
                  {dailyTitle}
                </button>
              </div>

              <div
                className={styles.agendaDayGrid}
                role="grid"
                aria-label="Agenda diária"
                style={{ ["--agendaHourHeight" as never]: `${WEEK_HOUR_HEIGHT_PX}px` }}
              >
                {dayNowLine ? (
                  <div
                    className={styles.agendaNowLine}
                    style={{ top: `${dayNowLine.topPx}px` }}
                    aria-label={`Agora ${dayNowLine.label}`}
                  />
                ) : null}

                {hours.map((hour) => {
                  const dayAppointments = appointmentsByDate.get(selectedDate) ?? [];
                  const slot = dayAppointments.filter((appt) => appt.hour === hour);

                  return (
                    <div key={`d_${hour}`} className={styles.agendaDayRow} role="row">
                      <div className={styles.agendaWeekTime} role="rowheader">
                        {hour}:00
                      </div>
                      <button
                        className={styles.agendaDayCell}
                        onClick={() => openForDate(selectedDate, hour)}
                        type="button"
                        role="gridcell"
                      >
                        {slot.slice(0, 3).map((appointment) => (
                          <span
                            key={appointment.id}
                            className={styles.agendaWeekPill}
                            onClick={(event) => {
                              event.stopPropagation();
                              openForEdit(appointment);
                            }}
                            role="button"
                            tabIndex={-1}
                          >
                            <span className={styles.agendaWeekPillTime}>
                              {pad2(appointment.hour)}:{pad2(appointment.minute)}
                            </span>{" "}
                            {appointment.description}
                          </span>
                        ))}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.agendaCalendarCard}>
            <div className={styles.agendaWeekdays} aria-hidden="true">
              {weekdayLabels.map((label) => (
                <div key={label} className={styles.agendaWeekday}>
                  {label}
                </div>
              ))}
            </div>

            <div className={styles.agendaGrid}>
              {monthCells.map((cell) => {
                const cellISO = toISODate(cell.date);
                const isSelected = cellISO === selectedDate;
                const isToday = cellISO === todayISO;
                const dayAppointments = appointmentsByDate.get(cellISO) ?? [];
                const preview = dayAppointments.slice(0, 2);
                const remaining = Math.max(0, dayAppointments.length - preview.length);

                return (
                  <button
                    key={cellISO}
                    className={[
                      styles.agendaCell,
                      cell.inMonth ? "" : styles.agendaCellOutside,
                      isToday ? styles.agendaCellToday : "",
                      isSelected ? styles.agendaCellSelected : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => openForDate(cellISO)}
                    type="button"
                  >
                    <div className={styles.agendaCellTop}>
                      <span className={styles.agendaCellDay}>{cell.date.getDate()}</span>
                      {dayAppointments.length > 0 ? (
                        <span className={styles.agendaCellDot} aria-hidden="true" />
                      ) : null}
                    </div>

                    <div className={styles.agendaCellBody}>
                      {preview.map((appointment) => {
                        const userName =
                          users.find((user) => user.id === appointment.userId)?.name ?? "usuário";

                        return (
                          <button
                            key={appointment.id}
                            className={styles.agendaApptRow}
                            onClick={(event) => {
                              event.stopPropagation();
                              openForEdit(appointment);
                            }}
                            type="button"
                          >
                            <span className={styles.agendaApptTime}>
                              {pad2(appointment.hour)}:{pad2(appointment.minute)}
                            </span>
                            <span className={styles.agendaApptText}>
                              {appointment.description}
                              <span className={styles.agendaApptUser}> · {userName}</span>
                            </span>
                          </button>
                        );
                      })}
                      {remaining > 0 ? <div className={styles.agendaMore}>+{remaining} mais</div> : null}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {panelOpen ? (
          <aside className={styles.agendaPanel} aria-label="Editar compromisso">
            <header className={styles.agendaPanelHeader}>
              <h2 className={styles.agendaPanelTitle}>Compromisso</h2>
              <button className={styles.agendaPanelClose} onClick={handleCancel} type="button">
                ✕
              </button>
            </header>

            <div className={styles.agendaPanelBody}>
              <div className={styles.agendaFieldGroup}>
                <label className={styles.agendaLabel}>Data</label>
                <input
                  className={styles.agendaInput}
                  type="date"
                  value={draft.date}
                  onChange={(event) => {
                    const value = event.target.value;
                    setDraft((prev) => ({ ...prev, date: value }));
                    setSelectedDate(value);
                    setViewDate(() => {
                      const next = fromISODate(value);
                      return new Date(next.getFullYear(), next.getMonth(), 1);
                    });
                  }}
                />
              </div>

              <div className={styles.agendaTimeRow}>
                <div className={styles.agendaFieldGroup}>
                  <label className={styles.agendaLabel}>Hora</label>
                  <input
                    className={styles.agendaInput}
                    inputMode="numeric"
                    value={pad2(clampInt(Number(draft.hour), 0, 23))}
                    onChange={(event) =>
                      setDraft((prev) => ({ ...prev, hour: clampInt(Number(event.target.value), 0, 23) }))
                    }
                  />
                </div>

                <div className={styles.agendaFieldGroup}>
                  <label className={styles.agendaLabel}>Min</label>
                  <input
                    className={styles.agendaInput}
                    inputMode="numeric"
                    value={pad2(clampInt(Number(draft.minute), 0, 59))}
                    onChange={(event) =>
                      setDraft((prev) => ({
                        ...prev,
                        minute: clampInt(Number(event.target.value), 0, 59),
                      }))
                    }
                  />
                </div>
              </div>

              <div className={styles.agendaFieldGroup}>
                <label className={styles.agendaLabel}>Para o usuário</label>
                <select
                  className={styles.agendaSelect}
                  value={draft.userId}
                  onChange={(event) => setDraft((prev) => ({ ...prev, userId: event.target.value }))}
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.agendaFieldGroup}>
                <label className={styles.agendaLabel}>Descrição</label>
                <textarea
                  className={styles.agendaTextarea}
                  placeholder="Descreva o compromisso..."
                  value={draft.description}
                  onChange={(event) =>
                    setDraft((prev) => ({ ...prev, description: event.target.value }))
                  }
                  rows={6}
                />
                {!String(draft.description).trim() ? (
                  <div className={styles.agendaHint}>A descrição é obrigatória para salvar.</div>
                ) : null}
              </div>
            </div>

            <footer className={styles.agendaPanelFooter}>
              <button className={styles.agendaPrimary} onClick={handleSave} type="button">
                Salvar
              </button>
              <button className={styles.agendaSecondary} onClick={handleCancel} type="button">
                Cancelar
              </button>
            </footer>
          </aside>
        ) : null}
      </section>

      {viewMode === "mensal" ? (
        <div className={styles.agendaDayStrip}>
          <div className={styles.agendaDayStripTitle}>
            {new Intl.DateTimeFormat("pt-BR", { dateStyle: "full" }).format(fromISODate(selectedDate))}
          </div>
          <div className={styles.agendaDayStripList}>
            {selectedAppointments.length === 0 ? (
              <span className={styles.agendaDayStripEmpty}>Sem compromissos para esta data.</span>
            ) : (
              selectedAppointments.map((appointment) => {
                const userName =
                  users.find((user) => user.id === appointment.userId)?.name ?? "usuário";
                return (
                  <button
                    key={appointment.id}
                    className={styles.agendaDayStripItem}
                    onClick={() => openForEdit(appointment)}
                    type="button"
                  >
                    <span className={styles.agendaDayStripTime}>
                      {pad2(appointment.hour)}:{pad2(appointment.minute)}
                    </span>
                    <span className={styles.agendaDayStripText}>
                      {appointment.description}
                      <span className={styles.agendaDayStripUser}> · {userName}</span>
                    </span>
                    <span className={styles.agendaDayStripChevron}>›</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
