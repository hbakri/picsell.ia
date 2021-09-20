import React from 'react';
import * as SC from "./styles";
import ImageUploading from 'react-images-uploading';
import { ReactComponent as Check } from '../../assets/check.svg';
import { ReactComponent as Warning } from '../../assets/warning.svg';
import { ReactComponent as Pencil } from '../../assets/pencil.svg';
import { ReactComponent as Remove } from '../../assets/remove.svg';
import { ReactComponent as Gallery } from '../../assets/image-gallery.svg';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
// import Error from "../assets/error.svg";
// import Success from "../../assets/success.svg";
// import Warning from "../assets/warning-2.svg";


function UploadImages() {
    const [images, setImages] = React.useState([]);
    const [indexErrors, setIndexErrors] = React.useState([]);
    const [successMessage, setSuccessMessage] = React.useState(false);

    const onChange = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
        setIndexErrors([]);
        setSuccessMessage(false)
    };

    const onSubmit = () => {
        // Convert dict datas into a form data
        const formData = new FormData();
        images.forEach((item, index) => {
            formData.append(index, item['file']);
        })

        const options = {
            method: 'POST',
            headers: {
                'Accept-Language': 'fr',
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        };

        // Remove 'Content-Type' header to allow browser to add
        // along with the correct 'boundary'
        delete options.headers['Content-Type'];

        fetch("http://0.0.0.0:8000/images/list/", options)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
                if (responseData.success) {
                    setImages([])
                    setSuccessMessage(true)
                } else {
                    console.log(responseData.error_indices)
                    setIndexErrors(responseData.error_indices)
                    setSuccessMessage(false)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    };

    return (
        <SC.Wrapper style={{ height: '100%', position: 'absolute', left: '0px', width: '100%', overflow: 'hidden' }}>
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={100}
                dataURLKey="data_url"
                acceptType={['jpg', 'png']}
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    <React.Fragment>
                        <SC.Content>
                            <SC.Row style={{ height: "100%" }}>
                                <SC.Column style={{ height: "100%", alignItems: "center", alignSelf: "center" }}>
                                    <SC.Row style={{ width: "40%", alignSelf: "center", position: "absolute", top: "10%", left: "25%", transform: "translate(-50%, -50%)" }}>
                                        <SC.Image src={logo} alt="" style={{ marginRight: 30 }} />
                                        <SC.Column>
                                            <SC.Title>
                                                Picsellia IoT
                                            </SC.Title>
                                        </SC.Column>
                                        <SC.Column style={{ marginLeft: 130 }}>
                                            <SC.Highlighter>
                                                <SC.Title style={{ fontSize: 25, fontWeight: 800 }}>
                                                    <Link to="/" style={{ textDecoration: "none", color: "black" }}>Upload</Link>
                                                </SC.Title>
                                            </SC.Highlighter>
                                        </SC.Column>
                                        <SC.Column>
                                            <SC.Highlighter>
                                                <SC.Title style={{ fontSize: 25, fontWeight: 800 }}>
                                                    <Link to="/list" style={{ textDecoration: "none", color: "black" }}>List</Link>
                                                </SC.Title>
                                            </SC.Highlighter>
                                        </SC.Column>
                                    </SC.Row>

                                    <SC.Row style={{ position: "absolute", top: "25%", left: "60%", transform: "translate(-50%, -50%)" }}>
                                        <SC.Column>
                                            <SC.Highlighter>
                                                <SC.Title>
                                                    Upload images
                                                </SC.Title>
                                            </SC.Highlighter>
                                        </SC.Column>
                                    </SC.Row>

                                    <div style={{ height: 600 }} />

                                    <SC.UploadDiv
                                        style={{ height: 400 }}
                                        onClick={onImageUpload}
                                        {...dragProps}>
                                        <SC.Column style={{ height: "100%", fontWeight: "bold", alignItems: "center" }}>
                                            <Gallery style={{ width: 50, height: 50, marginBottom: 30 }} />
                                            Drag and drop or browse your images
                                        </SC.Column>
                                    </SC.UploadDiv>

                                    {indexErrors.length > 0 &&
                                        <div style={{ display: "flex", flexDirection: "column", top: "90%", left: "25%", position: "absolute", transform: "translate(-50%, -50%)" }}>
                                        <div style={{ display: "flex", flexDirection: "row", zIndex: 2, height: 60, backgroundColor: "white", padding: 10, borderRadius: 10, boxShadow: "0 5px 10px rgb(0 0 0 / 0.2)" }}>
                                            <div style={{ width: 60, height: 60, borderRadius: 30, boxShadow: "0 5px 10px rgb(0 0 0 / 0.2)" }}>
                                                <Warning style={{ width: 60, height: 60, backgroundColor: "white", borderRadius: 30 }} />
                                            </div>
                                            <div style={{ alignSelf: "center", marginLeft: 15, fontWeight: "bold" }}>
                                                One or more images are already in the database, or there is a similar one. <br/> Please check all images and delete duplicated ones.
                                            </div>
                                        </div>
                                        </div>
                                    }

                                    {successMessage === true &&
                                        <div style={{ display: "flex", flexDirection: "column", top: "90%", left: "25%", position: "absolute", transform: "translate(-50%, -50%)" }}>
                                        <div style={{ display: "flex", flexDirection: "row", zIndex: 2, height: 60, backgroundColor: "white", padding: 10, borderRadius: 10, boxShadow: "0 5px 10px rgb(0 0 0 / 0.2)" }}>
                                            <div style={{ width: 60, height: 60, borderRadius: 30, boxShadow: "0 5px 10px rgb(0 0 0 / 0.2)" }}>
                                                <Check style={{ width: 60, height: 60, backgroundColor: "white", borderRadius: 30 }} />
                                            </div>
                                            <div style={{ alignSelf: "center", marginLeft: 15, fontWeight: "bold" }}>
                                                All images have been uploaded successfully !
                                            </div>
                                        </div>
                                        </div>
                                    }

                                    {imageList.length > 0 &&
                                        <div style={{ display: "flex", flexDirection: "column", top: "80%", left: "25%", position: "absolute", transform: "translate(-50%, -50%)" }}>
                                            <SC.DeleteButton style={{ background: "linear-gradient(120deg, #FFA69E 0%, #FF686B 100%)", position: "relative" }} onClick={onSubmit}>
                                                Send all images to the server
                                            </SC.DeleteButton>
                                        </div>
                                    }
                                </SC.Column>

                                <SC.Column style={{ background: "linear-gradient(120deg, #FFA69E 0%, #FF686B 100%)", borderRadius: "60px 0 0 60px", height: "100%", overflowY: "scroll" }}>
                                    <div style={{ height: "100%", overflowX: "scroll", paddingTop: 100, paddingBottom: 100, display: "flex", alignItems: "center" }}>
                                        <SC.Grid>
                                            {imageList.map((image, index) => (
                                                <div key={index} className="image-item" style={{ marginLeft: 80 }}>
                                                    <div style={{ position: "relative", height: 400, width: 400 }}>
                                                        <SC.UploadedImage src={image['data_url']} alt="" height="400" width="400" style={{ borderRadius: 20, backgroundColor: "white", boxShadow: "0 5px 10px rgb(0 0 0 / 0.2)" }} />

                                                        {indexErrors.includes(index.toString()) &&
                                                            <div style={{ display: "flex", flexDirection: "row", zIndex: 2, height: 60, position: "absolute", top: 10, left: 10, right: 10, backgroundColor: "white", padding: 10, borderRadius: 10, boxShadow: "0 5px 10px rgb(0 0 0 / 0.2)" }}>
                                                                <div style={{ width: 60, height: 60, borderRadius: 30, boxShadow: "0 5px 10px rgb(0 0 0 / 0.2)" }}>
                                                                    <Warning style={{ width: 60, height: 60, backgroundColor: "white", borderRadius: 30 }} />
                                                                </div>
                                                                <div style={{ alignSelf: "center", marginLeft: 15, fontWeight: "bold" }}>
                                                                    This image is already in the database, or there is a similar one.
                                                                </div>
                                                            </div>
                                                        }

                                                        <SC.IconButton onClick={() => onImageUpdate(index)} style={{ zIndex: 2, width: 60, height: 60, position: "absolute", bottom: 10, right: 80, borderRadius: 30, boxShadow: "0 5px 10px rgb(0 0 0 / 0.2)" }}>
                                                            <Pencil style={{ width: 60, height: 60, backgroundColor: "white", borderRadius: 30 }} />
                                                        </SC.IconButton>

                                                        <SC.IconButton onClick={() => onImageRemove(index)} style={{ zIndex: 2, width: 60, height: 60, position: "absolute", bottom: 10, right: 10, borderRadius: 30, boxShadow: "0 5px 10px rgb(0 0 0 / 0.2)" }}>
                                                            <Remove style={{ width: 60, height: 60, backgroundColor: "white", borderRadius: 30 }} />
                                                        </SC.IconButton>
                                                    </div>
                                                </div>
                                            ))}
                                        </SC.Grid>
                                    </div>
                                </SC.Column>

                            </SC.Row>
                        </SC.Content>
                    </React.Fragment>
                )}
            </ImageUploading>
        </SC.Wrapper>
    );
}

export default UploadImages;