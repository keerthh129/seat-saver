import { getBookingHistory, movies } from "@/data/movies";
import Header from "@/components/Header";
import { CalendarDays, Film, Ticket } from "lucide-react";

const BookingHistory = () => {
  const bookings = getBookingHistory();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 font-display text-4xl tracking-wider text-foreground md:text-5xl">
          MY <span className="text-primary">BOOKINGS</span>
        </h1>

        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Ticket className="mb-4 h-16 w-16 text-muted-foreground/30" />
            <p className="text-lg text-muted-foreground">No bookings yet</p>
            <p className="mt-1 text-sm text-muted-foreground/60">
              Book a movie to see your history here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => {
              const movie = movies.find((m) => m.id === booking.movieId);
              return (
                <div
                  key={booking.id}
                  className="flex gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/20"
                >
                  {movie && (
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="h-24 w-16 rounded-lg object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-display text-xl tracking-wide text-foreground">
                          {booking.movieTitle}
                        </h3>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {booking.showtime}
                        </p>
                      </div>
                      <span className="rounded-md bg-secondary px-2 py-1 font-mono text-xs text-muted-foreground">
                        {booking.id}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Film className="h-3.5 w-3.5" />
                        Seats: {booking.seats.join(", ")}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {new Date(booking.bookedAt).toLocaleDateString()}
                      </span>
                      <span className="ml-auto font-semibold text-accent">
                        ${booking.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default BookingHistory;
