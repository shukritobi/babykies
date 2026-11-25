import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {catalog,bundles} from '../catalog.js';
test('root entry is storefront, all local assets exist',async()=>{const html=await readFile(new URL('../index.html',import.meta.url),'utf8');assert.match(html,/<main id="home">/);assert.doesNotMatch(html,/http-equiv="refresh"/i);for(const m of html.matchAll(/(?:src|href)="([^"]+)"/g)){const p=m[1];if(/^(assets\/|style\.css$|app\.js$)/.test(p))await access(new URL('../'+p,import.meta.url));}for(const p of [...catalog,...bundles])await access(new URL('../'+p.image,import.meta.url));});
