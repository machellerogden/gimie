#!/usr/bin/env node

const Targets = require('targets');
const canihaz = require('canihaz')();
const argv = require('minimist')(process.argv.slice(2));
const _ = require('lodash');
const Promise = require('bluebird');
const npmKeyword = require('npm-keyword');

function Gimie() {
    const gTargets = _.map(argv._, (target) => `gimie.${target}`);

    function handleGimieTargets(gimieTargets) {
        const targetPromiseMap = Promise.reduce(gimieTargets, (acc, target) => {
            return new Promise((resolve, reject) => {
                return canihaz(target, '', (err, dep) => {
                    if (err) return reject('Something went wrong. Please make sure a gimie target with that name exists.');
                    acc = _.assign({}, acc, dep);
                    return resolve(acc);
                });
            });
        }, {});
        return Promise.props(targetPromiseMap).then((targets) => {
            Targets({
                name: 'gimie',
                targets
            });
        });
    }

    if (gTargets.length) {
        return handleGimieTargets(gTargets);
    } else {
        return npmKeyword.names('gimie').then(handleGimieTargets);
    }
}

Gimie().catch(console.error);
