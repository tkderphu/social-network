function Alert(props: { type: "danger" | "success", message: string }) {
    return (
        <div className={`alert alert-${props.type} mt-3`} role="alert">
            {props.message}
        </div>
    )
}
export default Alert