const { BrowserWindow, app, ipcMain, screen, dialog } = require('electron');

const path = require('path');
const url = require('url');

let mainWindow;

const OPERATIONS = {
  CHANGE_SIZE_SCREEN: 'CHANGE_SIZE_SCREEN',
  SHOW: 'SHOW',
  HIDE: 'HIDE',
};

const wpd = w => {
  var { width } = screen.getPrimaryDisplay().workAreaSize;
  return (w * width) / 100;
};

const hpd = h => {
  var { height } = screen.getPrimaryDisplay().workAreaSize;
  return (h * height) / 100;
};

const createWindow = () => {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true,
    });

  mainWindow = new BrowserWindow({
    show: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // protocol.registerHttpProtocol(PROTOCOL_CODE, (req, cb) => {
  //   const fullUrl = req.url;
  //   console.log(fullUrl);
  //   mainWindow.loadURL(fullUrl);
  // });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadURL(startUrl);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

let link;

app.on('open-url', function(event, data) {
  event.preventDefault();
  link = data;
  alert(link);
});

app.setAsDefaultProtocolClient('reparai');

ipcMain.on(OPERATIONS.CHANGE_SIZE_SCREEN, (event, width, height) => {
  const newWidth = parseInt(wpd(width));
  const newHeight = parseInt(hpd(height));
  mainWindow.setSize(newWidth, newHeight);
  mainWindow.center();
});

ipcMain.on(OPERATIONS.SHOW, () => {
  mainWindow.show();
});

ipcMain.on(OPERATIONS.HIDE, () => {
  mainWindow.hide();
});

module.exports.getLink = link;
