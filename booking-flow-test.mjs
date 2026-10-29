import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const app=fs.readFileSync('dist/app.js','utf8').replace(/init\(\);\s*$/,'');
const booking=fs.readFileSync('dist/booking.js','utf8');
const data=JSON.parse(fs.readFileSync('dist/data.json','utf8'));
const noop=()=>{};
const control={addEventListener:noop,setAttribute:noop,removeAttribute:noop,scrollIntoView:noop,classList:{toggle:noop},closest:()=>control};
const form={...control,elements:new Proxy({},{get:(target,key)=>key in target?target[key]:({...control})}),reset:noop};
form.elements.namedItem=()=>null;
const root={...control,innerHTML:'',querySelector:s=>s==='[data-rental-panel="1"]'?form:control,querySelectorAll:()=>[]};
const context=vm.createContext({document:{body:{dataset:{page:'booking'}},querySelector:()=>root},URLSearchParams,location:{search:''},sessionStorage:{getItem:()=>null},console});
vm.runInContext(app+'\n'+booking,context);
context.data=data;
for(const vehicle of data.fleet){context.location.search='?vehicle='+vehicle.id;vm.runInContext('initReservationFlow(data)',context);assert(root.innerHTML.includes('Meet Your Ride'));assert(root.innerHTML.includes(vehicle.image)||root.innerHTML.includes(vehicle.cardImage));assert(root.innerHTML.includes('Finish preview'));assert.equal((root.innerHTML.match(/class="rental-extra"/g)||[]).length,6);assert(!root.innerHTML.includes('undefined'));}
context.location.search='?vehicle=999999';vm.runInContext('initReservationFlow(data)',context);assert(root.innerHTML.includes('Choose a vehicle'));
const valid=(pickup,ret,start='10:00',end='10:00')=>{context.values={pickupDate:pickup,returnDate:ret,pickupTime:start,returnTime:end};return vm.runInContext("validateRentalDates(values,'2026-10-29')",context);};
assert(valid('2026-10-30','2026-10-31'));assert(!valid('2026-10-30','2026-10-31','10:00','09:30'));assert(!valid('2026-10-28','2026-10-31'));assert(!valid('2026-10-30','2026-10-30'));assert(!valid('invalid','2026-10-31'));assert(valid('2026-10-30','2026-11-02'));
assert(!/fetch\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage\.setItem/.test(booking),'Preview must not transmit or persist renter details');
console.log('PASS: 54 vehicle previews, 6 extras, invalid vehicle fallback, 24-hour and past-date validation, no renter-data transmission or persistence.');

