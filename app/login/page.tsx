"use client";

import { FormEvent, useState } from "react";
import { DaBiTechLogo } from "@/components/shared/dabi-tech-logo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const payload = (await response.json().catch(() => null)) as
      | { error?: string }
      | null;

    if (!response.ok) {
      setError(payload?.error ?? "Falha no login.");
      return;
    }

    window.location.assign("/");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background:
          "radial-gradient(circle at top left, rgba(90, 209, 255, 0.18), transparent 22%), radial-gradient(circle at bottom right, rgba(102, 224, 182, 0.12), transparent 20%), linear-gradient(180deg, #08101d 0%, #0b1422 100%)",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "1120px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.1fr) minmax(360px, 420px)",
          gap: "20px",
        }}
      >
        <article
          style={{
            borderRadius: "32px",
            padding: "32px",
            border: "1px solid rgba(149, 177, 214, 0.16)",
            background:
              "linear-gradient(135deg, rgba(90, 209, 255, 0.08), rgba(255,255,255,0.03))",
            boxShadow: "0 24px 80px rgba(0, 0, 0, 0.28)",
          }}
        >
          <span
            style={{
              color: "#5ad1ff",
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Nova base do ERP
          </span>
          <div style={{ maxWidth: "180px", margin: "16px 0 28px" }}>
            <DaBiTechLogo />
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(2.4rem, 5vw, 4.6rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.06em",
              maxWidth: "10ch",
            }}
          >
            Operação com leitura executiva e ritmo de marketplace.
          </h1>
          <p
            style={{
              color: "#8fa5c2",
              lineHeight: 1.7,
              marginTop: "18px",
              maxWidth: "58ch",
            }}
          >
            O ERP foi reorganizado com referência em plataformas como o DaBi Tech ERP:
            menos tela improvisada, mais visão de receita, catálogo, clientes e pedidos.
          </p>
        </article>

        <form
          onSubmit={handleSubmit}
          style={{
            borderRadius: "32px",
            padding: "28px",
            border: "1px solid rgba(149, 177, 214, 0.16)",
            background: "rgba(14, 24, 40, 0.82)",
            backdropFilter: "blur(18px)",
            boxShadow: "0 24px 80px rgba(0, 0, 0, 0.28)",
          }}
        >
          <span
            style={{
              color: "#5ad1ff",
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Entrar
          </span>
          <h2 style={{ margin: "10px 0 6px", fontSize: "2rem" }}>Acessar cockpit comercial</h2>
          <p style={{ color: "#8fa5c2", marginTop: 0, marginBottom: "24px" }}>
            Use o usuário inicial configurado no seed para entrar no painel.
          </p>

          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", marginBottom: "8px", color: "#c8d5e6" }}>Email</label>
            <input
              style={fieldStyle}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label style={{ display: "block", marginBottom: "8px", color: "#c8d5e6" }}>Senha</label>
            <input
              style={fieldStyle}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {error ? <p style={{ marginBottom: "16px", color: "#ff8ea0" }}>{error}</p> : null}

          <button
            style={{
              width: "100%",
              minHeight: "48px",
              border: 0,
              borderRadius: "16px",
              fontWeight: 700,
              background: "linear-gradient(135deg, #5ad1ff, #66e0b6)",
              color: "#08101d",
              cursor: "pointer",
            }}
            type="submit"
          >
            Entrar no ERP
          </button>

          <p style={{ color: "#8fa5c2", marginTop: "18px", fontSize: "0.95rem" }}>
            Admin inicial: <strong style={{ color: "#f3f7fb" }}>admin@dabi.com</strong>
          </p>
        </form>
      </section>
    </main>
  );
}

const fieldStyle = {
  width: "100%",
  minHeight: "48px",
  borderRadius: "16px",
  border: "1px solid rgba(149, 177, 214, 0.16)",
  background: "rgba(255, 255, 255, 0.05)",
  color: "#f3f7fb",
  padding: "0 14px",
} satisfies React.CSSProperties;
