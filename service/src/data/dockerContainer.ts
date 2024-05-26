import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const dockerContainer = new Schema({
    sha:String,
    repository:String,
    tag:String
});

const DockerContainer = model('DockerContainer', dockerContainer);
export default DockerContainer;