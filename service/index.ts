import app from './server'
import 'dotenv/config'
import mongoose from "mongoose"

mongoose.connect(process.env.MONGO_URI ?? "")
    .then(result=>{        
        if(result){
            void app.listen({host:"0.0.0.0",port:8000})  
            return {connectionStatus:true}
        }
    })
    .then((status)=>{
        console.log(`connection status is ${status?.connectionStatus}`);
    })
    .catch(exception=>{
        console.error(exception)
    })
