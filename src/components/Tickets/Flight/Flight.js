const Flight = ({data}) => {
debugger
    return (
        <div>
            <p>{data.company.name}</p>
            <p>{data.date}</p>
        </div>
    )
}

export default Flight