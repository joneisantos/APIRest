const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Fake db
var DB = {
    games: [
        {
            id: 1,
            title: "Uncharted",
            plataform: "Playsation",
            price: 30
        },
        {
            id: 2,
            title: "Gran Turismo",
            plataform: "Playsation",
            price: 45
        },
        {
            id: 3,
            title: "Forza Horizon",
            plataform: "X Box",
            price: 50
        },
        {
            id: 4,
            title: "The last of us",
            plataform: "Playsation",
            price: 99
        }        
    ]
}

//Route get all games
app.get("/games",(req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
});

//Route get a game by id
app.get("/game/:id",(req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        
        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id == id);

        if(game != undefined){
            res.statusCode = 200;
            res.json(game);
        }else{
            res.sendStatus(404);
        }
    }
});

//Route insert a game
app.post("/game",(req, res) => { 
    var {title, plataform, price } = req.body;
    DB.games.push({
        id: 10,
        title,     
        plataform,
        price
    });
    res.sendStatus(200);
})

//Route delete a game
app.delete("/game/:id",(req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(g => g.id == id);

        if(index == -1){
            res.sendStatus(404);
        }else{
            DB.games.splice(index,1);
            res.sendStatus(200);
        }
    }
});

//Route update a game
app.put("/game/:id",(req, res) => {

    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        
        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id == id);

        if(game != undefined){

            var {title, plataform, price} = req.body;

            
            if(title != undefined){
                game.title = title;
            }

            if(plataform != undefined){
                game.plataform = plataform;
            }

            if(price != undefined){
                game.price = price;
            }           
            
            res.sendStatus(200);

        }else{
            res.sendStatus(404);
        }
    }

});

app.listen(8080,() => {
    console.log(`Api rodando na porta 8080`);
});