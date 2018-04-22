export default document => ({
  row: {
    Code: document.code,
    Title: document.title,
    Process: document.process.name,
    Category: document.category.name
  }
});
