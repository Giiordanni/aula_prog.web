import express from "express";
import {v4 as uuidv4} from 'uuid';
import logger from "./logger/logger.mjs";

const app = express();
app.use(express.json());

const animes = [
    {
        id: uuidv4(),
        name: 'Naruto',
        genre: "Fantasia",
        studio: "Tatsunoko",
    },
    {
        id: uuidv4(),
        name: 'Bleach',
        genre: "Fantasia",
        studio: "Tatsunoko",
    },
    {
        id: uuidv4(),
        name: 'One Piece',
        genre: "Fantasia",
        studio: "Tatsunoko",
    },
    {
        id: uuidv4(),
        name: 'Dragon Ball',
        genre: "Fantasia",
        studio: "Tatsunoko",
    },
    {
        id: uuidv4(),
        name: 'Naruto Shippuden',
        genre: "Fantasia",
        studio: "Tatsunoko",
    },
]

app.get("/animes", (req, res) => {
    logger.info('GET /animes');
    res.status(200).json(animes);
});

app.post("/animes", (req, res) => {
    const {name, genre, studio} = req.body;

    if (!name || !genre || !studio) {
        logger.error("Todos os campos precisam ser preenchidos.");
        return res.status(400).json({error: "Todos os campos precisam ser preenchidos."});
    }
    const anime = {
        id: uuidv4(),
        name,
        genre,
        studio,
    }
    animes.push(anime);
    logger.info('POST /animes', { anime });
    res.status(201).json(anime);
});

app.patch("/update/animes/:id", (req, res) => {
    const {id} = req.params;
    const {name, genre, studio} = req.body;

    if(!name || !genre || !studio) {
        logger.error("Todos os campos precisam ser preenchidos.");
        return res.status(400).json({error: "Todos os campos precisam ser preenchidos."});
    }
    
    const animeFindId = animes.findIndex((animes) => animes.id === id);

    if (animeFindId === -1) {
        logger.error("Anime não encontrado.");
        return res.status(404).json({error: "Anime não encontrado."});
    }

    animes[animeFindId] = {
        ...animes[animeFindId],
        name,
        genre,
        studio,
    }
    logger.info('PATCH /update/animes/:id', { id, name, genre, studio });
    res.status(200).json(animes[animeFindId]);
});

app.get("/animes/:id", (req, res) => {
    const {id} = req.params;
    const animeId = animes.findIndex((animes) => animes.id === id);

    if (animeId === -1){
        logger.error("Anime não encontrado.");
        return res.status(404).json({error: "Anime não encontrado"});
    }
    return res.status(200).json(animes.find((anime) => anime.id === id));
});

export default app;

