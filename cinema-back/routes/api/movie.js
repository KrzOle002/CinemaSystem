const express = require("express");
const router = express.Router();
const Room = require("../../models/Room");
const Movie = require("../../models/Movie");
const Screening = require("../../models/Screening");
const multer = require("multer");
const auth = require("../../middleware/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Film not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/movies", upload.single("cover"), async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    description: req.body.description,
    director: req.body.director,
    genre: req.body.genre,
    casts: req.body.casts,
    productionYear: req.body.productionYear,
    productionCountry: req.body.productionCountry,
    screeningLength: req.body.screeningLength,
    ageRestrictions: req.body.ageRestrictions,
    cover: {
      path: req.file.path.replace(/\\/g, "/").replace("public", ""),
    },
  });
  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/movies/:id", async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Film not found" });
    }

    res.status(200).json(updatedMovie);
  } catch (error) {
    // Handle any errors that occur during the update process
    res.status(500).json({ message: error.message });
  }
});

router.delete("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Film not found" });
    }
    res.json({ message: "Film deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/movies", async (req, res) => {
  const title = req.query.title;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit);
  const skip = (page - 1) * limit;

  try {
    const query = title ? { title: new RegExp(title, "i") } : {};

    const movies = await Movie.find(query).skip(skip).limit(limit);

    const moviesWithScreenings = await Promise.all(
      movies.map(async (movie) => {
        const screenings = await Screening.find({ movieId: movie.id })
          .populate("roomId")
          .exec();
        return { ...movie.toObject(), screenings };
      }),
    );
    const total = await Movie.countDocuments(query);

    res.json({
      movies: moviesWithScreenings,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalMovies: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/movies/:movieId/screenings", async (req, res) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res
        .status(404)
        .json({ success: false, message: "Film nie znaleziony" });
    }

    // Pobranie ekranizacji dla danego filmu z informacjami o pokojach
    const screenings = await Screening.find({ movieId })
      .populate("roomId")
      .exec();

    movie.screenings = screenings;

    res.status(200).json({
      movie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Błąd serwera" });
  }
});
module.exports = router;
