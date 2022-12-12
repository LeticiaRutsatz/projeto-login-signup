import React from "react";
import BannerImage from "../../components/BannerImage";
import ContainerForm from "../../components/ContainerForm";
import MainConfig from "../../components/Main";
import Form from "../../components/Form";

function Signup(){
    return(
        <MainConfig>
            <BannerImage />
            <ContainerForm>
                <Form mode='signup'/>
            </ContainerForm>
        </MainConfig>
    )
}

export default Signup;