import Link from "next/link";
import ChurritoFi from "../icons/churritofi";
import {
  FaDiscord,
  FaGithub,
  FaTwitter,
  FaGlobe,
  FaEnvelope,
} from "react-icons/fa";
export default function Footer() {
  return (
    <>
      <footer className="bg-primary-light-light text-gray-dark w-full px-32 py-16 lg:grid grid-cols-2 gap-12 relative hidden">
        <div className="absolute right-32 -top-14">
          <svg
            width="64"
            height="61"
            viewBox="0 0 64 61"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0)">
              <path
                d="M15.8509 4.34367L12.7101 2.73122C9.68587 1.17866 6.16771 0.889035 2.9296 1.92597L2.4763 2.0711C1.93799 2.24354 1.87724 2.97964 2.37994 3.23771L13.4842 8.93839L17.8976 11.3235L20.4933 6.62796L15.8509 4.34367Z"
                fill="#D6F5E5"
              />
              <path
                d="M31.5581 18.2171C32.0608 18.4752 32.6251 17.9977 32.4525 17.4603L32.3072 17.0078C31.2683 13.7751 28.9859 11.0867 25.9616 9.53417L18.2513 5.43628L15.8509 10.2907L31.5581 18.2171Z"
                fill="#D6F5E5"
              />
              <path
                d="M5.65117 38.9573C5.3328 39.6079 4.54114 39.8704 3.89615 39.5391L1.07458 38.0906C0.429585 37.7595 0.182941 36.9641 0.527753 36.3271L19.7626 0.71371C20.0977 0.0949247 20.8667 -0.142673 21.4933 0.178889L22.9079 0.905076C23.5344 1.22677 23.7882 1.98953 23.4789 2.62158L5.65117 38.9573Z"
                fill="#D6F5E5"
              />
              <path
                d="M27.7103 60.4795C37.4659 60.4795 45.3744 52.5844 45.3744 42.8453C45.3744 33.1063 37.4659 25.2112 27.7103 25.2112C17.9547 25.2112 10.0462 33.1063 10.0462 42.8453C10.0462 52.5844 17.9547 60.4795 27.7103 60.4795Z"
                fill="#FBCC5C"
              />
              <path
                d="M17.4272 44.0982C17.4272 34.6416 24.9228 26.9006 34.2941 26.4829C32.2584 25.6636 30.0364 25.2114 27.7103 25.2114C17.9703 25.2114 10.0462 33.1221 10.0462 42.8456C10.0462 52.5691 17.9703 60.4796 27.7103 60.4796C27.9775 60.4796 28.2431 60.4726 28.5074 60.4608C22.0189 57.8494 17.4272 51.4994 17.4272 44.0982Z"
                fill="#E1B752"
              />
              <path
                d="M27.6466 55.9847C34.9086 55.9847 40.7956 50.1076 40.7956 42.8579C40.7956 35.6082 34.9086 29.7312 27.6466 29.7312C20.3846 29.7312 14.4976 35.6082 14.4976 42.8579C14.4976 50.1076 20.3846 55.9847 27.6466 55.9847Z"
                fill="#FDEABD"
              />
              <path
                d="M24.2747 30.1675C18.6465 31.654 14.4976 36.7719 14.4976 42.8578C14.4976 47.4029 16.8118 51.4082 20.3278 53.7644C18.4962 50.9865 17.4272 47.6651 17.4272 44.0979C17.4271 38.4394 20.1114 33.396 24.2747 30.1675Z"
                fill="#FCDB8C"
              />
              <path
                d="M60.4287 55.3383L63.0048 60.6762H19.2216L26.728 51.265C26.8969 51.0526 27.0272 50.8104 27.1111 50.5503L31.4312 37.1045C31.5899 36.6099 31.8892 36.1708 32.2929 35.8424L47.0142 23.8659C47.5366 23.4423 48.268 23.3907 48.8447 23.7384L51.5149 25.3495C51.9922 25.6367 52.2838 26.1531 52.2838 26.7094V33.5901C52.2838 34.1799 52.5495 34.7375 53.0061 35.111L58.5905 39.6646C59.4947 40.4012 60.0327 41.4933 60.0662 42.6574L60.4287 55.3383Z"
                fill="#D6F5E5"
              />
              <path
                d="M60.8766 56.2662H35.5935C33.0518 56.2662 31.3102 53.7084 32.2453 51.349L36.8067 39.8401C36.9654 39.3456 37.2646 38.9065 37.6684 38.5781L52.2836 26.691C52.2765 26.1425 51.9863 25.6329 51.5149 25.3492L48.8447 23.7382C48.268 23.3905 47.5366 23.442 47.0142 23.8657L32.2929 35.8422C31.8892 36.1706 31.5899 36.6097 31.4312 37.1042L27.1111 50.5501C27.0272 50.8102 26.8969 51.0523 26.728 51.2648L19.2216 60.676H26.698H26.7792H63.0048L60.8766 56.2662Z"
                fill="#D6F5E5"
              />
              <path
                d="M34.9111 50.7154C34.3766 50.7154 33.9436 50.283 33.9436 49.7496V44.2138C33.9436 43.5399 34.2064 42.9065 34.6837 42.4299L37.6518 39.4668C38.0299 39.0895 38.6423 39.0896 39.0201 39.4668C39.3978 39.844 39.3979 40.4556 39.0201 40.8326L36.0519 43.7956C35.9401 43.9072 35.8784 44.0558 35.8784 44.2137V49.7494C35.8786 50.283 35.4455 50.7154 34.9111 50.7154Z"
                fill="#85E2B2"
              />
              <path
                d="M41.8268 37.4994C41.5793 37.4994 41.3316 37.4051 41.1426 37.2165C40.7648 36.8393 40.7648 36.2277 41.1426 35.8506L41.9989 34.9958C42.3769 34.6186 42.9894 34.6186 43.3672 34.9958C43.745 35.373 43.745 35.9846 43.3672 36.3616L42.5109 37.2165C42.3221 37.4051 42.0744 37.4994 41.8268 37.4994Z"
                fill="#85E2B2"
              />
              <path
                d="M53.87 52.4147C53.3356 52.4147 52.9025 51.9823 52.9025 51.4489V45.2986L51.5997 43.9981C51.2218 43.6209 51.2218 43.0093 51.5997 42.6323C51.9776 42.2551 52.5901 42.2551 52.9679 42.6323L54.5541 44.2157C54.7355 44.3968 54.8374 44.6425 54.8374 44.8986V51.4489C54.8375 51.9823 54.4045 52.4147 53.87 52.4147Z"
                fill="#85E2B2"
              />
              <path
                d="M39.8245 23.2041L45.0293 20.1037C45.298 19.9436 45.3926 19.6003 45.2447 19.325C44.408 17.7668 43.1601 16.7857 41.4584 16.442C41.1646 16.3826 40.8725 16.5518 40.7815 16.837L38.9682 22.5263C38.8051 23.0378 39.3627 23.4792 39.8245 23.2041Z"
                fill="#FBCC5C"
              />
              <path
                d="M35.4329 22.2854C35.3915 22.2854 35.3495 22.2827 35.3074 22.2773C34.7776 22.2088 34.4035 21.7245 34.4721 21.1955L34.8395 18.362C34.908 17.833 35.3931 17.4593 35.9231 17.5282C36.4529 17.5967 36.827 18.0811 36.7583 18.6101L36.391 21.4435C36.328 21.9304 35.9119 22.2854 35.4329 22.2854Z"
                fill="#FBCC5C"
              />
              <path
                d="M13.5565 3.16577L11.3873 7.37711C11.3208 7.50615 11.262 7.63764 11.2099 7.77092L13.4841 8.93844L17.8975 11.3236L20.4932 6.62801L15.8509 4.34372L13.5565 3.16577Z"
                fill="#85E2B2"
              />
              <path
                d="M25.1208 9.08743L18.251 5.43628L15.8508 10.2907L22.6881 13.741C22.7812 13.6037 22.8683 13.4609 22.9456 13.3109L25.1148 9.09967C25.117 9.09555 25.1187 9.09143 25.1208 9.08743Z"
                fill="#85E2B2"
              />
              <path
                d="M13.4741 12.3571L17.6503 14.5011L22.8009 4.00317L19.0312 2.06787L13.4741 12.3571Z"
                fill="#D6F5E5"
              />
              <path
                d="M18.5682 12.8002L14.3499 10.6345C13.5901 10.2444 13.2909 9.31347 13.6817 8.55496L15.8509 4.34375C16.2416 3.58524 17.1742 3.2866 17.934 3.67667L22.1523 5.84235C22.9121 6.23243 23.2113 7.16337 22.8205 7.92188L20.6513 12.1331C20.2606 12.8916 19.328 13.1902 18.5682 12.8002Z"
                fill="#85E2B2"
              />
              <path
                d="M16.7806 10.0731C16.0468 9.69644 15.7579 8.79717 16.1352 8.06467L18.299 3.86402L17.9341 3.67665C17.1743 3.28657 16.2417 3.58534 15.851 4.34372L13.6816 8.55507C13.2909 9.31358 13.5902 10.2445 14.3498 10.6346L18.5682 12.8001C19.3279 13.1902 20.2605 12.8915 20.6513 12.1331L20.6809 12.0755L16.7806 10.0731Z"
                fill="#85E2B2"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="63.1404" height="61" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div>
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
          <div className="mt-4">
            Simple & smart way to put CELO to work & earn rewards on the go!
            Staking CELO has never been this easy. Let’s get started...
          </div>
          <div className="mt-10 flex flex-wrap">
            <Link
              href="/app/dashboard"
              passHref
              className="mt-2 inline-block px-10 py-2 border-2 border-primary bg-primary hover:bg-primary-dark focus:bg-primary-dark hover:border-primary-dark focus:border-primary-dark focus:outline-none text-white font-medium rounded-md shadow-md mr-4"
            >
              Start Staking
            </Link>
            <Link
              href="/how"
              passHref
              className="mt-2 inline-block px-14 py-2 bg-white text-primary border-2 border-primary hover:border-primary-dark hover:text-primary-dark font-medium rounded-md shadow-md"
            >
              How it works?
            </Link>
          </div>
          <div className="mt-16 space-x-5 text-sm">
            <p className="text-gray-dark inline">Copyright ©</p>
            <Link
              href="/privacy"
              passHref
              className="text-gray-dark hover:text-black underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              passHref
              className="text-gray-dark hover:text-black underline"
            >
              Terms of Use
            </Link>
            <Link
              href="/disclaimer"
              passHref
              className="text-gray-dark hover:text-black underline"
            >
              Disclaimer
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-1 space-x-2">
            <div className="w-1/3 space-y-5">
              <p className="text-primary font-medium">Project</p>
              <p>
                <Link
                  href="/about"
                  passHref
                  className="text-gray-dark hover:text-black underline"
                >
                  About us
                </Link>
              </p>
              {/* <p>
              <a
                href="https://discord.com/invite/5uWg3DVd2B"
                target="_blank"
                className="text-gray-dark hover:text-black underline"
              >
                Contact us
              </a>
            </p> */}
            </div>
            <div className="w-1/3 space-y-5">
              <p className="text-primary font-medium">Resources</p>
              <p>
                <Link
                  href="/how"
                  passHref
                  className="text-gray-dark hover:text-black underline"
                >
                  How it works?
                </Link>
              </p>
              <p>
                <Link
                  href="/faq"
                  passHref
                  className="text-gray-dark hover:text-black underline"
                >
                  FAQs
                </Link>
              </p>
            </div>
            <div className="w-1/3 space-y-5">
              <p className="text-primary font-medium">Contact</p>
              {/* <a
              href="https://buidllabs.io"
              target="_blank"
              className="flex items-center text-gray-dark hover:text-black underline"
            >
              <span className="mr-3">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0)">
                    <path
                      d="M11.0853 8.5H4.91482C4.82713 8.5 4.75629 8.57225 4.75854 8.65991C4.77719 9.38322 4.82619 10.0742 4.90072 10.7275C4.91144 10.8215 5.00222 10.885 5.09391 10.8617C6.03729 10.6213 7.00947 10.5 8.00007 10.5C8.99066 10.5 9.96285 10.6213 10.9062 10.8617C10.9979 10.885 11.0887 10.8215 11.0994 10.7275C11.1739 10.0742 11.2229 9.38319 11.2416 8.65991C11.2438 8.57225 11.173 8.5 11.0853 8.5Z"
                      fill="#505050"
                    />
                    <path
                      d="M11.0994 5.27255C11.0887 5.17855 10.9979 5.11505 10.9062 5.1384C9.96285 5.37877 8.99066 5.50012 8.00007 5.50012C7.00947 5.50012 6.03729 5.37877 5.09391 5.13843C5.00226 5.11508 4.91144 5.17858 4.90072 5.27258C4.82619 5.92596 4.77719 6.61693 4.75854 7.34021C4.75629 7.4279 4.8271 7.50012 4.91482 7.50012H11.0853C11.173 7.50012 11.2438 7.42787 11.2416 7.34021C11.2229 6.6169 11.1739 5.92593 11.0994 5.27255Z"
                      fill="#505050"
                    />
                    <path
                      d="M10.9062 3.95375C10.6262 2.40453 10.1971 1.134 9.70177 0.236125C9.67971 0.196125 9.64102 0.167906 9.59624 0.158875C9.0764 0.054125 8.54243 0 8.00005 0C7.45768 0 6.92371 0.054125 6.40387 0.158906C6.35909 0.167938 6.3204 0.196156 6.29834 0.236156C5.80302 1.134 5.37387 2.40453 5.09387 3.95378C5.07952 4.03309 5.1283 4.11078 5.20612 4.13175C6.09737 4.37181 7.03402 4.5 8.00005 4.5C8.96609 4.5 9.90274 4.37181 10.794 4.13172C10.8718 4.11078 10.9206 4.03306 10.9062 3.95375Z"
                      fill="#505050"
                    />
                    <path
                      d="M11.3253 0.719839C11.198 0.66162 11.0653 0.788745 11.1157 0.91937C11.1165 0.921683 11.1175 0.923995 11.1183 0.926308C11.4225 1.71706 11.6695 2.61478 11.8544 3.58562C11.8729 3.68265 11.9762 3.73793 12.0676 3.70043C12.6826 3.44803 13.2692 3.14006 13.8212 2.78306C13.903 2.73021 13.9177 2.61625 13.8514 2.545C13.7879 2.47678 13.7231 2.40946 13.6568 2.34321C12.9709 1.65718 12.182 1.11153 11.3253 0.719839Z"
                      fill="#505050"
                    />
                    <path
                      d="M12.3979 7.49991H15.8161C15.9077 7.49991 15.9795 7.42144 15.9719 7.33013C15.8615 5.98891 15.4201 4.71551 14.6872 3.60522C14.6392 3.53257 14.5419 3.51291 14.4692 3.56088C13.8722 3.95535 13.2392 4.29488 12.5738 4.57632C12.4373 4.63407 12.3 4.68904 12.1619 4.74138C12.0942 4.76707 12.0527 4.83522 12.0618 4.90713C12.1602 5.69147 12.2211 6.50966 12.2419 7.34719C12.244 7.43207 12.313 7.49991 12.3979 7.49991Z"
                      fill="#505050"
                    />
                    <path
                      d="M5.09387 12.0463C5.37387 13.5955 5.80302 14.866 6.29834 15.7639C6.3204 15.8039 6.35909 15.8321 6.40387 15.8411C6.92371 15.9459 7.45768 16 8.00005 16C8.54243 16 9.0764 15.9459 9.59624 15.8411C9.64102 15.8321 9.67971 15.8038 9.70177 15.7638C10.1971 14.866 10.6262 13.5955 10.9062 12.0462C10.9206 11.9669 10.8718 11.8892 10.794 11.8682C9.90274 11.6282 8.96609 11.5 8.00005 11.5C7.03402 11.5 6.09737 11.6282 5.20612 11.8683C5.1283 11.8892 5.07952 11.9669 5.09387 12.0463Z"
                      fill="#505050"
                    />
                    <path
                      d="M3.42629 11.4236C3.56279 11.3658 3.7001 11.3108 3.83816 11.2585C3.90591 11.2328 3.94732 11.1647 3.93829 11.0927C3.83991 10.3084 3.77897 9.49022 3.75816 8.65269C3.75604 8.56784 3.68707 8.5 3.60219 8.5H0.184006C0.0923808 8.5 0.0205995 8.57847 0.0281308 8.66978C0.1386 10.011 0.580006 11.2844 1.31288 12.3947C1.36082 12.4673 1.45819 12.487 1.53082 12.439C2.12791 12.0445 2.76085 11.705 3.42629 11.4236Z"
                      fill="#505050"
                    />
                    <path
                      d="M13.8212 13.217C13.2692 12.86 12.6826 12.552 12.0675 12.2997C11.9762 12.2622 11.8729 12.3175 11.8544 12.4145C11.6695 13.3853 11.4225 14.283 11.1183 15.0738C11.1175 15.0761 11.1165 15.0784 11.1157 15.0807C11.0653 15.2114 11.198 15.3385 11.3253 15.2803C12.182 14.8886 12.9709 14.3429 13.6569 13.6569C13.7231 13.5906 13.7879 13.5233 13.8514 13.4551C13.9177 13.3839 13.903 13.2699 13.8212 13.217Z"
                      fill="#505050"
                    />
                    <path
                      d="M12.2419 8.65272C12.2211 9.49025 12.1601 10.3085 12.0618 11.0928C12.0527 11.1647 12.0942 11.2328 12.1619 11.2585C12.3 11.3109 12.4373 11.3658 12.5738 11.4236C13.2392 11.7051 13.8722 12.0446 14.4692 12.439C14.5419 12.487 14.6392 12.4673 14.6872 12.3947C15.4201 11.2844 15.8615 10.011 15.9719 8.66978C15.9795 8.57847 15.9077 8.5 15.8161 8.5H12.3979C12.313 8.50003 12.244 8.56787 12.2419 8.65272Z"
                      fill="#505050"
                    />
                    <path
                      d="M2.17878 2.78306C2.73081 3.14006 3.31741 3.44806 3.93247 3.70043C4.02384 3.73793 4.12716 3.68265 4.14562 3.58562C4.3305 2.61478 4.57753 1.71706 4.88169 0.926308C4.88256 0.923995 4.88347 0.921683 4.88434 0.91937C4.93469 0.788745 4.80203 0.66162 4.67472 0.719839C3.81803 1.11156 3.02919 1.65721 2.34316 2.34321C2.27691 2.40946 2.21213 2.47678 2.14863 2.54499C2.08234 2.61624 2.09706 2.73021 2.17878 2.78306Z"
                      fill="#505050"
                    />
                    <path
                      d="M3.75482 7.4999C3.77172 6.60912 3.83397 5.73906 3.93829 4.90712C3.94732 4.83522 3.90591 4.76706 3.83816 4.74137C3.7001 4.68903 3.56279 4.63406 3.42629 4.57631C2.76085 4.29484 2.12791 3.95531 1.53082 3.56087C1.45819 3.5129 1.36085 3.53259 1.31288 3.60522C0.580006 4.7155 0.1386 5.9889 0.0281308 7.33012C0.0205995 7.42143 0.0923808 7.4999 0.184006 7.4999H3.75482Z"
                      fill="#505050"
                    />
                    <path
                      d="M4.67484 15.2803C4.80216 15.3385 4.93481 15.2114 4.88447 15.0807C4.88359 15.0784 4.88269 15.0761 4.88181 15.0738C4.57769 14.283 4.33063 13.3853 4.14575 12.4145C4.12728 12.3175 4.02397 12.2622 3.93259 12.2997C3.31753 12.5521 2.73094 12.86 2.17891 13.217C2.09716 13.2699 2.08247 13.3839 2.14878 13.4551C2.21228 13.5233 2.27706 13.5906 2.34331 13.6569C3.02928 14.3429 3.81813 14.8886 4.67484 15.2803Z"
                      fill="#505050"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              buidllabs.io
            </a> */}
              <a
                href="mailto:contact@churrito.fi"
                target="_blank"
                className="flex items-center text-gray-dark hover:text-black underline"
              >
                <span className="mr-3">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.6059 8.08208L15.9999 11.4921V4.52808L10.6059 8.08208Z"
                      fill="#505050"
                    />
                    <path
                      d="M0 4.52808V11.4921L5.394 8.08208L0 4.52808Z"
                      fill="#505050"
                    />
                    <path
                      d="M15 2.5H1.00003C0.501029 2.5 0.105029 2.872 0.0300293 3.351L8.00003 8.602L15.97 3.351C15.895 2.872 15.499 2.5 15 2.5Z"
                      fill="#505050"
                    />
                    <path
                      d="M9.68998 8.68606L8.27498 9.61806C8.19098 9.67306 8.09598 9.70006 7.99998 9.70006C7.90398 9.70006 7.80898 9.67306 7.72498 9.61806L6.30998 8.68506L0.0319824 12.6561C0.108982 13.1311 0.502982 13.5001 0.999982 13.5001H15C15.497 13.5001 15.891 13.1311 15.968 12.6561L9.68998 8.68606Z"
                      fill="#505050"
                    />
                  </svg>
                </span>
                contact@churrito.fi
              </a>
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com/ChurritoFi"
                  target="_blank"
                  className="text-xl"
                >
                  <FaTwitter />
                </a>
                {/* <a
                href="https://discord.com/invite/5uWg3DVd2B"
                target="_blank"
                className="text-xl"
              >
                <FaDiscord />
              </a> */}
                <a
                  href="https://github.com/ChurritoFi"
                  target="_blank"
                  className="text-xl"
                >
                  <FaGithub />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-16 flex justify-end">
            {"</>"} with <span className="ml-1 mr-3">💛</span>
            {/* by{" "}
          <span className="font-semibold ml-1">TODO</span>*/}
          </div>
        </div>
      </footer>
      <footer className="bg-primary-light-light text-gray-dark w-full p-10 relative lg:hidden">
        <div>
          <Link href="/" passHref className="flex items-center space-x-1">
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
          <div className="mt-4">
            Simple & smart way to put CELO to work & earn rewards on the go!
            Staking CELO has never been this easy. Let’s get started...
          </div>
          <div className="mt-10 flex flex-col flex-wrap">
            <Link
              href="/app/dashboard"
              passHref
              className="mt-2 flex items-center justify-center w-full px-10 py-2 border-2 border-primary bg-primary hover:bg-primary-dark focus:bg-primary-dark hover:border-primary-dark focus:border-primary-dark focus:outline-none text-white font-medium rounded-md shadow-md mr-4"
            >
              Start Staking
            </Link>
            <Link
              href="/how"
              passHref
              className="mt-5 flex items-center justify-center w-full px-14 py-2 bg-white text-primary border-2 border-primary hover:border-primary-dark hover:text-primary-dark font-medium rounded-md shadow-md"
            >
              How it works?
            </Link>
          </div>
          <div className="mt-10">
            <p className="text-primary font-medium">Project</p>
            <div className="mt-4 flex space-x-10">
              <p>
                <Link
                  href="/about"
                  passHref
                  className="text-gray-dark hover:text-black underline"
                >
                  About us
                </Link>
              </p>
              {/* <p>
              <a
                href="https://discord.com/invite/5uWg3DVd2B"
                target="_blank"
                className="text-gray-dark hover:text-black underline"
              >
                Contact us
              </a>
            </p> */}
            </div>
          </div>
          <div className="mt-10">
            <p className="text-primary font-medium">Resources</p>
            <div className="mt-4 flex  space-x-10">
              <p>
                <Link
                  href="/how"
                  passHref
                  className="text-gray-dark hover:text-black underline"
                >
                  How it works?
                </Link>
              </p>
              <p>
                <Link
                  href="/faq"
                  passHref
                  className="text-gray-dark hover:text-black underline"
                >
                  FAQs
                </Link>
              </p>
            </div>
          </div>
          <div className="mt-10">
            <p className="text-primary font-medium">Contact us</p>
            <div className="mt-4 flex  space-x-10">
              {/* <a
              href="https://buidllabs.io"
              target="_blank"
              className="flex items-center text-gray-dark hover:text-black underline"
            >
              <span className="mr-3">
                <FaGlobe />
              </span>
              buidllabs.io
            </a> */}
              <a
                href="mailto:contact@churrito.fi"
                target="_blank"
                className="flex items-center text-gray-dark hover:text-black underline"
              >
                <span className="mr-3">
                  <FaEnvelope />
                </span>
                contact@churrito.fi
              </a>
            </div>
          </div>
          <div className="flex space-x-4 mt-10">
            <a
              href="https://twitter.com/ChurritoFi"
              target="_blank"
              className="text-3xl"
            >
              <FaTwitter />
            </a>
            {/* <a
            href="https://discord.com/invite/5uWg3DVd2B"
            target="_blank"
            className="text-3xl"
          >
            <FaDiscord />
          </a> */}
            <a
              href="https://github.com/ChurritoFi"
              target="_blank"
              className="text-3xl"
            >
              <FaGithub />
            </a>
          </div>
          <div className="mt-10 flex justify-between">
            <p>
              <Link
                href="/privacy"
                passHref
                className="text-gray-dark hover:text-black underline"
              >
                Privacy Policy
              </Link>
            </p>
            <p>
              <Link
                href="/disclaimer"
                passHref
                className="text-gray-dark hover:text-black underline"
              >
                Disclaimer
              </Link>
            </p>
            <p>
              <Link
                href="/terms"
                passHref
                className="text-gray-dark hover:text-black underline"
              >
                Terms of Use
              </Link>
            </p>
          </div>
          <div className="flex justify-between mt-10 text-xs">
            <p className="text-gray-dark inline">Copyright ©</p>
            <p className="flex justify-end">
              {"</>"} with <span className="ml-1 mr-3">💛</span>
              {/* by{" "}
            <span className="font-semibold ml-1">TODO</span>*/}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
