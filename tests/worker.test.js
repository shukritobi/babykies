import {test} from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/worker.js';
const req=(path,opts={})=>new Request('https://shop.example'+path,opts);
test('checkout remains disabled without approved configuration',async()=>{const r=await worker.fetch(req('/api/checkout',{method:'POST'}),{PAYMENTS_ENABLED:'false'});assert.equal(r.status,503)});
test('invalid unsigned callback rejected',async()=>{const r=await worker.fetch(req('/api/chip-callback',{method:'POST',body:'{}'}),{});assert.equal(r.status,401)});
test('cross-origin checkout rejected before touching database',async()=>{const r=await worker.fetch(req('/api/checkout',{method:'POST',headers:{Origin:'https://other.example'}}),{PAYMENTS_ENABLED:'true',CHIP_SECRET_KEY:'test',CHIP_BRAND_ID:'test',CHIP_PUBLIC_KEY:'test',DB:{}});assert.equal(r.status,403)});
test('unknown API route rejected',async()=>{const r=await worker.fetch(req('/api/unknown'),{});assert.equal(r.status,404)});