function GroupForm() {
    return (
        <>
            <button type="button" className="w-100 mt-2 p-2 create-group" data-toggle="modal" data-target=".form-group">Large modal</button>

            <div className="modal fade form-group" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        ...
                    </div>
                </div>
            </div>

        </>
    )
}
export default GroupForm