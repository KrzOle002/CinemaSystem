import styled from "styled-components";
import InputLabel from "../../components/InputLabel";
import { Slideshow } from "../../utils/slider/Slideshow";
import useAuthHook from "./../../utils/auth/useAuth";
import { ChangeEvent, useEffect, useState } from "react";
import { MovieModel } from "../../types/MovieModelType";
import axios from "axios";
import MovieItem from "./Components/MovieItem";
import EmptyState from "../../utils/empty/EmptyState";
import PageFooter from "../PageFooter";
import Calendar from "../../components/Calendar";
import SectionHeader from "../../components/SectionHeader";
import Pagination from "@mui/material/Pagination"; // Dodano import Pagination

const MovieSchedule = () => {
  const { api } = useAuthHook();

  const [reservationDate, setReservationDate] = useState<Date>(new Date());
  const [movieList, setMovieList] = useState<MovieModel[] | null>(null);
  const [page, setPage] = useState(1); // Dodano stan dla bieżącej strony
  const [totalPages, setTotalPages] = useState(0); // Stan dla całkowitej liczby stron

  const handleFilterMovies = (e: ChangeEvent<HTMLInputElement>) => {
    fetchMovies(e.target.value);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
    fetchMovies(undefined, value);
  };

  const fetchMovies = async (title?: string, page: number = 1, limit: number = 5) => {
    try {
      const getter = title
        ? `/api/movie/movies?title=${title}&page=${page}&limit=${limit}`
        : `/api/movie/movies?page=${page}&limit=${limit}`;
      const response = await axios.get(api + getter);

      setMovieList(response.data.movies);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setMovieList(null);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Wrapper>
      <Slideshow />
      <Container>
        <SectionHeader>Repertuar Cinema Fordon</SectionHeader>

        <Calendar
          setReservationDate={setReservationDate}
          reservationDate={reservationDate}
        />
        <MovieControl>
          <InputLabel placeholder={"Filtr"} onChange={handleFilterMovies} />
        </MovieControl>
        <MoviesList>
          {movieList?.length == 0 ? (
            <EmptySlot>Brak filmu o takiej nazwie</EmptySlot>
          ) : null}
          {movieList ? (
            movieList.map((movie) => {
              return (
                <MovieItem
                  key={movie._id}
                  movie={movie}
                  reservationDate={reservationDate}
                />
              );
            })
          ) : (
            <EmptyState />
          )}
        </MoviesList>
        <PaginationContainer
          style={{
            color: "white",
            backgroundColor: "white",
            borderRadius: "25px",
            padding: "10px 0",
          }}
        >
          <Pagination
            color={"primary"}
            count={totalPages}
            page={page}
            onChange={handlePageChange}
          />
        </PaginationContainer>
      </Container>
      <PageFooter />
    </Wrapper>
  );
};

export default MovieSchedule;

const Wrapper = styled.div`
  color: ${({ theme }) => theme.colors.white};
  width: 100%;
  min-height: 100vh;
`;

const Container = styled.div`
  @media screen and (max-width: 640px) {
    width: 80%;
  }
  width: 50%;
  margin: 0 auto;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 60%;
  min-width: 260px;
  margin: 0 auto;
  padding: 20px 0;
`;

const MovieControl = styled.div`
  @media screen and (max-width: 640px) {
    flex-direction: column-reverse;
    row-gap: 50px;
  }
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  column-gap: 20px;
  & button {
    width: 50%;
  }
`;

const MoviesList = styled.div`
  min-height: 250px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const EmptySlot = styled.p`
  font-weight: 100;
  text-align: center;
  opacity: 50%;
`;
