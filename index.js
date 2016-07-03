var Metalsmith = require('metalsmith'),
  markdown     = require('metalsmith-markdown'),
  rootpath     = require('metalsmith-rootpath'),
  collections  = require('metalsmith-collections'),
  layouts      = require('metalsmith-layouts'),
  inplace      = require('metalsmith-in-place'),
  assets       = require('metalsmith-assets'),
  permalinks   = require('metalsmith-permalinks'),
  define       = require('metalsmith-define'),
  path         = require('path');

var configarg = process.argv[2];

if (!configarg) {
  console.error('Please pass in a path to a JSON config.');
  process.exit(1);
}

var configpath = path.resolve(process.cwd(), process.argv[2]),
  config = require(configpath);

if (!config.src || !config.dest) {
  console.error('src and dest must be set in the JSON config.');
  process.exit(1);
}

var
  project = config.project ? config.project : 'untitled',
  srcpath = path.resolve(process.cwd(), config.src),
  destpath = path.resolve(process.cwd(), config.dest),
  collectionsconf = config.collections ? config.collections : {};

var ms = Metalsmith(__dirname)
  .use(define({
    project: project
  }))
  .use(markdown())
  .use(permalinks())
  .use(rootpath())
  .use(collections(collectionsconf))
  .use(layouts({
    engine: 'swig',
    directory: __dirname + '/templates/layouts',
    partials:  __dirname + '/templates/partials',
    default: 'default.html'
  }))
  .use(inplace({
    engine: 'swig'
  }))
  .use(assets({
    source: './assets',
    destination: './assets'
  }));

ms.source(srcpath)
  .destination(destpath)
  .build(function (err) { if(err) console.log(err) });
