import website_logo_image from "@/assets/images/website-logo.png";
export const header = {
  logo: {
    src: website_logo_image,
    width: 300,
    height: 70,
    alt: "connect nikah logo",
  },
  image: "@/",
  menus: [
    {
      title: "Man Clothes",
      href: "/product/search/man-clothes",
      icon: "",
      subMenus: [
        {
          title: "Shirt",
          href: "/product/search/shirt",
        },
        {
          title: "another one",
          href: "/product/search/shirt",
        },
      ],
    },
  ],
};
