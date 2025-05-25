import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import { getPhotos } from "../../services/photos";

export default function App() {
  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={getPhotos} />
        </Container>
      </Section>
    </>
  );
}
