import GitHubStats from "@/components/globals/GitHubStats";

export default function Page() {
  return (
    <div className=" mt-[6rem] mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-tr from-orange-300 via-orange-400 to-orange-700 lg:text-4xl bg-clip-text text-transparent">
        Meet The Creators
      </h1>
      <div className="grid grid-col-4 gap-4 shadow-2xl shadow-orange-300">
        <GitHubStats username="saksham-tomer" />
        <GitHubStats username="rhithesh" />
        <GitHubStats username="iharsh02" />
        <GitHubStats username="0xTanishak" />
      </div>
    </div>
  );
}
