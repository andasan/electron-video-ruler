const electron = require('electron');
const Ffmpeg = require('fluent-ffmpeg');
const { app, BrowserWindow, ipcMain } = electron; //overall running electron app process

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 750,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('video:submit', (event, path) => {
    Ffmpeg.ffprobe(path, (err, metadata) => {
        if (err) console.log(err);
        mainWindow.webContents.send('video:metadata', metadata.format.duration);
    });
});