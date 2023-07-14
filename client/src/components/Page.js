import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BlockTypes } from "./BlockTypes";
import { FiTrash2, FiSquare, FiCircle, FiTriangle } from "react-icons/fi";
import PageBlock from "./PageBlock";
import { useParams } from "react-router-dom";

const Page = () => {
  const [page, setPage] = useState();
  const [error, setError] = useState(null);
  const [selectedBlockType, setSelectedBlockType] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/pages/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching blocks");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API response:", data);
        setPage(data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching blocks:", error);
        setError(error.message);
      });
  }, [id]);

  const handleDrop = (item, blockId) => {
    if (blockId === "trash") {
      console.log(`Block ${item.type} deleted`);
      setPage((prevPage) => ({
        ...prevPage,
        blocks: prevPage.blocks.filter((block) => block.id !== item.id),
      }));
    } else {
      console.log(`Block ${item.type} dropped on Page ${page.id}`);
      const newBlock = {
        id: item.id,
        type: item.type,
        // Add any additional properties or data for the new block as needed
      };
      setPage((prevPage) => ({
        ...prevPage,
        blocks: [...prevPage.blocks, newBlock],
      }));
    }
  };

  const [, drop] = useDrop({
    accept: Object.values(BlockTypes),
    drop: (item) => handleDrop(item, "page"),
  });

  const handleIconClick = (blockType) => {
    setSelectedBlockType(blockType);
  };

  const handleIconDragStart = (event, blockType) => {
    event.preventDefault(); // Prevent default behavior
    event.dataTransfer.setData("text/plain", blockType);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!page) {
    return <p>Loading...</p>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div ref={drop} className="bg-gray-400 rounded-lg shadow p-4 min-h-screen">
        <h3 className="text-lg font-semibold mb-4">{page.title}</h3>
        <div className="grid grid-cols-2 gap-4">
          {page.blocks.length === 0 ? (
            <div className="bg-gray-200 rounded p-4">No blocks available</div>
          ) : (
            page.blocks.map((block) => (
              <PageBlock
                key={block.id}
                block={block}
                blockType={block.type}
                onDrop={() => handleDrop(block, "trash")}
              />
            ))
          )}
        </div>
        <div className="lock-to-grid bg-gray-200 rounded-lg shadow-xl p-4 mt-4">
          <div className="inner-grid" style={{ minHeight: "80vh" }}>
            {/* Grid lines or any other design elements for the lock-to-grid area */}
          </div>
        </div>
        <div className="flex items-center mt-4">
          <div
            className={`flex items-center justify-center h-8 w-8 rounded-full ${
              selectedBlockType === BlockTypes.TEXT ? "bg-red-500 text-white" : "bg-gray-200 text-gray-600"
            } cursor-pointer`}
            title="Text Block"
            onClick={() => handleIconClick(BlockTypes.TEXT)}
            draggable
            onDragStart={(event) => handleIconDragStart(event, BlockTypes.TEXT)}
          >
            <FiSquare size={16} />
          </div>
          <div
            className={`flex items-center justify-center h-8 w-8 rounded-full ${
              selectedBlockType === BlockTypes.HEADING ? "bg-red-500 text-white" : "bg-gray-200 text-gray-600"
            } cursor-pointer ml-2`}
            title="Heading Block"
            onClick={() => handleIconClick(BlockTypes.HEADING)}
            draggable
            onDragStart={(event) => handleIconDragStart(event, BlockTypes.HEADING)}
          >
            <FiCircle size={16} />
          </div>
          <div
            className={`flex items-center justify-center h-8 w-8 rounded-full ${
              selectedBlockType === BlockTypes.TRIANGLE ? "bg-red-500 text-white" : "bg-gray-200 text-gray-600"
            } cursor-pointer ml-2`}
            title="Triangle Block"
            onClick={() => handleIconClick(BlockTypes.TRIANGLE)}
            draggable
            onDragStart={(event) => handleIconDragStart(event, BlockTypes.TRIANGLE)}
          >
            <FiTriangle size={16} />
          </div>
          <div
            className="flex items-center justify-center h-8 w-8 rounded-full bg-red-500 text-white cursor-pointer ml-2"
            title="Trash Bin"
            onDrop={(event) => handleDrop({}, "trash")}
            onDragOver={(event) => event.preventDefault()}
          >
            <FiTrash2 size={16} />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Page;


