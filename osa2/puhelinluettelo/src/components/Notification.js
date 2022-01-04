import React from "react"

const Notification = ({message, quality}) => {
  if (message === null) {
    return null
  }
  const qualityNotification = `${quality}Notification`
  return (
    <div className={qualityNotification}>
      {message}
    </div>
  )
}

export default Notification