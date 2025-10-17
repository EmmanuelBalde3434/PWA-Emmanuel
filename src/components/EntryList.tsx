import { useEffect, useState } from "react";
import { getEntries } from "../lib/db";
import { ListTodo, CloudCheck, CloudOff } from "lucide-react";

export default function EntryList() {
  const [entries, setEntries] = useState<any[]>([]);

  async function loadEntries() {
  const data = await getEntries();
  const filtered = navigator.onLine
    ? data 
    : data.filter((e) => e.synced);
  setEntries([...filtered].reverse());
}


  useEffect(() => {
    loadEntries();
    const channel = new BroadcastChannel("entries-updated");
    channel.onmessage = () => {
      loadEntries();
    };
    return () => channel.close();
  }, []);

  if (!entries.length)
    return (
      <div className="w-full max-w-md mx-auto bg-white text-center text-gray-500 border border-gray-200 shadow-md rounded-2xl p-6 mt-6">
        🗒️ No hay entradas todavía.
      </div>
    );

  return (
    <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-6 mt-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-2 mb-4">
        <ListTodo className="text-blue-600" size={20} />
        <h3 className="text-lg font-semibold text-gray-800">
          Entradas guardadas
        </h3>
      </div>

      <ul className="space-y-3">
        {entries.map((e) => (
          <li
            key={e.id}
            className="border border-gray-100 bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            <h4 className="font-semibold text-gray-800">{e.title}</h4>
            <p className="text-sm text-gray-600 mt-1 mb-3">{e.content}</p>

            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{new Date(e.date).toLocaleString()}</span>

              <span
                className={`flex items-center gap-1 px-2 py-1 rounded-md font-medium ${
                  e.synced
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {e.synced ? (
                  <>
                    <CloudCheck size={14} /> Sincronizado
                  </>
                ) : (
                  <>
                    <CloudOff size={14} /> Pendiente
                  </>
                )}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
