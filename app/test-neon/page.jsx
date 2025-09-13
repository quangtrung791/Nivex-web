"use client";
import { useEffect, useState } from "react";

export default function TestNeonPage() {
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState(null);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");

  const apiEndpoint = "/api/test-neon";

  const load = async () => {
    try {
      const r = await fetch(apiEndpoint, { cache: "no-store" });
      const j = await r.json();
      setMeta(j.meta);
      setRows(j.rows ?? []);
    } catch (error) {
      console.error("Load error:", error);
    }
  };

  const add = async () => {
    try {
      const params = new URLSearchParams();
      if (id) params.append('id', id);
      params.append('name', name);
      
      await fetch(`${apiEndpoint}?${params.toString()}`, {
        method: "GET",
      });
      setName("");
      setId(0);
      await load();
    } catch (error) {
      console.error("Add error:", error);
    }
  };

  useEffect(() => { 
    load(); 
  }, []);

  return (
    <div style={{ padding: 24, color: "#eee", background: "#121212", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 36, marginBottom: 12 }}>Test Neon Serverless Driver</h1>
      <div style={{ marginBottom: 8 }}>
        DB: <b>{meta?.db}</b> — schema: <b>{meta?.schema}</b>
      </div>
      <div style={{ marginBottom: 12, padding: 12, background: "#2a2a2a", borderRadius: 8 }}>
        <h3 style={{ margin: "0 0 8px 0", color: "#58bd7d" }}>Neon Serverless Driver</h3>
        <p style={{ margin: 0, fontSize: 14, color: "#ccc" }}>
          Sử dụng @neondatabase/serverless driver để kết nối trực tiếp với PostgreSQL
        </p>
      </div>
      <div style={{ display: "flex", gap: 8, margin: "12px 0" }}>
        <input 
          value={id} 
          onChange={e=>setId(e.target.value)} 
          type="number" 
          placeholder="ID (optional)"
          style={{ padding: 6, borderRadius: 4, border: "1px solid #555", background: "#333", color: "#eee" }} 
        />
        <input 
          value={name} 
          onChange={e=>setName(e.target.value)} 
          placeholder="Enter name"
          style={{ padding: 6, borderRadius: 4, border: "1px solid #555", background: "#333", color: "#eee" }} 
        />
        <button 
          onClick={add} 
          style={{ 
            padding: "6px 12px", 
            borderRadius: 4, 
            border: "none", 
            background: "#58bd7d", 
            color: "white", 
            cursor: "pointer" 
          }}
        >
          Add via Neon
        </button>
        <button 
          onClick={load} 
          style={{ 
            padding: "6px 12px", 
            borderRadius: 4, 
            border: "1px solid #555", 
            background: "#333", 
            color: "#eee", 
            cursor: "pointer" 
          }}
        >
          Reload
        </button>
      </div>
      
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ color: "#58bd7d", marginBottom: 8 }}>Data Records ({rows.length} items):</h3>
      </div>
      
      <div style={{ 
        background: "#1e1e1e", 
        padding: 16, 
        borderRadius: 8, 
        border: "1px solid #333",
        fontFamily: "monospace",
        fontSize: 14,
        lineHeight: 1.5,
        overflow: "auto"
      }}>
        <pre style={{ margin: 0, color: "#e0e0e0" }}>
          {JSON.stringify(rows, null, 2)}
        </pre>
      </div>
    </div>
  );
}