const fs= require('fs');
const url=require('url');

const getContentType = (path)=>{
        
    if(path.endsWith('.css')){
        return 'text/css';
    }else if(path.endsWith('.html')){
        return 'text/html';
    }else if(path.endsWith('.png')){
        return 'image/png';
    }else if(path.endsWith('.ico')){
        return 'image/x-icon';
    }else if(path.endsWith('.jpg')){
        return 'image/jpg';
    }
}


module.exports = (req,res)=>{
    const pathname = url.parse(req.url).pathname;
    if(pathname.startsWith('/public')&&req.method==='GET'){
        fs.readFile(`./${pathname}`,(error,data)=>{
            if(error){
                console.log('error');
            }
            res.writeHead(200,{
                'Content-Type':getContentType(pathname)
            })
            res.write(data);
            res.end();
        })
    }else {
        return true;
    }
}