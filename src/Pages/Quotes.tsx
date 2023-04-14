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
  docs: QuotesProp[];
  limit: number;
  offset: 0;
  page: number;
  total: number
}

type QuotesProp = {
  _id: string;
  dialog: string;
  movie: string;
  character: string;
}

export default function Quotes() {
  const cells = ['Dialog', 'Movie', 'Character']
  const [ quotes, setQuotes ] = useState<Props>();
  const [loading, setLoading] = useState(true);
  const [ error, setError ] = useState(false)

  useEffect(() => {
    const fetchQuotesHandler = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/quote`, {
          headers: {
            Authorization: `Bearer ${process.env.React_APP_API_KEY}`
          }
        })
        setQuotes(data)
        setError(false)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(true)
        return error
      }
    }
    fetchQuotesHandler()
  }, [])

  // cache data
  const displayData = useMemo(() => quotes, [quotes])?.docs;

  return (
    <>
      <NavigationBar />
      {
        loading ? (
          <Loader loading={loading} />
        ) : error ? (
          <h4>
            Oops! Something went wrong, please try again.
          </h4>
        ) : (
      <BaseTable cells={cells}>
        {
          displayData?.map(quote => (
            <StyledTableRow key={quote._id}>
              <StyledTableCell component="th" scope="row">
                {quote.dialog}
              </StyledTableCell>
              <StyledTableCell align="right">{quote.movie}</StyledTableCell>
              <StyledTableCell align="right">{quote.character}</StyledTableCell>

            </StyledTableRow>
          ))
        }
      </BaseTable>
        )
      }
    </>
  )
}