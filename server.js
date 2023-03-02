
import express from 'express';
import NodeFetch from 'node-fetch';
import path from 'path';
import manifest from './dist/client/ssr-manifest.json' assert {type: "json"};
import render from './dist/server/main.js';
import ssr from './dist/server/package.json' assert {type: "json"};
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



globalThis.fetch=NodeFetch;


const app=express();

for (const asset of ssr.ssr.assets) {
  app.use(
    '/'+asset,
    express.static(path.join(__dirname, 'dist/client/'+asset))
  )
}

app.get('*', async (request,response)=>{
  const {protocol}=request
  const url=`${protocol}://${request.get('host')}${request.originalUrl}`

  const {html}=await render(url,{
    manifest,
    preload:true,
    request,
    response
  })
  response.end(html)
})

app.listen(4000,()=>{
  console.log("Server is running")
})