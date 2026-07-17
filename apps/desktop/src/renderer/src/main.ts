import './styles.css'

declare global {
  interface Window {
    podControl: {
      platform: string
    }
  }
}

document.querySelector<HTMLSpanElement>('#platform')!.textContent = `Electron em ${window.podControl.platform}`
