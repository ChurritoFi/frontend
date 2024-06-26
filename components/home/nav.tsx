import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import ChurritoFi from "../icons/churritofi";
import { Disclosure } from "@headlessui/react";
import { MenuIcon } from "../MenuIcon";

export default function Nav() {
  const router = useRouter();
  const currentPath = router.pathname;
  return (
    <Disclosure
      as="header"
      className="bg-white fixed inset-x-0 top-0 z-40 px-5 py-3 lg:px-16 shadow-md"
    >
      <div className="flex justify-between items-center">
        <Link href="/" passHref className="flex items-center space-x-1.5">
          <ChurritoFi />
          <svg
            width="35"
            height="19"
            viewBox="0 0 35 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="1" width="35" height="18" rx="6" fill="#FCDB8C" />
            <path
              d="M12.215 11.01C12.215 11.66 12.0807 12.219 11.812 12.687C11.5433 13.155 11.188 13.5147 10.746 13.766C10.304 14.0087 9.823 14.13 9.303 14.13C8.41033 14.13 7.73 13.7573 7.262 13.012V14H5.845V3.86H7.262V9.008C7.73 8.26267 8.41033 7.89 9.303 7.89C9.823 7.89 10.304 8.01567 10.746 8.267C11.188 8.50967 11.5433 8.865 11.812 9.333C12.0807 9.79233 12.215 10.3513 12.215 11.01ZM10.759 11.01C10.759 10.412 10.5813 9.94833 10.226 9.619C9.87067 9.281 9.45033 9.112 8.965 9.112C8.69633 9.112 8.432 9.18567 8.172 9.333C7.912 9.48033 7.69533 9.697 7.522 9.983C7.34867 10.2603 7.262 10.6027 7.262 11.01C7.262 11.4173 7.34867 11.764 7.522 12.05C7.69533 12.3273 7.912 12.5397 8.172 12.687C8.432 12.8343 8.69633 12.908 8.965 12.908C9.45033 12.908 9.87067 12.7433 10.226 12.414C10.5813 12.076 10.759 11.608 10.759 11.01ZM16.1396 14.13C15.5242 14.13 14.9869 14 14.5276 13.74C14.0682 13.48 13.7129 13.116 13.4616 12.648C13.2102 12.18 13.0846 11.634 13.0846 11.01C13.0846 10.3773 13.2102 9.83133 13.4616 9.372C13.7216 8.904 14.0856 8.54 14.5536 8.28C15.0216 8.02 15.5719 7.89 16.2046 7.89C17.1492 7.89 17.8816 8.163 18.4016 8.709C18.9302 9.24633 19.1946 9.99167 19.1946 10.945C19.1946 11.023 19.1902 11.101 19.1816 11.179C19.1816 11.2483 19.1816 11.3003 19.1816 11.335H14.5276C14.5796 11.855 14.7486 12.258 15.0346 12.544C15.3292 12.83 15.7192 12.973 16.2046 12.973C16.9672 12.973 17.5392 12.6567 17.9206 12.024L19.1426 12.505C18.5186 13.5883 17.5176 14.13 16.1396 14.13ZM16.1916 8.956C15.2816 8.956 14.7399 9.424 14.5666 10.36H17.6606C17.6346 9.93533 17.4872 9.59733 17.2186 9.346C16.9499 9.086 16.6076 8.956 16.1916 8.956ZM19.7027 8.02H20.7037V5.94H22.0947V8.02H23.0957V9.255H22.0947V14H20.7037V9.255H19.7027V8.02ZM24.506 9.58L23.934 8.592C24.2113 8.42733 24.5623 8.267 24.987 8.111C25.4117 7.955 25.9013 7.877 26.456 7.877C27.1927 7.877 27.795 8.04167 28.263 8.371C28.7397 8.69167 28.978 9.14667 28.978 9.736V14H27.6V13.181C27.4093 13.5017 27.1277 13.74 26.755 13.896C26.3823 14.052 26.0053 14.13 25.624 14.13C25.2513 14.13 24.9047 14.0563 24.584 13.909C24.2633 13.7617 24.0077 13.545 23.817 13.259C23.6263 12.973 23.531 12.6263 23.531 12.219C23.531 11.6383 23.7347 11.179 24.142 10.841C24.558 10.4943 25.1343 10.321 25.871 10.321C26.261 10.321 26.599 10.3643 26.885 10.451C27.171 10.5377 27.4093 10.633 27.6 10.737V10.009C27.6 9.645 27.4787 9.38933 27.236 9.242C27.002 9.09467 26.6987 9.021 26.326 9.021C25.9013 9.021 25.5243 9.09033 25.195 9.229C24.8657 9.36767 24.636 9.48467 24.506 9.58ZM24.948 12.141C24.948 12.4357 25.052 12.6653 25.26 12.83C25.4767 12.9947 25.7453 13.077 26.066 13.077C26.482 13.077 26.8417 12.9513 27.145 12.7C27.4483 12.44 27.6 12.0847 27.6 11.634V11.543C27.184 11.3437 26.7203 11.244 26.209 11.244C25.767 11.244 25.4463 11.3263 25.247 11.491C25.0477 11.647 24.948 11.8637 24.948 12.141Z"
              fill="white"
            />
          </svg>
        </Link>
        <div className="items-center space-x-10 hidden lg:flex">
          <NavLink
            isButton={false}
            to="/validators"
            active={currentPath == "/validators"}
          >
            Validator Explorer
          </NavLink>

          <NavLink isButton={false} to="/vg" active={currentPath == "/vg"}>
            For Validator Groups
          </NavLink>
          <NavLink isButton={true} to="/app/dashboard" active={false}>
            Dashboard
          </NavLink>
        </div>
        <div className="lg:hidden flex items-center justify-center">
          <Disclosure.Button>
            <MenuIcon />
          </Disclosure.Button>
        </div>
      </div>

      <Disclosure.Panel as="nav" className="lg:hidden" aria-label="Global">
        <div className="pt-4 pb-10 space-y-1 text-gray border-t border-gray-light mt-3">
          {/* <Link href="/validators" passHref>
            <a
              className={
                "hover:text-gray-dark block rounded-md py-2 px-5 text-base font-medium"
              }
            >
              Validator Explorer
            </a>
          </Link> */}
          <Link
            href="/vg"
            passHref
            className={
              "hover:text-gray-dark block rounded-md py-2 px-5 text-base font-medium"
            }
          >
            For Validator Groups
          </Link>
          <Link
            href="/faq"
            passHref
            className={
              "hover:text-gray-dark block rounded-md py-2 px-5 text-base font-medium"
            }
          >
            FAQs
          </Link>
          <div className="px-5">
            <Link
              href="/app/dashboard"
              passHref
              className={
                "mt-5 bg-primary hover:bg-primary-dark focus:bg-primary-dark active:bg-primary-dark-dark focus:outline-none  px-11 py-2 rounded-md text-white text-base shadow-sm transition-all block text-center"
              }
            >
              Stake CELO
            </Link>
          </div>
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
}

function NavLink({
  children,
  isButton,
  active,
  to,
}: {
  children: React.ReactChild;
  isButton: boolean;
  active: boolean;
  to: string;
}) {
  return (
    <Link
      href={to}
      passHref
      className={`${
        !isButton
          ? `text-lg hover:underline transition-all focus:outline-none focus:underline ${
              active
                ? "text-primary hover:text-primary-dark focus:text-primary-dark"
                : "text-gray hover:text-gray-dark focus:text-gray-dark"
            }`
          : "bg-primary hover:bg-primary-dark focus:bg-primary-dark active:bg-primary-dark-dark focus:outline-none px-14 py-3 rounded-md text-white text-base shadow-sm transition-all"
      }`}
    >
      {children}
    </Link>
  );
}
