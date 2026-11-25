const base='https://cdn.onpay.my/users/babykies/media/products/thumb/';
export const catalog=[
{id:'dragon',name:'Dragon Fruit',cat:'fruit',price:2700,tint:'#edb2bd',image:base+'2-dragon%20fruit-1773438642.jpg',fallback:'assets/cookies.webp'},
{id:'apple',name:'Apple',cat:'fruit',price:2700,tint:'#d8e1ae',image:base+'4-apple-1773445873.jpg'},
{id:'banana',name:'Banana',cat:'fruit',price:2700,tint:'#f2dfab',image:base+'1-banana-1773446008.jpg'},
{id:'mango',name:'Mango',cat:'fruit',price:2700,tint:'#f8d76e',image:base+'3-mango-1773445928.jpg'},
{id:'carrot',name:'Carrot',cat:'veg',price:2700,tint:'#f5c392',image:base+'7-carrot-1773405868.jpg'},
{id:'pumpkin',name:'Pumpkin',cat:'veg',price:2700,tint:'#efd0a2',image:base+'5-pumpkin-1773445793.jpg'},
{id:'papaya',name:'Papaya',cat:'fruit',price:2700,tint:'#f2bc92',image:base+'6-papaya-1773445680.jpg',sold:true},
{id:'blackout',name:'Blackout Cookies',cat:'adult',price:1000,tint:'#c9bcb8',image:'assets/blackout.webp',regular:2500}];
export const bundles=[{id:'combo4',name:'Set Kombo 4 Botol',price:9900,slots:4,tint:'#f2dfab',image:base+'17-combo_4_balang-1783228429.jpg',desc:'Jimat RM9 berbanding 4 botol pada harga RM27.'},{id:'combo8',name:'Set Kombo 8 Botol',price:19800,slots:8,tint:'#edb2bd',image:base+'17-combo_4_balang-1783228429.jpg',desc:'Lapan botol untuk seisi keluarga.'},{id:'tester',name:'Set Tester 5 Mini',price:8300,tint:'#f3ce72',image:'assets/tester.webp',desc:'Lima botol mini. Pilihan rasa tertakluk kepada pengesahan.'}];
export const states=['Johor','Kedah','Kelantan','Melaka','Negeri Sembilan','Pahang','Perak','Perlis','Pulau Pinang','Selangor','Terengganu','Kuala Lumpur','Putrajaya','Sabah','Sarawak','Labuan'];
export const money=n=>'RM'+(n/100).toFixed(2);
export function priceCart(items,state){if(!Array.isArray(items)||!items.length||items.length>30||!states.includes(state))throw Error('Troli atau negeri tidak sah.');let subtotal=0,units=0;const lines=items.map(l=>{const p=[...catalog,...bundles].find(p=>p.id===l.id);if(!p||p.sold||!Number.isInteger(l.qty)||l.qty<1||l.qty>20)throw Error('Produk atau kuantiti tidak sah.');const choices=l.choices||[];if(!Array.isArray(choices)||choices.length!==(p.slots||0)||choices.some(c=>!catalog.some(f=>f.id===c&&!f.sold&&f.cat!=='adult')))throw Error('Pilihan rasa tidak sah.');subtotal+=p.price*l.qty;units+=l.qty*(p.slots|| (p.id==='tester'?5:1));return {id:p.id,name:p.name,price:p.price,qty:l.qty,choices};});if(units>17)throw Error('Hubungi Babykies untuk tempahan melebihi 17 botol.');const shipping=['Sabah','Sarawak','Labuan'].includes(state)?1700:1000;return {lines,subtotal,shipping,total:subtotal+shipping,commission:Math.round(subtotal*.15)};}
