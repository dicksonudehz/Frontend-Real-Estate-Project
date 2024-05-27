import { Modal, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { MantineProvider } from "@mantine/core";
import { useContext, useState } from "react";
import { useMutation } from "react-query";
import UserDetailContext from "../../context/UserDetailContext";
import { bookAVisit } from "../../utils/Api";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const BookingModals = ({ opened, setOpened, email, propertyId }) => {
  const {
    userDetails: { token},
    setUserDetails,
  } = useContext(UserDetailContext);
  console.log(userDetails)

  const [value, setValue] = useState(null);
  const handleVisitSuccess = () => {
    toast.success("Residence booked successfully", {
      position: "bottom-right",
    });
    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id: propertyId,
          date: dayjs(value).format("DD/MM/YY"),
        },
      ],
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookAVisit(email, token, propertyId, value),
    onSuccess: () => handleVisitSuccess(),
    onError: (Response) => toast.error(Response.data.message),
    onSettled: () => setOpened(false),
  });

  return (
    <MantineProvider theme={{ fontFamily: "Open Sans", colorScheme: "dark" }}>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        setOpened={setOpened}
        title="select the date of your visit"
        centered
      >
        <div className="flexColCenter" style={{gap:"1rem"}}>
          <DatePicker value={value} onChange={setValue} minDate={new Date()} />
          <Button disabled={!value} onClick={() => mutate()} >
            Book Visit
          </Button>
        </div>
      </Modal>
    </MantineProvider>
  );
};

export default BookingModals;
