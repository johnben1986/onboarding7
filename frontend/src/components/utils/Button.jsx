import Link from "next/link";

const Button = ({ href, size = "xl", className = "", ...props }) => {
  const sizes = {
    sm: "px-2 py-1 text-sm",
    base: "px-2 py-1 md:px-4 md:py-2 text-sm md:text-base",
    lg: "px-2 py-1 md:px-6 md:py-3 text-base md:text-lg",
    xl: "px-4 py-2 md:px-6 md:py-3 text-base md:text-xl",
    "2xl": "px-6 py-3 md:px-8 md:py-4 text-lg md:text-2xl",
    "3xl": "px-6 py-3 md:px-10 md:py-5 text-xl md:text-3xl",
  };

  if (!sizes[size]) {
    throw new Error(`Invalid size: ${size}`);
  }

  const fullClass = `
    ${className || ""} ${
    sizes[size]
  } text-bold inline-block bg-brand-primary hover:bg-brand-hover text-white rounded-full
  `;

  return (
    <>
      {href ? (
        <Link {...props} href={href} className={fullClass} />
      ) : (
        <button {...props} className={fullClass} />
      )}
    </>
  );
};

export default Button;
