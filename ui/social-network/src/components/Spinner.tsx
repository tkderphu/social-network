function Spinner(props: { loading?: boolean }) {
    return (
        <>
            {props.loading && (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border mt-2 mb-2" role="status">
                    </div>
                </div>
            )}
        </>
    )
}
export default Spinner