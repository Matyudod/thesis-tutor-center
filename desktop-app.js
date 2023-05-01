const config = require("./src/configs/database.config");
const { app, BrowserWindow } = require('electron')
function createWindow () {
    const PORT = config.port || "3000";
    const win = new BrowserWindow({
      width: 1920,
      height: 1080,
      webPreferences: {
        nodeIntegration: true
      }
    })
  
    win.loadURL(`http://localhost:${PORT}/auth/loginAdmin`);
    win.removeMenu();
  }
  
app.whenReady().then(() => {
    createWindow();
})