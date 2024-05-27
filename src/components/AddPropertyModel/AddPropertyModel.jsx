import { Container, MantineProvider, Modal, Stepper } from "@mantine/core";
import React, { useState } from "react";
import AddLocation from "../AddLocations/AddLocation";
import { useAuth0 } from "@auth0/auth0-react";
import UploadPropertyImage from "../UploadPropertyImage/UploadPropertyImage";
import BasicDetails from "../BasicDetails/BasicDetails";
import Facilities from "../Facilities/Facilities";

const AddPropertyModel = ({ opened, setOpened }) => {
  const [active, setActive] = useState(0);
  const { user } = useAuth0();

  const [addProperty, setAddProperty] = useState({
    title: "",
    description: "",
    price: 0,
    country: "",
    address: "",
    city: "",
    image: null,
    facilities: {
      bedrooms: "",
      parkings: "",
      bathrooms: "",
    },
    userEmail: user  && user.email,
  });

  const nextStep = () => {
    setActive((current) => (current < 4 ? current + 1 : current));
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  return (
    <MantineProvider theme={{ fontFamily: "Montserrat", colorScheme: "dark" }}>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        closeOnClickOutside
        size={"90rem"}
        title={"open this modal"}
      >
        <Container h={"40rem"} w={"100%"}>
          <Stepper active={active} onStepClick={setActive}>
            <Stepper.Step label="Location" description="Address">
              <AddLocation
                next={nextStep}
                propertyDetails={addProperty}
                setPropertyDetails={setAddProperty}
              />
            </Stepper.Step>
            <Stepper.Step
              label="Upload Property Image"
              description="upload clear property image"
            >
              <UploadPropertyImage
                prevStep={prevStep}
                nextStep={nextStep}
                propertyDetails={addProperty}
                setPropertyDetails={setAddProperty}
              />
            </Stepper.Step>
            <Stepper.Step label="Final Steps" description="Get full access">
              <BasicDetails
                prevStep={prevStep}
                nextStep={nextStep}
                propertyDetails={addProperty}
                setPropertyDetails={setAddProperty}
              />
            </Stepper.Step>
            <Stepper.Step label="Final Steps" description="Ge t full access">
              <Facilities
                prevStep={prevStep}
                nextStep={nextStep}
                propertyDetails={addProperty}
                setPropertyDetails={setAddProperty}
                setActive={setActive}
                setOpened={setOpened}
              />
            </Stepper.Step>
            <Stepper.Completed>
              Completed, click back button to get to previous step
            </Stepper.Completed>
          </Stepper>
        </Container>
      </Modal>
    </MantineProvider>
  );
};

export default AddPropertyModel;
