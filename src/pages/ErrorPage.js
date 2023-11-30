import { useRouteError } from "react-router-dom";
import React from 'react'

export default function ErrorPage() {
    const error = useRouteError()
  return (
    <div>
        <h1>Oops !!</h1>
        <p>Sorry, an unexpected error occurred</p>
        <p>{error.statusText || error.message}</p>
    </div>
  )
}
