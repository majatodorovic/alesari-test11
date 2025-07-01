import { Layout } from "@/_components/shared/ui/layout";
import Image from "next/image";
import Link from "next/link";

export const Credits = () => {
  return (
    <Layout>
      <div
        className={`flex flex-col items-center justify-between  py-3 sm:flex-row`}
      >
        <p className={`font-sans text-base text-white max-sm:text-center`}>
          © {new Date().getFullYear()} Alesari.com | All rights reserved.
          Powered by{" "}
          <a target={`_blank`} href={`https://www.croonus.com`}>
            Croonus Technologies
          </a>
        </p>
        <div className={`flex flex-col max-sm:mt-2 `}>
          <div className={`items-center py-1`}>
            <Image
              src={`/payments/paypal-logos1.svg`}
              alt={`Alesari`}
              width={250}
              height={110}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};
