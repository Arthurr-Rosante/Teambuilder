import React from 'react'
import { useParams, NavLink } from 'react-router-dom'

function EntryPage() {
    const { name } = useParams()

    return (
        <div>
            <b>{name} page</b>
            <NavLink to={"/home"}>voltar</NavLink>
        </div>
    )
}

export default EntryPage