import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function MovieCard({ movies }) {
  const role = localStorage.getItem('role');

  return (
    <Card sx={{ maxWidth: 345 }} className='p-3 mb-5'>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={movies.img}
          alt="Movie-Poster"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {movies.title} - {new Date(movies.releaseDate).toLocaleDateString()}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {movies.rating}/({movies.totalRating})
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {movies.description}
          </Typography>
          {role == 'admin' ?
            <div className='flex justify-end items-center mt-2 gap-4'>
              <DeleteIcon className='text-red-700 hover:text-red-600' />
              <EditIcon className='text-blue-700 hover:text-blue-600' />
            </div>
            : ""
          }
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
