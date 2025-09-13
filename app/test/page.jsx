"use client";
import { useEffect, useState } from "react";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export default function Page() {
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState(null);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [useNeon, setUseNeon] = useState(false);

  const apiEndpoint = useNeon ? "/api/test-neon" : "/api/test";

  const load = async () => {
    const r = await fetch(apiEndpoint, { cache: "no-store" });
    const j = await r.json();
    setMeta(j.meta);
    setRows(j.rows ?? []);
  };

  const add = async () => {
    await fetch(apiEndpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: Number(id), name }),
    });
    setName("");
    await load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div style={{ padding: 24, color: "#eee", background: "#121212", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 36, marginBottom: 12 }}>Test Neon ↔ Prisma</h1>
      <div style={{ marginBottom: 8 }}>
        DB: <b>{meta?.db}</b> — schema: <b>{meta?.schema}</b>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input 
            type="checkbox" 
            checked={useNeon} 
            onChange={e => setUseNeon(e.target.checked)}
          />
          Sử dụng Neon Serverless Driver (thay vì Prisma)
        </label>
      </div>
      <div style={{ display: "flex", gap: 8, margin: "12px 0" }}>
        <input value={id} onChange={e=>setId(e.target.value)} type="number" style={{ padding: 6 }} />
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="name" style={{ padding: 6 }} />
        <button onClick={add} style={{ padding: "6px 10px" }}>Add</button>
        <button onClick={load} style={{ padding: "6px 10px" }}>Reload</button>
      </div>
      <pre>{JSON.stringify(rows, null, 2)}</pre>
    </div>
  );
}
