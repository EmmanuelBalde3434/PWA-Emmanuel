import { useState, useEffect } from "react";
import { addEntry } from "../lib/db";
import { Wifi, WifiOff, Save } from "lucide-react";

export default function EntryForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);
    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  // 🧾 Guardar entrada
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await addEntry({ title, content });

    alert(
      isOnline
        ? "✅ Entrada guardada correctamente."
        : "📡 Guardado offline. Se sincronizará cuando vuelvas a estar conectado."
    );

    setTitle("");
    setContent("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
    >
      <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-4">
        <Save className="text-blue-600" size={20} />
        <h3 className="text-lg font-semibold text-gray-800 tracking-tight">
          Nueva entrada
        </h3>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Título
        </label>
        <input
          type="text"
          placeholder="Ejemplo: Tarea de PWA"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Contenido
        </label>
        <textarea
          placeholder="Escribe los detalles..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all min-h-[100px] resize-y placeholder-gray-400"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg shadow-md transition-transform active:scale-[0.98]"
      >
        <Save size={18} />
        Guardar entrada
      </button>

      <div
        className={`flex justify-center items-center gap-2 mt-4 text-sm font-medium ${
          isOnline ? "text-green-600" : "text-red-500"
        }`}
      >
        {isOnline ? (
          <>
            <Wifi size={16} /> <span>Conectado</span>
          </>
        ) : (
          <>
            <WifiOff size={16} /> <span>Sin conexión</span>
          </>
        )}
      </div>
    </form>
  );
}
