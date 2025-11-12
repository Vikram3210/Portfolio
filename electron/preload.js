const { contextBridge } = require('electron')

// Expose limited, safe APIs to the renderer if needed later
contextBridge.exposeInMainWorld('desktop', {
	isDesktop: true,
})
