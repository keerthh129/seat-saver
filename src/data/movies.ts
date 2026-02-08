import movie1 from "@/assets/movie-1.jpg";
import movie2 from "@/assets/movie-2.jpg";
import movie3 from "@/assets/movie-3.jpg";
import movie4 from "@/assets/movie-4.jpg";
import movie5 from "@/assets/movie-5.jpg";
import movie6 from "@/assets/movie-6.jpg";

export interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: string;
  rating: string;
  poster: string;
  showtimes: string[];
  price: number;
}

export interface Booking {
  id: string;
  movieId: string;
  movieTitle: string;
  showtime: string;
  seats: string[];
  totalPrice: number;
  bookedAt: string;
}

export const movies: Movie[] = [
  {
    id: "1",
    title: "Galactic Siege",
    genre: "Sci-Fi / Action",
    duration: "2h 28min",
    rating: "PG-13",
    poster: movie1,
    showtimes: ["10:30 AM", "1:45 PM", "5:00 PM", "8:15 PM", "11:00 PM"],
    price: 12,
  },
  {
    id: "2",
    title: "The Last Shadow",
    genre: "Thriller / Horror",
    duration: "1h 52min",
    rating: "R",
    poster: movie2,
    showtimes: ["11:00 AM", "2:30 PM", "6:00 PM", "9:30 PM"],
    price: 11,
  },
  {
    id: "3",
    title: "Summer in Paris",
    genre: "Romance / Comedy",
    duration: "1h 45min",
    rating: "PG",
    poster: movie3,
    showtimes: ["10:00 AM", "12:45 PM", "3:30 PM", "6:15 PM", "9:00 PM"],
    price: 10,
  },
  {
    id: "4",
    title: "Dragon's Reign",
    genre: "Fantasy / Adventure",
    duration: "2h 35min",
    rating: "PG-13",
    poster: movie4,
    showtimes: ["11:30 AM", "3:00 PM", "6:30 PM", "10:00 PM"],
    price: 13,
  },
  {
    id: "5",
    title: "Zero Hour",
    genre: "Action / Thriller",
    duration: "2h 10min",
    rating: "R",
    poster: movie5,
    showtimes: ["12:00 PM", "3:15 PM", "6:45 PM", "9:45 PM"],
    price: 12,
  },
  {
    id: "6",
    title: "Paws & Whiskers",
    genre: "Animation / Family",
    duration: "1h 38min",
    rating: "G",
    poster: movie6,
    showtimes: ["9:30 AM", "11:45 AM", "2:00 PM", "4:15 PM", "6:30 PM"],
    price: 9,
  },
];

// Simulated booked seats per movie+showtime
const initialBookedSeats: Record<string, string[]> = {
  "1-10:30 AM": ["A3", "A4", "B7", "C2", "D5", "D6", "E8", "F1"],
  "1-8:15 PM": ["A1", "A2", "B3", "B4", "C5", "C6", "D7", "E3", "E4", "F6", "G2", "G3"],
  "2-6:00 PM": ["B2", "B3", "C4", "D1", "E5", "E6", "F7"],
  "3-6:15 PM": ["A5", "B1", "C3", "D4", "E2", "F8", "G1", "G5"],
  "4-6:30 PM": ["A1", "B2", "B3", "C7", "D8", "E1", "F3", "F4", "G6"],
  "5-9:45 PM": ["A2", "B5", "C1", "C8", "D3", "E7", "F2", "G4"],
  "6-2:00 PM": ["A6", "B4", "C2", "D7", "E3", "F5", "G8"],
};

// Get booked seats from localStorage + initial data
export function getBookedSeats(movieId: string, showtime: string): string[] {
  const key = `${movieId}-${showtime}`;
  const stored = localStorage.getItem("bookedSeats");
  const storedSeats: Record<string, string[]> = stored ? JSON.parse(stored) : {};
  const initial = initialBookedSeats[key] || [];
  const extra = storedSeats[key] || [];
  return [...new Set([...initial, ...extra])];
}

// Book seats and store in localStorage
export function bookSeats(movieId: string, showtime: string, seats: string[]): string {
  const key = `${movieId}-${showtime}`;
  const stored = localStorage.getItem("bookedSeats");
  const storedSeats: Record<string, string[]> = stored ? JSON.parse(stored) : {};
  storedSeats[key] = [...(storedSeats[key] || []), ...seats];
  localStorage.setItem("bookedSeats", JSON.stringify(storedSeats));

  // Generate booking ID
  const bookingId = `BK-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  return bookingId;
}

// Save booking to history
export function saveBooking(booking: Booking) {
  const stored = localStorage.getItem("bookingHistory");
  const history: Booking[] = stored ? JSON.parse(stored) : [];
  history.unshift(booking);
  localStorage.setItem("bookingHistory", JSON.stringify(history));
}

// Get booking history
export function getBookingHistory(): Booking[] {
  const stored = localStorage.getItem("bookingHistory");
  return stored ? JSON.parse(stored) : [];
}

// Seat layout config
export const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
export const SEATS_PER_ROW = 10;
