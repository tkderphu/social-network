function Spinner(props: { loading?: boolean }) {
    return (
        <>
            {props.loading && (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border spinner-border-sm "  style={{fontSize: "10px"}} role="status">
                    </div>
                </div>
            )}
        </>
    )
}
export default Spinner