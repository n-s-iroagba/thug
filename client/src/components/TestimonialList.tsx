import React from "react";
import "../assets/styles/Testimonial.css";
import { Col, Container, Row } from "react-bootstrap";
import test1 from '../assets/images/test1.jpeg'
import test2 from '../assets/images/test2.jpeg'
import test3 from '../assets/images/test3.jpeg'
import test4 from '../assets/images/test4.jpeg'

interface TestimonialProps {
  imageSrc: string;
  quote: string;
  author: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ imageSrc, quote, author }) => {
  return (
    <div className="testimonial-container">
      <img src={imageSrc} alt={author} className="testimonial-image" />
      <div className="testimonial-content">
        <p className="testimonial-quote">"{quote}"</p>
        <p className="testimonial-author">{author}</p>
      </div>
    </div>
  );
};

const TestimonialList = () => {
    const testimonials = [
      {
        imageSrc: test1,
        quote: "I had the most amazing experience at the meet and greet organized by EliteTalentz! Meeting my favorite celebrity was a dream come true. The team was incredibly helpful throughout the entire process, making sure every detail was taken care of. I can't recommend them enough!",
        author: "Sarah M."
      },
      {
        imageSrc:test3,
        quote: "I've attended multiple meet and greets organized by EliteTalentz, and each time has been an incredible experience. The team goes above and beyond to create a comfortable and intimate setting for fans to interact with their favorite celebrities. It's a truly magical experience I'll cherish forever!",
        author: "Emily L."
      },
      {
        imageSrc: test4,
        quote: "EliteTalentz made celebrity booking for our corporate event a breeze. They listened to our requirements and suggested the perfect celebrity who exceeded our expectations. The event was a huge success, and our guests were thrilled. Thank you, EliteTalentz, for your professionalism and making our event unforgettable!",
        author: "Maria Anna"
      },
      {
        imageSrc: test2,
        quote: "Booking a celebrity through EliteTalentz was the best decision I made for my daughter's sweet sixteen party. Seeing her face light up when her favorite artist walked in was priceless. The entire process was smooth, and the team at EliteTalentz made sure everything was perfect. Thank you for making my daughter's special day truly special!",
        author: "Roberto Lopez"
      }
    ];
  
    return (
      <Container className="testimonial-section py-5">
        <h2 className="text-center mb-5">What Our Clients Say</h2>
        <Row>
          {testimonials.map((testimonial, index) => (
            <Col key={index} xs={12} md={6} className="mb-4">
              <Testimonial
                imageSrc={testimonial.imageSrc}
                quote={testimonial.quote}
                author={testimonial.author}
              />
            </Col>
          ))}
        </Row>
      </Container>
    );
  };
  
  export default TestimonialList;
