import React, { createContext, useState, useEffect } from "react";
import {v4 as uiidv4} from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  const[isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })

  useEffect(()=> {
    fetchFeedback()
  },[])

// Fetch feedback
const fetchFeedback = async () => {
  const response =await fetch(
    "http://localhost:5000/feedback?_sort=id&_order=desc")
  const data = await response.json()

  setFeedback(data)
  setIsLoading(false)
}
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
    isLoading,
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
