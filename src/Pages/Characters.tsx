import { useEffect, useState, useMemo } from 'react';
import {
  NavigationBar,
  BaseTable,
  StyledTableCell,
  StyledTableRow,
  Loader
} from '../components';
import axios from 'axios';

type CharacterProps = {
  _id: string;
  name: string;
  gender: string;
  race: string;
  height: string;
  birth: string;
  spouse: string;
  death: string;
  realm: string;
  hair: string;
}

type Props = {
  docs: CharacterProps[];
  limit: number;
  offset: 0;
  page: number;
  total: number
}

export default function Characters() {
  const cells = ['Name', 'Gender', 'Race', 'Height', 'Birth', 'Spouse', 'Death', 'Realm', 'Hair']
  const [ characters, setCharacters ] = useState<Props>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharactersHandler = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/character`, {
          headers: {
            Authorization: `Bearer ${process.env.React_APP_API_KEY}`
          }
        })
        setCharacters(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        return error
      }
    }
    fetchCharactersHandler()
  }, [])

  // cache data
  const displayData = useMemo(() => characters, [characters])?.docs;

  return (
    <>
      <NavigationBar />
      {
        loading ? (
          <Loader loading={loading} />
        ) : (
      <BaseTable cells={cells}>
        {
          displayData?.map(character => (
            <StyledTableRow key={character._id}>
              <StyledTableCell component="th" scope="row">
                {character.name}
              </StyledTableCell>
              <StyledTableCell align="right">{character.gender}</StyledTableCell>
              <StyledTableCell align="right">{character.race}</StyledTableCell>
              <StyledTableCell align="right">{character.height}</StyledTableCell>
              <StyledTableCell align="right">{character.birth}</StyledTableCell>
              <StyledTableCell align="right">{character.spouse}</StyledTableCell>
              <StyledTableCell align="right">{character.death}</StyledTableCell>
              <StyledTableCell align="right">{character.realm}</StyledTableCell>
              <StyledTableCell align="right">{character.hair}</StyledTableCell>
            </StyledTableRow>
          ))
        }
      </BaseTable>
        )
      }
    </>
  )
}
