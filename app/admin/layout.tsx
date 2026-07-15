"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    const adminLogado = localStorage.getItem("admin");

    if (adminLogado !== "logado") {
      router.replace("/admin-login");
      return;
    }

    setVerificando(false);
  }, [router]);

  if (verificando) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111111",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <p>Verificando acesso...</p>
      </main>
    );
  }

  return <>{children}</>;
}