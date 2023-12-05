export {};

// Global type for window.beam
declare global {
  interface Window {
    beam: (eventName: string) => void;
  }
}
