const url=require('url');
const Movie = require('../models/movieModel');
const fs = require('fs');

module.exports = (req,res)=>{
    const pathname = url.parse(req.url).pathname;

    if(pathname.startsWith('/movies/details/')){
        const id = pathname.split('/')[3];
        Movie.find({_id: id},function(err,movie){

            fs.readFile('./views/details.html',(err,data)=>{
                
                if(err){
                    console.log(err);
                    return;
                }

                const movieHtml =`<div class="content">

                <img src="${movie[0].poster}" alt="" />
              
                <h3>Title ${movie[0].title}</h3>
              
                <h3>Year {${movie[0].year}}</h3>
              
                <p> ${movie[0].description}</p>
              
              </div>` 

                const responseHtml = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>',movieHtml);

                res.writeHead(200,{
                    'Content-Type':'text/html'
                });
                res.write(responseHtml);
                res.end();
            });

        });
    }else{
        return true;
    }

}