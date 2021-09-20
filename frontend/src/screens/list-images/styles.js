import styled from "styled-components";
import Colors from "../../constants/colors";

export const Wrapper = styled.div`
  background-color: #FAFAFA;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 45px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;



export const Image = styled.img`
  background-color: #FAFAFA;
  width: 70px;
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-self: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-basis: 100%;
  flex: 1;
`;

export const ImageButton = styled.a`
    background-color: ${Colors.saumon_dark};
    border-radius:28px;
    display:inline-block;
    cursor:pointer;
    color:#ffffff;
    font-weight: bold;
    font-family:Arial;
    font-size:17px;
    padding: 10px 16px;
    text-decoration:none;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    :hover {
        background-color: ${Colors.saumon_light};
    };
    :active {
        position:relative;
        top:1px;
    };
`;

export const IconButton = styled.a`
    cursor: pointer;
    background-color: none;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;

export const UploadDiv = styled.div`
position: absolute;
top: 50%;
left: 25%;
transform: translate(-50%, -50%);
background-color:#ffffff;
    cursor: pointer;
    border-style: dashed;
    border-color: ${Colors.saumon_light};
    border-radius: 30px;
    width: 398px;
    height: 398px;
    box-shadow: 0 5px 10px rgb(0 0 0 / 0.2);
`;

export const DeleteButton = styled.a`
position: absolute;
top: 75%;
left: 25%;
transform: translate(-50%, -50%);
    background: linear-gradient(120deg, #FFA69E 80%, #FF686B 100%);
    border-radius:28px;
    display:inline-block;
    cursor:pointer;
    color:#ffffff;
    font-weight: bold;
    font-family:Arial;
    font-size:17px;
    padding: 16px 0;
    text-decoration:none;
    box-shadow: 0 5px 10px rgb(0 0 0 / 0.2);
    width: 400px;
    text-align: center;
    margin-top: 30px;
`;

export const Highlighter = styled.div`
    align-self: flex-start;
    background: linear-gradient(120deg, #FFA69E 0%, #FF686B 100%);
    background-repeat: no-repeat;
    background-size: 60% 30%;
    background-position: 100% 100%;
`;

export const Title = styled.div`
    align-self: flex-start;
    text-align: center;
    justify-content: center;
    font-weight: 700;
    font-size: 35px;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(69, 1fr);
    grid-gap: 15px;
    align-self: center;
`;

export const UploadedImage = styled.img`
    position: relative;
    z-index: 1;
    object-fit: cover;
`;