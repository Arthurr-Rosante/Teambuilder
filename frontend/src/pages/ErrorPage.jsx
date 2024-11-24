import React from 'react'
import { NavLink } from 'react-router-dom'

function ErrorPage() {

  return (
    <div>
      <img src="/pikachu-hero.webp" />
      <h1>Ooops... Parece que essa rota não existe!</h1>
      <a href="/">Voltar para Landpage</a>
    </div>
  )
}

export default ErrorPage