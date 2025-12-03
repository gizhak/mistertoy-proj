
import { toyService } from "../services/toy.service.js"
import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { saveToy } from "../store/actions/toy.actions.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function ToyEdit() {

    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()

    const param = useParams()
    console.log('param:', param)


    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Error loading toy:', err)
                navigate('/Toy')
            })
    }

    function handleChange({ target }) {
        let { name: fieldName, value, inStock } = target
        console.log('fieldName, value:', fieldName, value, inStock)
        setToyToEdit((prevToy) => ({ ...prevToy, [fieldName]: value, inStock: !prevToy.inStock }))

    }

    function onSaveToy(ev) {
        ev.preventDefault()
        // if (!toyToEdit.name) return
        console.log('Saving toy:', toyToEdit)
        saveToy(toyToEdit)
        console.log('Toy saved:', toyToEdit)
            .then(() => {
                showSuccessMsg('Toy saved successfully!')
                navigate('/Toy')
            })
            .catch(err => {
                console.log('Error saving toy:', err)
                showErrorMsg('Cannot save toy!')
            })
    }

    return (
        <section className="toy-edit">
            <h1>Toy Edit Page</h1>
            <h2>name: {toyToEdit.name}</h2>
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

            <form onSubmit={onSaveToy}>
                <label htmlFor="name">Name:</label>
                <input type="text"
                    id="name"
                    name="name"
                    value={toyToEdit.name}
                    onChange={handleChange}
                />
                <label htmlFor="price">Price:</label>
                <input type="number"
                    id="price"
                    name="price"
                    value={toyToEdit.price}
                    onChange={handleChange}
                />
                <label htmlFor="inStock">In Stock:</label>
                <input type="checkbox"
                    id="inStock"
                    name="inStock"
                    checked={toyToEdit.inStock}
                    onChange={handleChange}
                />
                <section>
                    <button>{toyToEdit.inStock ? '✅ In Stock' : '❌ Out of Stock'}</button>
                </section>
                <div>
                    <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/Toy">Back</Link>
                </div>
            </form>
        </section>
    )
}