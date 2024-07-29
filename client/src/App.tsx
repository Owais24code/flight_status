import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { CardContent, CardHeader } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { ArrowLeftRight } from "lucide-react";
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";
import { Skeleton } from "./components/ui/skeleton";
import axios, { AxiosResponse } from "axios";
import { type FlightData } from "./mockdata";

function App() {
  const [flightData, setFlightData] = useState<FlightData[]>();
  const [flightId, setFLightId] = useState<string>("");
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);
  async function handleSubmit() {
    setIsPending(true);
    setFlightData(undefined);
    try {
      let response: AxiosResponse<unknown, unknown>;
      let data: FlightData[] = [];
      if (flightId) {
        response = await axios.get(
          `http://127.0.0.1:5000/flight?ticket_id=${flightId}`,
        );
        data = [response.data as FlightData];
      } else {
        response = await axios.get(
          `http://127.0.0.1:5000/search?source=${source}&destination=${destination}`,
        );
        data = response.data as FlightData[];
      }

      if (response.status === 200) {
        setFlightData(data);
      } else {
        setFlightData(undefined);
      }
    } catch (error) {
      console.error({ error });
    } finally {
      setIsPending(false);
    }
    console.log({ flightData });
  }
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Generate Token
      const token = await getToken(messaging, {
        vapidKey:
          "BJivfVWTFL0Q-S-l2IHaBrvmA13zzmoViQVg1h_TXM_qj8lWECBYd-TwnTP2IivRUwF2-xKoINS0-kYh_xbDn7Y", // vapid key
      });
      console.log("Token Gen", token);
      // Send this token  to server ( db)
    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  }

  useEffect(() => {
    // Req user for notification permission
    requestPermission();
  }, []);
  return (
    <>
      <Navbar />
      <main className="w-full h-full px-2 md:px-16 lg:px-32 space-y-12 py-8 min-h-[90svh] relative scroll-smooth">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500 via-blue-500 to-red-500 -z-50 opacity-15"></div>
        <div className="flex justify-center items-center w-full h-full ">
          <div className="w-full md:w-fit ">
            <CardHeader>
              <div className="space-y-2">
                <h1 className="font-bold text-2xl md:text-3xl lg:text-5xl">
                  Fly search
                </h1>
                <p className="md:text-lg md:w-1/3 lg:w-1/2">
                  As the premier provider of cutting-edge, precise, and
                  practical data and insights that drive every aviation
                  decision, Fly search is the Heart of Aviation.
                </p>
              </div>
            </CardHeader>
            <CardContent className="container md:flex justify-start items-center w-full gap-4">
              <Input
                placeholder="booking id"
                className="lg:max-w-72 border-primary border"
                value={flightId}
                onChange={(e) => setFLightId(e.target.value)}
              />
              <p>or</p>
              <div className="flex justify-start items-center gap-2">
                <Input
                  placeholder="source"
                  className="border-primary border"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                />
                <span className="relative">
                  <ArrowLeftRight />
                </span>
                <Input
                  placeholder="destination"
                  className="border-primary border"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <Button className="mt-4 md:mt-0 " onClick={handleSubmit}>
                Search
              </Button>
            </CardContent>
          </div>
        </div>
        {isPending && <Skeleton className="w-full h-[50vh]" />}
        {flightData && <FlightTable flightData={flightData} />}
      </main>
      <Footer />
    </>
  );
}

function Navbar() {
  return (
    <header className="w-full py-4 px-2 md:px-16 lg:px-32 flex justify-between items-center border-b scroll-smooth fixed z-50 top-0 backdrop-blur shadow">
      <h1 className="font-bold">Fly search</h1>
      <div className="flex justify-end items-center gap-4">
        <Button
          variant={"link"}
          className="border-primary border hover:no-underline hover:bg-primary/10"
        >
          <a className="" href="/">
            Home
          </a>
        </Button>
        <Button
          variant={"link"}
          className="border-primary border hover:no-underline hover:bg-primary/10"
        >
          <a className="" href="#contact">
            Contact
          </a>
        </Button>
      </div>
    </header>
  );
}

const Footer = () => {
  return (
    <footer
      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-6"
      id="contact"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h6 className="text-lg font-semibold">Fly search</h6>
            <p className="text-sm">© 2024 All rights reserved.</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#!" className="text-gray-200 hover:text-white">
              Privacy Policy
            </a>
            <a href="#!" className="text-gray-200 hover:text-white">
              Terms of Service
            </a>
            <a href="#!" className="text-gray-200 hover:text-white">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Update the FlightTable component
const FlightTable = (props: { flightData: FlightData[] | undefined }) => {
  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md bg-opacity-20">
          <thead>
            <tr className="bg-gray-100 bg-opacity-70 border-b">
              <th className="py-2 px-4 text-left text-gray-600">Airline</th>
              <th className="py-2 px-4 text-left text-gray-600">Ident</th>
              <th className="py-2 px-4 text-left text-gray-600">
                Flight Number
              </th>
              <th className="py-2 px-4 text-left text-gray-600">Status</th>
              <th className="py-2 px-4 text-left text-gray-600">Source</th>
              <th className="py-2 px-4 text-left text-gray-600">Destination</th>
              <th className="py-2 px-4 text-left text-gray-600">Departure</th>
              <th className="py-2 px-4 text-left text-gray-600">Arrival</th>
            </tr>
          </thead>
          <tbody>
            {props.flightData?.map((flight, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4 text-gray-700">{flight.airline}</td>
                <td className="py-2 px-4 text-gray-700">{flight.ident}</td>
                <td className="py-2 px-4 text-gray-700">{flight.flight_num}</td>
                <td className="py-2 px-4 text-gray-700">{flight.status}</td>
                <td className="py-2 px-4 text-gray-700">{flight.source}</td>
                <td className="py-2 px-4 text-gray-700">
                  {flight.destination}
                </td>
                <td className="py-2 px-4 text-gray-700">{flight.departure}</td>
                <td className="py-2 px-4 text-gray-700">{flight.arrival}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
