# gimie

Publically extensible task runner & info gathering tool.

This tool is a mashup of my [targets](https://www.npmjs.com/package/targets)
framework and [canihaz](https://www.npmjs.com/package/canihaz).

## Installation

`npm i -g gimie`

## Usage

`gimie`
`gimie ip`
`gimie weather`
`gimie ip memory weather`
`gimie {your_gimie_target_here}`

## Authoring Targets

Publish a node package with the name `gimie.{your_target_name}` and be sure to
add `gimie` as a keyword in the package name. So long as your package exports
a valid [targets](https://www.npmjs.com/package/targets) object it will
automatically work with gimie.

See
[gimie.memory](https://github.com/machellerogden/gimie.memory/blob/master/index.js)
for a basic example.
