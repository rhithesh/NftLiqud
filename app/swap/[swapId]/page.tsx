"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import getAsset from "@/helperFunctions/getAsset";
export default function ExampleClientComponent() {
  const [json, setJson] = useState<unknown | string>("");
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const y = async () => {
      const k = await getAsset(pathname.split("/")[2]);
      setJson(k);
    };
    y();
  }, []);

  console.log(pathname.split("/")[2]);

  return (
    <>
      <div className=" m-[5rem]">
        {searchParams}
        <pre>{JSON.stringify(json, null, 2)}</pre>
      </div>
    </>
  );

  // ...
}
