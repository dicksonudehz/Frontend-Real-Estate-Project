import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getProperty } from "../../utils/Api";
import { PuffLoader } from "react-spinners";
import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import "./property.css";
import Map from "../../components/map/Map";
import useAuthCheck from "../../hooks/useAuthCheck";
import BookingModals from "../../components/BookingModals/BookingModals";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mantine/core";
import UserDetailContext from "../../context/UserDetailContext";
import { toast } from "react-toastify";
import { cancelABooking } from "../../utils/Api";
import Hearts from "../../components/Heart/Hearts";

const Property = () => {
  const {
    userDetails: { bookings, token },
    setUserDetails,
  } = useContext(UserDetailContext);

  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => cancelABooking(user?.email, token, id),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id),
      }));
      toast.success("booking cancel successfully", {
        position: "bottom-right",
      });
    },
  });

  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const { data, isLoading, isError } = useQuery(["resd", id], () =>
    getProperty(id)
  );

  const [modalOpened, setModalOpened] = useState(false);

  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  if (isLoading) {
    <div className="wrapper">
      <div className="flexCenter paddings">
        <PuffLoader />
      </div>
      ;
    </div>;
  }
  if (isError) {
    <div className="wrapper">
      <div className="flexCenter paddings">
        <span>Error while fetching data</span>
      </div>
    </div>;
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        <div className="like">
          <Hearts id={id}/>
        </div>
        {/* image  */}
        <img src={data && data.residency.image} alt="home" />
        <div className="flexcenter property-details">
          {/* left  */}
          <div className="flexColStart left">
            {/* head  */}
            <div className="flexStart head">
              <span className="primaryText">
                {data && data.residency.title}
              </span>
              <span className="orangeText" style={{ fontSize: "1.5trem" }}>
                ${data && data.residency.price}
              </span>
            </div>

            {/* facillities  */}
            <div className="flexStart facilities">
              <div className="flexStart facility">
                {/* bathrooms  */}
                <FaShower size={24} color="#1F3E72" />
                <span>
                  {data && data.residency.facilities.bathrooms}bathrooms
                </span>
              </div>
              {/* parkings  */}
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>
                  {data && data.residency.facilities.parkings}parkings
                </span>
              </div>
              {/* bedrooms */}
              <div className="flexStart facility">
                <MdMeetingRoom size={24} color="#1F3E72" />
                <span>
                  {data && data.residency.facilities.bedrooms}bedrooms
                </span>
              </div>
            </div>
            {/* description  */}
            <div className="secondaryText" style={{ textAlign: "justify" }}>
              {data && data.residency.description}
            </div>
            {/* address  */}
            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data && data.residency.address}
                {data && data.residency.city}
                {data && data.residency.country}
              </span>
            </div>
            {/* booking button  */}
            {bookings && bookings.map((booking) => booking.id).includes(id) ? (
              <>
                <Button
                  variant="outline"
                  w={"100%"}
                  color="red"
                  onClick={() => cancelBooking()}
                  disabled={cancelling}
                >
                  cancel bookings
                </Button>
                <span>
                  Your booking is Booked for date:{" "}
                  {bookings &&
                    bookings.filter((booking) => booking.id === id)[0].date}
                </span>
              </>
            ) : (
              <button
                className="button"
                onClick={() => validateLogin() && setModalOpened(true)}
              >
                book your visit
              </button>
            )}
            <BookingModals
              opened={modalOpened}
              setOpened={setModalOpened}
              propertyId={id}
              email={user?.email}
            />
          </div>
          <div className="map">
            <Map
              address={data && data.residency.address}
              city={data && data.residency.city}
              country={data && data.residency.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
