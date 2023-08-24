const Button = ({ text }: { text: string }) => {
  return (
    <button className="bg-cardHover px-3 py-2 text-white rounded-full text-sm font-semibold">
      {text}
    </button>
  );
};

export default Button;
