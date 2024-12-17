import React from "react";

const NeedHelp: React.FC = () => {
  return (
    <div className="p-10 max-w-2xl font-sans text-left mt-4">
      <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
      <p className="text-lg mb-3">
        We're here to help. Reach out to us via our official{" "}
        <a
          href="https://www.instagram.com/vitmunsoc/?hl=en"
          className=" hover:underline font-semibold"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        ,{" "}
        <a
          href="https://www.linkedin.com/company/munsocvit/?originalSubdomain=in"
          className=" hover:underline font-semibold"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>{" "}
        and{" "}
        <a
          href="mailto:help.delegateaffairs@gmail.com"
          className=" hover:underline font-semibold"
        >
          Email
        </a>
        .
      </p>
      <p className="text-lg mb-2">
        If you require any help with the registration process or delegate
        affairs, you can mail at:
      </p>
      <a
        href="mailto:help.delegateaffairs@gmail.com"
        className="font-semibold underline text-lg"
      >
        help.delegateaffairs@gmail.com
      </a>
    </div>
  );
};

export default NeedHelp;
