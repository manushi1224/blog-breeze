import Blogs from "./components/Blogs/Blogs";
import { SearchInput } from "./components/SearchInputs/SearchInputs";
import { Suspense } from "react";
import Skeleton from "./ui/Skeleton";
import Navbar from "./components/Navigation/Navbar";
import { getServerSession } from "next-auth";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";
  return (
    <main>
      <div className="flex justify-center">
        <SearchInput placeholder={""} />
      </div>
      <h1 className="text-4xl text-center p-10 font-extrabold">All Posts</h1>
      <Suspense key={query} fallback={<Skeleton />}>
        <div className="w-full flex justify-center p-10">
          <Blogs query={query} />
        </div>
      </Suspense>
    </main>
  );
}
