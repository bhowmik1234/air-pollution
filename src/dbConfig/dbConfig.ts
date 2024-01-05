import mongoose from 'mongoose'

export async function connect (){
    try{
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () =>{
            console.log("mongo connected with the database");
        })

        connection.on('error', (err) =>{
            console.log("mongo connection error. please check sure mongo is running" + err );
        })

    }catch(Error)
    {
        console.log("something went wrong with data base");
        console.log(Error);
    }
} 