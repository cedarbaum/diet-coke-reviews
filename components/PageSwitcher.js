import clsx from "clsx";
import { useRouter } from "next/router";

export default function PageSwitcher() {
  const router = useRouter();
  const page = router.pathname;
  return (
    <div className="flex w-full">
      <button
        className={clsx(
          "w-1/2 p-1 lg:w-[150px]",
          page === "/" && "font-bold border-b-2 border-black",
        )}
        onClick={() => router.push("/")}
      >
        Posts
      </button>
      <button
        className={clsx(
          "w-1/2 p-1 lg:w-[150px]",
          page === "/map" && "font-bold border-b-2 border-black",
        )}
        onClick={() => router.push("/map")}
      >
        Map
      </button>
    </div>
  );
}
