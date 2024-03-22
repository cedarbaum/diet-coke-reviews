import Image from "next/image";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center">
      <Link href="/">
        <Image
          width={100}
          height={178}
          src="/images/diet_pepsi_icon.svg"
          alt="Diet Pepsi can"
          style={{
            maxWidth: "100%",
            width: 100,
            height: 178,
          }}
        />
      </Link>
      <div className="mt-3">
        <h1 className="font-bold text-lg">Page not found - Is Pepsi OK?</h1>
      </div>
    </div>
  );
}
