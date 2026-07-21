"use client";

import { FormEvent, useState } from "react";

type ApostilaLiberada = {
  id: number;
  apostilaSlug: string;
  status: string;
  liberadoEm: string | null;
};

export default function MinhasApostilasPage() {
  const [email, setEmail] = useState("");
  const [apostilas, setApostilas] = useState<ApostilaLiberada[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  async function buscarApostilas(event: FormEvent) {
    event.preventDefault();

    setCarregando(true);
    setMensagem("");
    setApostilas([]);

    try {
      const resposta = await fetch(
        `/api/apostilas/compradas?email=${encodeURIComponent(email)}`
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        setMensagem(
          dados.erro || "Não foi possível buscar suas apostilas."
        );
        return;
      }

      setApostilas(dados.apostilas || []);

      if (!dados.apostilas || dados.apostilas.length === 0) {
        setMensagem(
          "Nenhuma apostila liberada foi encontrada para esse e-mail."
        );
      }
    } catch {
      setMensagem(
        "Ocorreu um erro ao buscar suas apostilas."
      );
    } finally {
      setCarregando(false);
    }
  }

  function formatarNome(slug: string) {
    return slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (letra) => letra.toUpperCase());
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl bg-white p-6 shadow-md md:p-10">
          <h1 className="text-3xl font-bold text-purple-700">
            Minhas Apostilas
          </h1>

          <p className="mt-2 text-gray-600">
            Digite o mesmo e-mail usado na compra.
          </p>

          <form
            onSubmit={buscarApostilas}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="seuemail@exemplo.com"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-purple-600"
            />

            <button
              type="submit"
              disabled={carregando}
              className="rounded-lg bg-purple-700 px-6 py-3 font-semibold text-white transition hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {carregando
                ? "Buscando..."
                : "Buscar apostilas"}
            </button>
          </form>

          {mensagem && (
            <div className="mt-6 rounded-lg bg-yellow-50 p-4 text-yellow-800">
              {mensagem}
            </div>
          )}

          {apostilas.length > 0 && (
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {apostilas.map((apostila) => (
                <article
                  key={apostila.id}
                  className="rounded-xl border border-gray-200 p-5"
                >
                  <div className="text-4xl">📘</div>

                  <h2 className="mt-3 text-xl font-bold text-gray-900">
                    {formatarNome(apostila.apostilaSlug)}
                  </h2>

                  <p className="mt-2 text-sm font-semibold text-green-700">
                    Compra liberada
                  </p>

                  <a
                    href={`/api/apostilas/download/${apostila.id}?email=${encodeURIComponent(
                      email
                    )}`}
                    className="mt-5 inline-block rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
                  >
                    Baixar apostila
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}