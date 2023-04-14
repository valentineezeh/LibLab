import { useEffect, useState, useMemo } from 'react';
import {
  NavigationBar,
  BaseTable,
  StyledTableCell,
  StyledTableRow,
  Loader
} from '../components';
import axios from 'axios';

type Props = {
  docs: MovieProps[];
  limit: number;
  offset: 0;
  page: number;
  total: number
}

type MovieProps = {
  _id: string;
  name: string;
  runtimeInMinutes: number;
  boxOfficeRevenueInMillions: number;
  academyAwardNominations: number;
  academyAwardWins: number;
}

export default function Movies() {
  const cells = ['Name', 'Box office revenue', 'Award Nomination', 'Award Win', 'Time']
  const [ movies, setMovies ] = useState<Props>();
  const [loading, setLoading] = useState(true);
  const [ error, setError ] = useState(false)

  useEffect(() => {
    const fetchMoviesHandler = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/movie?limit=100`, {
          headers: {
            Authorization: `Bearer ${process.env.React_APP_API_KEY}`
          }
        })
        setMovies(data)
        setError(false)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(true)
        return error
      }
    }
    fetchMoviesHandler()
  }, [])

  // cache data
  const displayData = useMemo(() => movies, [movies])?.docs;

  return (
    <>
      <NavigationBar />
      {
        error && (
          <h4>
            Oops! Something went wrong, please try again.
          </h4>
        )
      }
      {
        loading ? (
          <Loader loading={loading} />
        ) : error ? (
          <h4>{error}</h4>
        ) : (
          <BaseTable cells={cells}>
        {
          displayData?.map(movie => (
            <StyledTableRow key={movie._id}>
              <StyledTableCell component="th" scope="row">
                {movie.name}
              </StyledTableCell>
              <StyledTableCell align="right">{movie.boxOfficeRevenueInMillions}</StyledTableCell>
              <StyledTableCell align="right">{movie.academyAwardNominations}</StyledTableCell>
              <StyledTableCell align="right">{movie.academyAwardWins}</StyledTableCell>
              <StyledTableCell align="right">{movie.runtimeInMinutes}</StyledTableCell>

            </StyledTableRow>
          ))
        }
      </BaseTable>
        )
      }
    </>
  )
}
