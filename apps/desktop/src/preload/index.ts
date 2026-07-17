import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('podControl', {
  platform: process.platform
})
