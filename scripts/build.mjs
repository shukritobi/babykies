import {mkdir,rm,cp} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});
await mkdir('dist');
for(const file of ['index.html','confirmation.html','style.css','app.js','catalog.js','assets'])await cp(file,'dist/'+file,{recursive:true});
