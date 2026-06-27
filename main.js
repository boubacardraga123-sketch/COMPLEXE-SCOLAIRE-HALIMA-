const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    icon: path.join(__dirname, 'assets/icon.png'),
    title: 'Complexe Scolaire Halima',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('index.html');

  // Menu minimal
  const menu = Menu.buildFromTemplate([
    {
      label: 'Application',
      submenu: [
        { label: 'Recharger', accelerator: 'F5', click: () => win.reload() },
        { type: 'separator' },
        { label: 'Quitter', accelerator: 'Alt+F4', click: () => app.quit() }
      ]
    },
    {
      label: 'Affichage',
      submenu: [
        { label: 'Plein écran', accelerator: 'F11', click: () => win.setFullScreen(!win.isFullScreen()) },
        { label: 'Zoom +', accelerator: 'CmdOrCtrl+=', role: 'zoomIn' },
        { label: 'Zoom -', accelerator: 'CmdOrCtrl+-', role: 'zoomOut' }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
