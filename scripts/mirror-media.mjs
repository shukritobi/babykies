import fs from 'node:fs/promises';
import {catalog,bundles} from '../public/catalog.js';
const root='public/assets/original';
await fs.mkdir(root,{recursive:true});
const items=[...catalog,...bundles].filter(p=>p.image.startsWith('https://cdn.onpay.my/')).map(p=>[p.id,p.image]);
items.push(['hero','https://cdn.onpay.my/users/babykies/media/products/thumb/9-mini%20dragon%20fruit-1611947977.jpg'],['story','https://cdn.onpay.my/users/babykies/media/uploads/bellfp1mx1c8orpkjry7.jpg']);
const mappings=new Map();
for(const [id,url] of items){if(mappings.has(url))continue;try{const res=await fetch(url,{signal:AbortSignal.timeout(15000)});const ct=res.headers.get('content-type')||'';if(!res.ok||!/^image\/(jpeg|png|webp)/i.test(ct))throw Error('Unavailable '+res.status);const bytes=Buffer.from(await res.arrayBuffer());if(bytes.length<100||bytes.length>8*1024*1024)throw Error('Invalid size');const ext=ct.includes('png')?'png':ct.includes('webp')?'webp':'jpg';const local='assets/original/'+id+'.'+ext;await fs.writeFile('public/'+local,bytes);mappings.set(url,local);console.log('Mirrored',id,bytes.length)}catch(e){console.warn(id,e.message)}}
let c=await fs.readFile('public/catalog.js','utf8'),h=await fs.readFile('public/index.html','utf8');for(const [url,local] of mappings){const prefix='https://cdn.onpay.my/users/babykies/media/products/thumb/';if(url.startsWith(prefix))c=c.replaceAll("base+'"+url.slice(prefix.length)+"'",JSON.stringify(local));h=h.replaceAll(url,local)}
await fs.writeFile('public/catalog.js',c);await fs.writeFile('public/index.html',h);console.log('Mirrored '+mappings.size+' of '+new Set(items.map(x=>x[1])).size+' unique assets');if(!mappings.size)process.exitCode=1;
