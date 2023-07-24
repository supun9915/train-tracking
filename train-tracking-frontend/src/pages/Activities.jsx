import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { useNavigate } from "react-router-dom";

const Activities = () => {
  const [activeTab, setActiveTab] = React.useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  const navigate = useNavigate();

  const handleViewMap = () => {
    navigate("/viewMap");
  };

  return (
    <Helmet title="Your Activities">
      <CommonSection title="Your Activities" />
      <Col lg="8" md="8" sm="8" className="mb-3">
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => toggle('1')}
            >
              On Going Activities
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => toggle('2')}
            >
              Completed Activities
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
          <Row>
              <Col sm="8">
                <Card body>
                  <CardTitle>On going Activities1</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button color="primary"onClick={handleViewMap}>View Map</Button>{' '}
    
    
                </Card>
              </Col>
              <Col sm="8">
                <Card body>
                  <CardTitle>On going Activities 2</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button color="primary"onClick={handleViewMap}>View Map</Button>{' '}
    
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="8">
                <Card body>
                  <CardTitle>Completed 1</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button color="success"onClick={handleViewMap}>View Map</Button>{' '}
    
     
                </Card>
              </Col>
              <Col sm="8">
                <Card body>
                  <CardTitle>Completed 2</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button color="success"onClick={handleViewMap}>View Map</Button>{' '}
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
      </Col>
    </Helmet>
    
  );
};

export default Activities;
