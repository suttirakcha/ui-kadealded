import { Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router";

function Footer() {
  const footerLinksLeft = [
    { text: "Search deal", href: "/searchDeal" },
    { text: "Buy coins", href: "/coin" }
  ];

  const footerLinksRight = [
    { text: "About us", href: "/about" },
    { text: "Contact us", href: "/contact" },
    { text: "Partners", href: "" },
    { text: "Careers", href: "" },
    { text: "Terms and Conditions", href: "" },
    { text: "Privacy Policy", href: "" },
  ];

  return (
    <footer className="bg-[#004066] w-full">
      <div className="grid grid-cols-4 max-w-[1200px] w-full p-8 items-start mx-auto gap-8">
        {/* section1 */}
        <div className="flex flex-col">
          <img
            src="/src/assets/kaDEALded_logo-removebg-preview.png"
            alt="kadealded logo with no backgorund"
          />
        </div>
        {/* section2 */}
        <div className="text-white flex flex-col pt-10">
          {footerLinksLeft.map((link, index) => (
            <Link key={index} to={link.href} className="w-fit">
              {link.text}
            </Link>
          ))}
        </div>

        {/* section3 */}
        <div className="text-white flex flex-col pt-10">
          {footerLinksRight.map((link, index) => (
            <Link key={index} to={link.href} className="w-fit">
              {link.text}
            </Link>
          ))}
        </div>

        {/* section4 */}
        <div className="pt-10">
          <p className="text-white mb-2">SUPPORT US AT</p>
          <span className="text-white flex gap-4">
            <Instagram />
            <Youtube />
            <Linkedin />
          </span>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
