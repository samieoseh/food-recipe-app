"use client";
import React, { useState } from "react";
import { customerSupportLinks, legalAndPoliciesLink } from "@/constants";
import Link from "next/link";

const FooterLinks = () => {
  const [showLegalAndPolicies, setShowLegalAndPolices] = useState(false);
  const [showCustomerSupport, setShowCustomerSupport] = useState(false);
  return (
    <div className=" lg:flex lg:justify-between lg:gap-16">
      <div
        onClick={() => setShowLegalAndPolices(!showLegalAndPolicies)}
        className="cursor-pointer lg:cursor-default"
      >
        <h4 className="text-gray-300 border-b lg:border-none border-gray-500 pt-4">
          Legal and Polices
        </h4>

        <div
          className={` ${
            showLegalAndPolicies
              ? "flex flex-col"
              : "hidden  lg:flex lg:flex-col"
          }`}
        >
          {legalAndPoliciesLink.map((link, id) => (
            <Link
              href="/"
              key={id}
              className="pt-4 text-gray-400 text-sm hover:text-white"
            >
              {link}
            </Link>
          ))}
        </div>
      </div>
      <div
        onClick={() => setShowCustomerSupport(!showCustomerSupport)}
        className="cursor-pointer lg:cursor-default"
      >
        <h4 className="text-gray-300 border-b lg:border-none border-gray-500 pt-4">
          Customer Support
        </h4>
        <div
          className={`flex flex-col ${
            showCustomerSupport ? "flex flex-col" : "hidden lg:flex lg:flex-col"
          }`}
        >
          {customerSupportLinks.map((link, id) => (
            <Link href="/" key={id} className="pt-4 text-gray-400 text-sm ">
              {link}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;
