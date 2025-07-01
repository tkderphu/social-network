import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { useEffect, useRef, useState } from 'react';
import { GroupResp } from '../../model/groupModel';
import { useGroup } from './GroupProvider';
import { useParams } from 'react-router';
import groupService from '../../services/group/groupService';
import { CommonResult } from '../../common';
import { Checkbox } from "primereact/checkbox";
import { PostResp } from '../../model/postModel';
export default function BanUserButton() {

    const toast = useRef(null);
    const group: GroupResp = useGroup().group
    const { userId, groupId } = useParams()
    const [visible, setVisible] = useState(false);
    const [groups, setGroups] = useState<GroupResp[]>([])
    const [checked, setChecked] = useState<any>({});

    useEffect(() => {
        console.log("userId: ", userId)
        groupService.suggestGroupToBanUser(userId).then(resp => {
            const result: CommonResult<PostResp[]> = resp.data
            if (result.code == 403) {
                alert("Access denied")
                return;
            }
            console.log("common group: ", result)
            if (result.data) {
                const newChecked = {}
                result.data.forEach(group => {
                    newChecked[group.id] = true
                })
                setChecked(newChecked)
            }
            setGroups(result.data);
        }).catch(err => {
            alert("Please see console")
            console.log("err: ", err)
        })
    }, [])

    const reject = () => {
        // toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });


    }


    const dialogDetail = (<>
        {/* <h4>common group</h4> */}
        <div>
            {groups?.map(group => {
                return (
                    <div className='d-flex align-items-center'>
                        <img src={group.coverPhoto} height={50} width={50} className={"rounded"} />
                        <div className='mx-3 d-flex flex-column'>
                            <div><strong>{group.name}</strong></div>
                            <Checkbox onChange={(e) => {
                                setChecked((prev: any) => ({
                                    ...prev,
                                    [group.id]: e.checked
                                }))
                            }}  checked={checked[group.id]}></Checkbox>
                        </div>
                    </div>
                )
            })}
        </div>
    </>)

    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog
                group="declarative"
                visible={visible}
                onHide={() => setVisible(false)}
                message={dialogDetail}
                header="Confirmation"
                accept={accept}
                reject={reject}
                style={{ width: '50vw' }}
                breakpoints={{ '1100px': '75vw', '960px': '100vw' }}
            />
            <button onClick={() => setVisible(true)} className="btn btn-danger">Ban</button>
        </>
    )

}