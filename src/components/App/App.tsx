import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import { getPhotos } from "../../services/photos";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import { useState } from "react";
import type { Photo } from "../../types/photo";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";
import Modal from "../Modal/Modal";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);
  const [textError, setTextError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setTextError("");
      setIsLoading(true);
      const { data } = await getPhotos(query);

      setPhotos(data);
    } catch (error) {
      setTextError("Error fetching photos:");
      console.error("Error fetching photos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (photo: Photo) => {
    setCurrentPhoto(photo);
  };
  const closeModal = () => setCurrentPhoto(null);

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSearch} />
          {isLoading && <Loader />}
          {textError && <Text>{textError}</Text>}
          <PhotosGallery onClick={openModal} photos={photos} />
          {currentPhoto && (
            <Modal onClose={closeModal}>
              <img
                src={currentPhoto.src.original}
                alt={currentPhoto.alt}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Modal>
          )}
        </Container>
      </Section>
    </>
  );
}
