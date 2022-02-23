var http = require("http");
var httpProxy = require("http-proxy");
var fs = require("fs");
var path = require("path");

const PORT = 8000;
const TARGET = "http://localhost:8081";
const XAPI_ENDPOINT = "/data/xAPI/";

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpg",
  ".wav": "audio/wav",
  ".mp3": "audio/mpeg",
  fallback: "text/plain",
};

const proxy = httpProxy.createProxyServer({});

const server = http.createServer(handler);
console.log(`listening on port ${PORT}`);
server.listen(PORT);

function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname.startsWith(XAPI_ENDPOINT)) {
    console.log("Proxy: " + url.pathname);
    proxy.web(req, res, { target: TARGET }, (e) => console.error(e));
  } else {
    console.log("Serve: " + url.pathname);
    serveLocalFile(url.pathname, res);
  }
}

function serveLocalFile(pathname, res) {
  let filePath = "." + pathname;
  if (filePath == "./") filePath = "./index.html";

  const contentType = MIME_TYPES[path.extname(filePath)] ?? MIME_TYPES.fallback;
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code == "ENOENT") {
        res.writeHead(404, { "Content-Type": contentType });
        res.end();
      } else {
        res.writeHead(500);
        res.end(`Error: ${error.code}\n`);
      }
    } else {
      res.writeHead(200, {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": TARGET,
      });
      res.end(content, "utf-8");
    }
  });
}
