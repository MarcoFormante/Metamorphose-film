import React from 'react'
import './errorHandler.css'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../../components/common/BackButton/BackButton';

const errorMessages = [
  { status: 404, title: "404 Not Found", message: "Désolé, la page que vous recherchez n'existe pas." },
  { status: 500, title: "500 Internal Server Error", message: "Désolé, quelque chose s'est mal passé." },
  { status: 429, title: "429 Too Many Requests", message: "Vous avez fait trop de requêtes en peu de temps. Veuillez attendre quelques minutes avant de réessayer." },
  { status: 401, title: "401 Unauthorized", message: "Désolé, vous n'êtes pas autorisé à accéder à cette page. Veuillez vous connecter et réessayer." },
  { status: 503, title: "503 Service Unavailable", message: "Désolé, le serveur est actuellement indisponible. Veuillez réessayer plus tard." },
  { status: 403, title: "403 Forbidden", message: "Désolé, vous n'avez pas la permission d'accéder à cette page." },
  { status: 202, title: "", message: "Des futurs projets arrivent très vite !" }
];

const ErrorHandler = () => {
    const { status } = useParams()
    const navigate = useNavigate()
    const error = errorMessages.find(error => error.status === parseInt(status)) 
 
      return (
        <div className='error-handler-page'>
         <BackButton
            props={{ width: 24, height: 24 }}
            callback={() => navigate(error.status === 404 ? "/" : -1 , { replace: true })}
            label={"Retour"}
          />
      
        <div className='error-handler'>
          
        {error && (
          <div>
            <h1>{error.title}</h1>
            <p className={error.status === 202 ? "text-big" : ""}>{error.message}</p>
          </div>
        )}
      </div>
      </div>
    )
  
}

export default ErrorHandler