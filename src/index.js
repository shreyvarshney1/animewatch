const Express = require('express'); // https://expressjs.com/en/4x/api.html
const app = Express();
const morgan = require('morgan');
const helmet = require('helmet');
const animevalidation = require('../middleware/AnimeValidater.js')
let anime = [{id : 1 , AnimeName : "Haikyuu", Link:"https://9anime.gs/watch/haikyu.rjqn/ep-1"},{id : 2 , AnimeName : "High School DxD" , Link : "https://9anime.gs/watch/high-school-dxd.33r/ep-1"},{id : 3, AnimeName : "Prison School" , Link : "https://9anime.gs/watch/prison-school.pyq/ep-1"}]  // {id : , AnimeName : "", Link : ""}

app.use(Express.urlencoded({ extended : true }));
app.use(Express.static('../public'));
// app.use(Express.json());
app.use(helmet());
app.use(morgan('tiny'));


app.get('/api', (req , res) => {
    res.send('Anime To Watch');
});

app.get('/api/anime/', (req , res) => {
    res.send(pug.renderFile('../views/index.pug', anime));
});

app.get('/api/anime/:id', (req , res) => {
    const id = parseInt(req.params.id);
    let animeselected = anime.find(a => a.id === id);
    if (!animeselected) return res.status(404).send(`Anime with ID ${req.params.id} doesn't exists`);
    animeselected.nextid = id+1;
    animeselected.previousid = id-1;
    res.send(pug.renderFile('../views/index.pug', anime));;
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
