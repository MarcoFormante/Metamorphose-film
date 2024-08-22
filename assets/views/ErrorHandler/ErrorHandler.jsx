import React from 'react'
import './errorHandler.css'
import { useParams } from 'react-router-dom'

const errorMessages = [
    { status: 404, title: "404 Not Found", message: "Sorry, the page you are looking for does not exist." },
    { status: 500, title: "500 Internal Server Error", message: "Sorry, something went wrong." },
    { status: 429, title: "429 Too Many Requests", message: "You have made too many requests in a short period of time. Please wait a few minutes before trying again." },
    { status: 401, title: "401 Unauthorized", message: "Sorry, you are not authorized to access this page. Please log in and try again." },
    { status: 503, title: "503 Service Unavailable", message: "Sorry, the server is currently unavailable. Please try again later." },
    { status: 403, title: "403 Forbidden", message: "Sorry, you do not have permission to access this page." }
  ];

const ErrorHandler = () => {
    const { status } = useParams()
    const error = errorMessages.find(error => error.status === parseInt(status)) 
      return (
        <div className='error-handler'>
        {error && (
          <div>
            <h1>{error.title}</h1>
            <p>{error.message}</p>
          </div>
        )}
      </div>
    )
  
}

export default ErrorHandler