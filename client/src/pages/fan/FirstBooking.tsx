import { useState } from "react";
import SignUp from "./Signup";
import Celebrity from "../../types/Celebrity";
import { validateForm } from "../../utils/utils";
import { User } from "../../types/User";
import { Fan } from "../../types/Fan";
import { fanSignUpUrl } from "../../data/urls";
import { Form, useNavigate } from "react-router-dom";
import MembershipApplicationForm from "../../components/MembershipApplication";
import useFetchAllCelebrities from "../../hooks/useFetchAllCelebrities";
import { Button } from "react-bootstrap";
import MeetGreetApplicationForm from "../../components/MeetGreetApplication";
import SearchBar from "../../components/SearchBar";
import SearchPic from "../../components/SearchPic";
import { ClubMembership } from "../../types/ClubMembership";
import CelebrityRequestForm from "../../components/CelebrityRequestForm";
import Shoutout from "./Shoutout";

const FirstBooking = () => {
  const [selectedCelebrity, setSelectedCelebrity] = useState<Celebrity | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [contactType, setContactType] = useState<"event" | "meet" | "club" | "text" | "">("");
  const [componentView, setComponentView] = useState<"event" | "meet" | "club" | "text" | 'signup'|''>('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [selectedMembership, setSelectedMembership] = useState<ClubMembership | null>(null);
  const [eventData, setEventData] = useState({
    name: '',
    email: '',
    eventType: '',
    eventDate: '',
    eventLocation: '',
    budget: '',
    specialRequests: ''
  });
  const [meetData, setMeetData] = useState<{ date: Date | null, expectations: string }>({
    date: null,
    expectations: ''
  });

  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
    whatsAppNumber: '',
  });
  const [fan, setFan] = useState<Fan>({
    firstName: '',
    surname: '',
    countryOfResidence: '',
    dateOfBirth: new Date(),
    gender: '',
    occupation: ''
  });

  const { celebrities, loading, error } = useFetchAllCelebrities();
  const [query, setQuery] = useState("");
  const isSignedIn = false; // Added missing isSignedIn variable

  const handleFanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFan({ ...fan, [e.target.name]: e.target.value });
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  const handleSelectCelebrity = (celebrity: Celebrity) => {
    setSelectedCelebrity(celebrity);
    setQuery("");
  };


  const handleSubmitMembership = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCelebrity) {
      setErrorMessage("Please select a celebrity");
      return;
    }

    if (!selectedMembership) {
      setErrorMessage("Please select a membership tier");
      return;
    }
 
      
      if (!validateForm(fan, user, setErrors, confirmPassword)) {
        setSubmitting(false);
        return;
      }

      const formData = new FormData();
      formData.append('fan', JSON.stringify(fan));
      formData.append('user', JSON.stringify(user));
      formData.append('celebrity', JSON.stringify(selectedCelebrity));
      formData.append('contactType', contactType);

      // Add view-specific data
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

      try {
        const response = await fetch(fanSignUpUrl, {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        navigate(`verify-email/${data}`);
      } catch (error) {
        setErrorMessage('Submission failed. Please try again.');
        setSubmitting(false);
      }
    }
  

  const createTempCelebrity = (name: string) => {
    const newCelebrity: Celebrity = {
      id: Date.now().toString(), // Added missing id
      stageName: name,
      firstName: name.split(" ")[0],
      surname: name.split(" ")[1] || "",
      image: "",
      bio: "",
      isConfirmed: false,
      memberships: [], // Added missing memberships
    };
    setSelectedCelebrity(newCelebrity);
    setQuery("");
  };

  const handleContactTypeChange = (type: "event" | "meet" | "club" | "text") => {
    setContactType(type);
    setComponentView(type);
  };

  const filteredCelebrities = celebrities.filter(
    (celebrity) =>
      celebrity.stageName.toLowerCase().includes(query.toLowerCase()) ||
      celebrity.firstName.toLowerCase().includes(query.toLowerCase()) ||
      celebrity.surname.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) {
    return <div>Loading celebrities...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <SearchBar
        query={query}
        onQueryChange={handleSearchChange}
        items={filteredCelebrities}
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
              <strong>
                {celebrity.firstName} {celebrity.surname}
              </strong>
              <br />
              <small>{celebrity.stageName}</small>
            </div>
          </div>
        )}
        createEntity={createTempCelebrity}
      />

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
      )}
      {selectedCelebrity && componentView === 'event' && (
        <CelebrityRequestForm
          setComponentView={setComponentView}
          selectedCelebrity={selectedCelebrity}
          formData={eventData}
          contactType={contactType}
          setFormData={setEventData}
          isSignedIn={isSignedIn}
         
        />
      )}

      {selectedCelebrity && componentView === 'club' && (
        <MembershipApplicationForm
          setComponentView={setComponentView}
          memberships={selectedCelebrity.memberships}
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
        <MeetGreetApplicationForm
          selectedCelebrity={selectedCelebrity}
          contactType={contactType}
          bookingData={meetData}
          setBookingData={setMeetData}
        />
      )}

      {componentView === 'signup' && (
        <SignUp
          setComponentView={setComponentView}
          handleSubmit={handleSubmitMembership}
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

      <div className="md-w-50 px-5">
        <h6 className="mt-3 text-center">
          Connect With Your Favorite Celebrities All Over The World!
        </h6>
        <SearchPic />
        <div className="d-flex justify-content-center text-center py-3">
          <small>
            Kindly search the celebrity you wish to send a shoutout to.
          </small>
        </div>
      </div>
    </>
  );
};

export default FirstBooking;