import axios from "axios";
import {useState} from "react";

const Logout = () => {
    axios({
        method : "post",
        url : "/api/logout"

    }).then(() => {
        localStorage.removeItem("loginMemberData");

        alert("로그아웃 되었습니다")

        window.location.href = "/";
    }).catch(error => {
        console.error("로그아웃 실패함", error);
        alert("로그아웃에 실패했습니다.");
    })
}

export default Logout
