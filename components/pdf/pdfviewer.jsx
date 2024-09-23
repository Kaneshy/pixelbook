import { useState, useEffect, useRef, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack"; // For bundlers like Webpack
import { PiBookOpenText } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";




const PdfViewer = ({ pdfUrl }) => {
  const [pdf, setPdf] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isTwoPageView, setIsTwoPageView] = useState(true); // Toggle for one-page/two-page view
  const [zoomLevel, setZoomLevel] = useState(150); // State for zoom level (in percentage)
  const canvasRefs = [useRef(null), useRef(null)]; // Two refs for two canvases

  // Load PDF document when pdfUrl changes
  useEffect(() => {
    const loadPDF = async () => {
      try {
        const pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;
        setPdf(pdfDoc);
        setTotalPages(pdfDoc.numPages);
      } catch (error) {
        console.error("Error loading PDF: ", error);
      }
    };

    if (pdfUrl) {
      loadPDF();
    }
  }, [pdfUrl]);

  // Render the current page or pages
  const renderPage = useCallback(
    async (pageNum, canvasIndex = 0) => {
      if (!pdf) return;
      try {
        const page = await pdf.getPage(pageNum);
        const canvas = canvasRefs[canvasIndex].current;
        const ctx = canvas.getContext("2d");

        const scale = zoomLevel / 100; // Convert zoom level from percentage to a decimal
        const viewport = page.getViewport({ scale });

        // Adjust canvas size to the scaled PDF page
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: ctx,
          viewport,
        };

        await page.render(renderContext).promise;
      } catch (error) {
        console.error("Error rendering PDF page: ", error);
      }
    },
    [pdf, canvasRefs, zoomLevel]
  );

  // Update the page when pageNumber, two-page view, or zoom level changes
  useEffect(() => {
    if (pdf) {
      renderPage(pageNumber, 0); // Render the first page

      // If two-page view is enabled, render the next page as well
      if (isTwoPageView && pageNumber < totalPages) {
        renderPage(pageNumber + 1, 1); // Render the next page on second canvas
      }
    }
  }, [pageNumber, pdf, renderPage, isTwoPageView, totalPages]);

  // Go to the next page
  const goToNextPage = () => {
    if (isTwoPageView) {
      if (pageNumber + 2 <= totalPages) {
        setPageNumber((prevPage) => prevPage + 2); // Move two pages forward in two-page view
      }
    } else if (pageNumber < totalPages) {
      setPageNumber((prevPage) => prevPage + 1); // Move one page forward in single-page view
    }
  };

  // Go to the previous page
  const goToPreviousPage = () => {
    if (isTwoPageView) {
      if (pageNumber > 2) {
        setPageNumber((prevPage) => prevPage - 2); // Move two pages back in two-page view
      }
    } else if (pageNumber > 1) {
      setPageNumber((prevPage) => prevPage - 1); // Move one page back in single-page view
    }
  };

  // Toggle between one-page and two-page view
  const togglePageView = () => {
    setIsTwoPageView((prevState) => !prevState);
  };

  const handleChangeRange = (e) => {
    const res = parseInt(e.target.value, 10);
    setPageNumber(res);
  };

  const handleRamdomPage = (e) => {
    const numberPage = parseInt(e.target.value, 10); // Convert the value to an integer
    if (!isNaN(numberPage)) { // Check if it's a valid number
      console.log(numberPage, 8);

      // Check if the number is within the valid range
      if (numberPage < 1 || numberPage > totalPages) {
        return; // Exit if the number is outside the valid range
      } else {
        setPageNumber(numberPage); // Set the page number only if it's valid
      }
    } else {
      console.log("Invalid number entered");
    }
  };

  const handleZoomChange = (e) => {
    setZoomLevel(parseInt(e.target.value, 10)); // Update the zoom level state
  };

  useEffect(() => {

    if(window.innerWidth < 500 ) {
      setZoomLevel(75);
      setIsTwoPageView((prevState) => !prevState)
    }
    
  }, [pdfUrl]);

  return (
    <div className="">
      <div>
        
      </div>
      <div className="w-full  flex items-center  justify-between text-center ">
        <button
          className="w-full p-2 text-white  hover:bg-zinc-700 bg-zinc-800"
          onClick={goToPreviousPage} disabled={pageNumber === 1}>
          Previous
        </button>
        <button
          className="text-white max-sm:hidden boder hover:bg-zinc-600 border-zinc-500 py-2 px-6"
          onClick={() => setPageNumber(1)}>
          <IoIosArrowBack />
        </button>

        <input
          onChange={handleRamdomPage}
          value={pageNumber}
          type="number"
          min={1}
          max={totalPages}
          className="bg-zinc-950 max-sm:hidden items-center text-zinc-500 p-2"
        />
        <p className="bg-zinc-950 max-sm:hidden items-center text-zinc-500 p-2">of</p>
        <span className="bg-zinc-950 max-sm:hidden items-center text-zinc-500 p-2">
          {totalPages}
        </span>
        <button className="text-white boder max-sm:hidden hover:bg-zinc-600 border-zinc-500 py-2 px-6" 
        onClick={togglePageView}>
          <PiBookOpenText />

        </button>
        <button
          className="w-full p-2 text-white  hover:bg-zinc-700 bg-zinc-800  "
          onClick={goToNextPage} disabled={pageNumber >= totalPages}>
          Next
        </button>
      </div>
      <div className="w-full pb-4">
        <input
          onChange={handleChangeRange}
          className=""
          type="range"
          id="points"
          name="points"
          min={1}
          max={totalPages}
        />
      </div>

      <div className="w-full pb-4">
        <label htmlFor="zoom">Zoom:</label>
        <select id="zoom" value={zoomLevel} onChange={handleZoomChange} className="bg-zinc-950 text-zinc-500 p-2">
          <option value={20}>20%</option>
          <option value={50}>50%</option>
          <option value={75}>75%</option>
          <option value={100}>100%</option>
          <option value={125}>125%</option>
          <option value={150}>150%</option>
          <option value={175}>175%</option>
          <option value={200}>200%</option>
          <option value={250}>200%</option>
          <option value={300}>200%</option>
        </select>
      </div>

      <div className="w-full justify-center flex ">
        {/* First page canvas */}
        <canvas ref={canvasRefs[0]}></canvas>
        {/* Second page canvas, only displayed if in two-page view */}
        {isTwoPageView && <canvas ref={canvasRefs[1]}></canvas>}
      </div>
    </div>
  );
};

export default PdfViewer;
