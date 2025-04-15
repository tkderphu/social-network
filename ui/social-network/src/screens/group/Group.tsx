import { useEffect, useRef } from 'react'
import { Link, Outlet, replace, useLocation, useNavigate } from 'react-router'
import NewFeed from '../feed/NewFeed'
import './Group.css'
function Group() {
    const navigate = useNavigate();
    const hasRedirected = useRef(false); // ✅ only redirect once
    const location = useLocation()
    useEffect(() => {
        if(location.pathname.includes("feed")) {
            if (!hasRedirected.current) {
                hasRedirected.current = true;
                navigate('feed', { replace: true });
            }
        }
    }, []);

    return (
        <div className="row mt-3 m-1">
            <div className="col-3 sticky-sidebar ">
                <h4>Groups</h4>
                <input type={'search'} className='w-100 p-2 mb-2' style={{ borderRadius: "20px", fontSize: "18px" }} />
                <Link to={'feed'} className="w-100 text-left p-3 " style={{ border: "none" }}>Your feed</Link>
                <button className="w-100 text-left p-3" style={{ border: "none" }}>Discover</button>
                <button className="w-100 text-left p-3" style={{ border: "none" }}>Your groups</button>
                <button className='w-100 mt-2 p-2 create-group'>Create group</button>
                <hr style={{ backgroundColor: "red" }} />
                <h4>Groups you've joined</h4>
                <div >
                    <Link to={"test"} className='short-cut-group d-flex align-items-center mb-3'>
                        <img src='https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/387083780_1445088196067626_8190024267265276972_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=2285d6&_nc_eui2=AeEyFKuDaIZFmGd8-Aj_cC_iKsTOiuND444qxM6K40Pjjia9H6zg_Rd2ZHxh5SKaWO6NBuAHp21E-FRP1D1e055g&_nc_ohc=99xXPUR4tGUQ7kNvgGuovBZ&_nc_oc=AdkjJHlFhEoPaHE-zp6BeRoAtUlk2Vw_L4U_l6VjN0WazuClvuV4xJwdT7Mvh1kTOJxw4zjx3p3KgNpnkSAc4pCB&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=76y2ewg97NdUuY02ZBLGUQ&oh=00_AYEUfbJrLwhMtewVW7CsseobxJqkIrAcUHQ_ClK_EAsT6A&oe=67E34FEF'
                            width={"60px"}
                        />
                        <div className='mx-3' style={{ fontSize: "23px" }}>Hang Mu</div>
                    </Link>

                </div>
            </div>
            {/* <div className='col-1'></div> */}
            <div className="col-9">
                <Outlet />
            </div>
            {/* <div className="col-3 sticky-sidebar ">
               <div className='d-flex justify-content-between'>
               <h4>Contacts</h4>
               <button>Search</button>
               </div>
                <a href='hhi' className='short-cut-group d-flex align-items-center mb-3'>
                    <img src='https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/387083780_1445088196067626_8190024267265276972_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=2285d6&_nc_eui2=AeEyFKuDaIZFmGd8-Aj_cC_iKsTOiuND444qxM6K40Pjjia9H6zg_Rd2ZHxh5SKaWO6NBuAHp21E-FRP1D1e055g&_nc_ohc=99xXPUR4tGUQ7kNvgGuovBZ&_nc_oc=AdkjJHlFhEoPaHE-zp6BeRoAtUlk2Vw_L4U_l6VjN0WazuClvuV4xJwdT7Mvh1kTOJxw4zjx3p3KgNpnkSAc4pCB&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=76y2ewg97NdUuY02ZBLGUQ&oh=00_AYEUfbJrLwhMtewVW7CsseobxJqkIrAcUHQ_ClK_EAsT6A&oe=67E34FEF'
                        width={"50px" } className='rounded-circle'
                    />
                    <div className='mx-3' style={{ fontSize: "19px" }}>Hang Mu</div>
                </a>
                <a href='hhi' className='short-cut-group d-flex align-items-center mb-3'>
                    <img src='https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/387083780_1445088196067626_8190024267265276972_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=2285d6&_nc_eui2=AeEyFKuDaIZFmGd8-Aj_cC_iKsTOiuND444qxM6K40Pjjia9H6zg_Rd2ZHxh5SKaWO6NBuAHp21E-FRP1D1e055g&_nc_ohc=99xXPUR4tGUQ7kNvgGuovBZ&_nc_oc=AdkjJHlFhEoPaHE-zp6BeRoAtUlk2Vw_L4U_l6VjN0WazuClvuV4xJwdT7Mvh1kTOJxw4zjx3p3KgNpnkSAc4pCB&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=76y2ewg97NdUuY02ZBLGUQ&oh=00_AYEUfbJrLwhMtewVW7CsseobxJqkIrAcUHQ_ClK_EAsT6A&oe=67E34FEF'
                        width={"50px" } className='rounded-circle'
                    />
                    <div className='mx-3' style={{ fontSize: "19px" }}>Hang Mu</div>
                </a>
                <a href='hhi' className='short-cut-group d-flex align-items-center mb-3'>
                    <img src='https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/387083780_1445088196067626_8190024267265276972_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=2285d6&_nc_eui2=AeEyFKuDaIZFmGd8-Aj_cC_iKsTOiuND444qxM6K40Pjjia9H6zg_Rd2ZHxh5SKaWO6NBuAHp21E-FRP1D1e055g&_nc_ohc=99xXPUR4tGUQ7kNvgGuovBZ&_nc_oc=AdkjJHlFhEoPaHE-zp6BeRoAtUlk2Vw_L4U_l6VjN0WazuClvuV4xJwdT7Mvh1kTOJxw4zjx3p3KgNpnkSAc4pCB&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=76y2ewg97NdUuY02ZBLGUQ&oh=00_AYEUfbJrLwhMtewVW7CsseobxJqkIrAcUHQ_ClK_EAsT6A&oe=67E34FEF'
                        width={"50px" } className='rounded-circle'
                    />
                    <div className='mx-3' style={{ fontSize: "19px" }}>Hang Mu</div>
                </a>
                <a href='hhi' className='short-cut-group d-flex align-items-center mb-3'>
                    <img src='https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/387083780_1445088196067626_8190024267265276972_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=2285d6&_nc_eui2=AeEyFKuDaIZFmGd8-Aj_cC_iKsTOiuND444qxM6K40Pjjia9H6zg_Rd2ZHxh5SKaWO6NBuAHp21E-FRP1D1e055g&_nc_ohc=99xXPUR4tGUQ7kNvgGuovBZ&_nc_oc=AdkjJHlFhEoPaHE-zp6BeRoAtUlk2Vw_L4U_l6VjN0WazuClvuV4xJwdT7Mvh1kTOJxw4zjx3p3KgNpnkSAc4pCB&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=76y2ewg97NdUuY02ZBLGUQ&oh=00_AYEUfbJrLwhMtewVW7CsseobxJqkIrAcUHQ_ClK_EAsT6A&oe=67E34FEF'
                        width={"50px" } className='rounded-circle'
                    />
                    <div className='mx-3' style={{ fontSize: "19px" }}>Hang Mu</div>
                </a>
                <a href='hhi' className='short-cut-group d-flex align-items-center mb-3'>
                    <img src='https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/387083780_1445088196067626_8190024267265276972_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=2285d6&_nc_eui2=AeEyFKuDaIZFmGd8-Aj_cC_iKsTOiuND444qxM6K40Pjjia9H6zg_Rd2ZHxh5SKaWO6NBuAHp21E-FRP1D1e055g&_nc_ohc=99xXPUR4tGUQ7kNvgGuovBZ&_nc_oc=AdkjJHlFhEoPaHE-zp6BeRoAtUlk2Vw_L4U_l6VjN0WazuClvuV4xJwdT7Mvh1kTOJxw4zjx3p3KgNpnkSAc4pCB&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=76y2ewg97NdUuY02ZBLGUQ&oh=00_AYEUfbJrLwhMtewVW7CsseobxJqkIrAcUHQ_ClK_EAsT6A&oe=67E34FEF'
                        width={"50px" } className='rounded-circle'
                    />
                    <div className='mx-3' style={{ fontSize: "19px" }}>Hang Mu</div>
                </a>
                <a href='hhi' className='short-cut-group d-flex align-items-center mb-3'>
                    <img src='https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/387083780_1445088196067626_8190024267265276972_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=2285d6&_nc_eui2=AeEyFKuDaIZFmGd8-Aj_cC_iKsTOiuND444qxM6K40Pjjia9H6zg_Rd2ZHxh5SKaWO6NBuAHp21E-FRP1D1e055g&_nc_ohc=99xXPUR4tGUQ7kNvgGuovBZ&_nc_oc=AdkjJHlFhEoPaHE-zp6BeRoAtUlk2Vw_L4U_l6VjN0WazuClvuV4xJwdT7Mvh1kTOJxw4zjx3p3KgNpnkSAc4pCB&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=76y2ewg97NdUuY02ZBLGUQ&oh=00_AYEUfbJrLwhMtewVW7CsseobxJqkIrAcUHQ_ClK_EAsT6A&oe=67E34FEF'
                        width={"50px" } className='rounded-circle'
                    />
                    <div className='mx-3' style={{ fontSize: "19px" }}>Hang Mu</div>
                </a>
                <hr style={{ backgroundColor: "red" }} />

                <h4>Group chats</h4>
                <a href='hhi' className='short-cut-group d-flex align-items-center mb-3'>
                    <img src='https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/387083780_1445088196067626_8190024267265276972_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=2285d6&_nc_eui2=AeEyFKuDaIZFmGd8-Aj_cC_iKsTOiuND444qxM6K40Pjjia9H6zg_Rd2ZHxh5SKaWO6NBuAHp21E-FRP1D1e055g&_nc_ohc=99xXPUR4tGUQ7kNvgGuovBZ&_nc_oc=AdkjJHlFhEoPaHE-zp6BeRoAtUlk2Vw_L4U_l6VjN0WazuClvuV4xJwdT7Mvh1kTOJxw4zjx3p3KgNpnkSAc4pCB&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=76y2ewg97NdUuY02ZBLGUQ&oh=00_AYEUfbJrLwhMtewVW7CsseobxJqkIrAcUHQ_ClK_EAsT6A&oe=67E34FEF'
                        width={"50px" } className='rounded-circle'
                    />
                    <div className='mx-3' style={{ fontSize: "19px" }}>Hang Mu</div>
                </a>
                <a href='hhi' className='short-cut-group d-flex align-items-center mb-3'>
                    <img src='https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/387083780_1445088196067626_8190024267265276972_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=2285d6&_nc_eui2=AeEyFKuDaIZFmGd8-Aj_cC_iKsTOiuND444qxM6K40Pjjia9H6zg_Rd2ZHxh5SKaWO6NBuAHp21E-FRP1D1e055g&_nc_ohc=99xXPUR4tGUQ7kNvgGuovBZ&_nc_oc=AdkjJHlFhEoPaHE-zp6BeRoAtUlk2Vw_L4U_l6VjN0WazuClvuV4xJwdT7Mvh1kTOJxw4zjx3p3KgNpnkSAc4pCB&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=76y2ewg97NdUuY02ZBLGUQ&oh=00_AYEUfbJrLwhMtewVW7CsseobxJqkIrAcUHQ_ClK_EAsT6A&oe=67E34FEF'
                        width={"50px" } className='rounded-circle'
                    />
                    <div className='mx-3' style={{ fontSize: "19px" }}>Hang Mu</div>
                </a>
                <a href='hhi' className='short-cut-group d-flex align-items-center mb-3'>
                    <img src='https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/387083780_1445088196067626_8190024267265276972_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=2285d6&_nc_eui2=AeEyFKuDaIZFmGd8-Aj_cC_iKsTOiuND444qxM6K40Pjjia9H6zg_Rd2ZHxh5SKaWO6NBuAHp21E-FRP1D1e055g&_nc_ohc=99xXPUR4tGUQ7kNvgGuovBZ&_nc_oc=AdkjJHlFhEoPaHE-zp6BeRoAtUlk2Vw_L4U_l6VjN0WazuClvuV4xJwdT7Mvh1kTOJxw4zjx3p3KgNpnkSAc4pCB&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=76y2ewg97NdUuY02ZBLGUQ&oh=00_AYEUfbJrLwhMtewVW7CsseobxJqkIrAcUHQ_ClK_EAsT6A&oe=67E34FEF'
                        width={"50px" } className='rounded-circle'
                    />
                    <div className='mx-3' style={{ fontSize: "19px" }}>Hang Mu</div>
                </a>
            </div> */}
        </div>
    )
}
export default Group