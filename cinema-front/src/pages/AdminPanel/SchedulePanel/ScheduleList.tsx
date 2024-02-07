import axios from "axios";
import { useEffect, useState } from "react";
import SelectWithLabel from "../../../components/SelectWithLabel";
import useAuthHook from "../../../utils/auth/useAuth";
import { ScreeningData } from "./SchedulePanel";
interface ScheduleListProps {
  roomId: string;
  screenings: ScreeningData[];
  setScreenings: (arg: ScreeningData[]) => void;
}

interface Movie {
  _id: string;
  uid?: string;
  title: string;
  screeningLength: number;
}

const ScheduleList = ({
  roomId,
  screenings,
  setScreenings,
}: ScheduleListProps) => {
  const freeTime = [
    "09:00",
    "11:00",
    "13:00",
    "15:00",
    "17:00",
    "19:00",
    "21:00",
  ];

  const [movieList, setMovieList] = useState<Movie[]>([]);
  const { api } = useAuthHook();
  const fetchData = async () => {
    try {
      let response = await axios.get(api + "/api/movie/movies?page=1");
      const totalPages = response.data.totalPages;
      let allMovies = response.data.movies;

      for (let page = 2; page <= totalPages; page++) {
        response = await axios.get(api + "/api/movie/movies?page=" + page);
        allMovies = allMovies.concat(response.data.movies);
      }

      setMovieList(allMovies);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovieList([]);
    }
  };

  useEffect(() => {
    fetchData();

    const initialScreenings = freeTime.map((time) => ({
      roomId: roomId,
      hour: time,
      movieId: "",
    }));
    setScreenings(initialScreenings);
  }, []);

  const handleChange = (index: number, key: string, value: string) => {
    const updatedsreenings = screenings.map((item, i) => {
      if (i === index) {
        return { ...item, [key]: value };
      }
      return item;
    });
    setScreenings(updatedsreenings);
  };

  return (
    <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
      {freeTime.map((item, index) => {
        return (
          <div
            key={index}
            style={{ display: "flex", gap: "20px", alignItems: "flex-end" }}
          >
            <div style={{ padding: "5px 0" }} key={freeTime[index]}>
              {item}
            </div>
            <SelectWithLabel
              onChange={(e) => handleChange(index, "movieId", e.target.value)}
              title="Film"
            >
              <option value={""}>Brak</option>
              {movieList.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </SelectWithLabel>
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleList;
