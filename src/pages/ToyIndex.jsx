
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'

import { use, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadToys } from '../store/actions/toy.actions.js'
import { store } from '../store/store.js'




export function ToyIndex() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)

    useEffect(() => {
        loadToys()
    }, [])


    return (
        <div>
            <h1>Toy Index</h1>
            <ToyList toys={toys} />
        </div>
    )
}