import './Profile.css'
import {useState} from "react";

function Profile() {

    const [profile, setProfile] = useState()



    return(
        <div className={"MemberInfo"}>
            <div>
                ID : <input name={"title"}/>
                PW : <input type={"password"}/>
                NICKNAME : <input/>
                NAME : <input/>
                EMAIL : <input type={"email"}/>
                PHONE : <input/>
                ADDRESS : <input/>
            </div>
            <br/>
            <div>
                <button>수정</button>
                <button>취소</button>
            </div>
        </div>

    )
}

export default Profile
