const MovieSchema = new mongoose.Schema({
    tytul: String,
    opis: String,
    obraz: {
        data: Buffer,
        contentType: String
    }
});

module.exports = Movie = mongoose.model('movie', MovieSchema);