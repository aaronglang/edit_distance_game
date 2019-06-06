#!/usr/bin/env node

const edit_distance = require('./wer').edit_distance;
const readline = require('readline').createInterface(process.stdin, process.stdout, null);

let tests = [
    'she sells seashells',
    'down by the',
    'seashore',
    'the quick brown fox',
    'jumps',
    'over the lazy dog'
];

let lives = 10, correct = 0, total = 0;


const recursive_readline = () => {
    let time = 5000;
    if(process.uptime() < 1) {
        console.log('\nWelcome to my typing test! This will calculate the error rate of words typed to commandline');
        console.log('\n\nPlease read instructions below: \n\n\t1. For every typo you lose a point\n\t2. You have 10 lives\n\t3. You have 5 seconds to write each prompt');
        console.log('type \'close\' to quit');
        time = 15000;
    } else if(lives < 1) {
        console.log('\nYOU DIED!\n');
        return readline.close();
    } else if (correct > 7 && Math.floor(correct/total*100) >= 75) {
        console.log('You won!');
        return readline.close();
    } else time = 5000;

    let timer = setInterval( () => {
        total += 1;
        lives-=1;
        readline.write('too late!\r');
    }, time);

    let r = Math.floor(Math.random() * tests.length);
    let length = (/\s/.test(tests[r])) ? tests[r].split(' ').length : tests[r].split('').length;

    readline.question(`\nPlease type: \'${tests[r]}\'\n\n> `, (ans) => {
        clearTimeout(timer);
        if(ans === 'close') return readline.close();
        // get distance
        let debug = (process.argv[2] === '--debug');
        let distance = edit_distance(tests[r], ans, debug);
        let percent = Math.floor(distance/length*100);
        // increment score and iterator
        if (distance === 0)  {
            correct += 1;
        } else lives-=distance;
        total += 1;
        // log results
        console.log(`\n${percent}% error rate. ${(distance === 0) ? 'nice job!' : (distance > 2) ? 'ouch...' : 'keep trying!'}\n`);
        recursive_readline();
    });
};

// display score when user finishes
readline.on('close', () => {
    let final = {
        number_correct: correct,
        accuracy: `${Math.floor(correct/total*100)}%`
    };
    console.log('\nyour score:\n');
    console.log(final);
    console.log('\ngoodbye!\n\n');
});

recursive_readline();