import { useSyncExternalStore } from "react";
import { subscribe, getState } from "../lib/store.js";

/* Durum aboneliği. Herhangi bir yazma işlemi tüm dinleyicileri tetikler. */
export function useStore() {
  return useSyncExternalStore(subscribe, getState, getState);
}
