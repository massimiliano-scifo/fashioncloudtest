import mongoose, { Schema, Document, Model} from 'mongoose';
import { ObjectID } from 'mongodb';
import { ICache } from '../interfaces/interfaces';

export interface ICacheDB extends Document, ICache {
}

export interface ICacheModel extends Model<ICacheDB>{
}

const cacheSchema = new Schema<ICacheDB, ICacheModel>({
    key : {type : String, required : true},
    value : {type : String, required : true},
    lastUpdate : {type : Date, required : true},
    __v: { type: Number, select: false}
}, { timestamps: true });

export default mongoose.model('Cache', cacheSchema);