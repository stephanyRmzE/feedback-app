import { createContext, useState } from "react";
import {v4 as uiidv4} from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {

  const [feedback, setFeedback] = useState([
    {
      id:1,
      text: 'This Feedback item 1',
      rating:10
    },
    {
      id:2,
      text: 'This Feedback item 2',
      rating:8
    },
    {
      id:3,
      text: 'This Feedback item 3',
      rating:9
    }
  ])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })
//Delete Feedback
  const deleteFeedback = (id) => {
    if(window.confirm('Are you sure you want to delete?')){
      setFeedback(feedback.filter((item) => item.id !==id))
    }
  }
//Set item to be updated
  const editFeedback = (item) => {
      setFeedbackEdit({
        item,
        edit: true
      })

  }

//Update Feedback
const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) =>
      (item.id === id ? { ...item, ...updItem} : item))
      )
  }

//Add Feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uiidv4()
    setFeedback([newFeedback,...feedback])
  }

  return <FeedbackContext.Provider value={{
    feedback,
    feedbackEdit,
    deleteFeedback,
    addFeedback,
    editFeedback,
    updateFeedback,

  }}
  >
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext
