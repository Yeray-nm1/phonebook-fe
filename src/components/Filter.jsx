const Filter = ({ filterWord, handleFilter }) => (
  <div>
    filter shown with <input value={filterWord} onChange={handleFilter} />
  </div>
)
export default Filter