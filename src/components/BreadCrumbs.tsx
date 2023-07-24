import useBreadcrumbs from "use-react-router-breadcrumbs";
import { routes } from "../route-config";
import { NavLink } from "react-router-dom";
import { Row, Space } from "antd";

export const BreadCrumbs = () => {
  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <>
      {breadcrumbs.length > 1 ? (
        <Row wrap={false} className="juice_up_breadcrumbs">
          {breadcrumbs.map(({ match, breadcrumb }, index) => (
            <NavLink key={match.pathname} to={match.pathname}>
              <Space size={4}>
                {index === 0 ? "" : "/"}
                {breadcrumb}
                <span />
              </Space>
            </NavLink>
          ))}
        </Row>
      ) : null}
    </>
  );
};
