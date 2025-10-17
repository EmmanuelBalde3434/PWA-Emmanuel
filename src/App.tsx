import "./App.css";
import EntryForm from "./components/EntryForm";
import EntryList from "./components/EntryList";

export default function App() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-2">
          PWA <span className="text-blue-600">E</span>
        </h1>
        <p className="text-gray-500 text-base">
          Guarda tus notas incluso sin conexión.
        </p>
      </div>

      <div className="flex flex-col items-center w-full max-w-md space-y-6">
        <EntryForm />
        <EntryList />
      </div>

    </main>
  );
}
