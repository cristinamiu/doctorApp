import React from "react";

const Sidebar = () => {
  return (
    <div class="col-sm-auto bg-light sticky-top">
      <div class="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-top">
        <ul class="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center justify-content-between w-100 px-3 align-items-center">
          <li class="nav-item">
            <a
              href="/admin/dashboard"
              class="nav-link py-3 px-2"
              title=""
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-original-title="Home"
            >
              <i class="bi-house fs-2"></i>
            </a>
          </li>
          {/* <li>
            <a
              href="/"
              class="nav-link py-3 px-2"
              title=""
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-original-title="Orders"
            >
              <i class="bi-table fs-2"></i>
            </a>
          </li> */}
          <li>
            <a
              href="/admin/doctors"
              class="nav-link py-3 px-2"
              title=""
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-original-title="Customers"
            >
              <i class="bi-people fs-2"></i>
            </a>
          </li>
        </ul>
        {/* <div class="dropdown ">
          <a
            href="/"
            class="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle"
            id="dropdownUser3"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi-person-circle h3"></i>
          </a>
          <ul
            class="dropdown-menu text-small shadow"
            aria-labelledby="dropdownUser3"
          >
            <li>
              <a class="dropdown-item" href="/">
                Settings
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="/">
                Profile
              </a>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;