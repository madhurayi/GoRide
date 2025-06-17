import { useEffect, useState } from "react";
import { RideMap } from "../components/RideMap";
import GORIDE_BLACK_LOGO from "../../assets/GORIDE_BLACK_LOGO.png";
import { FaLocationDot } from "react-icons/fa6";
import { TbCircleDotFilled } from "react-icons/tb";
import { GeoSearch } from "../components/GeoSearch";
import { serviceTypes } from "../../data/constants";
import { useParams } from "react-router-dom";

export interface Coordinates {
  lat: number,
  lng: number
}

export const BookingPage = () => {
  const params = useParams();
  console.log("params", params, params?.pickupAddress);

  const [pickupCoords, setPickupCoords] = useState<Coordinates | null>(null);
  const [dropCoords, setDropCoords] = useState<Coordinates | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [pickupAddress, setPickupAddress] = useState<string | "">(params?.pickupAddress ?? "");
  const [dropAddress, setDropAddress] = useState<string>(params?.dropAddress ?? "");

  async function getLatLng(address: string) {
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        address
      )}&key=${import.meta.env.VITE_OPEN_CAGE_API_KEY}`
    );
    const data = await res.json();

    return data?.results[0]?.geometry;
  }

  const getRoute = async (start: Coordinates, end: Coordinates) => {
    const res = await fetch(
      `https://api.openrouteservice.org/v2/directions/driving-car`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: import.meta.env.VITE_OPEN_ROUTE_SERVICE_KEY,
        },
        body: JSON.stringify({
          coordinates: [
            [start.lng, start.lat],
            [end.lng, end.lat],
          ],
        }),
      }
    );
    const data = await res.json();
    setDistance((data.routes[0].summary.distance / 1000).toFixed(2));
    setDuration((data.routes[0].summary.duration / 60).toFixed(2));
  };

  useEffect(() => {
    (async () => {
      if (pickupAddress.trim() === '' || dropAddress.trim() === '') return;
      const pickup = await getLatLng(pickupAddress);
      const drop = await getLatLng(dropAddress);
      if (pickup && drop) {
        setPickupCoords(pickup);
        setDropCoords(drop);
        getRoute(pickup, drop);
      }
    })();
  }, [pickupAddress, dropAddress]);

  return (
    <div className="flex flex-col justify-between mx-4 my-0 gap-5 h-[95dvh] font-sans">
      <div className="flex flex-col">
        <div className="z-20 sticky top-0 gap-2 bg-white mb-3">
          <img src={GORIDE_BLACK_LOGO} className="w-24 h-18" />
          <div className="h-24 flex border rounded-xl border-[#dfe2e6] bg-[#f7f8fa] px-4 py-4 gap-6">
            <div className="flex flex-col justify-between">
              <FaLocationDot className="w-4 h-4 text-[#0a6b37]" />
              <div className="border-l-2 h-8 border-dashed border-gray-400 mx-auto"></div>
              <TbCircleDotFilled className="w-4 h-4 text-[#d13b2a]" />
            </div>
            <div className="flex flex-col justify-between w-full">
              {pickupAddress.length > 0 && <GeoSearch address={pickupAddress} setAddress={setPickupAddress} />}
              <div className="border-b w-full border-[#dfe2e6] my-2"></div>
              {dropAddress.length > 0 && <GeoSearch address={dropAddress} setAddress={setDropAddress} />}
            </div>
          </div>
        </div>

        {pickupCoords && dropCoords && (
          <RideMap pickup={pickupCoords} drop={dropCoords} />
        )}

        {/* Distance Info */}
        {distance && duration && (
          <div className="text-center text-sm text-gray-600 mt-2">
            Distance: {distance} km | ETA: {duration} mins
          </div>
        )}

        <div className="flex flex-col gap-6 mt-5 overflow-y-auto">
          <span className="text-lg font-semibold">Select Service</span>
          {serviceTypes.map((service, index) => (
            <div className="flex justify-between mx-6" key={index}>
              <div className="flex gap-5 text-lg">
                <img src={service.image} className="w-9 h-6" />
                <span>{service.name}</span>
              </div>
              <span>{service.priceRange}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex border-t h-20 items-center justify-center">
        <div className="bg-black p-5 w-5/6 rounded-md text-white h-16 flex text-center mt-4 text-xl items-center justify-center">
          <span>Continue Booking</span>
        </div>
      </div>
    </div>
  );
};
