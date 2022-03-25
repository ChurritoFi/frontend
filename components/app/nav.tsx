import useStore from "../../store/store";
import Link from "next/link";
import ChurritoFi from "../icons/churritofi";
import { Disclosure } from "@headlessui/react";
import { MenuIcon } from "../MenuIcon";

type Props = {
  onToggleMenu: () => void;
};

export default function nav({ onToggleMenu }: Props) {
  const user = useStore((state) => state.user);
  const network = useStore((state) => state.network);

  return (
    <nav className="flex items-center px-5 py-3 lg:px-16 shadow-md flex-shrink-0 relative z-30">
      <Link href="/" passHref>
        <a className="flex items-center space-x-1.5 mr-auto">
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
        </a>
      </Link>
      {user.length > 0 && (
        <div className="flex items-center shrink truncate ml-4">
          <svg
            className="mr-2 h-9 w-9 flex-none"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="18"
              cy="18"
              r="17"
              fill="white"
              stroke="#D6F5E5"
              stroke-width="2"
            />
            <path
              d="M18.0018 6C14.5732 6 11.7705 8.80271 11.7705 12.2313C11.7705 15.6599 14.5732 18.4626 18.0018 18.4626C21.4304 18.4626 24.2331 15.6599 24.2331 12.2313C24.2331 8.80271 21.4304 6 18.0018 6Z"
              fill="#D6F5E5"
            />
            <path
              d="M28.6958 23.4422C28.5325 23.034 28.3148 22.6531 28.07 22.2993C26.8182 20.449 24.8863 19.2245 22.7094 18.9252C22.4373 18.898 22.138 18.9523 21.9203 19.1156C20.7774 19.9592 19.4169 20.3945 18.0019 20.3945C16.5869 20.3945 15.2264 19.9592 14.0835 19.1156C13.8658 18.9523 13.5665 18.8707 13.2944 18.9252C11.1176 19.2245 9.15839 20.449 7.93391 22.2993C7.68901 22.6531 7.4713 23.0613 7.30807 23.4422C7.22646 23.6055 7.25365 23.7959 7.33526 23.9592C7.55297 24.3402 7.82505 24.7211 8.06995 25.0477C8.45089 25.5647 8.85906 26.0272 9.32167 26.4626C9.70261 26.8435 10.138 27.1973 10.5734 27.551C12.723 29.1565 15.3081 30 17.9747 30C20.6414 30 23.2265 29.1565 25.3761 27.551C25.8115 27.2245 26.2468 26.8435 26.6278 26.4626C27.0632 26.0272 27.4985 25.5646 27.8795 25.0477C28.1516 24.6939 28.3966 24.3402 28.6142 23.9592C28.7502 23.7959 28.7774 23.6054 28.6958 23.4422Z"
              fill="#D6F5E5"
            />
          </svg>
          <div className="flex flex-col truncate hidden sm:block">
            <div className="flex items-center justify-end">
              <div className="ml-auto h-2 w-2 bg-secondary rounded-full mr-2.5"></div>
              <p className="text-secondary text-sm">{network}</p>
            </div>
            <p className="text-gray text-sm mt-0.5 truncate">{user}</p>
          </div>
        </div>
      )}
      <div className="lg:hidden flex items-center justify-center ml-4">
        <div onClick={onToggleMenu}>
          <MenuIcon />
        </div>
      </div>
    </nav>
  );
}
