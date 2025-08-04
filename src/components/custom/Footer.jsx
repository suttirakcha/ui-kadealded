import useCategoryStore from "@/stores/useCategoryStore";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router";

function Footer() {
  const { categories, fetchAllCategories } = useCategoryStore();

  useEffect(() => {
    const run = async () => {
      await fetchAllCategories()
    }

    run()
  }, [])

  // console.log(categories);
  // const categories = [
  //   "Food",
  //   "Beverages",
  //   "Sports",
  //   "Category 1",
  //   "Category 2",
  //   "Category 3",
  //   "Category 4",
  // ];

  const footerLinks = [
    { text: "About us", href: "/about" },
    { text: "Contact us", href: "/contact" },
    { text: "Partners", href: "" },
    { text: "Careers", href: "" },
    { text: "Terms and Conditions", href: "" },
    { text: "Privacy Policy", href: "" }
  ]

  return (
    <footer className="bg-[#004066] w-full">
      <div className="grid grid-cols-5 max-w-[1200px] w-full p-8 items-center mx-auto">
        {/* section2 */}
        <div className="text-white flex flex-col items-start">
          {categories?.map((category, index) => (
            <Link key={index} to="#">
              {category.name}
            </Link>
          ))}
        </div>

        {/* section1 */}
        <div className="flex flex-col items-center col-span-3">
          <div className="w-1/3">
            {/* web logo */}
            <img
              src="/src/assets/kaDEALded_logo-removebg-preview.png"
              alt="kadealded logo with no backgorund"
            />
          </div>
          {/* texts and social logos */}
          <p className="text-white mb-2">SUPPORT US AT</p>
          <span className="text-white flex gap-4">
            <Instagram />
            <Youtube />
            <Linkedin />
          </span>
        </div>

        {/* section3 */}
        <div className="text-white flex flex-col items-end">
          {footerLinks.map((link, index) => (
            <Link key={index} to={link.href}>
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
export default Footer;
