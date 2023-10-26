import React, { useState } from 'react';

const MindMap = ({ data }) => {
  const [openNodes, setOpenNodes] = useState({});

  const handleToggle = (id) => {
    setOpenNodes({ ...openNodes, [id]: !openNodes[id] });
  };

  return (
    <div className="flex justify-center p-4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="font-bold text-xl mb-2">{data.title}</div>
        <div className="text-gray-700 text-base">
          {data.nodes.map((node) => (
            <div key={node.id} className="my-2">
              <div
                onClick={() => handleToggle(node.id)}
                className="cursor-pointer hover:text-blue-500"
              >
                {node.title}
              </div>
              {openNodes[node.id] && (
                <div className="pl-4">
                  {node.content.map((content, index) => (
                    <div key={index} className="my-1">
                      {content}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MindMap;