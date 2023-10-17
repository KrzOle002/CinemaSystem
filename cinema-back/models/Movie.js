const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    cover: {
        data: Buffer,
        contentType: String
    }
});

module.exports = Movie = mongoose.model('movie', MovieSchema);