import { useState } from "react";
import { Button } from "./components/ui/button";
import { CardContent, CardHeader } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { ArrowLeftRight } from "lucide-react";
import { Skeleton } from "./components/ui/skeleton";
import axios from "axios";
import { type FlightData } from "./mockdata";

function App() {
  const [flightData, setFlightData] = useState<FlightData[]>();
  const [flightId, setFLightId] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);
  async function handleSubmit() {
    setIsPending(true);
    setFlightData(undefined);
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/flight?ticket_id=${flightId}`,
      );
      if (response.data.status === 200) {
        setFlightData(response.data.data);
        console.log(response.data.data);
      } else {
        setFlightData(undefined);
      }
    } catch (error) {
      console.error({ error });
    } finally {
      setIsPending(false);
    }
  }
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
                  FlightAware
                </h1>
                <p className="md:text-lg md:w-1/3 lg:w-1/2">
                  As the leader in providing advanced, accurate, actionable data
                  and insights that inform every aviation decision, FlightAware
                  is Central to Aviation
                </p>
              </div>
            </CardHeader>
            <CardContent className="container flex justify-start items-center w-full gap-4">
              <Input
                placeholder="flight number or booking id"
                className="lg:max-w-72 border-primary border"
                value={flightId}
                onChange={(e) => setFLightId(e.target.value)}
              />
              <p>or</p>
              <div className="flex justify-start items-center gap-2">
                <Input placeholder="source" className="border-primary border" />
                <span className="relative">
                  <ArrowLeftRight />
                </span>
                <Input
                  placeholder="destination"
                  className="border-primary border"
                />
              </div>
              <Button onClick={handleSubmit}>Search</Button>
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
      <div className="flex justify-end items-center">
        <Button variant={"link"}>
          <a className="" href="/">
            Home
          </a>
        </Button>
        <Button variant={"link"}>
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
    <footer className="bg-primary text-white py-6" id="contact">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h6 className="text-lg font-semibold">Your Company</h6>
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

const FlightTable = (props: { flightData: FlightData[] | undefined }) => {
  return (
    <div className="p-4">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md bg-opacity-20">
        <thead>
          <tr className="bg-gray-100 bg-opacity-70 border-b">
            <th className="py-2 px-4 text-left text-gray-600">Airline</th>
            <th className="py-2 px-4 text-left text-gray-600">Ident</th>
            <th className="py-2 px-4 text-left text-gray-600">Aircraft</th>
            <th className="py-2 px-4 text-left text-gray-600">Status</th>
            <th className="py-2 px-4 text-left text-gray-600">Departure</th>
            <th className="py-2 px-4 text-left text-gray-600">Arrival</th>
          </tr>
        </thead>
        <tbody>
          {props.flightData?.map((flight, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4 text-gray-700">{flight.airline}</td>
              <td className="py-2 px-4 text-gray-700">{flight.ident}</td>
              <td className="py-2 px-4 text-gray-700">{flight.aircraft}</td>
              <td className="py-2 px-4 text-gray-700">{flight.status}</td>
              <td className="py-2 px-4 text-gray-700">{flight.departure}</td>
              <td className="py-2 px-4 text-gray-700">{flight.arrival}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
