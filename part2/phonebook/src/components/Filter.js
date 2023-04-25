const Filter = ({newFilter, action}) => {
    return (
        <>
            <form onSubmit={e => e.preventDefault()}>
                <label>Filter</label>
                <input onChange={action} value={newFilter} />
            </form>
        </>
    )
}

export default Filter