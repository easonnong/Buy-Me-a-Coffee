import Header from "../components/Header";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* <Header /> */}
      <Header></Header>

      {/* <Trending /> */}
      <div className="mt-10">Trending</div>

      {/* <CMCtable /> */}
      <div className="mt-20">CMCtable</div>
    </div>
  );
}
