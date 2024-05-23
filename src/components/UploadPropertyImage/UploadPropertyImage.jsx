import React, { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./UploadPropertyImage.css";
import { useRef } from "react";
import { Button, Group } from "@mantine/core";

const UploadPropertyImage = ({
  prevStep,
  nextStep,
  propertyDetails,
  setPropertyDetails,
}) => {
  const [imageUrl, setImageUrl] = useState(propertyDetails.image);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const handleNext = () => {
    setPropertyDetails((prev) => ({ ...prev, image: imageUrl }));
    nextStep();
  };

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current?.createUploadWidget(
      {
        cloudName: "du2fsehks",
        uploadPreset: "ohiltf39",
        maxFiles: 1,
      },
      (err, result) => {
        if (result.event === "success") {
          setImageUrl(result.info.secure_url);
        }
      }
    );
  }, []);

  return (
    <div className="flexColCenter uploadWrapper">
      {!imageUrl ? (
        <div className="flexColCenter uploadZone">
          <AiOutlineCloudUpload
            size={50}
            color="grey"
            onClick={() => widgetRef.current.open()}
          />
          <span>Upload Image</span>
        </div>
      ) : (
        <div className="uploadedImage" onClick={() => widgetRef.current.open()}>
          <img src={imageUrl} alt="" />
        </div>
      )}
      <Group position="center" mt={"xl"}>
        <Button variant="default" onClick={prevStep}>
          back
        </Button>
        <Button onClick={handleNext} disabled={!imageUrl}>
          Next Step
        </Button>
      </Group>
    </div>
  );
};

export default UploadPropertyImage;
