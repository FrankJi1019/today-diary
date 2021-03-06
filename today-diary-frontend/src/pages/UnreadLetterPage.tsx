import PageContainer from "./PageContainer";
import {Grid} from "@mui/material";
import UnreadLetterCard from "../components/UnreadLetterCard";
import {FutureLetter} from "../types";
import {useEffect, useState} from "react";
import BackButton from "../components/BackButton";
import {getFutureDiaryLetterUrl} from "../routes";
import axios from "axios";
import {constants} from "../constants";
import {useAuth} from "../providers/AuthProvider";
import PageLoading from "./PageLoading";

const tempLetters: Array<FutureLetter> = [
  {
    letterId: '1',
    author: 'string',
    fromDate: '03/06/2005',
    toDate: '04/06/2005',
    title: 'Hello World',
    content: 'string',
    read: false,
  }, {
    letterId: '2',
    author: 'string',
    fromDate: '01/01/2022',
    toDate: '12/31/2022',
    title: 'Bye World',
    content: 'string',
    read: false,
  }, {
    letterId: '3',
    author: 'string',
    fromDate: '10/19/1999',
    toDate: '04/24/2022',
    title: 'Nice to meet you the world',
    content: 'string',
    read: false,
  }
]

const UnreadLetterPage = () => {

  const {getCurrentUser} = useAuth()

  const [futureLetters, setFutureLetters] = useState<Array<FutureLetter>>([])
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    try {
      const userId = getCurrentUser()?.getUsername()
      axios.get(`${constants.backend}/users/${userId}/future-letters?filter=unread`)
        .then(res => {
          setFutureLetters(res.data)
          setPageLoading(false)
        })
    } catch (e) {
      console.log(e)
      setPageLoading(false)
    }
  }, [getCurrentUser, setFutureLetters])

  if (pageLoading) return <PageContainer><PageLoading /></PageContainer>

  return (
    <PageContainer>
      <BackButton backUrl={getFutureDiaryLetterUrl()} />
      <Grid container>
        {
          futureLetters.filter(letter => !letter.read).map(letter => <UnreadLetterCard letter={letter} />)
        }
      </Grid>
    </PageContainer>
  )
}

export default UnreadLetterPage
