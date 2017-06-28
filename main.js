const {app, BrowserWindow, Menu} = require('electron')
const url = require('url')
const path = require('path')

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

    setMenu();
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

function setMenu() {
     const template = [
         {
             label: 'Edit',
             submenu: [
                 {
                     role: 'undo'
                 },
                 {
                     role: 'redo'
                 },
                 {
                     type: 'separator'
                 },
                 {
                     role: 'cut'
                 },
                 {
                     role: 'copy'
                 },
                 {
                     role: 'paste'
                 }
             ]
         },
         {
             label: 'View',
             submenu: [
                 {
                     role: 'reload'
                 },
                 {
                     role: 'toggledevtools'
                 },
                 {
                     type: 'separator'
                 },
                 {
                     role: 'resetzoom'
                 },
                 {
                     role: 'zoomin'
                 },
                 {
                     role: 'zoomout'
                 },
                 {
                     type: 'separator'
                 },
                 {
                     role: 'togglefullscreen'
                 }
             ]
         },
         {
             role: 'window',
             submenu: [
                 {
                     role: 'minmize'
                 },
                 {
                     role: 'close'
                 }
             ]
         },
         {
             role: 'help',
             submenu: [
                 {
                     label: 'Learn More'
                 }
             ]
         }
     ]

    if (process.platform === 'darwin') {
        template.unshift({
            label: app.getName(),
            submenu: [
                {role: 'about'},
                {type: 'separator'},
                {role: 'services', submenu: []},
                {type: 'separator'},
                {role: 'hide'},
                {role: 'hideothers'},
                {role: 'unhide'},
                {type: 'separator'},
                {role: 'quit'}
            ]
        })

        template[1].submenu.push(
            {type: 'separator'},
            {
                label: 'Speech',
                submenu: [
                    {role: 'startspeaking'},
                    {role: 'stopspeaking'}
                ]
            }
        )

        template[3].submenu = [
            {role: 'close'},
            {role: 'minimize'},
            {role: 'zoom'},
            {type: 'separator'},
            {role: 'front'}
        ]
    }
     const menu = Menu.buildFromTemplate(template)
     Menu.setApplicationMenu(menu)
 }
