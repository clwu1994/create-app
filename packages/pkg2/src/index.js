// pkg2/src/index.js

import {pk1} from 'packages/pkg1/src'

function pk2() {
    pk1()
    console.log('I am pk2');
}