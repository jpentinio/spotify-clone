const Button = ({ text, selected }: { text: string; selected: string }) => {
  return (
    <button
      className={`${
        selected === text ? "bg-white text-black" : "bg-cardHover text-white"
      } px-3 py-2  rounded-full text-sm font-semibold`}
    >
      {text}
    </button>
  );
};

export default Button;
