import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'application/javascript','.json':'application/json','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.pdf':'application/pdf'};
http.createServer((req,res)=>{let p=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(p==='/')p='/index.html';if(!path.extname(p))p+='.html';const file=path.resolve(root,'.'+p);if(!file.startsWith(root+path.sep)||!fs.existsSync(file)){res.writeHead(404);return res.end('Page not found');}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});fs.createReadStream(file).pipe(res);}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
