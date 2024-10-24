const http = require("http");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3000;

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("This is a Discord Bot running on Render.\n");
  })
  .listen(PORT, () => {
    console.log(`HTTPサーバーがポート${PORT}で起動しました`);
  });
