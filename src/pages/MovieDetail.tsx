import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { movies, bookSeats, saveBooking, type Booking } from "@/data/movies";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import SeatMap from "@/components/SeatMap";
import BookingSummary from "@/components/BookingSummary";
import { toast } from "sonner";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === id);

  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  if (!movie) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Movie not found.</p>
      </div>
    );
  }

  const totalPrice = selectedSeats.length * movie.price;

  const handleShowtimeSelect = (time: string) => {
    setSelectedShowtime(time);
    setSelectedSeats([]);
  };

  const handleSeatToggle = (seatId: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const handleBooking = () => {
    if (!selectedShowtime || selectedSeats.length === 0) {
      toast.error("Please select a showtime and at least one seat.");
      return;
    }

    const bookingId = bookSeats(movie.id, selectedShowtime, selectedSeats);
    const booking: Booking = {
      id: bookingId,
      movieId: movie.id,
      movieTitle: movie.title,
      showtime: selectedShowtime,
      seats: [...selectedSeats].sort(),
      totalPrice,
      bookedAt: new Date().toISOString(),
    };
    saveBooking(booking);
    setConfirmedBooking(booking);
    toast.success("Booking confirmed!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Movies
        </button>

        {/* Movie Info */}
        <div className="mb-8 flex flex-col gap-6 md:flex-row">
          <img
            src={movie.poster}
            alt={movie.title}
            className="h-72 w-48 rounded-xl object-cover shadow-lg"
          />
          <div className="flex flex-col justify-center">
            <h1 className="font-display text-4xl tracking-wider text-foreground md:text-5xl">
              {movie.title}
            </h1>
            <p className="mt-2 text-muted-foreground">{movie.genre}</p>
            <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {movie.duration}
              </span>
              <span className="rounded-md bg-primary/20 px-2 py-0.5 text-xs font-semibold text-primary">
                {movie.rating}
              </span>
              <span className="flex items-center gap-1 font-semibold text-accent">
                <Tag className="h-4 w-4" />
                ${movie.price.toFixed(2)} / seat
              </span>
            </div>
          </div>
        </div>

        {/* Showtimes */}
        <section className="mb-8">
          <h2 className="mb-4 font-display text-2xl tracking-wide text-foreground">
            SELECT SHOWTIME
          </h2>
          <div className="flex flex-wrap gap-3">
            {movie.showtimes.map((time) => (
              <button
                key={time}
                onClick={() => handleShowtimeSelect(time)}
                className={`rounded-lg border px-5 py-2.5 text-sm font-medium transition-all ${
                  selectedShowtime === time
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-secondary text-secondary-foreground hover:border-primary/50"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </section>

        {/* Seat Selection */}
        {selectedShowtime && (
          <section className="mb-8">
            <h2 className="mb-6 font-display text-2xl tracking-wide text-foreground">
              SELECT YOUR SEATS
            </h2>
            <div className="rounded-2xl border border-border bg-card p-6">
              <SeatMap
                movieId={movie.id}
                showtime={selectedShowtime}
                selectedSeats={selectedSeats}
                onSeatToggle={handleSeatToggle}
              />
            </div>
          </section>
        )}

        {/* Booking Bar */}
        {selectedSeats.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 backdrop-blur-lg">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  {selectedSeats.length} seat{selectedSeats.length > 1 ? "s" : ""} selected:{" "}
                  <span className="font-medium text-foreground">
                    {selectedSeats.sort().join(", ")}
                  </span>
                </p>
                <p className="text-2xl font-bold text-accent">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
              <Button
                size="lg"
                className="animate-pulse-glow px-8 text-lg"
                onClick={handleBooking}
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Booking Confirmation Modal */}
      {confirmedBooking && (
        <BookingSummary
          booking={confirmedBooking}
          onClose={() => setConfirmedBooking(null)}
        />
      )}
    </div>
  );
};

export default MovieDetail;
