import React, { useEffect } from 'react';
import * as SC from "./styles";
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

export default function ListImages() {
  const [images, setImages] = React.useState([]);

  useEffect(
    () => {
      fetch("http://0.0.0.0:8000/images/list/", {
        method: 'GET',
        headers: {
          'Accept-Language': 'fr',
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((responseData) => {
          setImages(responseData);
        })
        .catch((error) => {
          console.log(error);
        })
    }, []
  )

  return (
    <SC.Wrapper style={{ height: '100%', position: 'absolute', left: '0px', width: '100%', overflow: 'hidden' }}>
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
                      List of all images
                    </SC.Title>
                  </SC.Highlighter>
                </SC.Column>
              </SC.Row>
            </SC.Column>

            {images.length === 0 &&
              <SC.Row style={{ height: "100%", overflowX: "scroll", display: "flex", alignItems: "center" }}>
                <SC.Grid style={{ height: "100%", overflowX: "scroll", display: "flex", alignItems: "center", paddingLeft: 180, paddingRight: 100 }}>
                  <SC.Title style={{ height: 400, width: 400, display: "flex", alignItems: "center", alignSelf: "center", boxShadow: "0 5px 10px rgb(0 0 0 / 0.2)", borderRadius: 20 }}>
                    Aucune image...
                  </SC.Title>
                </SC.Grid>
              </SC.Row>
            }

            {images.length > 0 &&
              <SC.Row style={{ height: "100%", overflowX: "scroll", display: "flex", alignItems: "center" }}>
                <SC.Grid style={{ height: "100%", overflowX: "scroll", display: "flex", alignItems: "center", paddingLeft: 100, paddingRight: 100 }}>
                  {images.map((image, index) => (
                    <div key={index} className="image-item" style={{ marginLeft: 80 }}>
                      <div style={{ position: "relative", height: 400, width: 400 }}>
                        <SC.UploadedImage src={"http://0.0.0.0:8000".concat('', image.image)} alt="" height="400" width="400" style={{ borderRadius: 20, backgroundColor: "white", boxShadow: "0 5px 10px rgb(0 0 0 / 0.2)" }} />
                      </div>
                    </div>
                  ))}
                </SC.Grid>
              </SC.Row>
            }

          </SC.Row>
        </SC.Content>
      </React.Fragment>
    </SC.Wrapper>
  )
}

