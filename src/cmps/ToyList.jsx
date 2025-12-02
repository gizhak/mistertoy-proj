


export function ToyList({ toys }) {

    return (
        <div>
            <h2>Toy List</h2>
            <ul>
                {toys.map(toy =>
                    <li className="toy-preview" key={toy._id}>
                        {toy.name} - ${toy.price}
                    </li>
                )}
            </ul>
        </div>
    )
}