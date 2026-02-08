import { CheckCircle, Copy } from "lucide-react";
import { Booking } from "@/data/movies";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface BookingSummaryProps {
  booking: Booking;
  onClose: () => void;
}

const BookingSummary = ({ booking, onClose }: BookingSummaryProps) => {
  const navigate = useNavigate();

  const copyBookingId = () => {
    navigator.clipboard.writeText(booking.id);
    toast.success("Booking ID copied!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-seat-available/20">
          <CheckCircle className="h-10 w-10 text-seat-available" />
        </div>
        <h2 className="font-display text-3xl tracking-wide text-foreground">
          BOOKING CONFIRMED
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Your tickets have been reserved
        </p>

        <div className="mt-6 rounded-xl border border-border bg-secondary/50 p-4 text-left">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Booking ID</span>
            <button
              onClick={copyBookingId}
              className="flex items-center gap-1 text-xs text-primary hover:text-primary/80"
            >
              <Copy className="h-3 w-3" />
              Copy
            </button>
          </div>
          <p className="mb-4 font-mono text-lg font-bold tracking-wider text-accent">
            {booking.id}
          </p>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Movie</span>
              <span className="font-medium text-foreground">{booking.movieTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Showtime</span>
              <span className="font-medium text-foreground">{booking.showtime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Seats</span>
              <span className="font-medium text-foreground">
                {booking.seats.join(", ")}
              </span>
            </div>
            <div className="flex justify-between border-t border-border pt-2">
              <span className="text-muted-foreground">Total</span>
              <span className="text-lg font-bold text-accent">
                ${booking.totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              onClose();
              navigate("/history");
            }}
          >
            View Bookings
          </Button>
          <Button
            className="flex-1"
            onClick={() => {
              onClose();
              navigate("/");
            }}
          >
            Book More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
