const fs=require('fs');
const url=require('url');

module.exports=(req,res)=>{
    const pathname = url.parse(req.url).pathname;
    if(pathname ==='/'&&req.method==='GET'){
        fs.readFile('./views/home.html',(error,data)=>{
            if(error){
                console.log(error);
                return;
            }
            res.writeHead(200,{
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
        })
    }else{
        return true;
    }
}