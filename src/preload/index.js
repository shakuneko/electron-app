import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', {
      closeWindow: () => ipcRenderer.invoke('closeWindow'),
    })
    contextBridge.exposeInMainWorld('_fs', {
      writeFile: (arg) => ipcRenderer.invoke('writeFile', arg),
      readFile: (arg) => {
        return ipcRenderer.invoke('readFile', arg)
      }
    })
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
  window._fs.writeFile = () => 'test'
}
