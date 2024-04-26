export const exportJSON = (data, filename) => {
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
};

export const exportCSV = (data, filename) => {
    if (!Array.isArray(data)) {
        console.error('Data is not an array.');
        return;
    }

    const csvContent = "data:text/csv;charset=utf-8," + data.map(node => Object.values(node.data).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename || "nodes.csv");

    document.body.appendChild(link);
    link.click();
};