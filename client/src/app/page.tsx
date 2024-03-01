// import Image from "next/image";
// import { getBusinesData } from "@/app/serverComponents/businessApi";

interface BusinessData {
  id: Number;
  businessName: string;
  ownerName: string;
}

export default async function Home() {
  // const data: BusinessData[] = await getBusinesData();
  return (
    <>
      <div>
        <h1>Hello world</h1>
        {/* {data.map((d, i) => (
          <p key={i}>{d.businessName}</p>
        ))} */}
      </div>
    </>
  );
}
