const config = require("./src/configs/database.config");
const { app, BrowserWindow, nativeImage } = require('electron')
function createWindow () {
    const PORT = config.port || "3000";
    const icon = nativeImage.createFromDataURL(`http://localhost:${PORT}/images/chatbot.png`) 
    const win = new BrowserWindow({
      width: 1920,
      height: 1080,
      icon: icon,
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