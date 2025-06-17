import { useState } from "react"
import ModalCustome from "../../components/modal/ModalCustom"
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CustomSelect from "../../components/select/CustomSelect";
import groupService from "../../services/group/groupService";
function GroupForm() {
    const [req, setReq] = useState<{
        name: string,
        description: string,
        groupType: "PUBLIC" | "PRIVATE",
        userIds: []
    }>({
        name: "",
        description: "",
        groupType: "PUBLIC",
        userIds: []
    })

    const onChangeGroupForm = (e: any) => {
        const { value, name } = e.target
        setReq((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const createGroup = () => {
        groupService.createGroup(req).then(resp => {
            alert("create ok: " + resp.data.data)
        }).catch(err => {
            console.log("err: ", err)
        })
    }
    return (
        <>
            <div className="form-group mb-3">
                <label htmlFor="exampleInputEmail1">Name</label>
                <input type="email" className="form-control" id="exampleInputEmail1"
                    name='name' onChange={onChangeGroupForm}
                    aria-describedby="emailHelp" placeholder="Enter your group name" />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="exampleInputPassword1">Description</label>
                <input type="text" className="form-control"
                    name='description'
                    id="exampleInputPassword1" onChange={onChangeGroupForm} placeholder="Enter your group description" />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="exampleInputPassword1" >Group type</label>
                <select className="form-select" value={req.groupType} name="groupType" onChange={onChangeGroupForm}>
                    <option value={"PUBLIC"} >Public</option>
                    <option value={"PRIVATE"}>Private</option>
                </select>
            </div>
            <div className="form-group mb-3">
            <label htmlFor="exampleInputPassword1" >Choose friends(optional)</label>

                <CustomSelect data={[{
                    value: "12",
                    label: "vcl"
                }]} />
            </div>
            {/* <Spinner loading={loading} /> */}
            <button className="btn btn-primary w-100" onClick={() => {
                createGroup()
            }}>Submit</button>
        </>
    )
}
export default GroupForm