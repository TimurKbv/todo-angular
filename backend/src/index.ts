import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.router';
import todosRouter from './routes/todos.router';
import userRouter from './routes/user.router';

dotenv.config()

const app = express();

app.use(cors({
    credentials: true,
}));  

app.use(compression());
app.use(cookieParser());
app.use(bodyParser());


// -----ROUTES-------

app.use('/auth', authRouter);

app.use('/todolists', todosRouter);

app.use('/users', userRouter);


const server = http.createServer(app);

server.listen(process.env.API_PORT, () => {
    console.log(`Server running on http://localhost:${process.env.API_PORT}`); 
});

const MONGO_URL = 'mongodb+srv://timur:EU2edsgQt2Hczx7S@clustertimur.2qhgbtn.mongodb.net/?retryWrites=true&w=majority';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));



