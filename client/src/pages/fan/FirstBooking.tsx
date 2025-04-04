import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Celebrity, { FanCreateCelebrity } from "../../types/Celebrity";
import { CreateFan} from "../../types/Fan";
import { User } from "../../types/User";
import { ClubMembership, DefaultClubMembership } from "../../types/ClubMembership";
import { validateForm } from "../../utils/utils";

import useFetchAllCelebrities from "../../hooks/useFetchAllCelebrities";
import SearchBar from "../../components/SearchBar";
import SearchPic from "../../components/SearchPic";
import EventBookingForm from "../../components/EventBookingForm";
import Shoutout from "./Shoutout";
import SignUpForm from "../../components/SignupForm";
import MeetGreetApplication from "../../components/MeetGreetApplication";
import MembershipApplication from "../../components/MembershipApplication";
import { MeetGreetBooking } from "../../types/MeetGreet";
import { BookEvent } from "../../types/Event";
import { fanSignUpWithContactUrl } from "../../data/urls";

export type ContactType = "event" | "meet" | "club" | "text";
export type ComponentView = ContactType | "signup";

const FirstBooking = () => {
  // State management
  const [selectedCelebrity, setSelectedCelebrity] = useState<Celebrity |FanCreateCelebrity |null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [contactType, setContactType] = useState<ContactType>("text");
  const [componentView, setComponentView] = useState<ComponentView>("text");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [selectedMembership, setSelectedMembership] = useState<ClubMembership |DefaultClubMembership |null>(null);
  
  const [eventData, setEventData] = useState<BookEvent>({
    
  
    eventType: '',
    eventDate: '',
    eventLocation: '',
    budget: '',
    specialRequests: ''
  });
  
  const [meetData, setMeetData] = useState<MeetGreetBooking>({
    date: null,
    durationInDays:1,
    expectations: '',
    price:'',
  });

  const [user, setUser] = useState<User>({
    email: '',
    password: '',
    whatsAppNumber: '',
  });

  const [fan, setFan] = useState<CreateFan>({
    firstName: '',
    surname: '',
    countryOfResidence: '',
    dateOfBirth: new Date(),
    gender: '',
    occupation: ''
  });

  // Hooks
  const navigate = useNavigate();
  const { celebrities, loading, error } = useFetchAllCelebrities();
  const [query, setQuery] = useState("");
  const isSignedIn = false;

  // Handlers
  const handleFanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFan({ ...fan, [e.target.name]: e.target.value });
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (searchQuery: string) => setQuery(searchQuery);

  const handleSelectCelebrity = (celebrity: Celebrity) => {
    setSelectedCelebrity(celebrity);
    setQuery("");
  };

  const handleContactTypeChange = (type: ContactType) => {
    setContactType(type);
    setComponentView(type);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    if (!validateForm(fan, user, setErrors, confirmPassword)) {
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append('fan', JSON.stringify(fan));
    formData.append('user', JSON.stringify(user));
    
    if (selectedCelebrity) {
      formData.append('celebrity', JSON.stringify(selectedCelebrity));
      formData.append('contactType', contactType);

      switch(contactType) {
        case 'text':
          formData.append('message', message);
          break;
        case 'event':
          formData.append('eventData', JSON.stringify(eventData));
          break;
        case 'meet':
          formData.append('meetData', JSON.stringify(meetData));
          break;
        case 'club':
          if (selectedMembership) {
            formData.append('membership', JSON.stringify(selectedMembership));
          }
          break;
      }
    }

    try {
      const response = await fetch(fanSignUpWithContactUrl, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      navigate(`/verify-email/${data}`);
    } catch (error) {
      setErrorMessage('Submission failed. Please try again.');
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const createTempCelebrity = (name: string) => {
    const newCelebrity: FanCreateCelebrity = {
      stageName: name,
      firstName: name.split(" ")[0],
      surname: name.split(" ")[1] || "",
    };
    setSelectedCelebrity(newCelebrity);
    setQuery("");
  };

  if (loading) return <div>Loading celebrities...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="booking-container">
     { componentView !=='signup'&&<>
      <div className="search-section">
        <h6 className="text-center">
          Connect With Your Favorite Celebrities Worldwide
        </h6>
        <SearchPic />
        
        <SearchBar
          query={query}
          onQueryChange={handleSearchChange}
          items={celebrities.filter(c => 
            c.stageName.toLowerCase().includes(query.toLowerCase()) ||
            c.firstName.toLowerCase().includes(query.toLowerCase()) ||
            c.surname.toLowerCase().includes(query.toLowerCase())
          )}
          onSelectItem={handleSelectCelebrity}
          renderItem={(celebrity) => (
            <div className="d-flex align-items-center">
              <img
                src={celebrity.image}
                alt={celebrity.stageName}
                style={{ width: 40, height: 40, borderRadius: "50%" }}
                className="me-3"
              />
              <div>
                <strong>{celebrity.firstName} {celebrity.surname}</strong>
                <br />
                <small>{celebrity.stageName}</small>
              </div>
            </div>
          )}
          createEntity={createTempCelebrity}
        />
      </div>
  
      

      {selectedCelebrity && (
        <>
          <p className="mt-3 mb-0">
            <b>
              You picked {selectedCelebrity.firstName}{" "}
              {selectedCelebrity.surname} ({selectedCelebrity.stageName})
            </b>
          </p>
          <Form className="p-2 pb-5">
            <div className="mb-3">
              <Button
                variant={contactType === "text" ? "primary" : "outline-primary"}
                onClick={() => handleContactTypeChange("text")}
                className="me-2"
              >
                Shoutout Message
              </Button>
              <Button
                variant={contactType === "event" ? "primary" : "outline-primary"}
                onClick={() => handleContactTypeChange("event")}
                className="me-2"
              >
                Book A Celebrity
              </Button>
              <Button
                variant={contactType === "meet" ? "primary" : "outline-primary"}
                onClick={() => handleContactTypeChange("meet")}
                className="me-2"
              >
                Apply For Meet And Greet
              </Button>
              <Button
                variant={contactType === "club" ? "primary" : "outline-primary"}
                onClick={() => handleContactTypeChange("club")}
              >
                Apply For Club Membership
              </Button>
            </div>
          </Form>
        </>
        
      )}</>}
  
      {selectedCelebrity && componentView === 'event' && (
        <EventBookingForm
          setComponentView={setComponentView}
          selectedCelebrity={selectedCelebrity}
          formData={eventData}
          contactType={contactType}
          setFormData={setEventData}
          isSignedIn={isSignedIn}
         
        />
      )}

      {selectedCelebrity && componentView === 'club' && (
        <MembershipApplication
          setComponentView={setComponentView}
          selectedCelebrity={selectedCelebrity}
          contactType={contactType}
          selectedMembership={selectedMembership}
          setSelectedMembership={setSelectedMembership}
          isSignedIn={isSignedIn}
        
        />
      )}

      {componentView === 'text' && (
        <Shoutout
          setComponentView={setComponentView}
          selectedCelebrity={selectedCelebrity}
          message={message}
          setMessage={setMessage}
          contactType={contactType}

        />
      )}

      {componentView === 'meet' && (
        <MeetGreetApplication
          selectedCelebrity={selectedCelebrity}
          contactType={contactType}
          bookingData={meetData}
          setBookingData={setMeetData} isSignedIn={isSignedIn}        />
      )}

      {componentView === 'signup' && (
        <SignUpForm
          setComponentView={setComponentView}
          handleSubmit={handleSubmit}
          handleFanChange={handleFanChange}
          handleUserChange={handleUserChange}
          setFan={setFan}
          fan={fan}
          user={user}
          errorMessage={errorMessage}
          submitting={submitting}
          errors={errors}
          setConfirmPassword={setConfirmPassword}
          confirmPassword={confirmPassword}
        />
      )}

     
    </div>
  );
};

export default FirstBooking;