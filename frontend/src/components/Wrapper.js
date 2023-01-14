const Wrapper = (props) => {
  const style = props.style;
  return (
    <div className="row featurette shadow-lg p-3 mt-4" style={style}>
      {props.children}
    </div>
  );
};

export default Wrapper;
