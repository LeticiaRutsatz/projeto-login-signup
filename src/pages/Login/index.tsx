import React from "react";
import BannerImage from "../../components/BannerImage";
import ContainerForm from "../../components/ContainerForm";
import MainConfig from "../../components/Main";
import Form from "../../components/Form";

function Login(){
    return(
        <MainConfig>
            <BannerImage />
            <ContainerForm>
                <Form mode='login'/>
            </ContainerForm>
        </MainConfig>
    )
}

export default Login;