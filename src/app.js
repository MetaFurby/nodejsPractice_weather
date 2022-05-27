import express from "express";
import path from "path";
import hbs from "hbs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { forecast} from './utils/forecast.js';
import { geocode} from './utils/geocode.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.PORT || 3000;

const app = express();

const publicDir = path.join(__dirname,'../public');
const templatesDir = path.join(__dirname,'../templates/views');
const partialsDir = path.join(__dirname,'../templates/partials');


app.set('view engine','hbs');
app.set('views',templatesDir);
hbs.registerPartials(partialsDir);

app.use(express.static(publicDir));

app.get('',(req,res)=>{
    res.render('index',{
        title:"weather app",
        name: "Diego"
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About",
        name: "Diego"
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        name: "Diego"
    });
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error: 'must provide address'});
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {}) =>{
        if(error){
            return res.send({error});
        }
        else{
            forecast(latitude,longitude,(error,weatherdata) =>{
                if(error){
                    return res.send({error});
                }
                else{
                    return res.send({forecast: weatherdata,
                                    location,
                                    address: req.query.address});
                }
            })
        }
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({error: 'must provide search'});
    }
    res.send({products:[]});
})

app.get('/help/*',(req,res)=>{
    res.render('notfound',{
        title:"Help",
        name: "Diego",
        errormsg: "help not found"
    });
})

app.get('*',(req,res)=>{
    res.render('notfound',{
        title:"404",
        name: "Diego",
        errormsg: "404 not found"
    });
})

app.listen(port,()=>{
    console.log("server is up");
})