const staticHandler = require('./static-file-handler');
const homeHandler = require('./home-handler');
const movieHandler = require('./movie-handler');
const detailsHandler = require('./details-handler');


module.exports=[staticHandler,homeHandler,movieHandler,detailsHandler];