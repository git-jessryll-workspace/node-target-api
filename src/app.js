import express from "express";
import dotenv from "dotenv"
import morgan from "morgan"
import helmet from "helmet"
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from "cookie-parser";
import compression from "compression"
import fileUpload from "express-fileupload"
import cors from "cors"
import createHttpError from "http-errors";
import routes from './routes/index.js';

//dotEnv config
dotenv.config();

const app = express();

// Morgan
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

//Helmet
app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({extended: true}))

// sanitize request data for sql injection security for database query
app.use(mongoSanitize());

// Enable cookie parser
app.use(cookieParser());

//gzip compression
app.use(compression());

// file upload
app.use(fileUpload({
    useTempFiles: true,
}))

// cors middleware
const corsOptions = {
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    maxAge: 3600, // Set the maxAge value in seconds (1 hour in this example)
}
const corsConfig = cors(corsOptions)
app.use(corsConfig);

app.use('/api/v1', routes);

app.use(async(req, res, next) => {
    next(createHttpError.NotFound("This route does not exist."))
})

const errorHandler = async (err, req, res, next) => {
    const errorStatus = err.status || 500;
    res.status(errorStatus);
    res.send({
        error: {
            status: errorStatus,
            message: err.message
        }
    })
}

app.use(errorHandler)

export default app;