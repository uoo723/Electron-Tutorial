const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')
const {ipcMain} = require("electron")

let win

function createWindow() {
    win = new BrowserWindow({width: 800, height: 600});
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win == null) {
        createWindow();
    }
});

ipcMain.on('openFile', (event, path) => {
    const {dialog} = require('electron')
    const fs = require('fs')
    dialog.showOpenDialog(fileNames => {
        if (fileNames === undefined) {
            console.log("No file selected");
        } else {
            readFile(fileNames[0]);
        }
    });

    function readFile(filepath) {
        fs.readFile(filepath, 'utf-8', (err, data) => {
            if (err) {
                alert("An erro aocurred reading the file : " + err.message);
                return;
            }

            event.sender.send('fileData', data);
        })
    }
})
