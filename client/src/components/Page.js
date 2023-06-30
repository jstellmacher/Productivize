const Page = ({ page }) => {
  const [blocks, setBlocks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/pages/${page.id}/blocks`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching blocks');
        }
        return response.json();
      })
      .then((data) => {
        console.log('API response:', data);
        setBlocks(data.blocks);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching blocks:', error);
        setError(error.message);
      });
  }, [page.id]);

  const handleDrop = (blockId) => {
    console.log(`Block ${blockId} dropped on Page ${page.id}`);
  };

  const [, drop] = useDrop({
    accept: Object.values(BlockTypes),
    drop: (item) => handleDrop(item.id),
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div ref={drop} className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">{page.title}</h3>
      <p className="text-sm text-gray-500 mb-2">Created at: {page.created_at}</p>
      <div className="grid grid-cols-2 gap-4">
        {blocks.length === 0 ? (
          <div className="bg-gray-200 rounded p-4">No blocks available</div>
        ) : (
          blocks.map((block) => (
            <PageBlock
              key={block.id}
              block={block}
              onDrop={() => handleDrop(block.id)}
              className="bg-gray-200 rounded p-4"
            />
          ))
        )}
      </div>
      <div className="lock-to-grid bg-white rounded-lg shadow-xl p-4 mt-4">
        <div className="inner-grid bg-gray-100 rounded-lg p-4 shadow-2xl">
          {/* Grid lines or any other design elements for the lock-to-grid area */}
        </div>
      </div>
      <div className="flex items-center mt-4">
        <div
          className="flex items-center justify-center h-8 w-8 rounded-full bg-red-500 text-white cursor-pointer"
          title="Trash Bin"
        >
          <FiTrash2 size={16} />
        </div>
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-600 ml-2">
          <FiSquare size={16} />
        </div>
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-600 ml-2">
          <FiCircle size={16} />
        </div>
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-600 ml-2">
          <FiTriangle size={16} />
        </div>
      </div>
    </div>
  );
};
