import React, { ReactNode, useState } from "react";
import { Offcanvas, Nav, Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCommentDots,
  faPhoneAlt,
  faPeopleGroup,
  faLocationPin,
} from "@fortawesome/free-solid-svg-icons";
import { faMeetup } from "@fortawesome/free-brands-svg-icons";

import NeverToBe from "./NeverToBe";
import Profile from "./Profile";
import EventsGroupedByCelebrity from "./EventsGroupedByCelebrity";
import AppliedMeetGreetGroupedByCelebrity from "./AppliedMeetGreetGroupedByCelebrity";
import MessagesGroupedByCelebrity from "./MessagesGroupedByCelebrity";
import SubscriptionsGroupedByCelebrity from "./SubscriptionGroupedByCelebrity";
import ApplyClubMembership from "./ApplyClubMembership";
import ApplyEvent from "./ApplyEvent";
import ApplyMeetGreet from "./ApplyMeetGreet";

const DashboardBar: React.FC<{ clickHandler: (component: ReactNode) => void; id: number; }> = ({ clickHandler,id }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const clubMembershipItems = [
    { title: "My Club Membership", component: <SubscriptionsGroupedByCelebrity  id = {id}/> },
    { title: "Apply for Club Membership", component: <ApplyClubMembership id ={id}/> },
    { title: "My Pending Club Applications", component: <SubscriptionsGroupedByCelebrity  isPending id ={id}/> },
  ];

  const meetAndGreetItems = [
    { title: "My Scheduled Meet And Greets", component:  <AppliedMeetGreetGroupedByCelebrity id ={id}/> },
    { title: "Apply for Meet And Greets", component:<ApplyMeetGreet id = {id}/> },
    { title: "My Pending Meet And Greet", component: <AppliedMeetGreetGroupedByCelebrity isPending id ={id}/> },
      { title: "My Past Meet And Greets", component: <NeverToBe title="Meet an Greet"/> },
  ];

  const eventItems = [
    { title: "My Scheduled Event Bookings", component: <EventsGroupedByCelebrity id = {id}/> },
    { title: "Apply for Event Bookings", component: <ApplyEvent id ={id}/> },
    { title: "My Pending Event Booking Applications", component: <EventsGroupedByCelebrity  isPending id ={id}/> },
      { title: "My Past Event Booking", component: <NeverToBe title="Events"/> },
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
            <Nav.Link onClick={() => clickHandler(<Profile id={id}/>)} className="d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faHome} />
              <span>Profile</span>
            </Nav.Link>
            <Nav.Link onClick={() => clickHandler(<MessagesGroupedByCelebrity id={id}/>)} className="d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faCommentDots} />
              <span>My Shoutouts</span>
            </Nav.Link>
            <Nav.Link onClick={() => clickHandler(<Profile id={id}/>)} className="d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faPhoneAlt} />
              <span>Send New Messages</span>
            </Nav.Link>

            {/* Accordion Items */}
            <Accordion>
            <Accordion.Item eventKey='0' >
                  <Accordion.Header>Club Memberships</Accordion.Header>
                  <Accordion.Body>
              {clubMembershipItems.map((item, index) => (
               
                    <Nav.Link onClick={() => clickHandler(item.component)} className="d-flex align-items-center gap-2">
                      <FontAwesomeIcon icon={faPeopleGroup} />
                      <span>{item.title}</span>
                    </Nav.Link>

              ))}
                                </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey='0' >
                  <Accordion.Header>Meet And Greets</Accordion.Header>
                  <Accordion.Body>
              {meetAndGreetItems.map((item, index) => (
               
                    <Nav.Link onClick={() => clickHandler(item.component)} className="d-flex align-items-center gap-2">
                      <FontAwesomeIcon icon={faMeetup} />
                      <span>{item.title}</span>
                    </Nav.Link>
              ))}
                  </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey='0' >
                  <Accordion.Header>Event Booking</Accordion.Header>
                  <Accordion.Body>
               {eventItems.map((item, index) => (
              
                    <Nav.Link onClick={() => clickHandler(item.component)} className="d-flex align-items-center gap-2">
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

            

