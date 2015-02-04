var Metalsmith  = require('metalsmith');
var collections = require('metalsmith-collections');
var markdown    = require('metalsmith-markdown');
var templates   = require('metalsmith-templates');
var permalinks  = require('metalsmith-permalinks');
var Handlebars  = require('handlebars');
var fs          = require('fs');

Handlebars.registerPartial('header', fs.readFileSync(__dirname + '/templates/partials/header.hbt').toString());
Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString());

Metalsmith(__dirname)
  .use(collections({
    pages: {
      pattern: 'content/pages/*.md'
    },
    posts: {
      pattern: 'content/posts/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(permalinks({
    pattern: ':collection/:title'
  }))
  .use(markdown())
  .use(templates('handlebars'))
  .destination('./build')
  .build(function(err){
    if(err) {
      console.log(err);
    }
    else {
      console.log('Build complete');
    }
  });

