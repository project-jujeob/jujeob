import {Link} from "react-router-dom";

function RegisterComplete(){
    return (
        <div>
            <h1>주접회원이 되신걸 축하드립니다</h1>
            <div>
                <Link to={"/"} key={"main"}>
                    <button>홈으로</button>
                </Link>
                <Link to={"/Login"} key={"login"}>
                    <button>로그인하기</button>
                </Link>
            </div>
        </div>
    )

}

export default RegisterComplete;