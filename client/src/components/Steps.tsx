import { Col, Row } from "react-bootstrap";
import StepCard from "./StepCard"
import step1 from '../assets/images/step1.jpeg'
import step2 from '../assets/images/step2.jpeg'

import step3 from '../assets/images/step3.jpeg'
const steps: any[] = [
    {
      imageSrc: step1,
      stepTitle: "STEP ONE",
      subtitle: "FILL OUT THE FORM BELOW",
      description: "Please include as many details as possible so we can properly assess your request. Please note, in all cases, we need this form to be completed first."
    },
    {
      imageSrc: step2,
      stepTitle: "STEP TWO",
      subtitle: "A TEAM MEMBER WILL REVIEW YOUR REQUEST",
      description: "Our team will carefully review your request taking into consideration your budget, date, and location of your event."
    },
    {
      imageSrc: step3,
      stepTitle: "STEP THREE",
      subtitle: "CONSULTATION",
      description: "If we are able to assist you, we will schedule a consultation. Due to a high volume of enquiries, we are unable to respond to every request."
    }
  ];
  
const Steps:React.FC = ()=>{

return(<div  style={{paddingLeft:'3rem'}}>
    <h2 className="my-3 px-3 fw-bold">Getting Started</h2>
{

    <Row>
      {steps.map((step, index) => (
        <Col key={index} xs={12} lg={4}>
        <StepCard key={index} {...step} />
        </Col>
      ))}
    </Row>
}
<button className="p-2" style={{backgroundColor:'indigo', color:'white', border:'none'}}>Connect With A Celebrity</button>
    
    </div>)
}
export default Steps