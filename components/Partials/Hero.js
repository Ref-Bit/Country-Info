import { Continent, Population, Search } from '..';

export default function Hero({ setFilterTerm, setSearchTerm }) {
  return (
    <section id="hero">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <div className="text-center transform -skew-y-2 hover:skew-y-0 transition duration-300">
          <h1 className="shadow title-font sm:text-6xl text-2xl px-4 mb-4 font-bold text-gray-900 bg-gray-100 h-16">
            Welcome to&nbsp;
            <span className="text-rose-500">Country Info</span>
          </h1>
          <p className="shadow mb-8 leading-relaxed text-gray-900 bg-gray-100">
            Meggings kinfolk echo park stumptown DIY, kale chips beard jianbing
            tousled.
          </p>
        </div>
        <div id="filters" className="flex justify-center items-center">
          <Population setFilterTerm={setFilterTerm} />
          <Continent setFilterTerm={setFilterTerm} />
          <Search setSearchTerm={setSearchTerm} />
        </div>
      </div>
    </section>
  );
}
