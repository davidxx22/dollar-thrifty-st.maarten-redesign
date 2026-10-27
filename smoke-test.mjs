import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
const data=JSON.parse(fs.readFileSync('dist/data.json','utf8'));
const source=fs.readFileSync('dist/app.js','utf8').replace(/init\(\);\s*$/,'');
const names={home:'home',fleet:'fleetPage',locations:'locationsPage',about:'aboutPage',services:'servicesPage',contact:'contactPage',reservations:'reservationsPage',faq:'faqPage',policies:'policiesPage','cookie-policy':'cookiePage','content-checklist':'checklist'};
for(const [page,fn] of Object.entries(names)){
 const context=vm.createContext({document:{body:{dataset:{page}},querySelector:()=>null},console});
 vm.runInContext(source,context);
 context.data=data;
 const output=vm.runInContext(`D=data; ${fn}()`,context);
 if(!output||output.includes('undefined'))throw Error(`Incomplete rendering on ${page}`);
 for(const m of output.matchAll(/(?:href|src)="([^"]+)"/g)){
  const target=m[1].split(/[?#]/)[0];
  if(!target||/^(https?:|mailto:|tel:)/.test(target))continue;
  if(!fs.existsSync(path.join('dist',target)))throw Error(`Broken local link ${target} on ${page}`);
 }
 console.log(`PASS render and local links: ${page}`);
}
