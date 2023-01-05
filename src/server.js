/*

const logger = require('./logger');
const log = new logger();

log.userlog();
log.logemitter({id : 'anonymous' , port : 8000});
log.logemitter({id : 'shrey' , port : 2000});

const http = require('http');
const server = http.createServer((req , res) => {
    if (req.url === '/'){
        res.write('Hello World');
        res.end();
    }
});
const port = 8000;
server.listen(port);
console.log(`Listening on port ${port}`);

*/
/* 

*/
// const Joi = require('joi'); // https://joi.dev/api/?v=17.7.0
const Express = require('express'); // https://expressjs.com/en/4x/api.html
const app = Express();
const morgan = require('morgan');
const helmet = require('helmet');
const animevalidation = require('../middleware/AnimeValidater.js')
const pug = require('pug');
let anime = [{id : 1 , AnimeName : "Haikyuu", Link:"https://9anime.gs/watch/haikyu.rjqn/ep-1"},{id : 2 , AnimeName : "High School DxD" , Link : "https://9anime.gs/watch/high-school-dxd.33r/ep-1"},{id : 3, AnimeName : "Prison School" , Link : "https://9anime.gs/watch/prison-school.pyq/ep-1"}]  // {id : , AnimeName : "", Link : ""}

app.set('view engine','pug');
// app.set('views','../views');

app.use(Express.urlencoded({ extended : true }));
app.use(Express.static('../public'));
// app.use(Express.json());
app.use(helmet());
app.use(morgan('tiny'));

app.get('/api', (req , res) => {
    res.send('Anime To Watch');
});

app.get('/api/anime/', (req , res) => {
    res.send(pug.renderFile('E:/Web Development/NodeJS/views/index.pug', anime));
});

app.get('/api/anime/:id', (req , res) => {
    let animeselected = anime.find(a => a.id === parseInt(req.params.id));
    if (!animeselected) return res.status(404).send(`Anime with ID ${req.params.id} doesn't exists`);
    res.send(pug.renderFile('E:/Web Development/NodeJS/views/index.pug', animeselected));;
});

app.post('/api/anime', (req , res) => {
    const {error} = animevalidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const newanime = {
        id: anime.length + 1,
        AnimeName: req.body.AnimeName,
        Link: req.body.Link
    };
    anime.push(newanime);
    res.send(newanime);

});

app.put('/api/anime/:id', (req , res) => {
    const id = parseInt(req.params.id);
    let animechange = anime.find(a => a.id === id);
    if (!animechange) return res.status(404).send(`Anime with ID ${req.params.id} doesn't exists`);
    const {error} = animevalidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    animechange = {
        id: id,
        AnimeName: req.body.AnimeName,
        Link: req.body.Link
    };
    anime[id-1] = animechange;
    res.send(animechange);
});

app.delete('/api/anime/:id', (req , res) => {
    let animedelete = anime.find(a => a.id === parseInt(req.params.id));
    if (!animedelete) return res.status(404).send(`Anime with ID ${req.params.id} doesn't exists`);
    const index = anime.indexOf(animedelete);
    anime.splice(index, 1);
    res.send(animedelete);
});

const port = process.env.PORT || 3000;

app.listen(port,() => console.log(`Listening on port ${port}`));

/*
// Compile template.pug, and render a set of data
console.log(pug.renderFile('template.pug', {
  name: 'Timothy'
}));
*/