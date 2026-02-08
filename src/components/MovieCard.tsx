import { Clock, Star } from "lucide-react";
import { Movie } from "@/data/movies";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:cinema-glow"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <span className="inline-block rounded-md bg-primary/90 px-2 py-0.5 text-xs font-semibold text-primary-foreground">
            {movie.rating}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display text-xl tracking-wide text-foreground">
          {movie.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{movie.genre}</p>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {movie.duration}
          </span>
          <span className="font-semibold text-accent">
            ${movie.price.toFixed(2)}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {movie.showtimes.slice(0, 3).map((time) => (
            <span
              key={time}
              className="rounded-md border border-border bg-secondary px-2 py-1 text-xs text-secondary-foreground"
            >
              {time}
            </span>
          ))}
          {movie.showtimes.length > 3 && (
            <span className="rounded-md px-2 py-1 text-xs text-muted-foreground">
              +{movie.showtimes.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
