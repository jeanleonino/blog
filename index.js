var Metalsmith = require('metalsmith');
var markdown   = require('metalsmith-markdown');
var templates  = require('metalsmith-templates');

Metalsmith(__dirname)
  .use(markdown())
  .use(templates('handlebars'))
  .destination('./build')
  .build(function(err){
    if(err) { 
      console.log(err)
    }
    else {
      console.log('Build complete');
    }
  })

