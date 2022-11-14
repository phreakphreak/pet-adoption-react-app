import { Link, useLocation } from "react-router-dom";

const routes = [
  {
    route: "/",
    name: "home",
  },
  {
    route: "/pets",
    name: "pets",
  },
  {
    route: "/adopt",
    name: "adopt",
  },
  {
    route: "/shelters",
    name: "shelters",
  },
  {
    route: "/login",
    name: "login",
  },
];
export interface ClassProps {
  className?: string;
}
type NavHeaderProps = ClassProps;

function NavHeader({ className }: NavHeaderProps) {
  const location = useLocation();

  return (
    <nav className={className}>
      <div>LOGO</div>
      <ul className="flex">
        {routes.map((item) => {
          return (
            <li key={item.name}>
              <Link
                to={item.route}
                className={`${
                  item.route === location.pathname
                    ? `border-b-4 border-[#f1abbe]`
                    : ""
                }    p-4 items-center justify-between uppercase  font-bold`}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavHeader;
