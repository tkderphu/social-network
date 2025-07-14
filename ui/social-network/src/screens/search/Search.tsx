import { useContext, useEffect, useState } from "react";
import SearchComponent from "../../components/searchInput/SearchComponent";
import { AppContext } from "../../provider/AppProvider";



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
                    <button
                        type="button"
                        className="btn-close"
                        onClick={closeNotifications}
                    />
                </div>

                <SearchComponent
                    path='/groups'
                    placeholder={'Search groups'}
                    data={[]}
                    handleSearch={(query: string, page: number, limit: number,
                        setPageResult: (p: any) => void, setState: () => void) => {
                        // groupService.search(query, page, limit)
                        //     .then(resp => {
                        //         const pageResultResp: PageResult<GroupResp> = resp.data.data
                        //         const searchItem = pageResultResp.data.map((group: any) => {
                        //             console.log("group: ", group)
                        //             return {
                        //                 id: group.id,
                        //                 title: group.name,
                        //                 category: group.groupType,
                        //                 thumbnail: group.coverPhoto,
                        //             }
                        //         })
                        //         const pageResult: PageResult<any> = {
                        //             ...pageResultResp,
                        //             data: searchItem
                        //         }

                        //         setPageResult(pageResult)
                        //     }).catch(err => {
                        //         console.log("err search group")
                        //     })
                        //     .finally(() => {
                        //         setState()
                        //     })
                        // console.log("query searc fuch: ", query)
                        // alert("fuck you " + query)
                    }} />
            </div>
        </>

    )
}