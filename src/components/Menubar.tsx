import arrow from '../assets/arrow.png';

const Menubar = () => {
  return (
    <div className="flex items-center h-12 px-6 bg-white shadow-md overflow-x-auto">
      {/* All Categories with Arrow */}
      <div className="flex items-center mr-8">
        <h1 className="text-sm font-semibold cursor-pointer hover:text-teal-700">
          ALL CATEGORIES
        </h1>
        <img
          src={arrow}
          alt="Dropdown arrow"
          className="w-5 h-5 ml-1"
        />
      </div>

      {/* Category List */}
      <div className="flex space-x-6 text-sm">
        <h1 className="cursor-pointer hover:text-teal-700 whitespace-nowrap">Cars</h1>
        <h1 className="cursor-pointer hover:text-teal-700 whitespace-nowrap">Motorcycles</h1>
        <h1 className="cursor-pointer hover:text-teal-700 whitespace-nowrap">Mobile Phones</h1>
        <h1 className="cursor-pointer hover:text-teal-700 whitespace-nowrap">
          For Sale: Houses & Apartments
        </h1>
        <h1 className="cursor-pointer hover:text-teal-700 whitespace-nowrap">Scooters</h1>
        <h1 className="cursor-pointer hover:text-teal-700 whitespace-nowrap">
          Commercial & Other Vehicles
        </h1>
        <h1 className="cursor-pointer hover:text-teal-700 whitespace-nowrap">
          For Rent: Houses & Apartments
        </h1>
      </div>
    </div>
  );
};

export default Menubar;