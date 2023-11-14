import { Schema } from 'mongoose';
type Id = Schema.Types.ObjectId;
type DateTimeISO = string;
type WithId<T> = T & { id: Id };
