import { movies } from "@/data/movies";
import MovieCard from "@/components/MovieCard";
import Header from "@/components/Header";
import { Film } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero */}
        <div className="mb-10 text-center">
          <h1 className="font-display text-5xl tracking-wider text-foreground md:text-6xl">
            NOW <span className="text-primary">SHOWING</span>
          </h1>
          <p className="mt-2 text-muted-foreground">
            Select a movie to book your seats
          </p>
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto flex items-center justify-center gap-2 px-4 text-sm text-muted-foreground">
          <Film className="h-4 w-4 text-primary" />
          <span>CineBook — Movie Ticket Booking System</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
