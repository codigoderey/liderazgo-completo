import mongoose from "mongoose"

const connection = {}

const connectDB = async () => {

    if(connection.isConnected){
        // use existing db connection
        console.log("Using existing connection")
        return
    }
    
    // use new database connection
    const db = await mongoose.connect(process.env.MONGO_DB, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    connection.isConnected = db.connections[0].readyState

    console.log("DB Connected")
}

export default connectDB