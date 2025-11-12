const { app, BrowserWindow, shell } = require('electron')
const path = require('path')

const isDev = process.env.ELECTRON_START_URL || process.env.VITE_DEV_SERVER_URL || process.env.NODE_ENV !== 'production'

let mainWindow

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1280,
		height: 820,
		minWidth: 1200,
		minHeight: 720,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			contextIsolation: true,
			nodeIntegration: false,
		}
	})

	if (isDev) {
		const devUrl = process.env.ELECTRON_START_URL || process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173'
		mainWindow.loadURL(devUrl)
		mainWindow.webContents.openDevTools({ mode: 'detach' })
	} else {
		mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'))
	}

	mainWindow.webContents.setWindowOpenHandler(({ url }) => {
		// Open external links in default browser
		shell.openExternal(url)
		return { action: 'deny' }
	})
}

app.whenReady().then(() => {
	createWindow()

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})
