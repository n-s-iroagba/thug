import { useState } from "react";
import { Fan } from "../../types/Fan";
import { User } from "../../types/User";
import SignUpForm from "../../components/SignupForm";
import { validateForm } from "../../utils/utils";

const SignUp = ()=>{

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
        const [confirmPassword, setConfirmPassword] = useState('');
        const [submitting, setSubmitting] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');
         const [errors, setErrors] = useState<Record<string, string>>({});

         const handleSubmit = async (e: React.FormEvent) => {
           e.preventDefault();
           setSubmitting(true);
           setErrorMessage('');
       
           if (!validateForm(fan, user, setErrors, confirmPassword)) {
             setSubmitting(false);
             return;
           }
       
    
       
           try {
       //implement form submission
           } catch (error) {
             setErrorMessage('Submission failed. Please try again.');
             console.error('Error:', error);
           } finally {
             setSubmitting(false);
           }
         };

      const handleFanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFan({ ...fan, [e.target.name]: e.target.value });
      };
    
      const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };
    return <>
          <SignUpForm
     
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
    
    </>
}
export default SignUp