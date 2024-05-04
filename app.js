import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import contentRouter from "./routes/contentRouter.js";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware} from "./middlewares/error.js";
import { isAuthenticated } from "./middlewares/auth.js";
import { catchAsyncError } from "./middlewares/catchAsyncError.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload"; 
import commentRouter from "./routes/commentRouter.js";
const app= express()
dotenv.config({path: "./config/config.env"});

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}))

app.use('/api/v1/content', contentRouter);
app.use('/api/v1/comment', commentRouter);
dbConnection();

app.use(errorMiddleware)

export default app;