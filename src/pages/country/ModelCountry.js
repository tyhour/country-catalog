import React from "react";
import { Checkbox, Col, Form, Modal, Row, Table } from "rsuite";
import { IndexCell } from "./components";
import { convertLangObjectToArrObject } from "./utils";

const { Column, HeaderCell, Cell } = Table;

const objectToArr = (value) => {
  return value ? Object.keys(value) : [];
};

const ModelCountry = ({ rowData, dataKey, ...props }) => {
  const idd = rowData?.idd;

  //IDD
  let code = "";
  if (idd.suffixes?.length === 1) {
    code = `${idd?.root}${idd?.suffixes[0]}`;
  } else
    code = (idd?.suffixes ?? [])
      .map((suffix) => `${idd.root}(${suffix})`)
      .join(", ");

  //Native Name
  let nativeName = rowData?.name?.nativeName
    ? rowData?.name?.nativeName[objectToArr(rowData?.name?.nativeName)[0]]
    : "";

  //Currencies
  let currencies = objectToArr(rowData?.currencies);
  if (currencies.length > 0) {
    currencies = currencies.map(
      (cur) =>
        `${rowData?.currencies[cur]?.name}(${rowData?.currencies[cur]?.symbol})`
    );
  }

  //Languages
  let languages = objectToArr(rowData?.languages);
  if (languages.length > 0) {
    languages = languages.map((lang) => rowData?.languages[lang]);
  }

  //Damonsys
  let demonyms = objectToArr(rowData?.demonyms);
  if (demonyms.length > 0) {
    demonyms = demonyms.map(
      (dem) => `F=${rowData?.demonyms[dem]?.f} | M=${rowData?.demonyms[dem]?.m}`
    );
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Cell {...props} style={{ padding: 0 }}>
      <div
        className="rs-table-cell-content"
        style={{
          cursor: "pointer",
        }}
        onClick={handleOpen}
      >
        {rowData?.name?.official}
      </div>
      <Modal overflow={true} size={"lg"} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Country Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="overflow-x">
            <Form fluid>
              <Row className="show-grid">
                <Col xs={3}>
                  <div>
                    <p>Flag</p>
                    <div className="flags-detail">
                      <img
                        src={rowData?.flags?.png}
                        width="75"
                        height="75"
                        style={{
                          objectFit: "contain",
                        }}
                        alt="Country Catelog"
                      />
                    </div>
                  </div>
                </Col>
                {rowData?.coatOfArms?.png && (
                  <Col xs={3}>
                    <div>
                      <p>Coat of Arms</p>
                      <div className="flags-detail">
                        <img
                          src={rowData?.coatOfArms?.png}
                          width="75"
                          height="75"
                          style={{
                            objectFit: "contain",
                          }}
                          alt="Country Catelog"
                        />
                      </div>
                    </div>
                  </Col>
                )}
              </Row>
              <br />
              <Row className="show-grid">
                <Col xs={5}>
                  <Form.Group>
                    <Form.ControlLabel>Common Name</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={rowData?.name?.common}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group>
                    <Form.ControlLabel>Official Name</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={rowData?.name?.official}
                    />
                  </Form.Group>
                </Col>
                <Col xs={8}>
                  <Form.Group>
                    <Form.ControlLabel>Native Name</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={`${nativeName?.official} (${nativeName?.common})`}
                    />
                  </Form.Group>
                </Col>
                <Col xs={5}>
                  <Form.Group>
                    <Form.ControlLabel>Capital</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={rowData?.capital?.join(", ")}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <br />
              <Row className="show-grid">
                <Col xs={3}>
                  <Form.Group>
                    <Form.ControlLabel>Region</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={rowData?.region}
                    />
                  </Form.Group>
                </Col>
                <Col xs={3}>
                  <Form.Group>
                    <Form.ControlLabel>Sub Region</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={rowData?.subregion}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group>
                    <Form.ControlLabel>Native Name</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={
                        rowData?.name?.nativeName
                          ? rowData?.name?.nativeName[
                              Object.keys(rowData?.name?.nativeName)[0]
                            ]["official"]
                          : ""
                      }
                    />
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group>
                    <Form.ControlLabel>Alt Spellings</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={(rowData?.altSpellings ?? []).join(", ")}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <br />
              <Row className="show-grid">
                <Col xs={2}>
                  <Form.Group>
                    <Form.ControlLabel>Area</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={rowData?.area}
                    />
                  </Form.Group>
                </Col>
                <Col xs={3}>
                  <Form.Group>
                    <Form.ControlLabel>Calling Code</Form.ControlLabel>
                    <Form.Control name="dummy" readOnly={true} value={code} />
                  </Form.Group>
                </Col>
                <Col xs={3}>
                  <Form.Group>
                    <Form.ControlLabel>TL Domain</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={(rowData?.tld ?? [])[0]}
                    />
                  </Form.Group>
                </Col>
                <Col xs={2}>
                  <Form.Group>
                    <Form.ControlLabel>CCA2</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={rowData?.cca2}
                    />
                  </Form.Group>
                </Col>
                <Col xs={2}>
                  <Form.Group>
                    <Form.ControlLabel>CCA3</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={rowData?.cca3}
                    />
                  </Form.Group>
                </Col>
                <Col xs={2}>
                  <Form.Group>
                    <Form.ControlLabel>CCN3</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={rowData?.ccn3}
                    />
                  </Form.Group>
                </Col>
                <Col xs={2}>
                  <Form.Group>
                    <Form.ControlLabel>CIOC</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={rowData?.cioc}
                    />
                  </Form.Group>
                </Col>
                <Col xs={8}>
                  <Form.Group>
                    <Form.ControlLabel>Currency</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={currencies.join(", ")}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <br />
              <Row className="show-grid">
                <Col xs={3}>
                  <Form.Group>
                    <Form.ControlLabel>Independent</Form.ControlLabel>
                    <Checkbox
                      name="dummy"
                      checked={rowData?.independent}
                    ></Checkbox>
                  </Form.Group>
                </Col>
                <Col xs={3}>
                  <Form.Group>
                    <Form.ControlLabel>Unmember</Form.ControlLabel>
                    <Checkbox
                      name="dummy"
                      checked={rowData?.unMember}
                    ></Checkbox>
                  </Form.Group>
                </Col>
                <Col xs={3}>
                  <Form.Group>
                    <Form.ControlLabel>Land Locks</Form.ControlLabel>
                    <Checkbox
                      name="dummy"
                      checked={rowData?.landlocked}
                    ></Checkbox>
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Group>
                    <Form.ControlLabel>Languages</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={languages.join(", ")}
                    />
                  </Form.Group>
                </Col>
                <Col xs={5}>
                  <Form.Group>
                    <Form.ControlLabel>Status</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={rowData?.status}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group>
                    <Form.ControlLabel>Borders</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={(rowData?.borders ?? []).join(", ")}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <br />
              <Row className="show-grid">
                <Col xs={6}>
                  <Form.Group>
                    <Form.ControlLabel>Demonym</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={demonyms.join(", ")}
                    />
                  </Form.Group>
                </Col>
                <Col xs={3}>
                  <Form.Group>
                    <Form.ControlLabel>Population</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={rowData?.population}
                    />
                  </Form.Group>
                </Col>
                <Col xs={3}>
                  <Form.Group>
                    <Form.ControlLabel>Time Zones</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={rowData?.timezones.join(", ")}
                    />
                  </Form.Group>
                </Col>
                <Col xs={3}>
                  <Form.Group>
                    <Form.ControlLabel>Continents</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={rowData?.continents.join(", ")}
                    />
                  </Form.Group>
                </Col>
                <Col xs={3}>
                  <Form.Group>
                    <Form.ControlLabel>Start of Week</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={rowData?.startOfWeek}
                    />
                  </Form.Group>
                </Col>
                <Col xs={3}>
                  <Form.Group>
                    <Form.ControlLabel>Car Sign</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={(rowData?.car?.signs ?? []).join(", ")}
                    />
                  </Form.Group>
                </Col>
                <Col xs={3}>
                  <Form.Group>
                    <Form.ControlLabel>Car Side</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={rowData?.car?.side}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <br />
              <Row className="show-grid">
                <Col xs={2}>
                  <Form.Group>
                    <Form.ControlLabel>FIFA</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={rowData?.fifa}
                    />
                  </Form.Group>
                </Col>
                <Col xs={7}>
                  <Form.Group>
                    <Form.ControlLabel>Maps</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={rowData?.maps?.googleMaps}
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        window.open("rowData?.maps?.googleMaps", "_blank")
                      }
                    />
                  </Form.Group>
                </Col>
                <Col xs={7}>
                  <Form.Group>
                    <Form.ControlLabel>Street Maps</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={rowData?.maps?.openStreetMaps}
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        window.open("rowData?.maps?.googleMaps", "_blank")
                      }
                    />
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Group>
                    <Form.ControlLabel>Latitude & Longitude</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={rowData?.latlng.join(", ")}
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps/place/${rowData?.latlng.join(
                            ","
                          )}`,
                          "_blank"
                        )
                      }
                    />
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Group>
                    <Form.ControlLabel>Capital</Form.ControlLabel>
                    <Form.Control
                      name="dummy"
                      readOnly={true}
                      value={(rowData?.capitalInfo?.latlng ?? []).join(", ")}
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps/place/${(
                            rowData?.capitalInfo?.latlng ?? []
                          ).join(",")}`,
                          "_blank"
                        )
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <br />
            </Form>
            <Table
              autoHeight
              data={convertLangObjectToArrObject(rowData?.translations ?? [])}
            >
              <Column width={80} align="center">
                <HeaderCell>No</HeaderCell>
                <IndexCell />
              </Column>
              <Column width={150}>
                <HeaderCell>Languages</HeaderCell>
                <Cell dataKey="languageCode" />
              </Column>
              <Column width={250} flexGrow={1}>
                <HeaderCell>Official Name</HeaderCell>
                <Cell dataKey="officialName" />
              </Column>
              <Column width={250} flexGrow={1}>
                <HeaderCell>Common Name</HeaderCell>
                <Cell dataKey="commonName" />
              </Column>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </Cell>
  );
};

export default ModelCountry;
