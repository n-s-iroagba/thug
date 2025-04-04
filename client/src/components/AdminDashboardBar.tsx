import React, { ReactNode, useState } from "react";
import { Offcanvas, Nav, Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPeopleGroup,
  faLocationPin,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faMeetup } from "@fortawesome/free-brands-svg-icons";
import DefaultClubMembershipList from "./DefaultMembershipList";
import ClubMembershipList from "./ClubMembershipList";
import CelebrityManager from "./CelebrityManager";
import EventList from "./EventList";
import AppliedMeetGreetList from "./AppliedMeetGreetList";
import FanList from "./FanList";

const DashboardBar: React.FC<{
  clickHandler: (component: ReactNode) => void;
  id: number;
}> = ({ clickHandler, id }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const clubMembershipItems = [
    { title: "Default Memberships", component: <DefaultClubMembershipList /> },
    {
      title: "Unverified Club Memberships",
      component: <ClubMembershipList unVerified />,
    },
    { title: "Verified Club Memberships", component: <ClubMembershipList /> },
  ];

  const celebrityItems = [
    { title: "My Verified Celebrities", component: <CelebrityManager /> },
    {
      title: "My Unverified Celebrities",
      component: <CelebrityManager isUnVerified />,
    },
  ];

  const eventItems = [
    {
      title: "UnVerified Event Bookings",
      component: <EventList isUnVerified />,
    },
    { title: "Verified Event Bookings", component: <EventList /> },
  ];

  const meetGreetItems = [
    {
      title: "UnVerified Meet And Greet Bookings",
      component: <AppliedMeetGreetList isUnVerified />,
    },
    {
      title: "Verified Meet And Greet Bookings",
      component: <AppliedMeetGreetList />,
    },
  ];

  return (
    <>
      {/* Sidebar toggle button for small screens */}
      <button
        className="btn btn-primary d-lg-none"
        onClick={handleShow}
        aria-label="Toggle Sidebar"
      >
        ☰
      </button>

      {/* Sidebar */}
      <Offcanvas show={show} onHide={handleClose} responsive="lg">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Dasboard</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {/* Main navigation links */}
            <Nav.Link
              onClick={() => clickHandler(<FanList />)}
              className="d-flex align-items-center gap-2"
            >
              <FontAwesomeIcon icon={faUser} />
              <span>Registered Fans</span>
            </Nav.Link>

            {/* Accordion Items */}
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>My Celebrities</Accordion.Header>
                <Accordion.Body>
                  {celebrityItems.map((item, index) => (
                    <Nav.Link
                      onClick={() => clickHandler(item.component)}
                      className="d-flex align-items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faPeopleGroup} />
                      <span>{item.title}</span>
                    </Nav.Link>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
         
              <Accordion.Item eventKey="1">
                <Accordion.Header>Club Memberships</Accordion.Header>
                <Accordion.Body>
                  {clubMembershipItems.map((item, index) => (
                    <Nav.Link
                      onClick={() => clickHandler(item.component)}
                      className="d-flex align-items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faPeopleGroup} />
                      <span>{item.title}</span>
                    </Nav.Link>
                  ))}
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>Meet And Greets</Accordion.Header>
                <Accordion.Body>
                  {meetGreetItems.map((item, index) => (
                    <Nav.Link
                      onClick={() => clickHandler(item.component)}
                      className="d-flex align-items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faMeetup} />
                      <span>{item.title}</span>
                    </Nav.Link>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Event Booking</Accordion.Header>
                <Accordion.Body>
                  {eventItems.map((item, index) => (
                    <Nav.Link
                      onClick={() => clickHandler(item.component)}
                      className="d-flex align-items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faLocationPin} />
                      <span>{item.title}</span>
                    </Nav.Link>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default DashboardBar;
