import { openDB } from "idb";

export async function initDB() {
  return openDB("pwa-db", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("entries")) {
        db.createObjectStore("entries", { keyPath: "id", autoIncrement: true });
      }
    },
  });
}

export async function addEntry(entry: { title: string; content: string }) {
  const db = await initDB();
  const tx = db.transaction("entries", "readwrite");

  const newEntry = {
    ...entry,
    synced: navigator.onLine,
    date: new Date().toISOString(),
  };

  await tx.store.add(newEntry);
  await tx.done;


  const channel = new BroadcastChannel("entries-updated");
  channel.postMessage("new-entry");
  channel.close();
}

export async function getEntries() {
  const db = await initDB();
  const data = await db.getAll("entries");
  return data;
}
