import React from "react";
import "./footer.css";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

import footerImg from "../../Assests/Image/Footer/footerlogo.svg";
import qr from "../../Assests/Image/Footer/qr.png";
import pay from "../../Assests/Image/Footer/white (1).png";

export const Footer = () => {
  return (
    <>
      <footer style={{ backgroundColor: "#191919" }}>
        {/* Logo Section */}
        <div className="tw-place-content-center tw-grid tw-pt-12">
          <div className="tw-flex">
            <div className="lg:tw-w-[500px] md:tw-w-[300px] tw-w-20 tw-border-b-2 tw-ml-6 tw-mb-20 tw-border-slate-400"></div>
            <img
              src={footerImg}
              alt="Royalux Logo"
              className="tw-h-[120px] tw-w-30"
            />
            <div className="lg:tw-w-[500px] md:tw-w-[300px] tw-w-20 tw-border-b-2 tw-mr-6 tw-mb-20 tw-border-slate-400"></div>
          </div>
        </div>

        {/* Footer Info Section */}
        <div className="md:tw-flex tw-flex tw-flex-col tw-flex-wrap tw-items-center tw-text-center tw-justify-evenly tw-p-12 tw-text-white tw-mb-10">
          <div className="tw-flex tw-flex-wrap tw-justify-around w-full">
            {/* Contact Section */}
            <div className="tw-flex tw-flex-col tw-items-center tw-mb-5">
              <h3
                className="tw-text-xl tw-font-semibold"
                style={{ color: "#d3a478" }}
              >
                In touch 24/7
              </h3>
              <p className="tw-text-2xl tw-mt-4">Reservation</p>
              <div className="tw-mt-8">
                <div className="tw-flex">
                  <p>Phone :</p>
                  <p className="tw-ml-2">+91 9499605923</p>
                </div>
                <div className="tw-flex tw-mt-2">
                  <p>Email :</p>
                  <p className="tw-ml-2">gaurangrahani792@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className="tw-flex tw-flex-col tw-items-center tw-mb-5">
              <h3
                className="tw-text-xl tw-font-semibold"
                style={{ color: "#d3a478" }}
              >
                Location
              </h3>
              <h2 className="tw-text-2xl tw-mt-4">Address</h2>
              <div className="tw-mt-8">
                <p>
                  121 King Street, Melbourne <br />
                  Victoria 3000 Australia
                </p>
              </div>
            </div>

            {/* Social Section */}
            <div className="tw-flex tw-flex-col tw-items-center tw-mb-2">
              <h3
                className="tw-text-xl tw-font-semibold"
                style={{ color: "#d3a478" }}
              >
                Follow
              </h3>
              <h2 className="tw-text-2xl tw-mt-4">Social</h2>
              <div className="tw-mt-8 tw-flex tw-space-x-3">
                <FacebookIcon className="hover:tw-text-blue-600 tw-cursor-pointer" />
                <TwitterIcon className="hover:tw-text-blue-600 tw-cursor-pointer" />
                <LinkedInIcon className="hover:tw-text-blue-600 tw-cursor-pointer" />
                <InstagramIcon className="hover:tw-text-blue-600 tw-cursor-pointer" />
              </div>
            </div>

            {/* App Section */}
            <div className="tw-flex tw-flex-col tw-items-center tw-mb-2">
              <h3
                className="tw-text-xl tw-font-semibold"
                style={{ color: "#d3a478" }}
              >
                Get App
              </h3>
              <div className="tw-m-5 tw-grid tw-place-content-center">
                <img src={qr} alt="QR Code" height="110px" width="110px" />
              </div>
              <p className="tw-grid tw-place-content-center">
                Pay with secure payment
              </p>
              <div className="tw-grid tw-place-content-center">
                <img
                  src={pay}
                  alt="Payment Methods"
                  height="30px"
                  width="110px"
                  className="tw-mt-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ backgroundColor: "rgb(41, 43, 43)" }}>
          <div className="tw-text-white tw-h-16 tw-grid tw-place-content-center">
            <p className="tw-ml-2 tw-mr-2">
              © 2020 All rights reserved. Developed at SecretLab, theme Royalux.
              Build with Atiframe.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
