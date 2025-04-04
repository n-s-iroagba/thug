
import { useState } from "react";
import useFetchAllCelebrities from "../hooks/useFetchAllCelebrities";
import Celebrity, { FanCreateCelebrity } from "../types/Celebrity";
import MembershipApplication from "./MembershipApplication"
import SearchBar from "./SearchBar";
import { IdProps } from "../types/IdProps";
import { ClubMembership, DefaultClubMembership } from "../types/ClubMembership";

const ApplyClubMembership:React.FC<IdProps> = ({id})=>{
     const [selectedCelebrity, setSelectedCelebrity] = useState<Celebrity |FanCreateCelebrity |null>(null);
     const [query, setQuery] = useState("");
    const [selectedMembership, setSelectedMembership] = useState<ClubMembership |DefaultClubMembership |null>(null);
     const { celebrities, loading, error } = useFetchAllCelebrities();
       
     const handleSearchChange = (searchQuery: string) => setQuery(searchQuery);

     
       const handleSelectCelebrity = (celebrity: Celebrity) => {
         setSelectedCelebrity(celebrity);
         setQuery("");
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

        if (loading) return <div>Loading...</div> 
        if (error) return <div>Error..</div>
    return<>
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
         <MembershipApplication
         
          selectedCelebrity={selectedCelebrity}
          selectedMembership={selectedMembership}
          setSelectedMembership={setSelectedMembership}
          isSignedIn={true}
        
        />
    
    </>
}
export default ApplyClubMembership