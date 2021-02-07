import mongoose from "mongoose";

export class DbConnection {
    public static initConnection() {
        if(process.env.DB_URL != 'localhost'){
            process.env.DB_CONN_STR = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
        } else {
            process.env.DB_CONN_STR = `mongodb://${process.env.DB_URL}/${process.env.DB_NAME}`;
        }
        DbConnection.connect(process.env.DB_CONN_STR);
    }

    public static async connect(connStr: string) {
       return mongoose.connect(
            connStr,
            {useNewUrlParser: true, useFindAndModify: false},
        )
            .then(() => {
                console.log(`Successfully connected to ${connStr}`);
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error);
                return process.exit(1);
            });
    }

    public static setAutoReconnect() {
        mongoose.connection.on("disconnected", () => DbConnection.connect(process.env.DB_CONN_STR));
    }

    public static async disconnect() {
       await mongoose.connection.close();
    }
}