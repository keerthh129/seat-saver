import { useMemo } from "react";
import { ROWS, SEATS_PER_ROW, getBookedSeats } from "@/data/movies";

interface SeatMapProps {
  movieId: string;
  showtime: string;
  selectedSeats: string[];
  onSeatToggle: (seatId: string) => void;
}

const SeatMap = ({ movieId, showtime, selectedSeats, onSeatToggle }: SeatMapProps) => {
  const bookedSeats = useMemo(
    () => getBookedSeats(movieId, showtime),
    [movieId, showtime]
  );

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Screen */}
      <div className="w-full max-w-md">
        <div className="mx-auto h-2 w-3/4 rounded-t-full bg-primary/60" />
        <div className="screen-glow mx-auto h-12 w-3/4 rounded-b-lg" />
        <p className="mt-1 text-center text-xs tracking-widest text-muted-foreground">
          SCREEN
        </p>
      </div>

      {/* Seats */}
      <div className="flex flex-col gap-2">
        {ROWS.map((row) => (
          <div key={row} className="flex items-center gap-1.5">
            <span className="w-5 text-center text-xs font-medium text-muted-foreground">
              {row}
            </span>
            <div className="flex gap-1.5">
              {Array.from({ length: SEATS_PER_ROW }, (_, i) => {
                const seatId = `${row}${i + 1}`;
                const isBooked = bookedSeats.includes(seatId);
                const isSelected = selectedSeats.includes(seatId);

                // Add aisle gap after seat 5
                const marginLeft = i === 5 ? "ml-4" : "";

                return (
                  <button
                    key={seatId}
                    disabled={isBooked}
                    onClick={() => onSeatToggle(seatId)}
                    title={seatId}
                    className={`h-7 w-7 rounded-t-lg text-[10px] font-medium transition-all duration-200 ${marginLeft} ${
                      isBooked
                        ? "cursor-not-allowed bg-seat-booked text-muted-foreground/50"
                        : isSelected
                        ? "bg-seat-selected text-primary-foreground seat-glow scale-110"
                        : "bg-seat-available/80 text-background hover:bg-seat-available hover:scale-105"
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-t-md bg-seat-available/80" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-t-md bg-seat-selected" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-t-md bg-seat-booked" />
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
