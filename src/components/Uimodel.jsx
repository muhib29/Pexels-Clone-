import React, { useEffect, useState } from "react";

const Uimodel = () => {
  const [images, setImages] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [query, setQuery] = useState("nature");
  const [per_page, setPerPage] = useState(22);
  const [loading, setLoading] = useState(false); 
  const Api_url = "https://api.pexels.com/v1/";
  const Api_Key = "94czJX65tEYYvLmK31vn2A5ctYXTs0RbFqjsTttBGogqjcpR2WZZjKAb";

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${Api_url}search?query=${query}&per_page=${per_page}`,
          {
            method: "GET",
            headers: {
              Authorization: Api_Key,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setImages(data.photos);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchImages();
  }, [query, per_page]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const downloadImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "images.jpg";
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col  md:items-center items-start justify-start   md:justify-center mt-16  px-4 h-[55vh] md:h-[79vh] text-white">
        <h1 className="font-bold hidden md:block text-2xl md:text-5xl ">
          The best free stock photos, royalty-free <br /> images & videos shared
          by creators.
        </h1>
        <h1 className="font-bold block md:hidden text-3xl">
          The best free stock <br /> photos, royalty-free <br /> images & videos shared<br />
          by creators.
        </h1>
        <div className="flex p-2 px-3   items-center gap-6 md:gap-10 w-[100%] md:w-[56%] mt-5  md:mt-10 bg-white text-black rounded-xl font-bold">
          <button onClick={handleSearch} className="flex bg-gray-200 p-2 md:p-3 px-5 rounded-lg border font-semibold border-gray-300 text-xl">
            <span>
              <i className="fa-regular fa-image md:mr-2"></i>
            </span>
            <span className="hidden md:block">
            Photos{" "}
            </span>
            <span>
              <i className="fa-solid fa-angle-down ml-1"></i>
            </span>
          </button>
          <input
            placeholder="Search for free photos"
            className="text-gray-500 md:w-2/3 w-[100%] text-sm  md:text-2xl outline-none"
            type="text"
            name="text"
            value={query}
            onChange={handleChange}
          />
         <span className="text-2xl">
         {loading ? (
          <lord-icon
            src="https://cdn.lordicon.com/mfblariy.json"
            trigger="loop"
            style={{ width: "20px", height: "20px" }}
          ></lord-icon>
         ) : (
          <i className="fa-solid fa-magnifying-glass text-xl hover:text-green-500"></i>
         )}
        </span>
         </div>
       <div className="flex justify-center items-center relative md:top-[210px] top-[280px]">
        <ul className="flex font-semibold  text-sm md:text-2xl text-slate-600 ">
          <li className="bg-black text-white px-4  py-3 rounded-full cursor-pointer">
            Home
          </li>
          <li className="px-5 py-3 rounded-full cursor-pointer">Videos</li>
          <li className="px-5 py-3 rounded-full cursor-pointer ">LeaderBoard</li>
          <li className="px-5 py-3 rounded-full cursor-pointer">Challenges</li>
        </ul>
      </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader" />
          Loading...
        </div>
      ) : (
        <div className="m-auto">
          <div className="flex justify-between items-center px-4 md:px-20 py-10 text-xl md:text-2xl font-semibold text-gray-600">
            <h1 className="text-2xl md:text-3xl font-bold">Free Stock Photos</h1>
            <button className="bg-white px-3 py-2 md:px-5 md:py-3 rounded-lg cursor-pointer border border-gray-300 hover:bg-gray-100 transition-all">
              <span className="pr-2">Trending</span>
              <i className="fa-solid fa-angle-down"></i>
            </button>
          </div>
          <div
            className="columns-2 md:columns-3 gap-4 px-4 md:px-10"
            style={{
              columnGap: "16px",
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="mb-4 rounded-lg relative overflow-hidden break-inside-avoid"
              >
                <img
                  src={image.src.original}
                  alt={image.photographer}
                  className="w-full h-auto block cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
                <div
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`${
                    hoveredIndex === index ? "flex" : "hidden"
                  } z-10 justify-between w-full items-center px-5 absolute bottom-[10px]`}
                >
                  <h2 className="font-bold text-white text-xl">
                    <span>
                      <i className="fa-solid fa-user"></i>
                    </span>{" "}
                    {image.photographer}
                  </h2>
                  <button
                    onClick={() => downloadImage(image.src.original)}
                    className="bg-[#05a081] text-white text-xl font-bold px-9 py-5 rounded-full "
                  >
                    <span>
                      <i className="fa-solid fa-download mr-2"></i>
                    </span>
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Uimodel;
