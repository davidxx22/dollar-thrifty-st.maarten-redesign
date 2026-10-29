import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const data = JSON.parse(fs.readFileSync(new URL('./dist/data.json', import.meta.url), 'utf8'));
const source = fs.readFileSync(new URL('./dist/app.js', import.meta.url), 'utf8').replace(/init\(\);\s*$/, '');
const context = vm.createContext({document: {body: {dataset: {page: 'fleet'}}, querySelector: () => null}});
vm.runInContext(source, context);
context.data = data;
vm.runInContext('D=data', context);

function matches(type, passengers, extra = {}) {
  context.input = {type, passengers, extra};
  return JSON.parse(vm.runInContext(`
    selectedType=input.type;
    trip={vehicleType:input.type, passengers:String(input.passengers)};
    query=input.extra.query || '';
    fleetFilters={passengers:input.extra.passengers || 0, transmission:input.extra.transmission || ''};
    JSON.stringify(filteredFleet().map(v=>v.id));
  `, context));
}

assert.deepEqual(matches('Convertible', 2), [71], 'Two-passenger convertible search must return only the Mazda Miata MX5');
for (const type of ['All', 'Car', 'SUV', 'Convertible', 'Van']) {
  for (const passengers of [0, 2, 5, 7, 8, 9, 12]) {
    const expected = data.fleet.filter(v => (type === 'All' || v.type === type) && (!passengers || v.numberOfPassengers === passengers)).map(v => v.id);
    assert.deepEqual(matches(type, passengers), expected, `${type}, ${passengers || 'Any'} passengers`);
  }
}
assert.deepEqual(matches('Convertible', 2, {query: 'miata'}), [71]);
assert.deepEqual(matches('Convertible', 2, {transmission: 'Automatic'}), [71]);
assert.deepEqual(matches('Convertible', 2, {passengers: 5}), []);
console.log('PASS: homepage trip passenger counts combine exactly with vehicle category, search, and Fleet filters.');
