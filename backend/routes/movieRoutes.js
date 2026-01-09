const authMiddleware = require('../middleware/authMiddleware');
const MovieModel = require('../model/movieModel');
const router = require('express').Router();

//GET ALL MOVIES (COMMON)
router.get('/api/getMovie', async (req, res) => {
    try {
        const movies_data = await MovieModel.find({});
        return res.status(200).json(movies_data);
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});

// PAGINATED MOVIES
router.get('/api/paginated/getMovie', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 8;

        const skip = (page - 1) * limit;

        const totalMovies = await MovieModel.countDocuments();
        const movies = await MovieModel.find({})
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        return res.status(200).json({
            movies,
            currentPage: page,
            totalPages: Math.ceil(totalMovies / limit),
            totalMovies
        });
    } catch (error) {
        return res.status(500).json({ message: "Pagination error" });
    }
});


//GET SINGLE MOVIE (EDIT)
router.get('/api/getMovie/:id', async (req, res) => {
    try {
        const movie = await MovieModel.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        return res.status(200).json(movie);
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});

//SORTED MOVIES
router.get('/api/sorted/getMovie', async (req, res) => {
    try {
        const { title, description, year, duration, genre, sortBy, order } = req.query;
        let query = {};

        if (title) query.title = { $regex: title, $options: 'i' };
        if (description) query.description = { $regex: description, $options: 'i' };
        if (genre) query.genre = { $regex: genre, $options: 'i' };
        if (duration) query.duration = { $lte: Number(duration) };

        if (year) {
            query.releaseDate = {
                $gte: new Date(`${year}-01-01`),
                $lte: new Date(`${year}-12-31`)
            };
        }

        let sortOptions = {};
        if (sortBy) sortOptions[sortBy] = order === 'desc' ? -1 : 1;

        const movies = await MovieModel.find(query).sort(sortOptions);
        return res.status(200).json(movies);
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});

//ADD MOVIE (ADMIN)
router.post('/api/admin/addMovie', authMiddleware, async (req, res) => {
    try {
        const newMovie = new MovieModel(req.body);
        const result = await newMovie.save();
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error adding movie" });
    }
});

//DELETE MOVIE (ADMIN)
router.delete('/api/admin/deleteMovie/:id', authMiddleware, async (req, res) => {
    try {
        const result = await MovieModel.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Movie not found" });
        }
        return res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting movie" });
    }
});

//UPDATE MOVIE (ADMIN)
router.put('/api/admin/editMovie/:id', authMiddleware, async (req, res) => {
    try {
        const updatedMovie = await MovieModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        return res.status(200).json(updatedMovie);
    } catch (error) {
        return res.status(500).json({ message: "Error updating movie" });
    }
});

module.exports = router;
