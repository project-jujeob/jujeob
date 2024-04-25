import {useAuth} from "../member/Context";
import {useEffect} from "react";
import axios from "axios";


function OrderDelivery() {

    const {payload} = useAuth();
    console.log("오더딜리버리페이로드:",payload);
    const memberNo = payload ? payload.memberNo : null;

    useEffect(() => {
        if(memberNo){
            axios.get(`/api/orderDelivery`)
                .then((response)=>{
                    console.log("주문내역 가져온 값:",response);
                })
                .catch((error)=>{
                    console.log('주문내역 가져오기 실패:',error);
                })
        }
    }, []);

    return(
        <div className="OrderDeliveryContainer">
            <div>

            </div>
        </div>
    )
}

export default OrderDelivery