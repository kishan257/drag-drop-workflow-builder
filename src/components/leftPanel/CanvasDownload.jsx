import * as htmlToImage from 'html-to-image';

const CanvasDownload = ({ flowchartRef }) => {
  const handleDownload = () => {
    if (!flowchartRef.current) return;
    // const svgElement = flowchartRef.current.querySelector('svg');
    htmlToImage.toPng(flowchartRef.current)
      .then(function (dataUrl) {
        const link = document.createElement('a');
        link.download = 'flowchart.png';
        link.href = dataUrl;
        link.click();
      })
      .catch(function (error) {
        console.error('Error downloading canvas:', error);
      });
  };

  return (
    <div>
      <button onClick={handleDownload}>Download Flowchart</button>
    </div>
  );
};

export default CanvasDownload;
