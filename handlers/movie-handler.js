const fs=require('fs');
const url=require('url');
const qs=require('querystring');
const Movie = require('../models/movieModel');




module.exports = (req,res)=>{
    const pathname = url.parse(req.url).pathname;

    if(pathname==='/addMovie' && req.method==='GET'){
        fs.readFile('./views/addMovie.html',(err,data)=>{
            if(err){
                console.log(err);
                return;
            }
            const responseHtml = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>','');
            res.writeHead(200,{
                'Content-Type':'text/html'
            });
            res.write(responseHtml);
            res.end();
        });
    }

    if(pathname==='/viewAllMovies' && req.method==='GET'){

    
         Movie.find(function(err,movies){
            if(err){
                console.log(err);
                return;
            }
            if(movies.length===0){
                Movie.create(
                    {
        
                        title: "Donnie Darko",
                        year: 2001,
                        poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BZjZlZDlkYTktMmU1My00ZDBiLWFlNjEtYTBhNjVhOTM4ZjJjXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
                        description: "Donnie Darko doesn't get along too well with his family, his teachers and his classmates; but he does manage to find a sympathetic friend in Gretchen, who agrees to date him. He has a compassionate psychiatrist, who discovers hypnosis is the means to unlock hidden secrets. His other companion may not be a true ally. Donnie has a friend named Frank - a large bunny which only Donnie can see. When an engine falls off a plane and destroys his bedroom, Donnie is not there. Both the event, and Donnie's escape, seem to have been caused by supernatural events. Donnie's mental illness, if such it is, may never allow him to find out for sure.",
                      },
                      {
                        
                       title: "Sword of the Stranger",
                        year: 2007,
                        poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BNTg2NzBmYTEtMTdiNS00OTg0LWJmMzMtYTZhYzY2MjBlMjFmXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SY1000_CR0,0,675,1000_AL_.jpg",
                        description: "A young boy and his dog find themselves the target of the Ming: a foreign dynasty that will stop at nothing. One day, a quiet and solemn warrior crosses their path, and becomes irrevocably connected with the two. A deal is struck and the warrior agrees to take the boy to a remote, Buddhist temple, where a kind monk is waiting to care for him and the dog. Unfortunately, the Ming have sent their elite, and they will test their strength, courage, and quality every step of the way.",
                      },
                      {
                        
                        title: "Die Hard",
                        year: 1988,
                        poster: "https://ia.media-imdb.com/images/M/MV5BMzNmY2IwYzAtNDQ1NC00MmI4LThkOTgtZmVhYmExOTVhMWRkXkEyXkFqcGdeQXVyMTk5NDA3Nw@@._V1_.jpg",
                        description: "John McClane, officer of the NYPD, tries to save his wife Holly Gennaro and several others that were taken hostage by German terrorist Hans Gruber during a Christmas party at the Nakatomi Plaza in Los Angeles.",
                      }
                );
            }
            fs.readFile('./views/viewAll.html',(err,data)=>{
                if(err){
                    console.log(err);
                    return;
                }
           
                let allMoviesHTML='';
                for(const movie of movies){
                    
                    let movieHtml = '<div class="movie">';
                    movieHtml+=`<a href="/movies/details/${movie._id}"><img class="moviePoster" src=${movie.poster} /></a>`
                    movieHtml+='</div>';
                    allMoviesHTML+=movieHtml;
                }
    
                let responseHtml=data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>',allMoviesHTML);
    
                res.writeHead(200,{
                    'Content-Type':'text/html'
                });
                res.write(responseHtml);
                res.end();
              });
         });
        
    

        }else if(pathname==='/addMovie'&& req.method==='POST'){
        
            let data='';
            req.on('data' ,(chunk)=>{
                data+=chunk;
                
            });
            req.on('end',()=>{
               const formData = qs.parse(data);
                
                fs.readFile('./views/addMovie.html',(err,stringHtml)=>{
                        if(err){
                            console.log('error');
                        }
                        
                        if(formData.movieTitle!=''&&formData.movieYear!=''&&formData.moviePoster!=''&&formData.movieDescription!=''){
                            const onSuccess = '<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2> </div>';
                            
                            const newMovie = {
                                title:formData.movieTitle,
                                year:formData.movieYear,
                                poster:formData.moviePoster,
                                description:formData.movieDescription
                            };

                            Movie.create(newMovie).then(movie=>{
                                let responseHtml=stringHtml.toString().replace('<div id="replaceMe">{{replaceMe}}</div>',onSuccess);
                                res.writeHead(200,{
                                    'Content-Type':'text/html'
                                });
                                res.write(responseHtml);
                                res.end();
                            }).catch(error=>{
                                throw error;
                            })
                            
                        }else{
                            let onError = '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2> </div>';
                          let responseHtml=stringHtml.toString().replace('<div id="replaceMe">{{replaceMe}}</div>',onError);
                            res.writeHead(200,{
                                'Content-Type':'text/html'
                            });
                            
                            res.write(responseHtml);
                            res.end();
                        }
                });
    
            });
        }
        else{
            return true;
        }
        
    }
      /* 
      {
        
        "movieTitle": "Deadpool 2",
        "movieYear": "2018",
        "moviePoster": "https://ia.media-imdb.com/images/M/MV5BMjI3Njg3MzAxNF5BMl5BanBnXkFtZTgwNjI2OTY0NTM@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
        "movieDescription": "Foul-mouthed mutant mercenary Wade Wilson (AKA. Deadpool), brings together a team of fellow mutant rogues to protect a young boy with supernatural abilities from the brutal, time-traveling cyborg, Cable.",
      }]) */

      
////////////////////////////////////////////////////////////////////////////////////////////////////////

    
 