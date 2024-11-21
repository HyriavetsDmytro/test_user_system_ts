import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import styles from './User.module.scss'
import { useGetUserByParamsMutation } from '../../store/apiSlice'

import { useSelector } from 'react-redux'
import { RootState } from '../../store/mainStore'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { userListActions } from '../../store/mainStore'

const User: React.FC<{ head: string }> = (props) => {
  const [isExpand, setIsExpand] = React.useState(false)
  const listOfUsers = useSelector((state: RootState) => state.userList)
  const index = listOfUsers.findIndex((item) => item?.email === props.head)
  const dispatch = useDispatch()
  const [getUserByParams, { isError, error, isLoading }] =
    useGetUserByParamsMutation()
  const isFull = listOfUsers[index].first_name.length

  useEffect(() => {
    const fetchData = async () => {
      if (isExpand && isFull === 0) {
        await getUserByParams({ email: props.head })
          .unwrap()
          .then((data) => {
            dispatch(userListActions.updUserByEmail(data))
          })
      }
    }

    fetchData()
  }, [isExpand, isFull, props.head, getUserByParams, dispatch])

  return (
    <Accordion
      onChange={(e, expanded) => {
        if (expanded) {
          setIsExpand(true)
        } else {
          setIsExpand(false)
        }
      }}
      className={styles.accordion}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id={'panel1-header'}
        className={styles.accordionSummary}
      >
        {!isExpand && (
          <div className={styles.accordionTitle}>
            {listOfUsers[index].email}{' '}
            <span className={styles.conter}> {listOfUsers[index].role}</span>
          </div>
        )}
        {isExpand && !isLoading && !isError && <>Click to shink info</>}
        {isLoading && <p>Loading...</p>}
      </AccordionSummary>
      <AccordionDetails>
        {isFull !== 0 &&
          Object.entries(listOfUsers[index]).map(([key, val]) => (
            <p key={key + val} className={styles.accordionDesc}>
              {key}: {val}
            </p>
          ))}
        {isError && <p>{JSON.stringify(error)}</p>}
      </AccordionDetails>
    </Accordion>
  )
}
export default User
