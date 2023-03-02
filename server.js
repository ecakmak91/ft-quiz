
import express from 'express';
import NodeFetch from 'node-fetch';
import path from 'path';
import manifest from './dist/client/ssr-manifest.json';
import {render} from './dist/server/main.js';
import {ssr} from './dist/server/package.json' assert { type: "json5" };


//const express=require("express");
//const NodeFetch=require("node-fetch").default;
//const path=require("path");



//const manifest=require("./dist/client/ssr-manifest.json");
//const {default:render}=require("./dist/server/main.js");
// const {
//   ssr: {assets}
// }=require('./dist/server/package.json')




globalThis.fetch=NodeFetch;


const app=express();

for (const asset of ssr.assets) {
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

app.listen(4000)