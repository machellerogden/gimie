#!/usr/bin/env node

const Targets = require('targets');
const canihaz = require('canihaz')();
const argv = require('minimist')(process.argv.slice(2));
const _ = require('lodash');
const Promise = require('bluebird');

function Gimie() {
    const gimieTargets = _.map(argv._, (target) => `gimie.${target}`);
    const targetPromiseMap = _.reduce(gimieTargets, (acc, target) => {
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
    }).catch(console.error);
}

Gimie();
