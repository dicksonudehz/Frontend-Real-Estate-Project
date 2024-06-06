import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { validateString } from "../../utils/common";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import UserDetailContext from "../../context/UserDetailContext";
import useProperties from "../../hooks/useProperties";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createResidency } from "../../utils/Api";

const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setActive,
  setOpened,
}) => {
  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails.facilities.bedrooms,
      parkings: propertyDetails.facilities.parkings,
      bathrooms: propertyDetails.facilities.bathrooms,
    },
    validate: {
      bedrooms: (value) => (value < 1 ? "Must have atleast one room" : null),
      bathrooms: (value) =>
        value < 1 ? "Must have atleast one bathroom" : null,
    },
  });

  const { bedrooms, parkings, bathrooms } = form.values;

  const handleSubmit = () => {
    const { hasError } = form.validate();
    if (!hasError) {
      setPropertyDetails((prev) => ({
        ...prev,
        facilities: { bedrooms, parkings, bathrooms },
      }));
      mutate();
    }
  };

  // ==================== upload logic
  const { user } = useAuth0();
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);
  const { refetch: refetchProperties } = useProperties();
  console.log(user);
  console.log("email: ", user.email)
  console.log("nickname: ", user.nickname)
  console.log("token:", token)
  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      createResidency(
        {
          ...propertyDetails,
          userEmail:user.email,
          facilities: { bedrooms, parkings, bathrooms },
        },
        token
      ),
    onError: ({ response }) =>
      toast.error(response.data.message, { position: "bottom-right" }),
    onSettled: () => {
      toast.success("Added Successfully", { position: "bottom-right" });
      setPropertyDetails({
        title: "",
        description: "",
        price: 0,
        address: "",
        country: "",
        city: "",
        facilities: {
          bedrooms: 0,
          parkings: 0,
          bathrooms: 0,
        },
        image: null,
        userEmail: user 
      });
      setOpened(false);
      setActive(0);
      refetchProperties();
    },
  });

  return (
    <Box maw="50%" mx="auto" my="md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <NumberInput
          withAsterisk
          label="No of Bedrooms"
          min={0}
          {...form.getInputProps("bedrooms")}
        />
        <NumberInput
          label="No of Parkings"
          min={0}
          {...form.getInputProps("parkings")}
        />
        <NumberInput
          withAsterisk
          label="No of Bathrooms"
          min={0}
          {...form.getInputProps("bathrooms")}
        />
        <Group position="center" mt={"xl"}>
          <Button variant="default" onClick={prevStep}>
            back
          </Button>
          <Button type="submit" color="green" disabled={isLoading}>
            {isLoading ? "submitting" : "Add Property"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Facilities;
