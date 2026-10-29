import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
const dist=path.resolve('dist');
new vm.Script(fs.readFileSync(path.join(dist,'app.js'),'utf8'));
const data=JSON.parse(fs.readFileSync(path.join(dist,'data.json'),'utf8'));
if(data.fleet.length!==54||data.locations.length!==10||data.staff.length!==13||data.bookingLocations.length!==6)throw Error('Content count mismatch');
const all=JSON.stringify(data);if(/confirmationNumber|renterAddress|licenseNumber|dateOfBirth|customerId|reservations|dayPrice/.test(all))throw Error('Unexpected operational data in public content');
for(const v of data.fleet){if(!fs.existsSync(path.join(dist,v.image)))throw Error('Missing fleet photo '+v.id);}
for(const l of data.locations){if(l.photo&&!fs.existsSync(path.join(dist,l.photo)))throw Error('Missing location photo '+l.id);}
for(const s of data.staff){if(!fs.existsSync(path.join(dist,s.photo)))throw Error('Missing staff photo '+s.name);}
for(const p of ['index','fleet','locations','about','services','contact','reservations','faq','policies','cookie-policy','content-checklist'])if(!fs.existsSync(path.join(dist,p+'.html')))throw Error('Missing page '+p);
if(!fs.existsSync(path.join(dist,'assets/hero-jeep.png')))throw Error('Missing hero cutout');
console.log('PASS: JavaScript syntax, 11 pages, 54 fleet records, 10 locations, 6 booking locations, 13 staff, all image references, and public data allowlist.');
new vm.Script(fs.readFileSync(path.join(dist,'booking.js'),'utf8'));
if(!fs.existsSync(path.join(dist,'booking.html')))throw Error('Missing booking preview');
await import('./booking-flow-test.mjs');
