import styled from "styled-components";
import image from '../../assets/login.jpg'

const BannerImage = styled.div`
    height: 100vh;
    background-image: url(${image});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`

export default BannerImage;