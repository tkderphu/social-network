import { useContext, useEffect, useState } from "react";
import { PageResult } from "../../common";
import SearchComponent from "../../components/searchInput/SearchComponent";
import { GroupResp } from "../../model/groupModel";
import { AppContext } from "../../provider/AppProvider";
import groupService from "../../services/group/groupService";
import profileService from "../../services/profile/profileService";


export default function Search() {
    const openNotification = useContext(AppContext)?.openSearch

    const closeNotifications = () => {
        openNotification?.set(false)
    };


    return (
        <>
            <div
                className={`notification-sidebar show`}
                id="notificationSidebar"
            >
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0">Search</h5>
                    <button type="button" className="btn close" aria-label="Close" onClick={closeNotifications}>
                        <span aria-hidden="true" style={{ fontSize: "20px" }}>&times;</span>
                    </button>
                </div>

                <SearchComponent
                    path='/search'
                    placeholder={'Search groups'}
                    data={[]}
                    handleSearch={(query: string, page: number, limit: number, setPageResult: (p: any) => void, setState: () => void) => {
                        const firstLetter = query.split(" ")[0]
                        if (firstLetter.includes("/g")) {
                            const keyword = query.substring(firstLetter.length).trim()
                            groupService.search(keyword, page, limit)
                                .then(resp => {
                                    const pageResultResp: PageResult<GroupResp> = resp.data.data
                                    const searchItem = pageResultResp.data.map((group: any) => {
                                        console.log("group: ", group)
                                        return {
                                            id: group.id,
                                            title: group.name,
                                            category: group.groupType,
                                            thumbnail: group.coverPhoto,
                                        }
                                    })
                                    const pageResult: PageResult<any> = {
                                        ...pageResultResp,
                                        data: searchItem
                                    }

                                    setPageResult(pageResult)
                                }).catch(err => {
                                    console.log("err search group")
                                })
                                .finally(() => {
                                    setState()
                                })
                          
                        } else {
                            let keyword = query
                            if(firstLetter.includes("/")) {
                                keyword = query.substring(firstLetter.length)
                            }
                            // profileService.search(keyword).
                        }

                    }} />
            </div>
        </>

    )
}