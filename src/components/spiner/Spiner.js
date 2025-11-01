import './spiner.scss';




const Spinner = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p className="loader-text">Loading...</p>
    </div>
  );
};

export default Spinner;
