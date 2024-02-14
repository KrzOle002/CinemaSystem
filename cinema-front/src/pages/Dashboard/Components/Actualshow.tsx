import styled from "styled-components";
import MovieInstance from "./MovieInstance";
import SectionHeader from "../../../components/SectionHeader";
import Pagination from "@mui/material/Pagination";
import { MovieModel } from "../../../types/MovieModelType";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuthHook from "../../../utils/auth/useAuth";

const Actualshow = () => {
  const [movieList, setMovieList] = useState<MovieModel[] | null>(null);
  const [page, setPage] = useState(1); // Stan dla bieżącej strony
  const [totalPages, setTotalPages] = useState(0); // Stan dla całkowitej liczby stron

  const { api } = useAuthHook();

  const fetchMovies = async (page: number = 1, limit:number = 8 ) => {
    try {
      const response = await axios.get(`${api}/api/movie/movies?page=${page}&limit=${limit}`);

      setMovieList(response.data.movies);
      setTotalPages(response.data.totalPages); // Ustawianie całkowitej liczby stron
    } catch (error) {
      setMovieList(null);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
    fetchMovies(value); // Pobieranie filmów dla wybranej strony
  };

  return (
    <>
      <Wrapper>
        <SectionHeader>Teraz gramy</SectionHeader>
        <Container>
          {movieList?.map((movie) => (
            <MovieInstance key={movie._id} movie={movie} />
          ))}
        </Container>
      </Wrapper>
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
    </>
  );
};

export default Actualshow;

const Wrapper = styled.div`
  color: ${({ theme }) => theme.colors.white};
  width: 50%;
  margin: 0 auto;
  padding: 40px 0;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  width: 20%;
  min-width: 260px;
  margin: 0 auto;
`;
