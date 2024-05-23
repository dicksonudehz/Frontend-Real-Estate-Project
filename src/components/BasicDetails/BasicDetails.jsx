import { Box, Button, Group, NumberInput, TextInput, Textarea } from "@mantine/core";
import React from "react";
import { validateString } from "../../utils/common";
import { useForm } from "@mantine/form";

const BasicDetails = ({
  prevStep,
  nextStep,
  propertyDetails,
  setPropertyDetails,
}) => {
  const form = useForm({
    initialValues: {
      title: propertyDetails?.title,
      description: propertyDetails?.description,
      price: propertyDetails?.price,
    },
    validate: {
      title: (value) => validateString(value),
      description: (value) => validateString(value),
      price: (value) => (value < 1000 ? "must be greater than 9999" : null),
    },
  });
  const { title, description, price } = form.values;

  const handleSubmit = () => {
    const { hasError } = form.validate();
    if (!hasError) {
      setPropertyDetails((prev) => ({ ...prev, title, description, price }));
      nextStep();
    }
  };

  return (
    <Box maw="50%" mx="auto" my="md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextInput
          w={"100%"}
          withAsterisk
          label="title"
          property="Property Title"
          placeholder="Property Title"
          {...form.getInputProps("title")}
        />

        <Textarea
          w={"100%"}
          withAsterisk
          label="description"
          placeholder="Property description"
          {...form.getInputProps("description")}
        />
        <NumberInput
          withAsterisk
          label="Price"
          placeholder="1000"
          min={0}
          {...form.getInputProps("price")}
        />

        <Group position="center" mt={"xl"}>
          <Button variant="default" onClick={prevStep}>
            back
          </Button>
          <Button type="submit">Next Step</Button>
        </Group>
      </form>
    </Box>
  );
};

export default BasicDetails;
